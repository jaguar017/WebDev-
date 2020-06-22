const express=require("express");
const https = require('https');
const bodyParser=require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");

});
app.post("/index.html",function(req,res){
  var city=req.body.cityName;
  var url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=6a1b26be2e160e3fbc889e1443e8d6a2&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data)
  {
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherDescription=weatherData.weather[0].description;
    const icon=weatherData.weather[0].icon;
    const feels_temp=weatherData.main.feels_like;
    image_url= "https://openweathermap.org/img/wn/"+icon+"@2x.png"

    res.write("<h1>The temp in "+city +" is "+temp+"&#8728 C.</h1>");
    res.write("<p>The conditions are "+weatherDescription+"</p>");
    res.write("<p>The temp feels like "+feels_temp+"&#8728 C.</p>")
    res.write("<img src="+image_url+">");
    res.send();

  })

  });
});
app.listen(3000,function(){

  console.log("server is connected");
});
