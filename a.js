var pieLables = [];
var oLables =new Array();
var call = []; //숫자 배열 넣는 것에 문제가 발생한다. 숫자는 문자로 변환이 필요할듯
var tohun= new Array();
document.addEventListener('DOMContentLoaded', function () {
    var val;
    if(localStorage.sch!=null)
    {
      val=JSON.parse(localStorage.sch);
    }
    if(val)
    {
        var tt=0;
        for(var i=0;i<val.length;i++)
        { 
            pieLables.push(val[i].title);
            oLables.push(val[i].title)
            var result=Math.round((val[i].ctime/val[i].ttime)*100);
            call.push(result);
            tt=tt+val[i].ttime;
        }
        oLables.push("미완료");
        var rest=0;
        for(var i=0;i<val.length;i++){
            var result=Math.round((val[i].ctime/tt)*100);
            tohun.push(result);
            rest=rest+result;
        }
        tohun.push(100-rest);
    }
    else{
      console.log('Nothing');
    }
    var myChart = document.getElementById('myChart').getContext('2d');

    var massPopChart = new Chart(myChart,{
        type : 'bar', //bar - 수직 막대, horizontalBar - 수평 막대, pie, line, doughnut, radar, polarArea
        data : {
            labels : pieLables, //가로 항목
             datasets : [
                {
                label : '각 업무별 달성률(%)', //보여질 라벨
                data : call,
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
                steppedLine : true, // true면 계단 형식으로 모양을 바꿔준다. 
            }
        ]
        },
        options : {
            maintainAspectRatio : false,
            scales: {
                yAxes: [{
                    ticks: {
                        max:100,
                        stepSize : 6,
                        fontSize : 14,
                    }
                }]
            }
        }
    });
    
    
    
    var pieData = [4,8,12,16,20,24,2,14];
    
    var pieColors = [
        "rgba(39, 80, 76, 0.5",
        "rgba(40, 12, 80, 0.5",
        "rgba(25, 30, 90, 0.5",
        "rgba(10, 90, 20, 0.5",
        "rgba(80, 50, 30, 0.5",
        "rgba(70, 80, 40, 0.5",
        "rgba(39, 80, 76, 0.5",
        "rgba(40, 12, 80, 0.5",
        "rgba(25, 30, 90, 0.5"
    ];
    var hi=['a','b','c']
    var ho=[1,95,0]
    const myChart3 = document.getElementById('myChart3').getContext('2d');
    const massPopChart3 = new Chart(myChart3,{
        type : 'doughnut', //bar - 수직 막대, horizontalBar - 수평 막대, pie, line, doughnut, radar, polarArea
        data : {
            labels :oLables, //가로 항목
             datasets : [
                {
                label : '오늘의 업무 그래프(%)', //보여질 라벨
                data : tohun,
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


  });

