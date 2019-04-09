// search for the DOM element with the id of entry-template and get all the inner html tag
const source   = document.getElementById("entry-template").innerHTML;
// setup
const template = Handlebars.compile(source);

// data that will be render into webpage
//const context = {title: "My New Post", body: "This is my first post!"};

const context = {
    logs: [
        {
            id:         1,
            severity:   "low",
            reportType: "script",
            timestamp:  15243627,
        },
        {
            id:         2,
            severity:   "critical",
            reportType: "mixed content",
            timestamp:  15243629,
        },
        {
            id:         3,
            severity:   "moderate",
            reportType: "style-src",
            timestamp:  1554431444,
        },
        {
            id:         4,
            severity:   "severe",
            reportType: "script-src",
            timestamp:  1554431448,
        },
        {
            id:         5,
            severity:   "High",
            reportType: "Violated Directive",
            timestamp:  1554431256
        },
        {
            id:         6,
            severity:   "Medium",
            reportType: "Mixed Content",
            timestamp:  1554431278
        },
        {
            id:         7,
            severity:   "high",
            reportType: "script",
            timestamp:  15649483904
        }, 
        {
            id:         8,
            severity:   "low",
            reportType: "mixed content",
            timestamp:  15649483905
        },
        {
            id:         9,
            severity:   "medium",
            reportType: "script",
            timestamp:  1554431249
        },
        {
            id:         10,
            severity:   "high",
            reportType: "style",
            timestamp:  1554431375
        }
    ],
};

// display the data into the webpage
document.getElementById("display").innerHTML += template(context);
