function save_now_function(){
	var wb_url = "https://web.archive.org/save/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, method:'save' }, function(response) {
	});
}

function recent_capture_function(){
	var wb_url = "https://web.archive.org/web/2/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, method:'recent' }, function(response) {
	});
}

function first_capture_function(){
	var wb_url = "https://web.archive.org/web/0/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, method:'first' }, function(response) {
	});
}

function view_all_function(){
	var pattern = /https:\/\/web\.archive\.org\/web\/(.+?)\//g;
	url = document.location.href.replace(pattern, "");
	open_url = "https://web.archive.org/web/*/"+encodeURI(url);
	document.location.href = open_url;
}

function pasteSelection() {
    
    chrome.tabs.query({active: true,currentWindow: true}, function (tabs) {

    

            
            chrome.tabs.sendMessage(tabs[0].id,{method: "getSelection"});
        
    });
}

chrome.runtime.onMessage.addListener(function (response, sender) {
      var xhr = new XMLHttpRequest();
  
  xhr.open("GET","https://pub.orcid.org/v2.0/search?q="+response.text, true);
  
  xhr.onload = function() {
      var dispArea=document.getElementById('disp');
      dispArea.innerHTML="Searching...";

    
var xmlDoc = xhr.responseXML;
    
    function nsResolver(prefix) {
  var ns = {
    'search' : 'http://www.orcid.org/ns/search',
    'common': 'http://www.orcid.org/ns/common'
  };
  return ns[prefix] || null;
}
      
      
      
      

      
      
      
var eventNodeList = xmlDoc.evaluate('/search:search//search:result/common:orcid-identifier/common:path',xmlDoc, nsResolver, XPathResult.ANY_TYPE, null );  
      var idArr=[];


var currentEvent = eventNodeList.iterateNext();  
while (currentEvent) {  

    
    
    
    
    
 idArr.push(currentEvent.innerHTML);
  
  currentEvent = eventNodeList.iterateNext();  
}

if(idArr.length!=0){
      var list=document.createElement('ul');
      var len=idArr.length;
      if(len>10){
          len=10;
      }
        for(var i=0;i<len;i++){
            var listElem=document.createElement('li');
            var url="http://orcid.org/"+idArr[i];
            listElem.innerHTML="<a href='#' id="+url+">"+ idArr[i]+"</a>";
            listElem.addEventListener('click',function(event){
                    var id=event.target.id;
                    chrome.tabs.create({url:id});
                })
            list.appendChild(listElem);
            
        }
        console.log(list);
        dispArea.innerHTML="";
        dispArea.appendChild(list);
    }else{
      dispArea.innerHTML="Not found";
  }

      
      
      
      
      
      
      
      
      
      
      
      
      
      
  };
  xhr.send(null);
    
    
});


document.getElementById('save_now').onclick = save_now_function;
document.getElementById('recent_capture').onclick = recent_capture_function;
document.getElementById('first_capture').onclick = first_capture_function;

window.onload=pasteSelection;