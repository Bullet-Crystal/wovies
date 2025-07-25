import { useState } from 'react'
import SearchBar from'./components/SearchBar.jsx'
import Body from './components/Body.jsx'
import Footer from './components/Footer.jsx'

import './App.css'

function App() {
  const [selected, setSelected] = useState({'link':null});
  const [servers, setServers] = useState([]);
  const [host, setHost] = useState('https://proud-spiders-strive.loca.lt');
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBar selected={selected} setSelected = {setSelected} servers={servers} setServers={setServers} host={host} setHost={setHost}/>
      <Body selected={selected} setSelected = {setSelected} servers={servers} setServers={setServers}/>
      {/* <Footer /> */}
    </div>
  )
}

export default App
