/*
���� 
1. ���� ���ΰ�ħ�� ���ΰ�??? �ϴ� ��ư�� ������ ���� ��ħ�� �ǰ� ����
2. �� ��Ŭ���� ���󿡴� ������ �ȵǴ°�..?
   ==> ����� ���۵Ǿ�� �� 

*/

chrome.action.onClicked.addListener(deb);
function deb(){
    alert("HI~");
}
//���ΰ�ħ ������ ���� ���� ������ ���� ����..
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#Renew').addEventListener('click', function() {   
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
        document.getElementById('Percentage').innerText = PercentageofV[0].result+ '%';
      });
  }
   
   


