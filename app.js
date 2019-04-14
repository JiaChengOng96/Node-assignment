const express = require('express');
const bodyParser = require('body-parser');
// simplifies file paths
    // core module, so doesn't need to be npm installed
const path = require('path');

const app = express();

const fs = require('fs');

const Queue = require('./queue');

const levels = {
    INFO: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    SEVERE: 4
};

const logger = winston.createLogger({
    level: 'SEVERE',
    
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

const LOG_FILE_NAME = "log1.txt";

// FIXME: this assume it opens before the server finishes starting up
const logWriteStream = fs.createWriteStream(LOG_FILE_NAME, { flags: 'a', });

// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

/* EXAMPLE OF MIDDLEWARE
// custom middleware
const logger = ((req, res, next) => {
    console.log('logging...');
    next();
})
// allows us to use the custom middleware
app.use(logger);
*/

/* BODY PARSER MIDDLEWARE */
// handle parsing json content
app.use(bodyParser.json({ type: 'application/*+json' }));
// handle parsing urlencoded content [extended explained here: https://www.npmjs.com/package/body-parser#extended]
app.use(bodyParser.urlencoded({extended: false}));

/* STATIC FOLDER MIDDLEWARE */
// set static path
// `__dirname` is the directory in which the currently executing script resides
// using this with path.join is safer than the option that doesn't
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data.js', (req, res) => {
    const object = [{id:1}, {id: 5}];

    res.send(`var logList = ${JSON.stringify(object)}`);
});

let unique = 1;

function createLog(report){

    //id, date, severity
    let id = unique;
    unique++;

    const violatedDirective = report["violated-directive"];

    let severity = 'unknown';

    if(violatedDirective == 'style-src') {
        severity = "moderate";
    } else if (violatedDirective == 'script-src'){
        severity = "high";
    }

    const newLog = {
        id:         id, 
        severity:   severity,
        reportType: violatedDirective,
        timestamp:  Math.floor(new Date().getTime() / 1000),
    };

    return newLog;
}

const logCache = new Queue();

function queueLog(log) {
    logCache.add(log);
    while (logCache.length() > 1000){
        const oldestLog = logCache.remove();
        console.log('Remove oldest log not implemented yet!!!')
        //logWriteStream.write(JSON.stringify(oldestLog));
    }
    
}

// Handles SIGINT (generatted by CTRL+C or can be manually sent using kill)
process.on('SIGINT', () => {
    console.log('\nReceived SIGINT, Flushing logs to log file');
    while(logCache.length() > 0){

    }
});
// route
// handles post requests to any url
app.post('/*', (req, res) => {
    console.log(req.body);

    // this is sent by the browser ormatted as a standard csp report
    // see https://developer.mozilla.org/en-us/docs/Web/HTTP/CSP#Violation_report_syntax
    // you can also violate csp in your broswer and watch the network dev tools

    // or console log the req.body -> console.log(req.body)
    const report = req.body["csp-report"];

    const newLog = createLog(report);

    queueLog(newLog);
    
    res.end();
});