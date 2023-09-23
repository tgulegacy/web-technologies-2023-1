Pizza = require("./modules/pizza.js")
Topping = require("./modules/topping.js")
PizzaSize = require("./modules/pizzaSize.js")

const pizzaSizeSmall = new PizzaSize("Маленькая", price = 100, calories = 100)
const pizzaSizeBig = new PizzaSize("Большая", price = 200, calories = 200)

const creamyMozzarella = new Topping("Сливочная моцарелла", [
    {
        size: pizzaSizeSmall,
        calories: 0,
        addPrice: 50
    },
    {
        size: pizzaSizeBig,
        calories: 0,
        addPrice: 100
    }
]);

const cheeseBoard = new Topping("Сырный борт", [
    {
        size: pizzaSizeSmall,
        calories: 50,
        addPrice: 150
    },
    {
        size: pizzaSizeBig,
        calories: 50,
        addPrice: 300
    }
]);

const chederAndParmezan = new Topping("Чердер и пармезан", [
    {
        size: pizzaSizeSmall,
        calories: 50,
        addPrice: 150
    },
    {
        size: pizzaSizeBig,
        calories: 50,
        addPrice: 300
    }
]);

const margatitaPizza = new Pizza("Маргарита", calories = 300, price = 500, pizzaSizeBig, [creamyMozzarella, cheeseBoard, chederAndParmezan])

console.log(`price: ${margatitaPizza.calculatePrice()}`)
console.log(`calories ${margatitaPizza.calculateCalories()}`)