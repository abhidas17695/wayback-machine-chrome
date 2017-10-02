global_url="";
count=0;
function wbm_url(url){
    if(url.includes('web.archive.org')){
        return true;
    }else{
        return false;
    }
}

function remove_port(url){
    if(url.substr(-4)==':80/'){
        url=url.substring(0,url.length-4);
    }
    return url;
}

function remove_wbm(url){
    var pos=url.indexOf('/http');
    if(pos!=-1){
        var new_url=url.substring(pos+1);
    }else{
        var pos=url.indexOf('/www');
        var new_url=url.substring(pos+1);
    }
    new_url=remove_port(new_url);
    return new_url;
}

function alexa_url(url){
    if(url.includes('www.alexa.com')){
        return true;
    }else{
        return false;
    }
}

function whois_url(url){
    if(url.includes('www.whois.com')){
        return true;
    }else{
        return false;
    }
}

function remove_alexa(url){
    var pos=url.indexOf('/siteinfo/');
    var new_url=url.substring(pos+10);
    new_url=remove_port(new_url);
    return new_url;
}

function remove_whois(url){
    var pos=url.indexOf('/whois/');
    var new_url=url.substring(pos+7);
    new_url=remove_port(new_url);
    return new_url;
}

function save_now_function(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
	var wb_url = "https://web.archive.org/save/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url, page_url:url , method:'save' }).then(handleResponse, handleError);;	
}

function recent_capture_function(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
	var wb_url = "https://web.archive.org/web/2/";
    
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url,page_url:url, method:'recent' }, function(response) {
	});
}

function first_capture_function(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
	var wb_url = "https://web.archive.org/web/0/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url,page_url:url, method:'first' }, function(response) {
	});
}

function view_all_function(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
	var wb_url = "https://web.archive.org/web/*/";
	chrome.runtime.sendMessage({message: "openurl", wayback_url: wb_url,page_url:url, method:'viewall' }, function(response) {
	});
}

function get_url(){
    chrome.tabs.query({active: true,currentWindow:true},function(tabs){
        global_url=tabs[0].url;
    });
}

function search_term(){
    var term=document.getElementById('search_input').value;
    return(term); 
}

function social_share(eventObj){
    var parent=eventObj.target.parentNode;
    var id=parent.getAttribute('id');
        if(search_term()==""){
            var url=global_url;
        }else{
            var url=search_term();
        }
        if(alexa_url(url)){
            url=remove_alexa(url);
        }else if(whois_url(url)){
            url=remove_whois(url);
        }
        
        var open_url="";
        if(id.includes('fb')){
            open_url="https://www.facebook.com/sharer/sharer.php?u="+url;
        }else if(id.includes('twit')){
            open_url="https://twitter.com/home?status="+url;
        }else if(id.includes('gplus')){
            open_url="https://plus.google.com/share?url="+url;
        }else if(id.includes('linkedin')){
            open_url="https://www.linkedin.com/shareArticle?url="+url;
        }
        window.open(open_url, 'newwindow', 'width=800, height=280,left=0');
        
        
    
    
}

function alexa_statistics_function(eventObj){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
    var open_url="http://www.alexa.com/siteinfo/"+url;
    window.open(open_url, 'newwindow', 'width=1000, height=1000,left=0');
}

function whois_statistics_function(eventObj){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
    var open_url="https://www.whois.com/whois/"+url;
    window.open(open_url, 'newwindow', 'width=1000, height=1000,left=0');
}

function search_tweet_function(eventObj){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
    if(url.includes('http://')){
        url=url.substring(7);
    }else if(url.includes('https://')){
        url=url.substring(8);
    }
    if(url.slice(-1)=='/') url=url.substring(0,url.length-1);
    var open_url="https://twitter.com/search?q="+url;
    window.open(open_url, 'newwindow', 'width=1000, height=1000,left=0');    
}

