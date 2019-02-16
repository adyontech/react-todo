import React from 'react'
import  {ViewBoardContextConsumer} from "../viewBoardContext";
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd'

function toggleComplete(e, cardId, context, {
    blockId
}) {
    e.preventDefault();
    context.toggleCompleteCard(cardId, context.currentBoard, blockId)
}


function cardMain(props) {
  return (
    <div>
     <ViewBoardContextConsumer>{(context) => (
      (props.block.card === undefined || props.block.card.length === 0) ?
        (<div>No card here, Add a new one!</div>)
        :
        (props.block.card.map((el) => (
          
          <Draggable
            key={el.id.toString()}
            draggableId={el.id}
            index={el.id}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                    <div key={el.id.toString()} style={{height: '20px', backgroundColor: '#f5f5f5', margin: '10px auto', fontSize:'20px', cursor:'pointer'}}>
                          <div  onClick={(e) => toggleComplete(e,el.id, context, {blockId: props.block.id})} >
                          {(el.completed === false)? 
                              <span>{el.name} </span>:
                              <strike>{el.name} </strike>
                              }
                          </div>
                    </div>
                </div>
            )}
          </Draggable>
       )))
    )}</ViewBoardContextConsumer>
    </div>
  )
}

export default cardMain
