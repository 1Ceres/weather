const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
  res.sendFile(__dirname+ "/index.html")
  // res.send("Weather Server is up and running");
});



app.post("/", function(req, res){

  var query = req.body.cityName
  const appid = "a0b7fb78e2263ed51a47e7eb8109292a"
  url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const description =weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const iconURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write('<head><meta charset="utf-8"></head>');
      res.write("The weather is currently "+ description);
      res.write("<h1>The temp in "+query+" is "+ temp +" degress Celcius.</h1>");
      res.write("<img src="+iconURL+">");

      res.send()
    })
  })
})













app.listen(3000, function(){
  console.log("Server is running on port 3000");
})
