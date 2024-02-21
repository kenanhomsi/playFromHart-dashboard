import axios from 'axios'
import { useState ,useEffect} from 'react';
import {allplayerclass} from '../data/data'


const Games = () => {
    const [playerClass,setPlayerClass]=useState(allplayerclass[0].playerclass);
    const [ClassGames,setClassGames]=useState();
    const [GamesNumber,setGameNumber]=useState(0);
    const [updateGame,setupdaupdateGame]=useState('off');
    const [deleteGame,setdeleteGame]=useState('off');
    const [NewGame,setNewGame]=useState('off');
    useEffect(()=>{
        if(playerClass){
        axios.get(`https://www.playwith5.com/el3b-server/api/v1/games/filtering/?name="${playerClass}"`).then((res)=>{
            setClassGames(res.data.deletegame);
            console.log(res.data.deletegame)
            return res
        }).catch(err=>console.log(err));
    }
  },[playerClass])

  // if(ClassGames.length == 0 ){
  //   console.log('empty')
  // }
  // console.log(ClassGames.length);
  if(NewGame==='on'){
    let gameName =document.querySelector('.NewgameName').value;
    let gameExplian= document.querySelector('.NewgameExplain').value;
    let gameUrl= document.querySelector('.NewgameUrl').value;
    let class2=playerClass;
    console.log(gameName,gameExplian,gameUrl,playerClass);
    try{
      const response=  axios.post(`https://www.playwith5.com/el3b-server/api/v1/games`,{
        gameName:gameName,
        briefExplian:gameExplian,
        videoUrl:gameUrl,
        class:class2
      }).then((res)=>{
        window.alert('done');
      })
    }
    catch(err){
      console.log(err)

    }
    document.querySelector('.NewgameName').value="";
    document.querySelector('.NewgameExplain').value="";
    document.querySelector('.NewgameUrl').value="";
    setNewGame('off');
  }

  if(updateGame==='on'){
    let oldGameName=document.querySelector('#updateGameselect').value;
    let gameName =document.querySelector('.updategameName').value;
    let gameExplian= document.querySelector('.updategameExplain').value;
    let gameUrl= document.querySelector('.updategameUrl').value;
    console.log(oldGameName);
    // let class2=playerClass;
    let finalDate={}
    // finalDate.class=class2;
    if(gameName !=''){
        finalDate.gameName=gameName;
    }
    if(gameExplian !=''){
        finalDate.briefExplian=gameExplian;
    }
    if(gameUrl !=''){
        finalDate.videoUrl=gameUrl;
    }
    console.log(finalDate);
    try{
      const response=  axios.patch(`https://www.playwith5.com/el3b-server/api/v1/games/?name="${oldGameName}"`, finalDate ).then((res)=>{
        window.alert('done');
      }).catch((err)=>console.log(err))
    }
    catch(err){
      console.log(err)

    }
    document.querySelector('.updategameName').value="";
    document.querySelector('.updategameExplain').value="";
    document.querySelector('.updategameUrl').value="";
    setupdaupdateGame('off');
  }

  if(deleteGame==='on'){
    let oldClass=document.getElementById('deleteGameselected').value;
    console.log(oldClass);
    try{
      const response=  axios.delete(`https://www.playwith5.com/el3b-server/api/v1/games/?name="${oldClass}"`).then((res)=>{
        window.alert('done');
      })
    }
    catch(err){
      console.log(err)

    }
    setdeleteGame('off');
  }



 
  return (
    <div className='games_container'>
        <div className="header">
            <h3>Games :</h3>
        </div>
        <div className="choessClassName">
            <p>choess class name :</p>
            <select name="playerClass" id="playerClass" onChange={(event)=>setPlayerClass(event.target.value)}>
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
        </div>
       <div className='GetGames'>
       <h2> show game :</h2>
       <div className='showAllGames'>
     
            {
              ClassGames &&
                ClassGames.length !== 0 && 
                
                    <>
                    <p><span>name:</span>{ClassGames[GamesNumber ].gameName}</p><br />
                    <p><span>explain:</span>{ClassGames[GamesNumber ].briefExplian}</p><br />
                    <p ><span>vide url :</span>{ClassGames[GamesNumber ].videoUrl}</p><br />
                    </>
               
             
            }

        </div>
        <div className='numberofgames'>
            {
                ClassGames && ClassGames.map((ele,index)=>{
                    return(
                    <button key={index} value={index} onClick={(event)=>setGameNumber(event.target.value)}>
                            {index}
                    </button>
                )})
            }
        </div>
       </div>
       <div className='newGame'>
        <h2>Create new Game :</h2>
        <label htmlFor="">game name</label>
          <input type="text" name="NewgameName" className='NewgameName' id="" placeholder='new Name for Game'/>
          <label htmlFor="">game explain</label>
          <input type="text" name="NewgameExplain" className='NewgameExplain' id="" placeholder='new explain for Game'/>
          <label htmlFor="">game Url</label>
          <input type="text" name="NewgameUrl" className='NewgameUrl' id="" placeholder='new Url for Game'/>
          <button className='NewSubmitbtn' onClick={()=>setNewGame('on')}>Create</button>
       </div>
       <div className='updateGames'>
        <h2>for update game :</h2>
        <select name="updategames" id="updategames" >
            {
                ClassGames &&
              ClassGames.map((ele,index)=>{
                return(
                  <option key={index} id='updateGameselect' value={ele._id}>
                      {ele.gameName}
                  </option>
                )
              })
            }
          </select>
          <label htmlFor="">game name</label>
          <input type="text" name="gameName" className='updategameName' id="" placeholder='updated Name for Game'/>
          <label htmlFor="">game explain</label>
          <input type="text" name="gameExplain" className='updategameExplain' id="" placeholder='updated explain for Game'/>
          <label htmlFor="">game Url</label>
          <input type="text" name="gameUrl" className='updategameUrl' id="" placeholder='updated Url for Game'/>
          <button className='updateSubmitbtn' onClick={()=>setupdaupdateGame('on')}>update</button>
       </div>
       <div className='deleteGame'>
       <h2>for delete game :</h2>
        <select name="deletegames" id="deletegames" >
            {
                ClassGames &&
              ClassGames.map((ele,index)=>{
                return(
                  <option key={index} id='deleteGameselected' value={ele._id}>
                      {ele.gameName}
                  </option>
                )
              })
            }
          </select>
          <button className='deleteGamebtn' onClick={()=>setdeleteGame('on')}>delete</button>
       </div>
    </div>
  )
}

export default Games