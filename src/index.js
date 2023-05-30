function setSizeListeners(isSelectedTypeActive) {
    const sizeSelector = '.pizza-order__size', size = [...document.querySelectorAll(sizeSelector)][0].dataset.size;
    pizza.setSize(PizzaSize[size]);

    document.querySelectorAll(sizeSelector).forEach(size => {
        size.addEventListener('click', (e) => {
            const backgroundItem = document.querySelector('.background-item'),
                sizeItems = [...document.querySelectorAll('.pizza-order__size')];

            pizza.setSize(PizzaSize[e.currentTarget.dataset.size]);

            // Высчитывает левый отступ по всем левым элементам от выбранного.
            // Начальное значение 10 потому что padding: 10px
            let left;
            left = sizeItems.slice(0, sizeItems.indexOf(e.target)).reduce((acc, sizeItem, currentIndex, arr) => {
                return acc + sizeItem.offsetWidth
            }, 10);

            backgroundItem.setAttribute('style', 'left: ' + left + 'px; width: ' + e.target.offsetWidth + 'px');
            updateOrderButton();
            updateToppingsPrice();
        })
    })

}

function setToppingListeners() {
    const toppingSelector = '.pizza-order__topping', activeToppingClass = 'pizza-order__topping_active',
        toppings = document.querySelectorAll(toppingSelector);

    toppings.forEach(topping => {
        topping.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle(activeToppingClass);

            const isSelectedToppingActive = e.currentTarget.classList.contains(activeToppingClass);

            if (!isSelectedToppingActive) {
                pizza.deleteTopping(PizzaTopping[e.currentTarget.dataset.topping]);
            } else {
                pizza.addTopping(PizzaTopping[e.currentTarget.dataset.topping]);
            }

            updateOrderButton()
        });
    });
}

function setTypeListeners() {
    const typeSelector = '.pizza-order__type', activeTypeClass = 'pizza-order__type_active',
        types = document.querySelectorAll(typeSelector);
    let isSelectedTypeActive = false;

    for (const type of types) {
        type.addEventListener('click', (e) => {

            for (const el of types) {
                el !== e.currentTarget && el.classList.remove(activeTypeClass);
            }

            e.currentTarget.classList.toggle(activeTypeClass);

            isSelectedTypeActive = e.currentTarget.classList.contains(activeTypeClass);

            pizza.setType(PizzaType[e.currentTarget.dataset.type]);
            if (isSelectedTypeActive) {
                document.querySelector('.pizza-order__disabled').style.display = 'none';
            } else {
                document.querySelector('.pizza-order__disabled').style.display = 'block';
            }

            updateOrderButton(!isSelectedTypeActive);
        });
    }

    setSizeListeners(isSelectedTypeActive);
    setToppingListeners();
}

function initBackgroundItem() {
    const sizeItems = document.querySelectorAll('.pizza-order__size'),
        backgroundItem = document.querySelector('.background-item');
    backgroundItem.setAttribute('style', 'left: ' + 4 + 'px; width: ' + sizeItems[0].offsetWidth + 'px');
}

function updateOrderButton(isReset) {
    if (!isReset) {
        document.querySelector('.pizza-order__total-price').innerHTML = pizza.calculatePrice();
        document.querySelector('.pizza-order__total-calories').innerHTML = pizza.calculateCalories();
    } else {
        document.querySelector('.pizza-order__total-price').innerHTML = '0';
        document.querySelector('.pizza-order__total-calories').innerHTML = '0';
    }
}

function updateToppingsPrice() {
    document.querySelectorAll('.pizza-order__topping').forEach(topping => {
        topping.querySelector('.pizza-order__topping-price').innerHTML = PizzaTopping[topping.dataset.topping].info[pizza.getSize().id].price;
    });
}

const pizza = new Pizza(null, null, null);

initBackgroundItem();
setTypeListeners();
