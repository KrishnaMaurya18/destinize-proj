const TOKEN = "ya29.a0AVvZVsrA5dPNpCKz9ZDdpbDKQvc6TQaDvwuLWZMaOCOI6VqSSWI7VQp9Jgds5D8HXjsITNul4TpnkbkkS44OtmGGVOX2ydgVaaIEU9CY3GDmT_t76wWqqnbovzg_XIE44PA6YkEIZCdKlgCF12tgQtoLIBFbaCgYKAdoSARMSFQGbdwaIowytd1jQZWaxa2qeJ_Aksg0163";
const SPREADSHEET_ID = "1va_mJskd7n0wKpiK1vCE2zEtzVVgkRtr9adXENP-lpw";
let rowNum = 1;
document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
    const submitButton = document.getElementById("submit-btn");
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();

        subjectInput = document.querySelector("input[name='subject']");
        subjectVal = subjectInput.value;

        dateInput = document.querySelector("input[name='date']");
        dateVal = dateInput.value;

        descriptionInput = document.querySelector("input[name='description']");
        descriptionVal = descriptionInput.value;

        commentsInput = document.querySelector("input[name='comments']");
        commentsVal = commentsInput.value;
        
        sendValues(subjectVal, dateVal, descriptionVal, commentsVal);

        subjectInput.value = "";
        dateInput.value = "";
        descriptionInput.value = "";
        commentsInput.value = "";
        rowNum += 1;
    });
}

function getRange(col) {
    return {
        startColumnIndex: col,
        endColumnIndex: col + 1,
        startRowIndex: rowNum,
        endRowIndex: rowNum + 1,
        sheetId: 0
    }
}

function getCell(val) {
    return {
        userEnteredValue: {
            "stringValue": val,
        },
    }
}

function sendValues(subjectVal, dateVal, descriptionVal, commentsVal) {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}:batchUpdate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({  
            requests: [
                {
                    repeatCell: {
                        range: getRange(0),
                        cell: getCell(subjectVal),
                        fields: "*"
                    }
                },
                {
                    repeatCell: {
                        range: getRange(1),
                        cell: getCell(dateVal),
                        fields: "*"
                    }
                },
                {
                    repeatCell: {
                        range: getRange(2),
                        cell: getCell(descriptionVal),
                        fields: "*"
                    }
                },
                {
                    repeatCell: {
                        range: getRange(3),
                        cell: getCell(commentsVal),
                        fields: "*"
                    }
                },
            ],
            includeSpreadsheetInResponse: true,
        })
    })
    .then(function(response) {
        alert("Done");
    })
    .catch(function(err) {
        alert("An error occured");
        console.log(err);
    });
}