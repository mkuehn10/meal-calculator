var Dish = function(name, cost) {
    this.name = name;
    this.cost = cost;
};

Dish.prototype.getDishCost = function() {
  return this.cost;  
};

var Diner = function(name, dishes) {
    this.name = name;
    this.dishes = dishes;
};

Diner.prototype.getDinerName = function() {
  return this.name;  
};

Diner.prototype.getDinerDishCosts = function() {
  return this.dishes.map(function(dish) {
      return dish.cost;
  });  
};

Diner.prototype.addTotal = function() {
    return this.getDinerDishCosts().reduce(function(previousValue, currentValue) {
       return previousValue + currentValue; 
    });
};

Diner.prototype.calculateTax = function(taxRate) {
    return this.addTotal() * taxRate;
};

Diner.prototype.calculateTip = function(tipRate) {
    return this.addTotal() * tipRate;
};

Diner.prototype.calculateTotal = function(taxRate, tipRate) {
    return this.addTotal() + this.calculateTax(taxRate) + this.calculateTip(tipRate);
};

var Bill = function(diners, taxRate, tipRate) {
  this.diners = diners; 
  this.taxRate = taxRate;
  this.tipRate = tipRate;
};

Bill.prototype.printTotal = function() {
    var taxRate = this.taxRate;
    var tipRate = this.tipRate;
    this.diners.forEach(function(diner) {
        console.log(diner.getDinerName() + ': Total ($' + diner.calculateTotal(taxRate, tipRate).toFixed(2) + '), Tax ($' + diner.calculateTax(taxRate).toFixed(2) + '), Tip ($' + diner.calculateTip(tipRate).toFixed(2) + ')');
    });
};

Bill.prototype.printTips = function() {
    var tipRate = this.tipRate;
    var totalTip = 0;
    this.diners.forEach(function(diner) {
        console.log(diner.getDinerName() + ' needs to tip $' + diner.calculateTip(tipRate).toFixed(2));
        totalTip += diner.calculateTip(tipRate);
    });
    console.log("Total tip for waitress: $" + totalTip.toFixed(2));
};

Bill.prototype.breakdown = function() {
    var taxRate = this.taxRate;
    var tipRate = this.tipRate;
    var totalBill = 0;
    this.diners.forEach(function(diner) {
        console.log(diner.getDinerName() + ' owes $' + diner.calculateTotal(taxRate, tipRate).toFixed(2));
        totalBill += diner.calculateTotal(taxRate, tipRate);
    });
    console.log('Total bill: $' + totalBill.toFixed(2));
    
};

var dishOne = new Dish("Moo Goo Gai Pan", 12.75);
var dishTwo = new Dish("French Fries", 4.75);
var dishThree= new Dish("Steak", 20.50);
var dishFour = new Dish("Mashed Potatoes", 3.50);

var firstDiner = new Diner("Jack", [dishOne, dishTwo]);
var secondDiner = new Diner("Diane", [dishThree, dishFour]);

var myBill = new Bill([firstDiner, secondDiner], 0.07, 0.20);

myBill.breakdown();
myBill.printTips(0.20);
myBill.printTotal();