'use strict';

function createApp(props) {
  const addNewItem = createContainerWithTitle({
    children: [createInputsRow({
      categories: props.categories,
      shops: props.shops,
      onchange: item => store.addNewItem(item)
    })],
    titleSelector: 'h3',
    title: 'nowy produkt',
    className: 'add-new'
  });

  const filters = createContainerWithTitle({
    children: [createInputsRow({
      categories: props.categories,
      shops: props.shops,
      onchange: item => store.filterItems(item),
      onclear: () => store.filterItems({})
    })],
    titleSelector: 'h3',
    title: 'filtry',
    className: 'filters'
  });

  const multiactions = createContainerWithTitle({
    children: [createMultiactions()],
    titleSelector: 'h3',
    title: 'multiakcje',
    className: 'multiactions'
  });

  const shortListPrint = createShortListPrintContainer();
  const summaryContainer = createContainer({
    children: [
      createContainerWithTitle({
        children: [createSummaryList({
          className: 'summary-categories',
          data: store.getCategoriesSummary()
        })],
        titleSelector: 'span',
        title: 'kategorie',
        className: 'summary-categories-box'
      }),
      createContainerWithTitle({
        children: [createSummaryList({
          className: 'summary-shops',
          data: store.getShopsSummary(),
          onclick: (args) => {
            shortListPrint.setValue({
              shop: args.target.innerText,
              items: store.getItemNamesContainingShop(args.target.innerText)
            });
            print();
          },
        })],
        titleSelector: 'span',
        title: 'sklepy',
        className: 'summary-shops-box'
      })
    ],
    className: 'summary'
  });

  const unchecked = createContainerWithTitle({
    children: [createList({ data: props.todos.filter(x => !x.checked) }), summaryContainer],
    titleSelector: 'h2',
    title: 'do kupienia',
    className: 'to-buy'
  });

  const checked = createContainerWithTitle({
    children: [createList({ data: props.todos.filter(x => x.checked) })],
    titleSelector: 'h2',
    title: 'kupione',
    className: 'bought'
  });

  const root = createContainerWithTitle({
    children: [addNewItem, filters, multiactions, unchecked, checked],
    title: 'lista zakupów',
    className: 'root'
  });

  return {
    render: function (host) {
      root.render(host);
      shortListPrint.render(host);
    }
  }
}

function createInputsRow(props) {
  const nameControl = createContainerWithTitle({
    children: [createInput()],
    titleSelector: 'span',
    title: 'nazwa produktu:',
    className: 'add-new__name'
  });

  const categoryControl = createContainerWithTitle({
    children: [createSelect({ options: props.categories })],
    titleSelector: 'span',
    title: 'kategoria:',
    className: 'add-new__category'
  });

  const shopsControl = createContainerWithTitle({
    children: [createSelect({ options: props.shops, multiple: true })],
    titleSelector: 'span',
    title: 'sklepy:',
    className: 'add-new__shops'
  });

  const actionsControl = createContainerWithTitle({
    children: [
      createButton({
        label: '[V] zatwierdź',
        onclick: () => {
          props.onchange({
            name: nameControl.getValue()[0],
            category: categoryControl.getValue()[0],
            shops: shopsControl.getValue()[0]
          });
        }
      }),
      createButton({
        label: '[X] wyczyść',
        onclick: props.onclear
      })
    ],
    titleSelector: 'span',
    title: 'akcje:',
    className: 'add-new__actions'
  });

  return {
    render: function (host) {
      nameControl.render(host);
      categoryControl.render(host);
      shopsControl.render(host);
      actionsControl.render(host);
    }
  }
}

