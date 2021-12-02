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
            oLables.push(val[i].title);
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
                    "rgba(230, 212, 18, 0.7",
                    "rgba(93, 201, 188, 0.5",
                    "rgba(38, 148, 137, 0.5",
                    "rgba(198, 58, 68, 0.5",
                    "rgba(246, 113, 72, 0.5",
                    "rgba(237, 223, 185, 0.5",
                    "rgba(237, 199, 121, 0.5",
                    "rgba(215, 127, 110, 0.5",
                    "rgba(115, 165, 152, 0.5",
                    "rgba(169, 188, 139, 0.5",
                    "rgba(237, 234, 215, 0.5",
                    "rgba(232, 194, 192, 0.5",
                    "rgba(147, 136, 140, 0.5",
                    "rgba(51, 52, 57, 0.5",
                    "rgba(72, 94, 108, 0.5"
                ], //그래프의 색 및 비춰지는 정도
                borderColor : 
                [
                    "rgba(230, 212, 18, 0.7",
                    "rgba(93, 201, 188, 0.7",
                    "rgba(38, 148, 137, 0.7",
                    "rgba(198, 58, 68, 0.7",
                    "rgba(246, 113, 72, 0.7",
                    "rgba(237, 223, 185, 0.7",
                    "rgba(237, 199, 121, 0.7",
                    "rgba(215, 127, 110, 0.7",
                    "rgba(115, 165, 152, 0.7",
                    "rgba(169, 188, 139, 0.7",
                    "rgba(237, 234, 215, 0.7",
                    "rgba(232, 194, 192, 0.7",
                    "rgba(147, 136, 140, 0.7",
                    "rgba(51, 52, 57, 0.7",
                    "rgba(72, 94, 108, 0.7"
                ], //그래프 주변 선의 색깔
                hoverBackgroundColor : 
                [
                    "rgba(230, 212, 18, 0.7",
                    "rgba(93, 201, 188, 0.7",
                    "rgba(38, 148, 137, 0.7",
                    "rgba(198, 58, 68, 0.7",
                    "rgba(246, 113, 72, 0.7",
                    "rgba(237, 223, 185, 0.7",
                    "rgba(237, 199, 121, 0.7",
                    "rgba(215, 127, 110, 0.7",
                    "rgba(115, 165, 152, 0.7",
                    "rgba(169, 188, 139, 0.7",
                    "rgba(237, 234, 215, 0.7",
                    "rgba(232, 194, 192, 0.7",
                    "rgba(147, 136, 140, 0.7",
                    "rgba(51, 52, 57, 0.7",
                    "rgba(72, 94, 108, 0.7"
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
        "rgba(230, 212, 18, 0.5",
        "rgba(93, 201, 188, 0.5",
        "rgba(38, 148, 137, 0.5",
        "rgba(198, 58, 68, 0.5",
        "rgba(246, 113, 72, 0.5",
        "rgba(237, 223, 185, 0.5",
        "rgba(237, 199, 121, 0.5",
        "rgba(215, 127, 110, 0.5",
        "rgba(115, 165, 152, 0.5",
        "rgba(169, 188, 139, 0.5",
        "rgba(237, 234, 215, 0.5",
        "rgba(232, 194, 192, 0.5",
        "rgba(147, 136, 140, 0.5",
        "rgba(51, 52, 57, 0.5",
        "rgba(72, 94, 108, 0.5"
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
                    "rgba(230, 212, 18, 0.7",
                    "rgba(93, 201, 188, 0.7",
                    "rgba(38, 148, 137, 0.7",
                    "rgba(198, 58, 68, 0.7",
                    "rgba(246, 113, 72, 0.7",
                    "rgba(237, 223, 185, 0.7",
                    "rgba(237, 199, 121, 0.7",
                    "rgba(215, 127, 110, 0.7",
                    "rgba(115, 165, 152, 0.7",
                    "rgba(169, 188, 139, 0.7",
                    "rgba(237, 234, 215, 0.7",
                    "rgba(232, 194, 192, 0.7",
                    "rgba(147, 136, 140, 0.7",
                    "rgba(51, 52, 57, 0.7",
                    "rgba(72, 94, 108, 0.7",
                    
                ], //그래프 주변 선의 색깔
                hoverBackgroundColor : 
                [
                    "rgba(230, 212, 18, 0.7",
                    "rgba(93, 201, 188, 0.7",
                    "rgba(38, 148, 137, 0.7",
                    "rgba(198, 58, 68, 0.7",
                    "rgba(246, 113, 72, 0.7",
                    "rgba(237, 223, 185, 0.7",
                    "rgba(237, 199, 121, 0.7",
                    "rgba(215, 127, 110, 0.7",
                    "rgba(115, 165, 152, 0.7",
                    "rgba(169, 188, 139, 0.7",
                    "rgba(237, 234, 215, 0.7",
                    "rgba(232, 194, 192, 0.7",
                    "rgba(147, 136, 140, 0.7",
                    "rgba(51, 52, 57, 0.7",
                    "rgba(72, 94, 108, 0.7",
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


    
    
// var lastchart = $('<table><tr><td>Name</td></tr></table>')+('<table><tr><td>value</td></tr></table>')+
// ('<table><tr><td>Name</td></tr></table>');
// lastchart.show();
var row01 = [];
var data00 = [] ;
var data01 = [] ;
var data03 = [] ;
var data02 = [] ;

const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);

