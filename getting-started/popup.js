/*
문제 
1. 언제 새로고침할 것인가??? 일단 버튼을 누르면 새로 고침이 되게 만듦
2. 왜 이클래스 영상에는 적용이 안되는가..?
   ==> 재생이 시작되어야 됨 

*/

chrome.action.onClicked.addListener(deb);
function deb(){
    alert("HI~");
}
//새로고침 누르면 현재 강의 진도에 따라 갱신..
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#Renew').addEventListener('click', function() {   
        accessVid();
    
    });
},false);

//현재 탭 정보 가져오기
  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
 
// 진도 %로 가져오기
function computeVidper() {
  var LenVideo = document.querySelectorAll("video")[0].duration;
  var CurVideo = document.querySelectorAll("video")[0].currentTime;
  var result = ((CurVideo/LenVideo)*100|0);
  return result;
}

//탭 정보를 바탕으로 %계산 및 결과 렌더링
async function accessVid(){
    let tab = await getCurrentTab();
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: computeVidper
      },
      (PercentageofV)=>{
          //렌더링
        document.getElementById('Percentage').innerText = PercentageofV[0].result+ '%';
      });
  }
   
   


