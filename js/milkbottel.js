class MilkBottel {
    
    constructor(){
        this.image = loadImage("images/Milk.png")
        this.foodStock=0;
        this.lastFed
    }
    getFoodStock(){
        return this.foodStock;
    }
    getFedTime(lastFed){
        this.lastFed=lastFed;
        
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1
        }
    }
    bedroom(){
        background(bedroom,550,500)
    }
    garden(){
        background(garden,550,500)
    }
    bathroom(){
        background(washroom,550,500)
    }
    display(){
        var x = 80
        var y = 100;
        imageMode(CENTER);
        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 === 0){
                   x = 80;
                   y += 50;
                }
                image(this.image, x+400, y, 50, 50);
                x += 30;
                
            }
        }
    }
}
