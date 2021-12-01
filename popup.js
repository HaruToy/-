//������ ����ҿ� ����
schedule = []
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
        if(schedule[i].ctime<ctime)
        {schedule[i].ctime=ctime;}
        $('.graph.stack1').empty();
        $('.graph.stack1').append(dumpGraph());
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
   
    var edit =  $('<table><tr><td>Name</td><td>' +
    '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
    '</td></tr></table>');

    var edit1 =  $('<table><tr><td>Name</td><td>' +
    '<input id="title"></td></tr><tr><td>URL</td><td><input id="url" placeholder="미입력시 현재 페이지로 등록">' +
    '</td></tr></table>');
    // Show add and edit links when hover over.

                span.click(function (event) {
                  edit1.show();
                  $('#adddialog').empty().append(edit1).dialog({
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
                        edit1.hide();
                        var obj = new Object();
                        obj.title = $('#title').val();
                        obj.url=$('#url').val();
                        if(obj.url=="")obj.url=c_url;
                        obj.ttime=0;
                        console.log(obj.ttime);
                        obj.ctime=0;

                        //obj.ctime=0;
                        schedule.push(obj);
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
                });
               // options.fadeIn();

                var li = $('<ul>').append(span);
                return li;
  }


  function dumpNode(sch,idx) {
      var span = $('<div class = "box_02">');
      var what=$('<button id="sch" class = "work_num_01">' +sch.title+ '</button>');
      span.append(what);


      var options = 
        $('<button id="editlink" class="hobu"></button> <button id="deletelink" class="hobu"></button>');
        var edit =  $('<table><tr><td>Name</td><td>' +
        '<input id="title1" value="'+schedule[idx].title+'"></td></tr><tr><td>URL</td><td><input id="url1" value="'+schedule[idx].url+'">' +
        '</td></tr><tr><td>예상소요시간</td><td>' +
        '<input id="expectedtime1" value="'+String(schedule[idx].ttime)+'"></td></tr></table>');
        var edit1 =  $('<table><tr><td>Name</td><td>' +
        '<input id="title1" value="'+schedule[idx].title+'"></td></tr><tr><td>URL</td><td><input id="url1" value="'+schedule[idx].url+'">' +
        '</td></tr></table>');
        // Show add and edit links when hover over.
      span.hover(function () {
       span.append(options);
       $("#deletelink").button({
        icon:"ui-icon-trash"
      });
      $("#editlink").button({
        icon:"ui-icon-pencil"
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
                localStorage.setItem('sch',JSON.stringify(schedule));
              },
              Cancel: function () {
                $(this).dialog('destroy');
              }
            }
          }).dialog('open');
        });

        $('#editlink').click(function (event) {
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
                obj1.ttime=$('#expectedtime1').val();
                obj1.ctime=schedule[idx].ctime;
                schedule[idx]=obj1;
                console.log(schedule);
                //anchor.text(edit.val());
                options.show();
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
        });
        options.fadeIn();
      },
  
        // unhover
        function () {
          options.remove();
        }).append(span);

      what.click(function(){
        chrome.tabs.create({url: schedule[idx].url});
        
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
  