import { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/card-list/CardList.component';
import SearchBox from './components/search-box/SearchBox.component';
const App = () => {
  const [searchMonster, setsearchMonster] = useState('');//searchMonster
  const [monsters, setMonsters] = useState([]);//monsters
  const [filteredMonster,setFilteredMonster] = useState(monsters);//filteredMonsters

  const onSearchChangeHandler = (event) => {
    const search = event.target.value.toUpperCase();
    setsearchMonster(search);
    //this.setState(() => { return { searchMonster } });
  }
  //componentDidMount() => useEffect
  /*
  React hooks => rerender when state changes** not when it call setState()
  if we use the fetch here without the useEffect, it will rerender everytime the api send the respond 
  because of every time we recieved the monster it get store in defferent place in memory eventhough the value is exactly the same
  but react it determine same value === same memory reference, therefore we will create rerender loops(infinite)
   */
  //useEffect(()={do some changes},[dependencies]) dependencies => props,state whenever dependencies change it will trigger the function
  //if we only want this useEffect to works like componentMount (only run once at the very first time) => set dependencies to []
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>setMonsters(users))
      .catch(err => console.log('fail to fetch monsters'));
  }, [])
  //only filtered monsters any of this happend => monsters change /searchMonster change
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toUpperCase().includes(searchMonster);
    })
    setFilteredMonster(newFilteredMonsters);
  },[monsters,searchMonster]);

  return (<div className="App">
    <h1 className='app-title'>Monster Rolodex</h1>
    <SearchBox
      className='monster-search-box'
      placeholder='search monster'
      onSearchChangeHandler={onSearchChangeHandler} />
    <CardList filteredMonster={filteredMonster} />
  </div>)
}
/*
class App extends Component {

  constructor() {
    super();
    this.state = {
      searchMonster: '',
      monsters: [],
    }
  }
  //only happend once when the component it place on the dom
  componentDidMount() {
    //when you call fetch, it return promise
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users =>
        this.setState(() => { return { monsters: users } }))
      .catch(err => console.log('fail to fetch monsters'));
  }
  onSearchChangeHandler = (event) => {
    //if you name key the same as variable, you don't need to tell the key when sending state
    const searchMonster = event.target.value.toUpperCase();

    this.setState(() => { return { searchMonster } });
  }

  render() {
    console.log('Main render');
    const { monsters, searchMonster } = this.state;
    const { onSearchChangeHandler } = this;
    //includes empty string,"" = return true
    const filteredMonster = monsters.filter((monster) => {
      return monster.name.toUpperCase().includes(searchMonster);
    })
    return (
      <div className="App">
        <h1 className='app-title'>Monster Rolodex</h1>
        <SearchBox
          className='monster-search-box'
          placeholder='search monster'
          onSearchChangeHandler={onSearchChangeHandler} />
        <CardList filteredMonster={filteredMonster} />
      </div>
    );

  }

}*/

export default App;
