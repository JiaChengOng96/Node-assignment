import { blockStatement } from "@babel/types";

// search for the DOM element with the id of entry-template and get all the inner html tag
const source   = document.getElementById("entry-template").innerHTML;
// setup
const template = Handlebars.compile(source);

// data that will be render into webpage
//const context = {title: "My New Post", body: "This is my first post!"};

const context = {
    logs: logList,
};

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

// display the data into the webpage
document.getElementById("display").innerHTML = template(context);
