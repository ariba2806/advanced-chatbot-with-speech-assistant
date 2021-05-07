//var $messages = $('.messages-content');



$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://`+window.location.hostname+`:`+window.location.port+`/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/admin-panel"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://`+window.location.hostname+`:`+window.location.port+`/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}
function validate()
{
var username=document.getElementById("username").value;
var password=document.getElementById("password").value;
if(username=="admin"&& password=="user")
{
    alert("login succesfully");
    window.location.href='http://'+window.location.hostname+':'+window.location.port+'/admin-panel';
    return false;

}
else
{
    alert("login failed");
}


}

var messages = document.querySelectorAll('.messages-content');
var serverResponse = "wala";
var messag = document.querySelector('.messages-content');


var suggession;
//speech recognition
try {
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
}
catch(e) {
  console.error(e);
 // $('.no-browser-support').show();
  document.querySelector('.no-browser-support').style.display = 'block';
}

document.querySelector('#start-record-btn').addEventListener('click', function(event) {
  recognition.start();
});
//translate recognized speech to text and insert message
recognition.onresult = (event) => {
  const speechToText = event.results[0][0].transcript;
 document.getElementById("MSG").value= speechToText;
  //console.log(speechToText)
  insertMessage();
}

$("#minmax").click(function(){
    if($(this).html() == "-"){
        $(this).html("+");
    }
    else{
        $(this).html("-");
    }
    $("#thisbox").slideToggle();
});
$("#button").click(function(){
    if($(this).html() == "-"){
        $(this).html("+");
    }
    else{
        $(this).html("-");
    }
    $("#box").slideToggle();
});
function mini() {
  document.getElementById('chartdiv').style.height = '70px';
 document.getElementById('mymsg').style.display = "none";

document.getElementById('chartdiv').style.top = "92%";
 document.getElementById('close').style.display = "none";
 document.getElementById('open').style.display = "block";
 

}
function max() {
  document.getElementById('chartdiv').style.height = '97%';
  document.getElementById('chartdiv').style.top = "49%";
document.getElementById('mymsg').style.display = "block";
//document.getElementById('chartdiv').style.margin = "70px 0px 10px 0px";
document.getElementById('open').style.display = "none";
document.getElementById('close').style.display = "block";
}




//append the question user asked to the UI
function listendom(no){
  console.log(no);
  //console.log(document.getElementById(no))
document.getElementById("MSG").value= no.innerHTML;
  insertMessage();
}
//default first/welcome message
window.addEventListener('load',(event)=>{
  mini();
//alert("this is the hostname "+window.location.port);
//http://127.0.0.1:3000/
//127.0.0.1
   setTimeout(function() {
    //myFunction();
    //if message empty
  // $('<div class="message loading new"><figure class="avatar"><img src="https://tse3.mm.bing.net/th?id=OIP.ZaVWrkAV6pfRMAHiY-MqhQHaHi&pid=Api&P=0&w=300&h=300" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  let xyz=document.createElement('div');
 xyz.classList.add("message");
 xyz.classList.add("loading");
 xyz.classList.add("new");
  let abcd=document.createElement('figure');
  abcd.classList.add("avatar");
 let image=document.createElement('img');
 image.src="/images/bott.jpg";
 abcd.appendChild(image);
  xyz.appendChild(abcd);
  let op=document.createElement('span');
  xyz.appendChild(op);

  document.querySelector('.messages-content').appendChild(xyz);
 scroll();
//if message not empty insert the response
  setTimeout(function() {

   document.querySelector('.message.loading').remove();
  //  $('<div class="message new"><figure class="avatar"><img src="https://tse3.mm.bing.net/th?id=OIP.ZaVWrkAV6pfRMAHiY-MqhQHaHi&pid=Api&P=0&w=300&h=300" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
 let xyzi=document.createElement('div');
  xyzi.classList.add("message");
  xyzi.classList.add("new");
  
  let abcdi=document.createElement('figure');
  abcdi.classList.add("avatar");
  let imagei=document.createElement('img');
  imagei.src="/images/bott.jpg";
 abcdi.appendChild(imagei);
 xyzi.appendChild(abcdi);
  var textnodei=document.createTextNode("Worried about IT related issues? Your one stop solution to daily life technical issues is here . This is a customer support IT chatbot !! Please type your query here");
  var imagenodei=document.createElement('img');
  imagenodei.src="/images/man.png";
  imagenodei.classList.add('jsl');
  var newline=document.createElement('br');
  xyzi.appendChild(imagenodei);
  xyzi.appendChild(newline);
  xyzi.appendChild(textnodei);
  xyzi.classList.add("new");
  
  document.querySelector('.messages-content').appendChild(xyzi);
shouldScroll=messag.scrollTop+messag.clientHeight===messag.scrollHeight;
 if(!shouldScroll){
 scroll();
 }
  }, 100 + (Math.random() * 20) * 100);
  }, 100);
});

