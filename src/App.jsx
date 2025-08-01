import { useState } from 'react'
import SearchBar from'./components/SearchBar.jsx'
import Body from './components/Body.jsx'
import Footer from './components/Footer.jsx'

import './index.css'

function App() {
  const [selected, setSelected] = useState({'link':null});
  const [servers, setServers] = useState([]);
  const [seasonsLinks, setseasonsLinks] = useState([]);
  const [series, setSeries] = useState(false);
  const [host, setHost] = useState('http://192.168.220:5000');
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBar selected={selected} setSelected = {setSelected} servers={servers} setServers={setServers} host={host} setHost={setHost} series={series} setSeries={setSeries} seasonsLinks={seasonsLinks} setseasonsLinks={setseasonsLinks}/>
      <Body selected={selected} setSelected = {setSelected} servers={servers} setServers={setServers} host={host} setHost={setHost} series={series} setSeries={setSeries} seasonsLinks={seasonsLinks} setseasonsLinks={setseasonsLinks}/>
      {/* <Footer /> */}
    </div>
  )
}

export default App
