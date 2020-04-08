const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express()

app.listen(process.env.PORT || 3000, () => console.log(`App running on port ${process.env.PORT || 3000}`));
app.use(bodyParser.json())

app.get('/', (req,res,next)=>{
  res.sendFile("/index.html",{root: __dirname})
})
app.get('/addName', (req,res,next)=>{

  var content = fs.readFileSync('name.txt','utf8');
  const name = req.query.name;
  fs.writeFileSync('name.txt', content+ name+",");

  var toSend = fs.readFileSync('name.txt','utf8');
  console.log(toSend)
  res.send(toSend.split(','));

})

app.get('/getNames', (req,res,next)=>{

var content = fs.readFileSync('name.txt','utf8');
console.log(content);
res.send(content.split(','))


})

app.get('/getRestart', (req,res,next)=>{
  var content = fs.readFileSync('went.txt','utf8');
  let holder = content;
  fs.writeFileSync('name.txt', content)
  fs.writeFileSync('went.txt',"" )



  res.send(holder.split(','))

})
app.get('/getWent', (req,res,next)=>{
  var content = fs.readFileSync('went.txt','utf8');
  res.send(content.split(','))
})


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

app.get('/getRandom', (req,res,next)=>{
  var content = fs.readFileSync('name.txt','utf8');
  let wow = content.split(',')
  let people = [];
  for(var pop = 0; pop<wow.length; pop++){
    if(wow[pop] !== "," && wow[pop] != "" && wow[pop] != "\n"){
      people.push(wow[pop])
    }
  }
  if(people.length > 0){
    var index = 0;
    for(var i = 0; i<10; i++){
      index = getRandomInt(people.length);
    }
    let name = people[index];

    var went = fs.readFileSync('went.txt','utf8');
      fs.writeFileSync('went.txt', went+name+",");

      let id = people.indexOf(name);
      people.splice(id,1)

      let removed = ""

      for(var k = 0; k<people.length; k++){
        removed = removed + people[k]+ ","

      }


      fs.writeFileSync('name.txt', removed);



    res.send(name)
  }
  else{
    let mess = JSON.stringify("Everyone Has Went! Restart");
    res.send(mess)
  }





})
