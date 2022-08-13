import { useState, useEffect,ChangeEvent } from 'react';
import './App.css';
import CardList from './components/card-list/CardList.component';
import SearchBox from './components/search-box/SearchBox.component';
import { getData } from './data.utils';
export type Monster ={
id:string;
name:string;
email:string;
}
const App = () => {
  const [searchMonster, setsearchMonster] = useState('');//searchMonster
  const [monsters, setMonsters] = useState<Monster[]>([]);//monsters
  const [filteredMonster,setFilteredMonster] = useState(monsters);//filteredMonsters

  const onSearchChangeHandler = (event:ChangeEvent<HTMLInputElement>):void => {
    const search = event.target.value.toUpperCase();
    setsearchMonster(search);
   
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
 const fetchUsers = async()=>{
  try{
    const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
    setMonsters(users);
  }catch(err){
    console.log(err);
  }
 }
 fetchUsers();
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
export default App;
