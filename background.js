var timer;

function setTimer(sttimeInsec,temp,schedule){
    timer=setInterval(function (){
        let cttime = new Date().getTime();
        let cttimeInsec = Math.round(cttime / 1000);
       
        ptime=cttimeInsec-sttimeInsec+temp;
        
        let hour=parseInt(ptime/3600);
        let min =parseInt((ptime%3600)/60);
        let sec=ptime%60;
        schedule[idx].ctime=ptime;
        var tagName = $(this).prop('tagName');
        localStorage.setItem('sch',JSON.stringify(schedule));
        console.log(`ptime : ${ptime}`);
        console.log(`timer : ${timer}`);
      },1000);
}

function stopTimer(){
    clearInterval(timer);
}