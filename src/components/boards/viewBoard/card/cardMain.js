import React from 'react'
import  {ViewBoardContextConsumer} from "../viewBoardContext";


function toggleComplete(e, cardId, context, {
    blockId
}) {
    e.preventDefault();
    context.toggleCompleteCard(cardId, context.currentBoard, blockId)
}


function cardMain(props) {
  return (
    <div>
     <ViewBoardContextConsumer>
    {(context) => (
      props.block.card === undefined ?
        (<div>No card here, Add a new one!</div>)
        :
        (props.block.card.map((el) => (
       <div key={el.id} style={{height: '20px', backgroundColor: '#f5f5f5', margin: '10px auto', fontSize:'20px', cursor:'pointer'}}>
            <div  onClick={(e) => toggleComplete(e,el.id, context, {blockId: props.block.id})} >
            {(el.completed === false)? 
                <span>{el.name}</span>:
                <strike>{el.name}</strike>
                }
            </div>
       </div>
       )))
    )}
  </ViewBoardContextConsumer>
    </div>
  )
}

export default cardMain