function createMultiactions() {
  const checkAll = createButton({
    label: '[zaznacz wszystkie]', onclick: () => store.checkAll()
  });
  const uncheckAll = createButton({
    label: '[odznacz wszystkie]', onclick: () => store.uncheckAll()
  });
  const switchSelection = createButton({
    label: '[zamień zaznaczenie]', onclick: () => store.switchSelection()
  });
  const deleteAll = createButton({
    label: '[usuń wszystkie]', onclick: () => store.deleteAll()
  });
  const deleteBought = createButton({
    label: '[usuń kupione]', onclick: () => store.deleteBought()
  });
  const sortName = createButton({
    label: '[sortuj po nazwie]', onclick: () => store.sort('name')
  });
  const sortCategory = createButton({
    label: '[sortuj po kategorii]', onclick: () => store.sort('category')
  });
  const sortShops = createButton({
    label: '[sortuj po sklepach]', onclick: () => store.sort('shops')
  });

  return {
    render: function (host) {
      checkAll.render(host);
      uncheckAll.render(host);
      switchSelection.render(host);
      deleteAll.render(host);
      deleteBought.render(host);
      sortName.render(host);
      sortCategory.render(host);
      sortShops.render(host);
    }
  }
}

function createList(props) {
  const list = document.createElement('ul');
  list.className = props.className || 'shopping-list';

  return {
    render: function (host) {
      props.data.forEach(x => {
        createListItem({ item: x }).render(list);
      });
      host.appendChild(list);
    }
  }
}

function createListItem(props) {
  const listItem = document.createElement('li');

  const checkbox = createCheckbox({
    checked: props.item.checked, onclick: (e) => {
      props.item.checked = e.target.className.indexOf('checkbox--checked') === -1;
      store.updateItem(props.item);
    }
  });
  const nameControl = createLabel({ label: props.item.name, className: 'name' });
  const categoryControl = createLabel({ label: props.item.category, className: 'category' });
  const shopsControl = createLabel({ label: props.item.shops.join(', '), className: 'shops' });
  const deleteButton = createButton({ label: '[X]', onclick: () => { store.deleteItem(props.item); } });

  return {
    render: function (host) {
      checkbox.render(listItem);
      nameControl.render(listItem);
      categoryControl.render(listItem);
      shopsControl.render(listItem);
      deleteButton.render(listItem);
      host.appendChild(listItem);
    }
  }
}

function createSummaryList(props) {
  const list = document.createElement('ul');
  list.className = props.className;
  return {
    render: function (host) {
      props.data.forEach(x => {
        createSummaryItem({ item: x, onclick: props.onclick }).render(list);
      });
      host.appendChild(list);
    }
  }
}

function createSummaryItem(props) {
  const listItem = document.createElement('li');
  const countControl = createLabel({ label: `(${props.item.count}) `, className: 'summary-item-count' });
  const nameControl = createLabel({ label: props.item.name, onclick: props.onclick, className: 'summary-item-name' });
  return {
    render: function (host) {
      countControl.render(listItem);
      nameControl.render(listItem);
      host.appendChild(listItem);
    }
  }
}

function createShortList(props) {
  const list = document.createElement('ul');
  list.className = props.className;
  return {
    render: function (host) {
      props.data.forEach(x => {
        createShortListItem({ item: x }).render(list);
      });
      host.appendChild(list);
    }
  }
}

function createShortListItem(props) {
  const listItem = document.createElement('li');
  const countControl = createLabel({ label: '[ ] ' });
  const nameControl = createLabel({ label: props.item });
  return {
    render: function (host) {
      countControl.render(listItem);
      nameControl.render(listItem);
      host.appendChild(listItem);
    }
  }
}

function createShortListPrintContainer() {
  const container = document.createElement('div');
  container.className = 'print';

  return {
    render: function (host) {
      host.appendChild(container);
    },
    setValue(data) {
      clearElement(container);
      const list = createContainerWithTitle({
        children: [createShortList({ data: data.items })],
        titleSelector: 'h5',
        title: `${data.shop}:`,
        className: 'short-list'
      });
      list.render(container);
    }
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function appStart(todos) {
  if (store.getData('categories').length === 0) {
    store.setData('categories', ['', 'warzywa i owoce', 'napoje', 'pieczywo']);
  }
  if (store.getData('shops').length === 0) {
    store.setData('shops', ['Społem', 'Lidl', 'Żabka', 'Warzywniak']);
  }

  const categories = store.getData('categories');
  const shops = store.getData('shops');

  const appHost = document.getElementById('app');
  clearElement(appHost);
  const app = createApp({ todos, categories, shops });
  app.render(appHost);
}

appStart(store.getData('todos'));