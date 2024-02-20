import './App.css'
import logo from './assets/logo.png'
import PlayerClass from './components/PlayerClass'
import Games from './components/Games'
import Customer from './components/Customer'
import axios from 'axios'
import { useEffect, useState } from 'react'
function App() {
  const [dashState,setdashState]=useState('Games')
  const [OrderBtnShowRemove,setOrderBtnShowRemove]=useState('on');
  useEffect(()=>{
    axios.patch('https://www.playwith5.com/el3b-server/api/v1/MainPage/?banner="main"',{
      BayBtn:OrderBtnShowRemove,
    }).then((res)=>{
      window.alert('done');
      console.log(res)
    }).catch((err)=>console.log(err))
  },[OrderBtnShowRemove])
  return (
    <>
    <div className='Navbar'>
     <img src={logo} alt="logo" />
      <div className='menu'>
        <button className='Games' onClick={()=>setdashState('Games')}>player Class & Games</button>
        <button className='Customer' onClick={()=>setdashState('Customer')}>Customer Requsted</button>
      </div>
    </div>
    <div className='mainBody'>
    {dashState==="Games"&&
    <>
    <PlayerClass />    
    <Games />
    </>
    }    
     {dashState==="Customer"&&
    <div className='second_contanier'>
    <div className='order-show_remove'>
    <h2>order button :</h2>
    <div>
      <button onClick={()=>setOrderBtnShowRemove('on')}>show</button>
      <button onClick={()=>setOrderBtnShowRemove('off')}>remove</button>
    </div>
    </div>
    <Customer />
    </div>
    }  
    </div>
      
    </>
  )
}

export default App
