function createEmployeeRecord(empInfo) {

    let regEmp = Object.assign({}, empInfo)
        regEmp.firstName = empInfo[0];
        regEmp.familyName = empInfo[1];
        regEmp.title = empInfo[2];
        regEmp.payPerHour = empInfo[3];
        regEmp.timeInEvents = [];
        regEmp.timeOutEvents = [];

    return regEmp
}


function createEmployeeRecords(arrayOfArrays) {
    let newArray = [];
    for (let array of arrayOfArrays) {
        newArray.push(createEmployeeRecord(array))
    }
    return newArray;
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    });
    return this
}

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(11, 15)),
        date: dateStamp.slice(0, 10)
    });
    return this
}

function hoursWorkedOnDate(date) {

    let timeIn = this.timeInEvents.find(function (event) {
        return event.date === date;
    })

    let timeOut = this.timeOutEvents.find(function(event) {
        return event.date === date;
    })

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    let pay = this.payPerHour
    console.log(hoursWorked)
    console.log(pay)
    return hoursWorked * pay
}

// function allWagesFor(empRec) {
//     let totalWages = [];

//         for (let i = 0; i < empRec.timeInEvents.length; i++) {
//             let date = empRec.timeInEvents[i].date;
//             let wage = wagesEarnedOnDate(empRec, date);
//             console.log(wage)
//             totalWages.push(wage)
//           }
//     const reducer = (previousValue, currentValue) => previousValue + currentValue
//     return totalWages.reduce(reducer)
// }

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function findEmployeeByFirstName(srcArray, firstName) {
        for (let record of srcArray) {
            if (record.firstName === firstName) {
                return record
            }
        }
}

function calculatePayroll(arrayOfRecords) {

    let payroll = []

        for (let empRec of arrayOfRecords) {
            let pay = allWagesFor.call(empRec);
            payroll.push(pay)
        }


    const reducer = (previousValue, currentValue) => previousValue + currentValue
    return payroll.reduce(reducer)

}

function whatIsThis() {
    console.log(this)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

