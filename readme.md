## Log Manager V1.0

This is a simple log manager which will accept error log data based on the violated-directive from the reporter and create log file to uniquely identify each log which showing all log in tabular format on the front end webpages.

### Requirement

some of the package is require to run this log manager on the machine which includes 

- git
        
        apt-get install git
- npm

        apt-get install npm

- node

        apt-get install node

### cloning the repo

1. clone the repo into your machine

        git clone git@github.com:JiaChengOng96/dsd-sec-reporter.git
        git clone git@github.com:JiaChengOng96/node-exp-eg.git

2. Follow the instruction for dsd-sec-reporter README file to install and setup for reporter

3. navigate into node-exp-eg repo to perform installation

        cd node-exp-eg
        npm install

### Running manager in different environment

- To start the manager in development mode

        npm dev
           or
        npm run dev

- To start the manager in production mode

        npm start
           or
        npm run start

- To test the application

        npm jest

NOTES: Jest would only perform the test case provide such as queue.test.js in jest test case format

### Severity algorithm

In this application, we are using winston to format the created log in a readable format as well as determine the severity of the error log. In real world, there would be many error log everyday and many error log would be just informational. Thus by creating an algorithm to categories the severity of the log, admin would be able to remove all low severity log and focus only severe level logs.

Our application can only detect from two source which is style-src and script-src. For style-src would be categories as moderate severity and script-src would be categories as severe severity. Other than these two it would be unknown to the logging.

### Constraint and Limitation

Currently this manager is develop to only work with javascript and express third party packages. It will not work with framework packages such as ruby package and else.

This logging manager only able to receive report error from the reporter agent and not other else. If one were to import other webpage error message into this logging manager to perform log creation it will not work as intended. 

Last but not least, this log application can only perform severity check for script-src and style-src so far. Any content block error from other source would be determine as unknown in our logging application.

### Third party dependencies

- jest

It is a testing environment for javascript which would perform a test check based on the created test case against the source code. It is commonly use as one of the tools for test-driven development.

links: https://jestjs.io/docs/en/getting-started

- winston

It is a simple yet universal logging tools for easy creating log within javascript framework and capable of storing all log record into a file and save it into the file system. 

links: https://github.com/winstonjs/winston 

links: https://winston.readthedocs.io/en/latest/

