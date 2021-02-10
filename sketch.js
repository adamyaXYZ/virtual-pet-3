//Create variables here
var happydog,dogImg,foodS,dog,foodStock;
var fedTime,lastFed;
var changeState,readState,state;
var garden,bedroom,washroom;
var x1 = 80, y1 = 100;
var currentTime

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png")
  happydog = loadImage("images/Happy.png")
  
  garden = loadImage("images/Garden.png")
  bedroom = loadImage("images/BedRoom.png")
  washroom =loadImage("images/WashRoom.png")
}

function setup() {
  createCanvas(1000,500);
  database = firebase.database()
  bottel = new MilkBottel()
  foodStock= database.ref('Food').on('value',readStock)

  readState = database.ref('state').on('value',function(data){
    state = data.val()
  })
  dog = createSprite(250,250);
  dog.addImage("woof",dogImg)
  dog.addImage("dog",happydog);

  dog.scale = 0.2

  feed = createButton("feed");
  feed.position(500,100);
  feed.mousePressed(feedDoggo);
  
  food = createButton("buy more")
  food.position(600,100);
  food.mousePressed(Khana)

  Name = createInput("dog's Name")
  Name.position(400,141)
  bun = createButton("submit")
  bun.position(400,200)
  bun.mousePressed(()=>{
    Name.hide()
    bun.hide()
  })

 

  fedTime = database.ref('fedTime').on('value',function(data){
    lastFed=data.val()
  });
  
}




function draw() {

  currentTime = hour();
  if(currentTime===(lastFed+1)){
    update("playing")
    bottel.garden();
  }
  else if(currentTime===(lastFed+1)){
    update("bathing")
    bottel.bathroom()
  }
  else if(currentTime===(lastFed+2)){
    update("sleeping")
    bottel.bathroom()
  }
  else{
    update("Hungry")
  }
  background(46, 139, 87)

  console.log(state)

  console.log(mouseX,mouseY)

  bottel.display()
  fedTime=database.ref('FeedTime').on('value',function(data){
    lastFed=data.val()
  })
  
  //texts
  fill(0)  
  
  text("Press feed button to feed "+Name.value(),175,350)
  text("foodRemaining:"+foodS,175,400)
  
  if(lastFed <= 12){
    text("lastfed:"+lastFed,147,94)
  }
  if(state !== "Hungry"){
    feed.hide()
    food.hide()
    dog.visible=false;
  }
  else{
    feed.show()
    food.show()
    dog.changeImage("woof",dog)
    dog.visible=true;
  }


  drawSprites();

}

function readStock(data){
  foodS = data.val();
  bottel.updateFoodStock(foodS)
}
function feedDoggo(){
  dog.changeImage("dog",happydog);
  if(bottel.getFoodStock()<= 0){
    bottel.updateFoodStock(bottel.getFoodStock()*0)
  }
  else{
    bottel.updateFoodStock(bottel.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:bottel.getFoodStock(),
    FeedTime:hour()
  })
  

}
function Khana(){
  
    foodS++;
    database.ref('/').update({
     Food:foodS
    })
}
function update(status){
  database.ref('/').update({
    state:status,
  })
}