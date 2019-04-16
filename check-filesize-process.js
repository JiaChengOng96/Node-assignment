const child_process = require('child_process')

// 1st part of '|' => list reports sorted by time
// 2nd part of '|' => replace double space with single space
// 3rd part of '|' => take the feild 5 of the listing which is the file size

const cmd1 = "ls -lt reports*.log | sed 's/  */ /g' | cut -d ' ' -f 5 | head -n 1";

// second command method
// 2nd and 3rd part of '|' => find 4 group of chars followed by spaces (using{4}), and replace line with the next group
const cmd2 = "ls -lt reports*.log | sed 's/\\([^ ]* *\\)\\{4\\}\\([^ ]*\\).*/\\2/' | cut -d ' ' -f 5 | head -n 1";

// third command method
// 2nd and 3rd part of '|' => find 4 group of chars followed by spaces (manually), and replace line with the next group
const cmd3 = "ls -lt reports*.log | sed 's/[^ ]* *[^ ]* *[^ ]* *[^ ]* *\\([^ ]*\\).*/\\1/' | cut -d ' ' -f 5 | head -n 1";

module.exports = function () {
    const child = child_process.exec(cmd1,
        (error, stdout, stderr) => {
            /*if (error) { // what could possibly go wrong???
                console.error(`exec error: ${error}`);
                return;
            }*/
            console.log(`File size: ${stdout}`);
        });
}