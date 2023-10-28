var expr = require("express");
var bparser=require('body-parser');
//Initialize the body parser

bparserinit=bparser.urlencoded({extended:false});
var app = expr();
var visitorCount = 0;
var users=[{userID:"100",FirstName:"Srivishnu",LastName:"Mathan"},
           {userID:"101",FirstName:"Aakash",LastName:"Kumar"},
           {userID:"102",FirstName:"Rahul",LastName:"Singh"},
           {userID:"103",FirstName:"Rohan",LastName:"Singh"}];
//Initailiaze expressjs
function welcome(req, res) {
  let today = new Date();
  visitorCount++;
  let resp = "<html><body><h1>Today :</h1> " + today;
  resp += "<br></br><b>Number of visitors : </b>" + visitorCount;
  resp += "</body></html>";
  res.send(resp);
  console.log(visitorCount);
}

function Home(req, res) {
  res.send(
    "<html><body><h1>Home Page</h1><br></br><a href='/welcome'>Welcome</a>&nbsp;&nbsp;<a href='/Login'>Login</a></body></html>"
  );
}

function Login(req, res) {
  res.send(
    " <html> <body> <form>    <div>  <div>  <h2>Sign In</h2> <div >   <div >  <input  type='text' placeholder='Username' required  > </input>  </div>   <div >    <input  type='password' placeholder='Password' required   />    </div>     <div > <input type='submit' value=Login />  </div>  </div> </div> </div>  </form> </body> </html>"
);  

  }

function GetUser(req, res) {
    var userId=req.query.id;//101
    var firstname=req.query.fname;//Aakash
    var lastname=req.query.lname;//Kumar
    for(var i=0;i<users.length;i++)
    {
        if(users[i].userID==userId&&users[i].FirstName==firstname&&users[i].LastName==lastname)
        {
           res.send(users[i]);
        }
    }
}

function GetUserId(req,res){
    var userId=req.query.id;//101//Kumar
    for(var i=0;i<users.length;i++)
    {
        if(users[i].userID==userId)
        {
           res.send(users[i]);
        }
    }
}
function GetAllUsers(req,res){

        res.send(users);
}
function DeleteUser(req,res){
    var userId=req.query.id;//101
    for(var i=0;i<users.length;i++)
    {
        if(users[i].userID==userId)
        {
           users.splice(i,1);
        }
        res.send(users);
    }
}

function AddUser(req,res){
    var userId=req.body.id;//101
    var firstname=req.body.fname;//Aakash
    var lastname=req.body.lname;//Kumar
    var user={userID:userId,FirstName:firstname,LastName:lastname};
    users.push(user);
    res.send(user);
}

function UpdateUser(req,res){
  var userId=req.body.id;//101
  var firstname=req.body.fname;//Aakash
  var lastname=req.body.lname;//Kumar
  for(var i=0;i<users.length;i++)
  {
      if(users[i].userID==userId)
      {
         users[i].FirstName=firstname;
         users[i].LastName=lastname;
         break;
      }
  }
  res.send(users);
}
app.get("/GetAllUsers",GetAllUsers);
app.get("/DeleteUser",DeleteUser);
app.get("/GetUserId",GetUserId);
app.get("/GetUser",GetUser);
app.get("/Login", Login);
app.get("/welcome", welcome);
app.get("/", Home);
app.post('/AddUser',bparserinit,AddUser);
app.post('/UpdateUser',bparserinit,UpdateUser);

function feedback() {
  console.log("Server started on port 8000");
  console.log("open the browser and visit http://localhost:8000/");
}

app.listen(8000, feedback); //indefinitly waiting for the request in port 8000

 

