//������ ����ҿ� ����
schedule = []
let timer=null;
let ptime=null;
var c_url;
function Upt(){
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    var tab=tabs[0];
    url = tabs[0].url;
    UpdateCT(url);
  });
}

function UpdateCT(url){
  c_url=url;
 // console.log(c_url);
  chrome.tabs.executeScript({
    code:'document.querySelectorAll("video")[0].currentTime.toString()+" "+document.querySelectorAll("video")[0].duration.toString()'
  },function(result){
      var vid_info=result.toString().split(" ");
      if(result==null)return;
      var ttime=parseFloat(vid_info[1]);
      var ctime=parseFloat(vid_info[0]);
    for(var i=0;i<schedule.length;i++){
      if(schedule[i].url==url){
        schedule[i].ttime=ttime;
        if(schedule[i].ctime<=ctime)
        {schedule[i].ctime=ctime;}
        $('.graph.stack1').empty();
        $('.graph.stack1').append(dumpGraph());
        localStorage.setItem('sch',JSON.stringify(schedule));
      }
      else{
        //for debug        
      }
    }
  });
  $('.graph.stack1').empty();
  $('.graph.stack1').append(dumpGraph());
}



  // Traverse the bookmark tree, and print the folder and nodes.
  function AddSch() {
    Upt();
    $('#schedule').empty();
    $('#schedule').append(dumpTreeNodes());
    
    
  }

  
  function dumpGraph(){
    var t_ttime=0;
    var t_ctime=0;
    for (var i=0;i<schedule.length;i++){
      t_ttime+=schedule[i].ttime;
      t_ctime+=schedule[i].ctime;
    }
    if(t_ttime==0){
      result=0;
    }
    else{
    var result=((t_ctime/t_ttime)*100|0);
    }
    //result=75;
    var grap=$('<span style = "width : '+result+'%;">'+result+'%</span>');
    return grap;
  }

  function dumpTreeNodes() {
    var list = $('<ul>');
    for (var i = 0; i < schedule.length; i++) {
      list.append(dumpNode(schedule[i],i));
    }
    list.append(dumpNewNode());
    return list;
  }

  function dumpNewNode(){
    var span = $('<div>');
    var what=$('<div class = "box_02"><button class = "work_num_01">   +   </button></div>');
    span.append(what);
   
    var edit =  $('');
    var pedit =  $('<table><tr><td>Name</td><td>' +
    '<input id="title10"></td></tr><tr><td>예상 소요 시간(분)</td><td><input id="totime">' +
    '</td></tr></table>');
    var edit1 =  $('<table><tr><td>Name</td><td>' +
    '<input id="title"></td></tr><tr><td>URL</td><td><input id="url" placeholder="미입력시 현재 페이지로 등록">' +
    '</td></tr></table>');
    // Show add and edit links when hover over.

                span.click(function (event) {
                  edit.show();
                  $('#adddialog').empty().append(edit).dialog({
                    autoOpen: false,
                    closeOnEscape: true,
                    title: 'Add New Schedule',
                    modal: true,
                    show: 'slide',
                    position: {
                      my: "left",
                      at: "center",
                      of: event.target.parentElement.parentElement
                    },
                    buttons: {
                      'Video': function () {
                        edit.hide();
                        edit1.show();
                        $('#vdialog').empty().append(edit1).dialog({
                          autoOpen: false,
                          closeOnEscape: true,
                          title: 'Add New Schedule',
                          modal: true,
                          show: 'slide',
                          position: {
                            my: "left",
                            at: "center",
                            of: event.target.parentElement.parentElement
                          },
                          buttons: {
                            'Add': function () {
                              edit1.show();
                              var obj = new Object();
                              obj.title = $('#title').val();
                              obj.url=$('#url').val();
                              if(obj.url=="")obj.url=c_url;
                              obj.ttime=0;
                              console.log(obj.ttime);
                              obj.ctime=0;
      
                              //obj.ctime=0;
                              schedule.push(obj);
                              edit1.hide();
                              $(this).dialog('destroy');
                              window.AddSch();
                              localStorage.setItem('sch',JSON.stringify(schedule));
                            },
                            'Close': function () {
                              edit1.hide();
                              $(this).dialog('destroy');
                            }
                          }
                        }).dialog('open');
                        $(this).dialog('destroy');
                        window.AddSch();
                        localStorage.setItem('sch',JSON.stringify(schedule));
                      },
                      'Program': function () {
                        edit.hide();
                        pedit.show();
                        $('#pdialog').empty().append(pedit).dialog({
                          autoOpen: false,
                          closeOnEscape: true,
                          title: 'Add New Schedule',
                          modal: true,
                          show: 'slide',
                          position: {
                            my: "left",
                            at: "center",
                            of: event.target.parentElement.parentElement
                          },
                          buttons: {
                            'Add': function () {
                              pedit.hide();
                              var obj = new Object();
                              obj.title = $('#title10').val();
                              obj.url="";
                              obj.ttime=parseInt($('#totime').val())*60;
                              console.log(obj.ttime);
                              obj.ctime=0;
      
                              //obj.ctime=0;
                              schedule.push(obj);
                              edit1.hide();
                             
                              $(this).dialog('destroy');
                              window.AddSch();
                              localStorage.setItem('sch',JSON.stringify(schedule));
                            },
                            'Close': function () {
                              pedit.hide();
      
                              $(this).dialog('destroy');
                            }
                          }
                        }).dialog('open');
                        $(this).dialog('destroy');
                        window.AddSch();
                      }
                    }
                  }).dialog('open');
                });
               // options.fadeIn();

                var li = $('<ul>').append(span);
                return li;
  }


  function dumpNode(sch,idx) {
      var span = $('<div class = "box_02">');
      var what=$('<button id="sch" class = "work_num_01">' +sch.title+ '</button>');
      var hiper;
      if(schedule[idx].ttime==0){
        hiper=0;
      }else{
        hiper=Math.round((schedule[idx].ctime/schedule[idx].ttime)*100);
      }
      var curper=$('<span class=per>'+ hiper +' %</span>');
      var ct=Math.floor(schedule[idx].ctime/3600);
      var h=ct;
      ct=schedule[idx].ctime%3600;
      var m=Math.floor(ct/60);
      var s=ct%60;
      var whattime=$('<span class=time>'+h+'h '+m+'m '+s+'s'+'</span>');
      span.append(what);
      if(schedule[idx].url=="")
      {span.append(whattime);}
     else{
       span.append(curper);
     }
      var options1 = 
       $('<span id=button-list><button id="starttime" class="hobu"></button> <button id="stoptime" class="hobu"></button>'
        );
        var options2 = 
        $('<span id=button-list><button id="editlink" class="hobu"></button> <button id="deletelink" class="hobu"></button></span>'
         );
        var pedit =  $('<table><tr><td>Name</td><td>' +
        '<input id="title11"value="'+schedule[idx].title+'"></td></tr><tr><td>예상 소요 시간(분)</td><td><input id="totime11" value="'+schedule[idx].ttime/60+'">' +
        '</td></tr></table>');
        var edit1 =  $('<table><tr><td>Name</td><td>' +
        '<input id="title1" value="'+schedule[idx].title+'"></td></tr><tr><td>URL</td><td><input id="url1" value="'+schedule[idx].url+'">' +
        '</td></tr></table>');
        // Show add and edit links when hover over.
      span.hover(function () {
       
       if(schedule[idx].url=="")
       {whattime.remove();
        span.append(options1);
        span.append(options2);
      }
       else{
        curper.remove();
        span.append(options2);
       }
       $("#deletelink").button({
        icon:"ui-icon-trash"
      });
      $("#editlink").button({
        icon:"ui-icon-pencil"
      });
      $("#starttime").button({
        icon:"ui-icon-play"
      });
      $("#stoptime").button({
        icon: "ui-icon-pause"
      });
        $('#deletelink').click(function (event) {
          console.log(event)
          $('#deletedialog').empty().dialog({
            autoOpen: false,
            closeOnEscape: true,
            title: 'Confirm Deletion',
            modal: true,
            show: 'slide',
            position: {
              my: "left",
              at: "center",
              of: event.target.parentElement.parentElement
            },
            buttons: {
              'Yes, Delete It!': function () {
                schedule.splice(idx,1);
                span.parent().remove();
                $(this).dialog('destroy');
                window.AddSch();
                localStorage.setItem('sch',JSON.stringify(schedule));
              },
              Cancel: function () {
                $(this).dialog('destroy');
              }
            }
          }).dialog('open');
        });

        $('#editlink').click(function (event) {
          if(schedule[idx].url=="")//program
          {
            pedit.show();
          //edit.val(anchor.text());
          $('#editdialog').empty().append(pedit).dialog({
            autoOpen: false,
            closeOnEscape: true,
            title: 'Edit Title',
            modal: true,
            show: 'fade',
            position: {
              my: "left",
              at: "center",
              of: event.target.parentElement.parentElement
            },
            buttons: {
              'Save': function () {
                edit1.hide();
                var obj1 = new Object();
                obj1.title = $('#title11').val();
                  obj1.ttime=$('#totime11').val()*60;
                  obj1.url=""
                
                obj1.ctime=schedule[idx].ctime;
                schedule[idx]=obj1;
                console.log(schedule);
                //anchor.text(edit.val());
                $(this).dialog('destroy');
                window.AddSch();
                localStorage.setItem('sch',JSON.stringify(schedule));
              },
              'Cancel': function () {
                pedit.hide();
                $(this).dialog('destroy');
              }
            }
          }).dialog('open');
          }
          else{
          edit1.show();
          //edit.val(anchor.text());
          $('#editdialog').empty().append(edit1).dialog({
            autoOpen: false,
            closeOnEscape: true,
            title: 'Edit Title',
            modal: true,
            show: 'fade',
            position: {
              my: "left",
              at: "center",
              of: event.target.parentElement.parentElement
            },
            buttons: {
              'Save': function () {
                edit1.hide();
                var obj1 = new Object();
                obj1.title = $('#title1').val();
                obj1.url=$('#url1').val();
                obj1.ttime=schedule[idx].ttime;
                obj1.ctime=schedule[idx].ctime;
                schedule[idx]=obj1;
                console.log(schedule);
                //anchor.text(edit.val());

                $(this).dialog('destroy');
                window.AddSch();
                localStorage.setItem('sch',JSON.stringify(schedule));
              },
              'Cancel': function () {
                edit1.hide();
                $(this).dialog('destroy');
              }
            }
            
          }).dialog('open');
        }
        });
        (function(){
          $('#starttime').click(function (event){
            let cnt=0;
            cnt++;
            let sttime = new Date().getTime();
            let sttimeInsec = Math.round(sttime / 1000);
            let temp=schedule[idx].ctime;
            timer=setInterval(function (){
                let cttime = new Date().getTime();
                let cttimeInsec = Math.round(cttime / 1000);
               
                ptime=cttimeInsec-sttimeInsec+temp;
                
                let hour=parseInt(ptime/3600);
                let min =parseInt((ptime%3600)/60);
                let sec=ptime%60;
                schedule[idx].ctime=ptime;
                var tagName = $(this).prop('tagName');
                window.AddSch();
                localStorage.setItem('sch',JSON.stringify(schedule));

                 //$(".time").eq(idx).text(String(hour)+' : '+String(min)+' : '+String(sec));
                
                //$(this).parent().children(".time")
               // $(this).parent().children(".time").text(String(hour)+' : '+String(min)+' : '+String(sec));
                //$(this).parentElement(".time").text(String(hour)+' : '+String(min)+' : '+String(sec));
                console.log(`ptime : ${ptime}`);
                console.log(`timer : ${timer}`);
              },1000);
            });
          $('#stoptime').click(function (event){
              console.log(`timer : ${timer}`);
              clearInterval(timer);
              console.log(`ptimer : ${ptime}`);
          });
  } )()

      },
  
        // unhover
        function () {
          if(schedule[idx].url=="")
          {span.append(whattime);
            options1.remove();
           options2.remove();
         }
          else{
            span.append(curper);
            options2.remove();
          }
        }).append(span);

      what.click(function(){
        if(schedule[idx].url!=""){
          chrome.tabs.create({
            url: schedule[idx].url+'&t='+String(schedule[idx].ctime)+'s'});
        }
      }).append(what);
  //+String(schedule[i].ctime)
    var li = $( '<ul>' ).append(span);
  
    return li;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    let day = today.getDay();  // 요일
    var val;
    if(localStorage.sch!=null)
    {
      val=JSON.parse(localStorage.sch);
    }
    if(val)
    {schedule=val;}
    else{
      console.log('Nothing');
    }
    AddSch();
  });
  