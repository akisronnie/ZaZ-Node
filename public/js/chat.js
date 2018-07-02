function printTime() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    if (h<10) h="0"+h;
    if (m<10) m="0"+m;
    if (s<10) s="0"+s;
    document.getElementById('clock').innerHTML=" "+h+":"+m+":"+s;
   }
   setInterval(printTime, 1000);


   