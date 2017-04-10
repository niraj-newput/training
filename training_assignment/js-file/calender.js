var day = [  'Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthlength = [31,28,31,30,31,30,31,31,30,31,30,31];
var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December' ];
var nextMonth = 0;
var countMonth = 0;
var flag = 1; 
var currentDateObj;
var now ; 
function initialize () {
     now = new Date();
     now.setDate(1)
     currentDateObj = now;
}
function nextButton() {
    
    flag = 0;
    countMonth += 1;
    //console.log('next ' + nextMonth);
    currentDateObj = new Date(now.getFullYear(), now.getMonth() + countMonth, 1);
    console.log(currentDateObj.toString());
    getCalender();
}

function prevButton() {
    flag = 0;
    countMonth -= 1;
    //console.log('prev ' + prevMonth);
    currentDateObj = new Date(now.getFullYear(), now.getMonth() + countMonth, 1);
    getCalender();
}

function getCalender(){
    //console.log('entered next ');
    if(flag) {
        initialize();
    }
    var day = 1;
    var currentDate = currentDateObj.getDate();
    var month = currentDateObj.getMonth();
    var currentDay = currentDateObj.getDay();
    console.log(currentDate);
    console.log(month);
    console.log(currentDay);
    
    var leapYear = currentDateObj.getFullYear() % 4 ;
    
    if( leapYear == 0 ){
        console.log('leap : ' + leapYear);
        monthlength[1] = 29;
            console.log('leap : ' + monthlength);
    }else {
        monthlength[1] = 28;
    }
    //document.getElementById('result-month').innerHTML = monthNames[month] ;
    var str = '<table>';
    str += '<tr><td><button id="prev" onclick="prevButton()">prev</button></td>'
            + '<td colspan="5">' + monthNames[month] + ' ' + currentDateObj.getFullYear() + '</td>' 
            + '<td><button id="next" value="next" onclick="nextButton()">next</button></td></tr>';
    str += '<tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thusday</th><th>Friday</th><th>Saturday</th></tr>';
    for (var i = 0; i < 9; i++) {
        str = str + '<tr>';
        
        for (var j = 0; j <= 6; j++) { 
            str += '<td>';
            if (day <= monthlength[month] && ((i > 0 || j >= currentDay))) {
                str += day;
                day++;
            }
            str += '</td>';
        }
        str += '</tr>';
        if (day > monthlength[month]) {
            break;
        }
    }
    str +='</table>';
//document.write(str);
console.log(currentDateObj.toString());
document.getElementById('result').innerHTML = str;
}            



/*function showCalender() {
    initialize ();
    var day = 1;
    
    if(0){
        nextMonth += 1;
        console.log('next ' + nextMonth);
        currentDateObj = new Date(now.getFullYear(), now.getMonth()+nextMonth, 1);
    }else if(0) {
        now.setDate(1);
        now.setMonth(now.getMonth() - 1);
        currentDateObj = new Date(now);
    } else {
        now.setDate(1)
        currentDateObj = now;
    }
    
    var currentDate = currentDateObj.getDate();
    var month = currentDateObj.getMonth();
    var currentDay = currentDateObj.getDay();
    console.log(currentDate);
    console.log(month);
    console.log(currentDay);
    document.getElementById('result-month').innerHTML = monthNames[month] ;
    var str = '<table>';
    str += '<tr><td colspan="7">' + monthNames[month] + '</td></tr>';
    str += '<tr><th>Sunday</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thusday</th><th>Friday</th><th>Saturday</th></tr>';
    for (var i = 0; i < 9; i++) {
        str = str + '<tr>';
        
        for (var j = 0; j <= 6; j++) { 
            str += '<td>';
            if (day <= monthlength[month] && ((i > 0 || j >= currentDay))) {
                str += day;
                day++;
            }
            str += '</td>';
        }
        str += '</tr>';
        if (day > monthlength[month]) {
            break;
        }
    }
    str +='</table>';
//document.write(str);
document.getElementById('result').innerHTML = str;
}*/
