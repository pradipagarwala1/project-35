//Create variables here
var dog, dogImg, happyDog, database, food, foodStock;
var feed, addFood;
var fedTime, lastFed;
var foodObj;

function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);

  foodObj = new Food();

  dog = createSprite(800, 220, 150, 150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed = createButton("FEED THE DOG");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD FOOD");
  addFood.position(800, 95);
  addFood.mousePressed(addFood);
  
}


function draw() {  
  background(46, 139, 87);

  //add styles here

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255);
  textSize(20);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM" , 350, 30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350, 30);
  }

  foodObj.display();
  drawSprites();

}

function readStock(data){
  food = data.val();
  foodObj.updateFoodStock(food);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFood(){
  food++;
  database.ref('/').update({
    Food: food
  })
}
