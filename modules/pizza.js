module.exports = class Pizza {
    #name;
    #pizzaPrice;
    #pizzaCalories;
    #toppings;
    #pizzaSize;
    #toppingCalories;
    #currentCalories;

    constructor(name, calories, price, pizzaSize, toppings = []) {
        if (!(pizzaSize instanceof PizzaSize)) {
            throw new TypeError("PizzaSize is not instanceof")
        }
        
        this.#name = name;
        this.#pizzaPrice = price;
        this.#pizzaCalories = calories;
        this.#toppings = [...toppings];
        this.#pizzaSize = pizzaSize;
        this.#toppingCalories = 0;
        
        toppings.map((item) => {
            this.addTopping(item);
        })

        this.#updateCalories();
    }

    addTopping(topping) {
        if (!(topping instanceof Topping)) {
            throw new TypeError("Topping is not instanceof")
        }

        this.#toppings.push(topping);
        this.#toppingCalories += topping.getCalories(this.#pizzaSize);
        this.#pizzaPrice += topping.getPrice(this.#pizzaSize);
    }

    deleteTopping(topping) {
        if (!(topping instanceof Topping)) {
            throw new TypeError("Topping is not instanceof")
        }

        this.#toppings = this.#toppings.filter((element) => console.log(element === topping));
        this.#toppingCalories -= topping.getCalories(this.#pizzaSize);
        this.#pizzaPrice -= topping.getPrice(this.#pizzaSize);
    }

    calculateCalories() {
        return this.#toppingCalories + this.#pizzaCalories + this.#pizzaSize.calories;
    }

    calculatePrice() {
        return this.#pizzaPrice + this.#pizzaSize.price;
    }

    getCalories() {
        return this.#pizzaCalories;
    }

    getToppings() {
        return this.#toppings;
    }

    getSize() {
        return this.#pizzaSize;
    }

    #updateCalories() {
        this.#currentCalories = 0;
        this.#currentCalories = this.#pizzaCalories;
        this.#currentCalories += this.#pizzaSize.calories;
        
        if (this.#toppings.length > 0) {
            this.#toppings.reduce((prev, current) => this.#currentCalories += current.calories);
        }
    }
}