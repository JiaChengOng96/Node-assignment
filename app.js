const express = require('express');
const bodyParser = require('body-parser');
// simplifies file paths
    // core module, so doesn't need to be npm installed
const path = require('path');

const winston = require('winston');

const app = express();

const checkFileSize = require('./check-filesize-process');

const Queue = require('./queue');

const levels = {
    SEVERE: 0,
    MODERATE: 1,
    UNKNOWN: 2,
};

const myFormat = winston.format.printf((log) => {
    return `${log.severity}: ${JSON.stringify(log, null, 4)}\n--------------------\n`;
});

const logger = winston.createLogger({
    level: 'UNKNOWN',
    levels: levels,
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ 
            filename: 'reports.log',
            maxsize: 10000000,
            format: myFormat,
        }),
      new winston.transports.Console({ 
            format: myFormat,
        }),
    ]
  });

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

/* BODY PARSER MIDDLEWARE */
// handle parsing json content
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/csp-report' }));
// handle parsing urlencoded content [extended explained here: https://www.npmjs.com/package/body-parser#extended]
app.use(bodyParser.urlencoded({extended: false}));

/* STATIC FOLDER MIDDLEWARE */
// set static path
// `__dirname` is the directory in which the currently executing script resides
// using this with path.join is safer than the option that doesn't
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data.js', (req, res) => {
    const object = logCache.toArray();

    res.send(`var logList = ${JSON.stringify(object)}`);
});

let unique = 1;

function createLog(report){

    //id, date, severity
    let id = unique;
    unique++;

    const violatedDirective = report["violated-directive"];

    let severity = 'UNKNOWN';

    if(violatedDirective == 'style-src') {
        severity = "MODERATE";
    } else if (violatedDirective == 'script-src'){
        severity = "SEVERE";
    }

    const newLog = {
        id:         id, 
        severity:   severity,
        reportType: violatedDirective,
        timestamp:  new Date().getTime() / 1000,
    };

    return newLog;
}

const logCache = new Queue();

function queueLog(log) {
    logCache.add(log);
    while (logCache.length() > 1000){
        const oldestLog = logCache.remove();
        logger.log(oldestLog.severity, oldestLog);
    }
    
}

// Handles SIGINT (generatted by CTRL+C or can be manually sent using kill)
process.on('SIGINT', () => {
    console.log('Received SIGINT, Flushing logs to log file');
    while(logCache.length() > 0){
        const oldestLog = logCache.remove();
        logger.log(oldestLog.severity, oldestLog);
    }
    logger.end();
    logger.on('finish', () =>{
        console.log("Exiting.....");
        process.exit(0)
    });

});


// route
// handles post requests to any url
app.post('/*', (req, res) => {

    // this is sent by the browser ormatted as a standard csp report
    // see https://developer.mozilla.org/en-us/docs/Web/HTTP/CSP#Violation_report_syntax
    // you can also violate csp in your broswer and watch the network dev tools

    // or console log the req.body -> console.log(req.body)
    
    checkFileSize();
    
    const report = req.body["csp-report"];

    const newLog = createLog(report);

    queueLog(newLog);
    
    res.end();
});