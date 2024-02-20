import axios from 'axios'
import {allplayerclass} from '../data/data'
import { useState } from 'react'
const PlayerClass =  () => {
  const [updatePlayerclass,setupdatePlayerclass]=useState('off');
  const [deletePlayerclass,setdeletePlayerclass]=useState('off');
  const [NewPlayerclass,setNewPlayerclass]=useState('off');
  if(NewPlayerclass==='on'){
    let newClass =document.querySelector('.newPlayer').value;
    let playerExplian= document.querySelector('.newPlayerExplain').value;
    console.log(playerExplian);
    try{
      const response=  axios.post(`https://www.playwith5.com/el3b-server/api/v1/playerclass/`,{
        playerclass:newClass,
        briefExplian:playerExplian
      }).then((res)=>{
        window.alert('done');
      })
    }
    catch(err){
      console.log(err)

    }
    document.querySelector('.newPlayer').value="";
    setNewPlayerclass('off');
  }
  if(updatePlayerclass==='on'){
    let oldClass=document.getElementById('updateplayers').value;
    let newClass =document.querySelector('.updateClass').value;
    try{
      const response=  axios.patch(`https://www.playwith5.com/el3b-server/api/v1/playerclass/?class="${oldClass}"`,{
        playerclass:newClass
      }).then((res)=>{
        window.alert('done');
      })
    }
    catch(err){
      console.log(err)

    }
    document.querySelector('.updateClass').value="";
    setupdatePlayerclass('off');
  }

  if(deletePlayerclass==='on'){
    let oldClass=document.getElementById('deleteplayers').value;
    try{
      const response=  axios.delete(`https://www.playwith5.com/el3b-server/api/v1/playerclass/?class="${oldClass}"`).then((res)=>{
        window.alert('done');
      })
    }
    catch(err){
      console.log(err)

    }
    setdeletePlayerclass('off');
  }
  return (
    <div className='PlayerClass_container'>
        <div className="header">
            <h3>Plyer class :</h3>
        </div>
        <div className="body">
          <h3>current player class current</h3>
          <div className='current_player'>
            {
              allplayerclass.map((ele,index)=>{
                return(
                  <h4 key={index}>
                    {ele.playerclass}
                  </h4>
                )
              })
            }
          </div>

        </div>
        <div className='newPLayer'>
          <h2>Create new player class :</h2>
          <input type="text" name="player" className='newPlayer' id="" placeholder='new player class' />
          <input type="text" name="playerExplain" className='newPlayerExplain' id="" placeholder='player class explain' /> 
          <button onClick={()=>setNewPlayerclass('on')}>Create</button>
        </div>
        <div className="editePlayer">
          <h2>update player Class :</h2>
          <select name="updateplayers" id="updateplayers">
            {
              allplayerclass.map((ele,index)=>{
                return(
                  <option key={index} value={ele.playerclass}>
                      {ele.playerclass}
                  </option>
                )
              })
            }
            
          </select>
          <input type="text" className='updateClass' placeholder='player Class new name' />
          <button onClick={()=>setupdatePlayerclass('on')}>update</button>
        </div>
        <div className="deletePlayer">
          <h2>delete player Class :</h2>
          <select name="deleteplayers" id="deleteplayers">
            {
              allplayerclass.map((ele,index)=>{
                return(
                  <option key={index} value={ele.playerclass}>
                      {ele.playerclass}
                  </option>
                )
              })
            }
            
          </select>
          <button onClick={()=>setdeletePlayerclass('on')}>delete</button>
        </div>
        
    </div>
  )
}

export default PlayerClass