function display_list(key_word){
    document.getElementById('suggestion-box').style.display='none';
    document.getElementById('suggestion-box').innerHTML="";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://web.archive.org/__wb/search/host?q="+key_word, true);
    xhr.onload=function(){
    console.log('Loaded');
    document.getElementById('suggestion-box').style.display='none';
    document.getElementById('suggestion-box').innerHTML="";    
        var data=JSON.parse(xhr.response);
        var n=data.hosts.length
        if(n>0 && document.getElementById('search_input').value!=''){
           document.getElementById('suggestion-box').style.display='block';
           for(var i=0;i<n;i++){
               var name=data.hosts[i].display_name;
               var li=document.createElement('li');
               var a=document.createElement('a');
               a.onclick=function(event){
                   document.getElementById('search_input').value=event.target.innerHTML;
                   document.getElementById('suggestion-box').style.display='none';
                   document.getElementById('suggestion-box').innerHTML="";
                   
               };
               a.setAttribute('role','button');
               a.innerHTML=name;
               li.appendChild(a);
               document.getElementById('suggestion-box').appendChild(li);
           }
           
        }
    };
    xhr.send(null);
}

function display_suggestions(e){
    count++;
    //console.log(count);
    document.getElementById('suggestion-box').style.display='none';
    document.getElementById('suggestion-box').innerHTML="";
    
    
//    if((len)>=2){
        //document.getElementById('suggestion-box').style.display='block';
        window.setTimeout(function(){//setTimeout is used to get the text in the text field after key has been pressed
    var len=document.getElementById('search_input').value.length;
    console.log(len,document.getElementById('search_input').value);
    if((len)>=3){
    var key_word=document.getElementById('search_input').value;
    display_list(key_word);
    }else{
        document.getElementById('suggestion-box').style.display='none';
        document.getElementById('suggestion-box').innerHTML="";
    }
        
    },0.1);

}

function about_support(){
  var myWindow = window.open("", "", "width=1000, height=1000");   // Opens a new window
  myWindow.document.write('<h2><strong>The Official Wayback Machine Extension:</strong></h2><p>In cooperation with Google Summer of Code, The Internet Archive presents The Official WayBack Machine Extension. With the power of the WayBack&nbsp;Machine, we let you go in time to see how a URL has changed and evolved through the history of the Web!</p><p><strong> Features</strong></p><ul><li><strong>Save Page Now</strong></li><ul>Allows you to instantly save the page you are currently viewing in The WayBack Machine.</ul><li><strong>Recent Version &amp; First Version</strong></li><ul>View the most recent, and the first version of a page, in the WayBack Machine.</ul><li><strong>Alexa &amp; Whois</strong></li><ul>gives analytical information about the page you are currently viewing, along with interesting facts, such as who owns it and how popular it is.</ul><li><strong>Tweets</strong></li><ul>Searches Twitter For information Regarding your current page.</ul></ul><span><br><strong>License</strong></p><p>&nbsp;Copyright Internet Archive, 2017 AGPL-3&nbsp;<br /><strong>Credit</strong></p><p>Caceres Richard<a href="https://github.com/rchrd2">&nbsp;@rchrd2<br /></a>Chinta Rakesh N&nbsp;<a href="https://github.com/rakesh-chinta">@rakesh-chinta</a><br />Das&nbsp;Abhishek <a href="http://github.com/abhidas17695">@abhidas17695</a><br />Graham Mark&nbsp;<a href="https://github.com/markjgraham">@markgraham</a><br />Benjamin Mandel&nbsp;<a href="http://github.com/BenjaminMandel">@BenjaminMandel<br /></a>Anton Shiryaev&nbsp;<a href="https://github.com/Eagle19243">@Eagle19243<br /></a>Yogesh&nbsp;Kumar <a href="https://github.com/kumarjyogesh">@kumarjyogesh&nbsp;</a>&nbsp;</p><p><strong>Support</strong></p><p>info@archive.org</p></li></ul>');
//myWindow.document.write('<h2><strong>The Official Wayback Machine Extension:</strong></h2><p>In cooperation with GSoC, The Internet Archive presents "The Official WayBack Machine Extension". With the power of the WayBack&nbsp;Machine, we let you go in time to see how a URL has changed and evolved through the history of the Web!</p><p><strong> Features</strong></p><ul><li><strong>Save Page Now</strong></li>Allows you to instantly save the page you are currently viewing in The WayBack Machine.<li><strong>Recent Version &amp; First Version</strong></li>View the most recent, and the first version of a page, in the WayBack Machine.<li><strong>Alexa &amp; Whois</strong></li>gives analytical information about the page you are currently viewing, along with interesting facts, such as who owns it and how popular it is.<li><strong>Tweets</strong></li>Searches Twitter For information Regarding your current page.</ul><p><strong>Modes</strong></p><ul><li><p>✅</p>Your page is in the WayBack Machine.</li><li><p>☓</p>Your page is not Currently in the WayBack Machine.</li><li><p>⛔</p>Your page can not be saved in the Wayback Machine.</li></ul><p><strong>License</strong></p><p>&nbsp;Copyright Internet Archive, 2017 AGPL-3&nbsp;</p><p><strong>Credit</strong></p><p>Richard Caceres, @rchrd2&nbsp;<br />Mark Graham, @markgraham&nbsp;<br />Benjamin Mandel&nbsp;<br />Kumar Yoges&nbsp;<br />Anton, @&nbsp;<br />Abhidhas, @abhidas17695&nbsp;<br />Rakesh N Chinta, @rakesh-chinta<br />Will Austin, @williamaustin3</p><p><strong>Support</strong></p><p>info@archive.org</p>');
  myWindow.focus();        
}

