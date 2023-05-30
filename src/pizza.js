class PizzaType {
    static Margarita = {
        id: 'Margarita',
        name: 'Маргарита',
        price: 500,
        calories: 300
    };
    static Pepperoni = {
        id: 'Pepperoni',
        name: 'Пепперони',
        price: 800,
        calories: 400
    };
    static Bavarian = {
        id: 'Bavarian',
        name: 'Баварская',
        price: 700,
        calories: 450
    };
}

class PizzaSize {
    static Big = {
        id: 'big',
        name: 'Большая',
        price: 200,
        calories: 200
    };
    static Small = {
        id: 'small',
        name: 'Маленькая',
        price: 100,
        calories: 100
    };
}

class PizzaTopping {
    static CreamyMozzarella =  {
        id: 'creamyMozzarella',
        name: 'Сливочная Моцарелла',
        info: {
            big: {
                price: 100,
                calories: 0
            },
            small: {
                price: 50,
                calories: 0
            }
        }
    };
    static CheesyEdge =  {
        id: 'cheesyEdge',
        name: 'Сырный борт',
        info: {
            big: {
                price: 300,
                calories: 50
            },
            small: {
                price: 150,
                calories: 50
            }
        }
    };
    static CheddarAndParmesan =  {
        id: 'cheddarAndParmesan',
        name: 'Чеддер и Пармезан',
        info: {
            big: {
                price: 300,
                calories: 50
            },
            small: {
                price: 150,
                calories: 50
            }
        }
    };
}

class Pizza {
    #type;
    #size;
    #toppings;

    constructor(type, size, toppings) {
        this.#type = type;
        this.#size = size;
        this.#toppings = toppings ? toppings.map(topping => this.#convertTopping(topping)) : [];
    }

    /**
     * Избавляемся от big и size в topping
     * @param {{name: string, price: number, calories: number}} topping
     * @returns {{name: string, price: number, calories: number}}
     */
    #convertTopping = topping => ({
        id: topping.id,
        name: topping.name,
        price: topping.info[this.#size.id].price,
        calories: topping.info[this.#size.id].calories,
    });

    /**
     * Добавление начинки
     * @param {{name: string, id: string, info: {small: {price: number, calories: number}, big: {price: number, calories: number}}}} topping
     * @returns {Pizza}
     */
    addTopping = topping => {
        if (this.#toppings.map(topping => topping.name).includes(topping.name)) {
        } else {
            this.#toppings.push(this.#convertTopping(topping));
        }
        return this;
    };

    setType = pizzaType => {
        this.#type = pizzaType;
    };

    setSize = pizzaSize => {
        this.#size = pizzaSize;

        if (!PizzaTopping[this.#toppings[0]?.id]) {
            return;
        }
        this.#toppings = this.#toppings.map(topping => this.#convertTopping(PizzaTopping[topping?.id]));
    };

    /**
     * Убрать начинку
     * @param {{name: string, price: number, calories: number}} topping
     * @returns {Pizza}
     */
    deleteTopping = topping => {
        this.#toppings = this.#toppings.filter(t => {
            return t.id !== topping.id;
        });

        return this;
    };

    /**
     * Получить список топпингов
     * @returns {[{name: string, price: number, calories: number}]}
     */
    getToppings = () => this.#toppings;

    /**
     * Получить вид пиццы
     * @returns {string}
     */
    getType = () => this.#type.name;

    /**
     * Получить размер пиццы
     * @returns {string}
     */
    getSize = () => this.#size.name;

    /**
     * Высчитать цену пиццы
     * @returns {number}
     */
    calculatePrice = () => [this.#size, this.#type, ...this.#toppings]
        .reduce((acc, currValue) => acc += currValue.price, 0);

    /**
     * Высчитать калории
     * @returns {number}
     */
    calculateCalories = () => [this.#size, this.#type, ...this.#toppings]
        .reduce((acc, currValue) => acc += currValue.calories, 0);
}