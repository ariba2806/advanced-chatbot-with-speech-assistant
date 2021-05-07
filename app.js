const mongoose=require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
//const Qna=require("./model/qna");
//const Chat=require("./model/chat");
const connectDB = require('./server/database/connection');



// mongodb connection
connectDB();
//const mongoose=require('mongoose');
const port=process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true
}));

// log requests
app.use(morgan('tiny'));

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
//helps display code in ejs tarnsfered from this file
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
//term frequency code formula-no of occurences of this word in a doc/total no. of words in that doc
function tf(doc,term){
   var result = 0;
        for (var j=0;j<doc.length;j++) {
            var similar=similarity(doc[j],term);
            //console.log("this much similar "+similar);
           // if (term==doc[j])
           if(similar>=0.6)
                result++;
        }
        return result / doc.length;
}
//inverse document frequency function formula-no of documents/no of documents containing that word
//determines the importance of a word within number of documents
 function idf(docs,term) {
        var n = 0;
        for (var j=0;j<docs.length;j++) {
            for (var k=0;k<docs[j].length;k++) {
                //if (term==docs[j][k]) 
                var similarly=similarity(docs[j][k],term)
                if(similarly>=0.6)
                {
                    n++;
                    break;
                }
            }
        }
        return Math.log(docs.length / n);
    }
    //tf-idf=tf*idf
    function tfIdf(doc,docs, term) {
        return tf(doc, term) * idf(docs, term);

    }
    //similarity of 2 words function example if Apple and appl are there it gives some 0.8 similarity on a scale of 0 to 1
    function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
 
var count=0;
  var str="hello";
  var newobj={"question":"" ,"response":""};

//send-msg request called when a user enters a query
app.post('/send-msg',(req,res)=>{
//http://localhost:3000/

console.log("this is the hostname "+req.headers.host);
  //get all the documents from the collection in an array and split each document into words to efficiently match words ahead
  var arr=[];
var arr1=[];
var finaldoc="hello";
var MongoClient = require('mongodb').MongoClient; 
 var url = "mongodb://localhost:27017/chatbot";  
 MongoClient.connect(url, function(err, db) {  
  if (err) throw err;  
  db.collection("userdbs").find({}).toArray(function(err, result) {  
    if (err) {
        console.log(err);
    } else {
        for(var i=0;i<result.length;i++){
          var sentence=result[i].name;
          var words=sentence.split(" ");
          arr.push(words);
          
        }
    }
   db.close();  
     //console.log("docs "+ arr);

//getting question from user and using it to find most matching response
    var quest=req.body.MSG.toLowerCase();
     var questi=quest.split(" ");
     var war=[];
     //make a matrix of words contained in ques and the different documents and calculate each documents TF-IDF accuracy by adding the tf-idf 
     //of every word in ques contained in each doc
     for(var q=0;q<arr.length;q++){
    var c=0;
       for(var p=0;p<questi.length;p++){
         var termi=questi[p];
         var d=tfIdf(arr[q],arr,termi);
         if(termi=="is" || termi=="for" || termi=="then" || termi =="and" || termi=="or" || termi=="if" || termi=="in" || termi =="on" ||
          termi=="the" || termi=="to" || termi=="it" ){
            d=0;
          }
         else if(isNaN(d)){
           d=0;
         }
          else{
          d=tfIdf(arr[q],arr,termi);
          }
         c=c+d;
       //  console.log("ariba "+d);

       }
       war.push(c);
     }
    // console.log("final array "+war);
     //find the document with the highest TF-IDF number and get its response 
     var largest= 0;
    var index=0;
   for (i=0; i<=war.length;i++){
      if (war[i]>largest) {
        largest=war[i];
        index=i;
      }
   }
   //if the largest in array is 0 means that no word of question matches to the split array of documents hence no match
    if(largest==0){
        var abc=result.length;
      var xoxo=Math.floor(Math.random()*abc);
   //   console.log("rendommmeeeest "+xoxo);
    
        res.send({Reply:result[xoxo].name});
        var today=new Date();
newobj={
  "question":req.body.MSG,
  "response":result[xoxo].name,
  "time":today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
};

    }
    //if even one word of question and responses match return that document in which the matched word is present
    else{
   console.log("largest at index "+index);
   console.log("hence final document is "+result[index].name);
   res.send({Reply:result[index].name});
   var today=new Date();
newobj={
  "question":req.body.MSG,
  "response":result[index].name,
  "time":today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() +'  '+today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
  };
    }

//insert the response and question document in IT_chatbot collection as chat history
var MongoClient = require('mongodb').MongoClient;  
var url = "mongodb://localhost:27017/chatbot";  
MongoClient.connect(url, function(err, db) {  
if (err) throw err;  
db.collection("IT_chatbot").insertOne(newobj, function(err, res) {  
if (err) throw err;  
console.log("1 record inserted");  
db.close();  
});  
});
});  
 
}); 
})

app.get("/", function (req, res) {
res.render("index");
});

app.get("/login", function (req, res) {
res.render("login");

});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // check for missing filds
    if (!email || !password) {
      res.render("login");
    //  res.render("index", { details: history});
      return;
    }

    
    if (email!="admin" || password!="user") {
      res.render("login");
      return;
    }

  if (email=="admin" && password=="user") {
       res.redirect("/admin-panel");
      
    }
   
  })





// load routers
app.use('/', require('./server/routes/router'));
//listen to port
app.listen(port,()=>{
    console.log(`running on port ${port}`);
     
    //console.log(`mongo port `+process.env.MONGODB_URI);
});



