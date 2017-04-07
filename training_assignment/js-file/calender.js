var day = [  'Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthlength = [31, 28,31,30,31,30,31,31,30,31,30,31];
var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December' ];
                    var nextMonth = 0;
                    var prevMonth = 0;
                    
function showCalender() {
    var nextMonth = 0;
    var currentDateObj; 
    var now = new Date();
    var day = 1;
    document.write(document.getElementById('next').clicked==true);
    if(document.getElementById('next').clicked == true){
        nextMonth+=1;
        console.log('next ' + nextMonth);
        currentDateObj = new Date(now.getFullYear(), now.getMonth()+nextCount, 1);
    }else if(document.getElementById('prev').clicked == true) {
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
}
