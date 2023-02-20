module.exports = class Topping {
    constructor(name, toppingInfo) {
        this.name = name;
        this.toppingInfo = toppingInfo;
    }

    getCalories(pizzaSize) {
        const toppingInfo = this.toppingInfo.find(element => element.size.name === pizzaSize.name)

        if (!toppingInfo)
            return 0;

        return toppingInfo.calories;
    }

    getPrice(pizzaSize) {
        const toppingInfo = this.toppingInfo.find(element => element.size.name === pizzaSize.name)

        if (!toppingInfo)
            return 0;

        return toppingInfo.addPrice;
    }
}