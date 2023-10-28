
//step1-load the driver//this will load the library
var mssql=require('mysql');
var bparser=require('body-parser');
bparserinit=bparser.urlencoded({extended:false});
var cors=require('cors');
var exp=require('express');
var app=exp();//initialize express
app.use(cors());
app.use(exp.json())
var mssqlconnection= mssql.createConnection({    
        host:'localhost',
        database:'world',
        user:'root',
        password:'root',
        port:3306
        //this is for MSSQL{
        //port:1433
        //options:{trustedConnection:true},
        //driver:"msnodesqlv8",
        //server:"200411LTP2080\\SQLEXPRESS",
        //database:"TestDB"
        //}
})

var newuser=[];

function checkConnection(error){
    if(error==undefined){
        console.log("connected to database");
    }
    else{   
        console.log("error code"+error.errno)
        console.log(error.message);
    }

}
function feedback(error){
    if(error!=undefined){
        console.log(error.errno);
        console.log(error.message);
    }else
    console.log("open the browser amd vistit url http://localhost:9901/Getall");
}
app.listen(9901,feedback);


var queryresult=undefined;
function processResult(error,results){
   
        queryresult=results;
        console.log(queryresult);
  
}

function displayAllUsers(request,respond){
    mssqlconnection.connect(checkConnection)
    mssqlconnection.query("select * from users",processResult)
    respond.send(queryresult);
    }

app.get("/Getall",displayAllUsers);



function getUserById(request,response){
    var userid=request.query.id;
    mssqlconnection.connect(checkConnection)
    //parameterized SQL query
    mssqlconnection.query("select * from users where userid=?",[userid],processResult)
    response.send(queryresult);

}

app.get("/getById",getUserById);  

var statusmessage="";
function checkinsertstatus(error){
    statusmessage=( (error==undefined)?"inserted succcessfully":"not inserted"+error.message); 
}



function AddUser(request,response){
    var userid=request.body.id;
    var password=request.body.pass;
    var emailid=request.body.emailid;
    console.log(userid+"\t\t "+password+"\t\t "+emailid);
    mssqlconnection.connect(checkConnection)
    //parameterized SQL query
    mssqlconnection.query("insert into users values(?,?,?)",[userid,password,emailid],checkinsertstatus);
    response.send(statusmessage);
}

app.post("/add",bparserinit,AddUser);

function Deleteuser(request,response){
    let userid=request.query.id;
    //var password=request.body.password;
    //var emailid=request.body.emailid;
    mssqlconnection.connect(checkConnection);
    mssqlconnection.query("delete from users where userid=?",[userid],processResult);
    response.send(statusmessage);
}
function UpdateUser(request,response){
    var userid=request.body.id;
    var password=request.body.pass;
    var emailid=request.body.emailid;
    mssqlconnection.connect(checkConnection);
    mssqlconnection.query("update users set password=?,emailid=? where userid=?",[password,emailid,userid]);
    response.send(json.stringify(statusmessage));
}


app.post('/update',bparserinit,UpdateUser);



app.delete("/delete",bparserinit,Deleteuser);

function allcontacts(request,response){
    mssqlconnection.connect(checkConnection);
    mssqlconnection.query("select * from contactus",processResult);
    response.send(JSON.stringify(queryresult));
}
app.get("/allcontact",allcontacts);

function AddContact(request,response){
    var firstname=request.body.fname;
    var lastname=request.body.lname;
    var emailid=request.body.email;
    var phonenumber=request.body.number;
    mssqlconnection.connect(checkConnection);
    mssqlconnection.query("insert into contactus values(?,?,?,?)",[firstname,lastname,emailid,phonenumber],checkinsertstatus);
    response.send(statusmessage);
}
app.post("/addcontact",bparserinit,AddContact);


function updatecontact(request,response){
    
    var firstname=request.body.fname;
    var lastname=request.body.lname;
    var emailid=request.body.email;
    var phonenumber=request.body.number;
    mssqlconnection.connect(checkConnection);
    mssqlconnection.query("update contactus set lastname=?,emailid=?,phonenumber=? where firstname=?",[lastname,emailid,phonenumber,firstname],processResult);
    response.send(statusmessage);
}
app.post("/updatecontact",bparserinit,updatecontact);

function Deleteuser(request,response){
    var firstname=request.body.fname;
    
    mssqlconnection.connect(checkConnection);
    mssqlconnection.query("delete from contactus where firstname=?",[firstname],processResult);
    response.send(statusmessage);
}

app.delete("/deletecontact",bparserinit,Deleteuser);


