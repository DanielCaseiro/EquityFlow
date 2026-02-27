import { useState, type ChangeEvent, type FormEvent } from 'react'
import './App.css'
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search'

function App() {
  const [count, setCount] = useState(0)

  const [searchString, setSearchString] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchString);
  };

  return (
    <div className='App'>
      <Search 
      searchString={searchString}
      handleSearchChange={handleSearchChange}
      onSearchSubmit={onSearchSubmit}
      />
      <CardList />
    </div>

  )
}

export default App
