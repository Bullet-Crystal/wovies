import { useState } from 'react'
import SearchBar from'./components/SearchBar.jsx'
import Body from './components/Body.jsx'
import Footer from './components/Footer.jsx'

import './App.css'

function App() {
  const [selected, setSelected] = useState('https://tgb4.top15top.shop/va8u2khusgep/Hulk.2003.1080p.BluRay.MyCima.TO.mp4.html?Key=WT4NOq-jlKGRr8BMG4wHVA&Expires=1753385767');
  const [servers, setServers] = useState([]);
  const [host, setHost] = useState('https://efb64c0e9004.ngrok-free.app');
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBar selected={selected} setSelected = {setSelected} servers={servers} setServers={setServers} host={host} setHost={setHost}/>
      <Body selected={selected} setSelected = {setSelected} servers={servers} setServers={setServers}/>
      {/* <Footer /> */}
    </div>
  )
}

export default App
