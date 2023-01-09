import './App.css';
import { Component } from 'react';
import { CardList } from './Component/card-list/card-list.component';
import { SearchBox } from './Component/search-box/search-box.component';
class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };

    //binding our written method, no need for arrow functions
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json()).then(users => this.setState({ monsters: users }));
  }

  //writing our own methods in react and not borrowing from react

  // handleChange(e) {
  //   //javascript by default doesn't set the scope of 'this' keyword
  //   this.setState({ searchField: e.target.value })
  // }

  //but when we use arrow function we don't need to bind it, react automatically
  //sets the scope of 'this' to our component method is called lexicoscoping.


  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1>Monster Rolodox</h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  };
}
export default App;
