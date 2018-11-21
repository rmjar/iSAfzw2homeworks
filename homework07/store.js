'use strict';

const store = {
  // funkcja wywoływana na zdarzenie kliknięcia [V zatwierdź] 
  // w sekcji 'nowy produkt'
  addNewItem: function (item) {
    const todos = this.getData('todos');

    if (item.name !== '') {
      item.checked = false;
      todos.push(item);

      this.setData('todos', todos);
      appStart(todos);
    }
  },

  // funkcja wywoływana na zdarzenie kliknięcia checkboxa [ ] lub [X] 
  // na elemencie listy 'do kupienia' i 'kupione'
  updateItem: function (item) {
    const todos = this.getData('todos');

    const foundItem = todos.find(x => x.name === item.name);
    foundItem.checked = item.checked;

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia usuń [X] 
  // na elemencie listy 'do kupienia' i 'kupione'
  deleteItem: function (item) {
    // znajdź element item w tablicy todos i go usuń z tablicy
    // item ma strukturę: {checked: boolean, name: string, 
    // category: string, shops: [string]}
    const todos = this.getData('todos');

    // za pomocą funkcji find znajdz element spełniający warunek
    // item.name === x.name
    // przypisz ten element do zmiennej
    const found = todos.find(x => x.name === item.name);
    const indexOfItem = todos.indexOf(found);
    // za pomocą funkcji splice usuń element z tablicy todos
    todos.splice(indexOfItem, 1);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku 
  // [zaznacz wszystkie] w sekcji 'multiakcje'
  checkAll: function () {
    // zmień właściwość checked wszystkich obiektów tablicy 
    // todos na true
    const todos = this.getData('todos');

    // for(let i = 0; i < todos.length; i++ ){
    //   todos[i].checked = true;
    // }
    todos.forEach(x => x.checked = true);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [odznacz wszystkie]
  // w sekcji 'multiakcje'
  uncheckAll: function () {
    // zmień właściwość checked wszystkich obiektów tablicy todos na false
    const todos = this.getData('todos');

    // implementacja
    todos.forEach(x => x.checked = false);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [zamień zaznaczenie]
  // w sekcji 'multiakcje'
  switchSelection: function () {
    // przełącz właściwość checked wszystkich obiektów tablicy todos
    // true zamień na false, a false na true
    const todos = this.getData('todos');
    //todos.forEach(x => x.checked ? false : true);
    todos.forEach(x => x.checked = !x.checked);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [usuń wszystkie]
  // w sekcji 'multiakcje'
  deleteAll: function () {
    // usuń wszystkie elementy tablicy todos
    const todos = this.getData('todos');

    todos = [];
    // todos.length = 0;
    // todos.splice(0, todos.length);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [usuń kupione]
  // w sekcji 'multiakcje'
  deleteBought: function () {
    // usuń elementy tablicy todos, które spełniają warunek checked === true
    let todos = this.getData('todos');

    todos = todos.filter(x => !x.checked);

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia [V zatwierdź] 
  // w sekcji 'filtry'
  filterItems: function (filter) {
    // przefiltruj tablicę todos względem obiektu wejściowego filter
    // obiekt filter ma strukturę: { name: string, category: string, shops: [string] }
    // żeby sprawdzić czy waunek dla shops jest prawdziwy sprawdź, czy jakikolwiek
    // przesłany element znajduje się w obiekcie tabeli todos (funkcja some) 
    let todos = this.getData('todos');
    // 'cola'.indexOf('co') === 0;
    // 'cola'.indexOf('la') === 2;
    // 'cola'.indexOf('lk') === -1;
    todos = todos
      .filter(x => !filter.name || x.name.indexOf(filter.name) >= 0) //jeśli filtr pusty działa pierwsza część z negacją, jeśli wypełniony - sprawdza
      .filter(x => !filter.category || x.category === filter.category)
      .filter(x => !filter.shops || filter.shops.length === 0 || x.shops.some(f => filter.shops.find(y => y === f))); //crazy, nie rozumiem tego!

    appStart(todos);
  },

  // funkcja wywoływana na zdarzenie kliknięcia przycisku [sortuj po nazwie],
  // [sortuj po kategorii] i [sortuj po sklepach] w sekcji 'multiakcje'
  sort: function (prop) {
    // posortuj tablicę todos względem parametru przekazanego w atrybucie prop
    // props == 'name' || 'category' || 'shops'
    // obj.name === obj['name']
    const todos = this.getData('todos');

    // implementacja
    todos.sort((n1, n2) => n1[prop].toString().localeCompare(n2[prop].toString()));

    this.setData('todos', todos);
    appStart(todos);
  },

  // funkcja jest wywoływana podczas renderowania aplikacji (po każdej zmianie na liście)
  // funkcja zwraca listę obiektów o strukturze: { name: string, count: number }, gdzie
  // name to nazwa kategorii, a count to liczba produktów z listy do kupienia w tej kategorii
  getCategoriesSummary: function () {
    const todos = this.getData('todos');

    const summary = todos.reduce(function (acc, curr, i, arr) {
      let name = curr.category;
      if (!acc.hasOwnProperty(name)) {
        acc[name] = 0;
      }
      acc[name]++;
      return acc;
    }, {});

    console.log(summary);

    const summaryCounted = Object.keys(summary).map(k => {
      return {
        name: k,
        count: summary[k]
      };
    });

    return summaryCounted;
    // optumalnie należy najpierw należy przefiltrować tablicę, następnie ją zredukować do obiektu
    // potem wykorzystać funkcję przetwarzania obiektów by zmapować entries, a następnie posortować listę
  },

  // funkcja jest wywoływana podczas renderowania aplikacji (po każdej zmianie na liście)
  // funkcja zwraca listę obiektów o strukturze: { name: string, count: number }, gdzie
  // name to nazwa sklepu, a count to liczba produktów z listy do kupienia w tym sklepie
  getShopsSummary: function () {

    let todos = this.getData('todos');
    const summary = todos.reduce(function (acc, curr, i, arr) {
      for (name of shops) {

      }
      let name = curr.shops.toString();
      if (!acc.hasOwnProperty(name)) {
        acc[name] = 0;
      }
      acc[name]++;
      return acc;
    }, {});

    console.log(summary);

    const summaryCounted = Object.keys(summary).map(k => {
      return {
        name: k,
        count: summary[k]
      };
    });

    return summaryCounted;
    // optumalnie należy najpierw należy przefiltrować tablicę, następnie ją zredukować do obiektu
    // potem wykorzystać funkcję przetwarzania obiektów by zmapować entries, a następnie posortować listę
  },

  // funkcja jest wywoływana na kliknięcie w konkretny sklep 
  // na podsumowaniu listy zakupów (między sekcją 'do kupienia' i 'kupione')
  // do funkcji jest przekazywana nazwa aklepu, który został kliknięty
  // zwróć listę stringów (nazw produktów), które są do kupienia w danym slepie
  // listę posortuj alfabetycznie
  getItemNamesContainingShop: function (shop) {
    return this.getData('todos')
    // filter
    // map
  },

  // funkcja pobierająca dane o podanym kluczu
  // dostępne klucze: 'todos', 'categories', shops'
  getData: function (key) {
    return JSON.parse(localStorage.getItem(key) || '[]')
  },

  // funkcja aktualizująca dane o podanym kluczu i wartości
  // dostępne klucze: 'todos', 'categories', shops'
  // przyjmowane wartości: tablice danych:
  // categories: tablica stringów
  // shops: tablica stringów
  // todos: tablica obiektów o strukturze: 
  // {
  //   checked: boolean,
  //   name: string,
  //   category: string z dostępnych w tablicy categories
  //   shops: tablica stringów z dostępnych w tablicy shops
  // }
  setData: function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}