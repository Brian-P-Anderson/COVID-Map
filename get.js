/* jshint esversion: 9 */
const { exec } = require("child_process");

var dateObj = new Date();
dateObj.setDate(dateObj.getDate() - 1);
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

m = month.toString().padStart(2, 0);
d = day.toString().padStart(2, 0);

exec(`curl -L https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${m}-${d}-${year}.csv > yesterday.csv`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        exec(`chmod 600 ./yesterday.csv`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});