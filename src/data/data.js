import axios from 'axios'

const gamesFornewMerried= await axios.get(`https://game-api-hex6.onrender.com/api/v1/games/filtering/?name="متزوجين جدد"`).then((response)=>{
    return response;
}).catch((err)=>console.log(err));
export let gamesFornewMerriedlist =gamesFornewMerried.data.deletegame;

const gamesForFrends= await axios.get(`https://game-api-hex6.onrender.com/api/v1/games/filtering/?name="عائلة واصدقاء"`).then((response)=>{
    return response;
}).catch((err)=>console.log(err));
export let gamesForFrendslist =gamesForFrends.data.deletegame;



const gamesForChildren= await axios.get(`https://game-api-hex6.onrender.com/api/v1/games/filtering/?name="اطفال"`).then((response)=>{
    return response;
}).catch((err)=>console.log(err));
export let gamesForChildrenlist =gamesForChildren.data.deletegame;

const playerClass= await axios.get(`https://game-api-hex6.onrender.com/api/v1/playerclass/`).then((response)=>{
    return response;
}).catch((err)=>console.log(err));
export let allplayerclass =playerClass.data;