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
      var whattime=$('<span class=time>00 : 00 : 00</span>');
      span.append(what);
      span.append(whattime);
     
      var options = 
       $(
        '<span id=button-list><button id="starttime" class="hobu"></button> <button id="stoptime" class="hobu"></button>'+
        '<button id="editlink" class="hobu"></button> <button id="deletelink" class="hobu"></button></span>'
        );
        var pedit =  $('<table><tr><td>Name</td><td>' +
        '<input id="title11"value="'+schedule[idx].title+'"></td></tr><tr><td>예상 소요 시간(분)</td><td><input id="totime11" value="'+schedule[idx].ttime/60+'">' +
        '</td></tr></table>');
        var edit1 =  $('<table><tr><td>Name</td><td>' +
        '<input id="title1" value="'+schedule[idx].title+'"></td></tr><tr><td>URL</td><td><input id="url1" value="'+schedule[idx].url+'">' +
        '</td></tr></table>');
        // Show add and edit links when hover over.
      span.hover(function () {
       span.append(options);
       whattime.remove();
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
                localStorage.setItem('sch',JSON.stringify(schedule));
              },
              Cancel: function () {
                $(this).dialog('destroy');
              }
            }
          }).dialog('open');
        });

        $('#editlink').click(function (event) {
          if(schedule[idx].url=="")
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
                obj1.url=""
                obj1.ttime=$('#totime11').val()*60;
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
        }
        });
        var timer;
        let ptime;
        $('#starttime').click(function (event){
         
         let sttime = new Date().getTime();
         let sttimeInsec = Math.round(sttime / 1000);
          timer=setInterval(function (){
            let cttime = new Date().getTime();
            let cttimeInsec = Math.round(cttime / 1000);
            ptime = cttimeInsec-sttimeInsec;
            let hour=parseInt(ptime/3600);
            let min =parseInt((ptime%3600)/60);
            let sec=ptime%60;
            
            var tagName = $(this).prop('tagName');
            console.log(tagName);
           // $(this).parent().children(".time")
            //$(this).parent().children(".time").text(String(hour)+' : '+String(min)+' : '+String(sec));
          },1000);
        });

        $('#stoptime').click(function (event){
            console.log(timer);
            clearInterval(timer);
            });

        options.fadeIn();
      },
  
        // unhover
        function () {
          options.remove();
          span.append(whattime);
        }).append(span);

      what.click(function(){
        if(schedule[idx].url!=""){
          chrome.tabs.create({
            url: schedule[idx].url});
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
  
  // var mychart = $('#myChart');
// var myLineChart = new Chart(mychart, { type : 'line', data : {labels:['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
//  datasets : [{label : '2019',
//                data : [10,8,6,5,12,7,16,7,6,10,12,10]
//            }]
//        } 
// });
/*
const myChartOne = document.getElementById('mychatOne').getcontext('2d')
const barChart = new Chart(myChartOne,{
    type : 'bar', // pie, line, doughnut, poLarArea
    data : {
        labels : ['학원', '연구원', '출판사', '미디어사', '위니브'],
        datasets : [{
            label : '바울랩 매출액',
            data : [
                10, 100, 100, 200, 1000
            ]
        }]
    }
}) */





var myChart = document.getElementById('myChart').getContext('2d');

var massPopChart = new Chart(myChart,{
    type : 'bar', //bar - 수직 막대, horizontalBar - 수평 막대, pie, line, doughnut, radar, polarArea
    data : {
        labels : ['리눅스 과제', '캡스톤 과제', '데이터베이스 과제', '그래픽스 과제', '리눅스 강의', '캡스톤 강의', '데이터베이스 강의', '그래픽스 강의'], //가로 항목
         datasets : [
            {
            label : '각 업무별 달성률(%)', //보여질 라벨
            data : [
                20, 50, 30, 40, 80, 2,27, 95 //안에 넣을 데이터 값(높이 값)

            ],
            backgroundColor : 
            [
                "rgba(39, 80, 76, 0.5",
                "rgba(40, 12, 80, 0.5",
                "rgba(25, 30, 90, 0.5",
                "rgba(10, 90, 20, 0.5",
                "rgba(80, 50, 30, 0.5",
                "rgba(70, 80, 40, 0.5",
                "rgba(39, 80, 76, 0.5",
                "rgba(40, 12, 80, 0.5",
                "rgba(25, 30, 90, 0.5"


            ], //그래프의 색 및 비춰지는 정도
            borderColor : 
            [
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7",
                "rgba(10, 90, 20, 0.7",
                "rgba(80, 50, 30, 0.7",
                "rgba(70, 80, 40, 0.7",
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7"
                
                
            ], //그래프 주변 선의 색깔
            hoverBackgroundColor : 
            [
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7",
                "rgba(10, 90, 20, 0.7",
                "rgba(80, 50, 30, 0.7",
                "rgba(70, 80, 40, 0.7",
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7"
                
            ],

            borderWidth : 0, //테두리 선 크기 
            pointRadius : 4, //각 점의 크기를 결정한다
            showLine : true, //line 보여주는지 여부
            steppedLine : false, // true면 계단 형식으로 모양을 바꿔준다. 
        }
    ]
    },
    options : {
        maintainAspectRatio : false,
        
    }
});

var pieLables = ['리눅스 과제', '캡스톤 과제', '데이터베이스 과제', '그래픽스 과제', '리눅스 강의', '캡스톤 강의', '데이터베이스 강의', '그래픽스 강의'];

var pieData = [4,8,12,16,20,24,2,14];

var pieColors = [
    "rgba(153,21,0,0.5)",
    "rgba(200,121,30,0.5)",
    "rgba(53,121,100,0.5)",
    "rgba(103,121,20,0.5)",
    "rgba(253,21,30,0.5)",
    "rgba(83,51,32,0.5)",
    "rgba(85,82,79,0.5)",
    "rgba(12,121,231,0.5)",
];

const myChart3 = document.getElementById('myChart3').getContext('2d');
const massPopChart3 = new Chart(myChart3,{
    type : 'pie', //bar - 수직 막대, horizontalBar - 수평 막대, pie, line, doughnut, radar, polarArea
    data : {
        labels : pieLables, //가로 항목
         datasets : [
            {
            label : '오늘의 업무 그래프(%)', //보여질 라벨
            data : pieData,
            backgroundColor : pieColors, 
            borderColor : 
            [
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7",
                "rgba(10, 90, 20, 0.7",
                "rgba(80, 50, 30, 0.7",
                "rgba(70, 80, 40, 0.7",
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7",
                "rgba(10, 90, 20, 0.7",
                "rgba(80, 50, 30, 0.7",
                "rgba(70, 80, 40, 0.7",
                
            ], //그래프 주변 선의 색깔
            hoverBackgroundColor : 
            [
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7",
                "rgba(10, 90, 20, 0.7",
                "rgba(80, 50, 30, 0.7",
                "rgba(70, 80, 40, 0.7",
                "rgba(39, 80, 76, 0.7",
                "rgba(40, 12, 80, 0.7",
                "rgba(25, 30, 90, 0.7",
                "rgba(10, 90, 20, 0.7",
                "rgba(80, 50, 30, 0.7",
                "rgba(70, 80, 40, 0.7",
            ],

            borderWidth : 0.2, //테두리 선 크기 
            fill : true, // true면 안에 색깔도 보이게 하는 것, false면 점을 선으로 이은 것만 보인다.
            showLine : true, //line 보여주는지 여부
            spanGaps : true, // 만약 값에 NULL이 있고 이후 값이 나오더라도 true면 나눠진 NUll 부분을 이어준다.
        }
    ]
    },
    options : {
        maintainAspectRatio : false,
        
    }
});

