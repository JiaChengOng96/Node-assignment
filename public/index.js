// search for the DOM element with the id of entry-template and get all the inner html tag
const source   = document.getElementById("entry-template").innerHTML;
// setup
const template = Handlebars.compile(source);

// data that will be render into webpage
//const context = {title: "My New Post", body: "This is my first post!"};

const bTree = new BST();

function addArrayToBtree(firstIndex, lastIndex) {

    if (lastIndex < firstIndex) {
        return;
    }

    const medianIndex = Math.floor((firstIndex + LastIndex) / 2);

    bTree.insert(logList[medianIndex].timestamp, logList[medianIndex]);

    // recursively adding the left side of the tree
    addArrayToBtree(firstIndex, medianIndex - 1);

    // recursively adding the right side of the tree
    addArrayToBtree(medianIndex + 1, lastIndex);
}

addArrayToBtree(0, logList.length - 1);

function refilter() {
    //declare const variable to get data form user input
    const fromDate = new Date();
    const fromTimeField = document.getElementById('fromtime').value;
    const toTimeFeild = document.getElementById('totime').value;
    
    // console log to debug
    console.log (fromTimeField.split(':').length,
        toTimeFeild.split(':').length);
    
    let toDisplay = logList;
    // only if we have the proper time from input
    if (fromTimeField.split(':').length == 3 &&
        toTimeFeild.split(':').length == 3) {
            
            // the split method return array so after split we need to store in an array of hours, minutes, seconds
            let [hours, minutes, seconds] = document.getElementById('fromtime').value.split(':');

            // setting the time for fromDate based on the value gotten from input and getting the time in seconds
            fromDate.setHours(hours, minutes, seconds, 0);
            const fromTimestamp = fromDate.getTime() / 1000;

            const toDate = new Date()

            // the split method return array so after split we need to store in an array of hours, minutes, seconds
            [hours, minutes, seconds] = document.getElementById('totime').value.split(':');

            // setting the time for fromDate based on the value gotten from input and getting the time in seconds
            toDate.setHours(hours, minutes, seconds, 999);
            const toTimestamp = fromDate.getTime() / 1000;
    
            toDisplay = btree.range(fromTimestamp, toTimestamp);
    }
    
    // getting the contents of the search input box for severity of reports log

    const searchString = document.getElementById('search-string').value;

    toDisplay = toDisplay.filter(function(item) {
        
        // search for the string input
        if (item.reportType.indexOf(searchString) != -1) {
            return true;
        } else {
            return false;
        }

        // one liner for this function
        // return item.reportType.indexOf(searchString) != -1; 
    });

    toDisplay = toDisplay.slice();

                    // conparator function
    toDisplay.sort(function(itemA, itemB) {
        // return a number < 0 if itemA < itemB (comes before)
        // return a number > 0 if itemA > itemB (comes after)
        // return 0 if none of our concern

        const severityA = ['UNKNOWN', 'MODERATE', 'HIGH'].indexOf(itemA.severity);
        const severityB = ['UNKNOWN', 'MODERATE', 'HIGH'].indexOf(itemB.severity);

        if (severityA > severityB) {
            return -1;
        } else if (severityA < severityB) {
            return 1;
        } else {
            if (itemA.timestamp < itemB.timestamp) {
                return -1;
            } else if (itemA.timestamp > itemB.timestamp) {
                return 1;
            } else {
            return 0;
            }
        }
    });
    
    
    const context = {
        logs: toDisplay,
    };
    
    // display the data into the webpage
    document.getElementById("display").innerHTML = template(context);
    
}

refilter();

