const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app= express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res)
{
  console.log(__dirname);
  res.sendFile(__dirname+"/signup.html");
});
app.post("/signup.html",function(req,res)
{
  var name =req.body.name;
  var email=req.body.email;

  var data= {
    members:[
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME: name
        }
      }
    ]
  };

  const jsonData =JSON.stringify(data);

  const url ="https://us18.api.mailchimp.com/3.0/lists/1ee4b127a9"
  const options ={
    method:"POST",
    auth: "jayesh1:dd7ca33a76b030fd593dc7907469a913-us18"
  }

  const request= https.request(url,options,function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end()
  console.log(name);
  console.log(email);

});

app.listen(5004,function()
{
  console.log("server is connected");
});


//api key dd7ca33a76b030fd593dc7907469a913-us18
//1ee4b127a9
