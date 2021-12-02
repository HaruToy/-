var pieLables = [];
var call = []; //숫자 배열 넣는 것에 문제가 발생한다. 숫자는 문자로 변환이 필요할듯
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
    {
        for(var i=0;i<val.length;i++)
        { 
            pieLables.push(val[i].title);
            call.push(val[i].ttime);
        }
        document.write(pieLables); // sdf라는 이름으로 6%를 (전체 : 2시간 30분, 본 시간 : 10분)을 했는데 결과로 sdf0가 나옴
        document.write(call);
    
    
    }
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
            steppedLine : false, // true면 계단 형식으로 모양을 바꿔준다. 
        }
    ]
    },
    options : {
        maintainAspectRatio : false,
        
    }
});





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
            data : call,
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

