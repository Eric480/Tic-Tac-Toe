import { useState } from "react";

export default function Player({Initialname,symbol,isActive,onChangeName}){

    const [isEditing,setIsEditing] = useState(false)
    const [playerName,setPlayerName] = useState(Initialname)

    function HandleChange(event){
        setPlayerName(event.target.value)
    }

    function HandleClick(){
        setIsEditing((editing) => !editing);

        if (isEditing){
            onChangeName(symbol,playerName)
        }
    }
    
    let editName = <span className="player-name">{playerName}</span>
    let editContent = "Edit"
        
    if (isEditing){
        editName = <input type="text" required value = {playerName} onChange={HandleChange} />
        editContent= "Save"
    }

    return(
        <>
            <li className={isActive ? "active" : undefined} >
                <span className="player">
                    {editName}
                    <span className="player">{symbol}</span>
                </span>
                <button onClick={HandleClick}>{editContent}</button>
            </li>
        </>
    );
}