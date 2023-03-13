

const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
app.get("/",function(req,res)
{
   res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=0722f3138ea1eb2a4c33bf3411c83baa&units=metric";
https.get(url,function(response){
    response.on("data",function(data){
        const weatherData= JSON.parse(data);
        const place = city.toUpperCase();
        const temp = weatherData.main.temp;
        const pressure = weatherData.main.pressure;
        const humidity = weatherData.main.humidity;
        const weatherDes = weatherData.weather[0].description; 
        const Des = weatherDes.toUpperCase(); 
        const icon = weatherData.weather[0].icon; 
        const url = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        const w="stylesheet";
        const w1=__dirname+"/style.css";
        res.render("output",{temperature: temp,
        ss: w1,p: place,d: Des,URL:url,h:humidity,pr:pressure});
        
    });

});
});

app.listen(process.env.PORT||5000,function(){
    console.log("Server Running");
});