function support_function(){
  var final_support = "mailto:info@archive.org";
  //window.open(final_support, "", "width=500, height=400");
    //chrome.tabs.create({url:final_support});
    var myWindow = window.open("", "", "width=500, height=400");   // Opens a new window
  myWindow.document.write("<p>mailto:info@archive.org</p>");         // Some text in the new window
  //myWindow.focus();
}


function restoreSettings() {
  //count=0;
  chrome.storage.sync.get({
    
    as:false
  }, function(items) {
    
    document.getElementById('as').checked = items.as;  
      if(items.as){
          chrome.runtime.sendMessage({message: "start_as"}, function(response) {});
      }
     });
}

function saveSettings(){
    var as = document.getElementById('as').checked;
    
//    if(as){
//        chrome.runtime.sendMessage({message: "start_as"}, function(response) {});
//    }

    chrome.storage.sync.set({
    
    as: as
  });
}

function makeModal(){
    if(search_term()==""){
        var url=global_url;
    }else{
        var url=search_term();
        //var url=global_url;
    }
    if(wbm_url(url)){
        url=remove_wbm(url);
    }else if(alexa_url(url)){
        url=remove_alexa(url);
    }else if(whois_url(url)){
        url=remove_whois(url);
    }
    console.log("Making RT for "+url);
    chrome.runtime.sendMessage({message: "makemodal",rturl:url}, function(response) {
	});
    
}

function showSettings(eventObj){
    var target=eventObj.target;
    if(target.getAttribute('toggle')=='off'){
        document.getElementById('settings_btn').setAttribute('toggle','on');
    document.getElementById('settings_div').style.display="block";
    }else{
        document.getElementById('settings_btn').setAttribute('toggle','off');
        document.getElementById('settings_div').style.display="none";
    }
    
}

window.onload=get_url;
//restoreSettings();

//document.getElementById('settings_div').style.display="none";

document.getElementById('save_now').onclick = save_now_function;
document.getElementById('recent_capture').onclick = recent_capture_function;
document.getElementById('first_capture').onclick = first_capture_function;
document.getElementById('fb_share').onclick =social_share;
document.getElementById('twit_share').onclick =social_share;
document.getElementById('gplus_share').onclick =social_share;
document.getElementById('linkedin_share').onclick =social_share;
document.getElementById('alexa_statistics').onclick =alexa_statistics_function;
document.getElementById('whois_statistics').onclick =whois_statistics_function;
document.getElementById('search_tweet').onclick =search_tweet_function;
document.getElementById('about_support_button').onclick = about_support;
//document.getElementById('support_button').onclick = support_function;
document.getElementById('overview').onclick = view_all_function;
//document.getElementById('settings_btn').onclick=showSettings;
//document.getElementById('settings_save_btn').onclick=saveSettings;
document.getElementById('make_modal').onclick=makeModal;
document.getElementById('search_input').addEventListener('keydown',display_suggestions);
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.message=='urlnotfound'){
  	alert("URL not found in wayback archives!");
  }
});