function scroll(){

messag.scrollTop=messag.scrollHeight;

}
//add scroll bar to bottom as new messages append
function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

//insert user message in DIV
function insertMessage() {
  //msg = $('.message-input').val();
  msg = document.querySelector('.message-input').value;
  if (msg.trim() == '') {
    return false;
  }
 // $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  let ele=document.createElement('div');
    ele.classList.add("message");
    ele.classList.add("message-personal");
    var textnode=document.createTextNode(msg);
   ele.appendChild(textnode);
  ele.classList.add('new');
  document.querySelector('.messages-content').appendChild(ele);//check this again coz used messages instead of scroll bar
 fetchmsg();
  
 // $('.message-input').val(null);
 document.querySelector('.message-input').value=null;
 // updateScrollbar();
 shouldScroll=messag.scrollTop+messag.clientHeight===messag.scrollHeight;
 if(!shouldScroll){
 scroll();
 }


}
//submit on enter
document.getElementById("mymsg").onsubmit = (e)=>{
  e.preventDefault();
  insertMessage();
 // serverMessage("hello");
//speechSynthesis.speak( new SpeechSynthesisUtterance("hello"))
}
//document.getElementById("chatbot").onsubmit = (e)=>{
////  e.preventDefault();
 // serverMessage("hello");
//speechSynthesis.speak( new SpeechSynthesisUtterance("hello"))
//}

//insert bot message

function serverMessage(response2) {

  //if message empty
  // $('<div class="message loading new"><figure class="avatar"><img src="https://tse3.mm.bing.net/th?id=OIP.ZaVWrkAV6pfRMAHiY-MqhQHaHi&pid=Api&P=0&w=300&h=300" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  let xyz=document.createElement('div');
 xyz.classList.add("message");
 xyz.classList.add("loading");
 xyz.classList.add("new");
  let abcd=document.createElement('figure');
  abcd.classList.add("avatar");
 let image=document.createElement('img');
 image.src="/images/bott.jpg";
 abcd.appendChild(image);
  xyz.appendChild(abcd);
  let op=document.createElement('span');
  xyz.appendChild(op);

  document.querySelector('.messages-content').appendChild(xyz);
 scroll();
//if message not empty insert the response
  setTimeout(function() {

   document.querySelector('.message.loading').remove();
  //  $('<div class="message new"><figure class="avatar"><img src="https://tse3.mm.bing.net/th?id=OIP.ZaVWrkAV6pfRMAHiY-MqhQHaHi&pid=Api&P=0&w=300&h=300" /></figure>' + response2 + '</div>').appendTo($('.mCSB_container')).addClass('new');
 let xyzi=document.createElement('div');
  xyzi.classList.add("message");
  xyzi.classList.add("new");
  
  let abcdi=document.createElement('figure');
  abcdi.classList.add("avatar");
  let imagei=document.createElement('img');
  imagei.src="/images/bott.jpg";
 abcdi.appendChild(imagei);
 xyzi.appendChild(abcdi);
  var textnodei=document.createTextNode(response2);
  xyzi.appendChild(textnodei);
  xyzi.classList.add("new");
  
  document.querySelector('.messages-content').appendChild(xyzi);
shouldScroll=messag.scrollTop+messag.clientHeight===messag.scrollHeight;
 if(!shouldScroll){
 scroll();
 }
  }, 100 + (Math.random() * 20) * 100);

}

//fetch the response most matched from mongodb by tf-idf algorithm 
function fetchmsg(){
//url to be changed for local deployment 
     var url = 'http://'+window.location.hostname+':'+window.location.port+'/send-msg';
      
      const data = new URLSearchParams();
      for (const pair of new FormData(document.getElementById("mymsg"))) {
          data.append(pair[0], pair[1]);
          console.log("lili "+pair);
      }
    
      console.log("abc",data);
        fetch(url, {
          method: 'POST',
          body:data
        }).then(res => res.json())
         .then(response => {
          console.log(response);
        serverMessage(response.Reply);
        speechSynthesis.speak( new SpeechSynthesisUtterance(response.Reply))
        
          
         })
          .catch(error => console.error('Error h:', error));

}

