import React, { useState} from 'react'
import AddBoard from "./addBoard";
import AddingBoard from "./addingBoard";

function AddNewBoard() {
    const [hidden, setHidden] = useState(true);

    function toggleCard(event) {
        setHidden(!hidden)
    }
        return ( <div> 
         {
                hidden ? <AddBoard handler = {
                    toggleCard
                }
                /> :<AddingBoard handler = {
                    toggleCard
                }/>
            } 
            </div>
        )
   
        }

export default AddNewBoard
