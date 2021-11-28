


//������ ����ҿ� ����
schedule = []
/*
// Search the bookmarks when entering the search keyword.
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.graph stack1').addEventListener('click', function() {   
        accessVid();
    });
},false);

//���� �� ���� ��������
  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
 
// ���� %�� ��������
function computeVidper() {
  var LenVideo = document.querySelectorAll("video")[0].duration;
  var CurVideo = document.querySelectorAll("video")[0].currentTime;
  var result = ((CurVideo/LenVideo)*100|0);
  return result;
}

//�� ������ �������� %��� �� ��� ������
async function accessVid(){
    let tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: computeVidper
      },
      (PercentageofV)=>{
          //������
          schedule[0].ctime = PercentageofV[0].result;
        //document.getElementById('Percentage').innerText = PercentageofV[0].result+ '%';
      });
  }
*/
  // Traverse the bookmark tree, and print the folder and nodes.
  function AddSch() {
    $('#schedule').empty();
    $('.graph stack1').empty();
    $('.graph stack1').append(dumpGraph());
    $('#schedule').append(dumpTreeNodes());
    //localStorage.setItem('sch',schedule);
  }

  
  function dumpGraph(){
    var span = $('<span>');
    var t_ttime=0;
    var t_ctime=0;
    for (var i=0;i<schedule.length;i++){
      t_ttime+=schedule[i].ttime;
      t_ctime+=schedule[i].ctime;
    }
    var result=((t_ctime/t_ttime)*100|0);
    result=75;
    var grap=$('<span style = "width : '+result+'%;">전체 달성률 : '+result+'%</span>');
    span.append(grap);
    return span;
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
    var span = $('<span>');
    var what=$('<div class = "box_02"><button class = "work_num_01">   +   </button></div>');
    span.append(what);
   
    var edit =  $('<table><tr><td>Name</td><td>' +
    '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
    '</td></tr></table>');

    var edit1 =  $('<table><tr><td>Name</td><td>' +
    '<input id="title"></td></tr><tr><td>URL</td><td><input id="url">' +
    '</td></tr><tr><td>예상소요시간</td><td>' +
    '<input id="expectedtime"></td></tr></table>');
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
                        obj.ttime=$('#expectedtime').val();
                        chrome.tabs.executeScript({
                          code:'var LenVideo = document.querySelectorAll("video")[0].duration;var CurVideo = document.querySelectorAll("video")[0].currentTime;(CurVideo/LenVideo)*100;'
                        },function(result){
                          obj.ctime=result;
                        });
                        //obj.ctime=0;
                        schedule.push(obj);
                        $(this).dialog('destroy');
                        window.AddSch();
                        
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
      var span = $('<span>');
      var what=$('<div class = "box_02"><button id="sch" class = "work_num_01">' +sch.title+ '</button></div>');
      span.append(what);


      var options = 
        $('<button id="editlink">Edit</button> <button id="deletelink">Delete</button>');
        var edit =  $('<table><tr><td>Name</td><td>' +
        '<input id="title1"></td></tr><tr><td>URL</td><td><input id="url1">' +
        '</td></tr></table>');
        var edit1 =  $('<table><tr><td>Name</td><td>' +
        '<input id="title1"></td></tr><tr><td>URL</td><td><input id="url1">' +
        '</td></tr><tr><td>예상소요시간</td><td>' +
        '<input id="expectedtime1"></td></tr></table>');
        // Show add and edit links when hover over.
      span.hover(function () {
       span.append(options);
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
    
  
    var li = $( '<ul>' ).append(span);
  
    return li;
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    AddSch();
  });
  