// Adding the entire table to the body tag
document.getElementById('somebody').appendChild(table);

// Creating and adding data to first row of the table
const row_1 = document.createElement('tr');
const heading_0 = document.createElement('th');
heading_0.innerHTML = '순번';
const heading_1 = document.createElement('th');
heading_1.innerHTML = '업무 이름';
const heading_2 = document.createElement('th');
heading_2.innerHTML = '전체 시간(분)';
const heading_3 = document.createElement('th');
heading_3.innerHTML = '진행 시간(분)';

row_1.appendChild(heading_0);
row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
thead.appendChild(row_1);

for(var i=0;i<val.length;i++)
{
    var short = Math.round((val[i].ttime)/60);
    var promise = Math.round((val[i].ctime)/60);
    row01[i] = document.createElement('tr');
    data00[i] = document.createElement('td');
    data00[i].innerHTML = (i+1);
    data01[i] = document.createElement('td');
    data01[i].innerHTML = val[i].title;
    data02[i] = document.createElement('td');
    data02[i].innerHTML = short;
    data03[i] = document.createElement('td');
    data03[i].innerHTML = promise;

    row01[i].appendChild(data00[i]);
    row01[i].appendChild(data01[i]);
    row01[i].appendChild(data02[i]);
    row01[i].appendChild(data03[i]);
    tbody.appendChild(row01[i]);

}


// // Creating and adding data to second row of the table
// const row_2 = document.createElement('tr');
// const data_1 = document.createElement('td');
// data_1.innerHTML = '1.';
// const data_2 = document.createElement('td');
// data_2.innerHTML = 'James Clerk';
// const data_3 = document.createElement('td');
// data_3.innerHTML = 'Netflix';

// row_2.appendChild(data_1);
// row_2.appendChild(data_2);
// row_2.appendChild(data_3);
// tbody.appendChild(row_2);


// // Creating and adding data to third row of the table
// const row_3 = document.createElement('tr');
// const row_3_data_1 = document.createElement('td');
// row_3_data_1.innerHTML = "2.";
// const row_3_data_2 = document.createElement('td');
// row_3_data_2.innerHTML = "Adam White";
// const row_3_data_3 = document.createElement('td');
// row_3_data_3.innerHTML = "Microsoft";

// row_3.appendChild(row_3_data_1);
// row_3.appendChild(row_3_data_2);
// row_3.appendChild(row_3_data_3);
// tbody.appendChild(row_3);

// const row_4 = document.createElement('tr');
// const row_4_data_1 = document.createElement('td');
// row_4_data_1.innerHTML = "2.";
// const row_4_data_2 = document.createElement('td');
// row_4_data_2.innerHTML = "Adam White";
// const row_4_data_3 = document.createElement('td');
// row_4_data_3.innerHTML = "Microsoft";

// row_4.appendChild(row_4_data_1);
// row_4.appendChild(row_4_data_2);
// row_4.appendChild(row_4_data_3);
// tbody.appendChild(row_4);








  });

