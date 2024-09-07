import Player from "./Components/Player.jsx"
import Gameboard from "./Components/Gameboard.jsx";
import GameOver from "./Components/Gameover.jsx";
import { useState } from "react";
import Log from "./Components/log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  
  return currentPlayer
}

function deriveWinner(gameboard,players){
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol && 
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
      winner= players[firstSquareSymbol]
    }
  }
  return winner
}

function deriveGameboard(gameTurns){
  let gameboard = [...initialGameBoard.map(array=>[...array])]
  for (const turn of gameTurns){

      const {square,player} = turn
      const {row,col} = square

      gameboard[row][col] = player
  }
  return gameboard
}

function App() {

  const [gameTurns,setgameTurns] = useState([])
  const [players,setplayers] = useState({
    X: "Player 1",
    O: "Player 2",
  })

  let activePlayer = deriveActivePlayer(gameTurns) 

  let gameboard = deriveGameboard(gameTurns)
  
  let winner = deriveWinner(gameboard,players)

  let hasDraw = gameTurns.length === 9 && !winner

  function HandleSelectSquare(rowIndex,colIndex){    
    setgameTurns((prevTurns)=>{

      let activePlayer = deriveActivePlayer(prevTurns)    

      let updatedGames = [{ square: {row: rowIndex, col: colIndex}, player:activePlayer },...prevTurns,]

      return updatedGames
    })
  }

  function Restart(){
    setgameTurns([])
  }

  function setPlayerNameChange(symbol,newname){
    setplayers(prevname =>{
      return{
        ...prevname,
        [symbol]: newname
      } 
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id = "players" className="highlight-player">
          <Player Initialname = "Player 1" symbol = "X" isActive = {activePlayer==='X'} onChangeName={setPlayerNameChange}/>
          <Player Initialname = "Player 2" symbol = "O" isActive = {activePlayer==='O'} onChangeName={setPlayerNameChange}/>
        </ol>
        {(winner||hasDraw) && <GameOver winner = {winner} restart = {Restart}/>}
        <Gameboard gameBoard={gameboard} onSelectSquare={HandleSelectSquare} turns = {gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
