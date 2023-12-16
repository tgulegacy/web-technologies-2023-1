if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'проверка',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    },
                    {
                        name: 'Handmade',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    }
                ]
            },{
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    }
                ]
            }
        ]
    }


    const items = new ListItems(document.getElementById('list-items'), data)

    items.render()
    items.init()

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        this.init = function () {
            const parents = this.el.querySelectorAll('[data-parent]')

            parents.forEach(parent => {
                const open = parent.querySelector('[data-open]')

                open.addEventListener('click', () => this.toggleItems(parent) )
            })
        }

        this.render = function () {
            this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data))
        }

        this.renderParent = function (data) {
            let span = '<span>' + data.name + '</span>';
            let elParent = '<div class="list-item list-item_open" data-parent><div class="list-item__inner">'
            elParent += '<img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>' +
                '<img class="list-item__folder" src="img/folder.png" alt="folder">' + span + '</div>' +
            '<div class="list-item__items">'
            
            data.items.forEach(item => {
                if (item.hasChildren) 
                    elParent+= this.renderParent(item);
                else
                    elParent+= this.renderChildren(item.name);
            });

            // нужно, чтобы закрыть два div сверху после добавление всех вложенных элементов
            elParent += '</div> </div>';
            return elParent
        }

        this.renderChildren = function (name) {
            let span = '<span>' + name + '</span>';
            let elChild ='<div class="list-item__inner">' +
            '<img class="list-item__folder" src="img/folder.png" alt="folder">'+ span + '</div>';
            return elChild;
        }

        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }
    }
}