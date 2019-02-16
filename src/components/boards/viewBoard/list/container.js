import React,{useState} from 'react'
import  {ViewBoardContextConsumer} from "../viewBoardContext";
import {Card,CardHeader, IconButton, CardContent} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
    Typography,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import CardMain from '../card/cardMain';
import NoColumnCard from '../card/noCloumnCard'
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd'

function container(props) {
 const [modalOpen, setToggleModal] = useState(false)
 const [newCardName, setNewCardName] = useState('')
 const [currentBlockId, setCurrentBlockId] = useState(0)
 function handleChange(e) {
     setNewCardName(e.target.value)
 }

 function handleAdd(event,context) {
    if (newCardName.length === 0) return
    event.preventDefault();
    context.UpdateCard(context.currentBoard.id, currentBlockId , newCardName)
    setToggleModal(false)
    setNewCardName('')

 }

 

 function handleClickOpen(id) {
     setCurrentBlockId(id)
     setToggleModal(true)
 };

 function handleClose() {
     setToggleModal(false)
 };


   function onDragEnd(result,context) {
        const { source, destination, draggableId } = result;
        if (!destination) return
           

        if (destination.droppableId === source.droppableId && destination.index === source.index) return
          
        if (destination.droppableId !== source.droppableId) {
            let removedCard;
            context.currentBoard.block.map(el=>{
                if (parseInt(source.droppableId) === el.id) {
                    let tileIndex ;
                    el.card.map((cardData, index)=>{
                        if( cardData.id === draggableId){
                            removedCard = cardData;
                            tileIndex = index
                        }
                    })
                    el.card.splice(tileIndex, 1)
                }
            })
            context.currentBoard.block.map(el => {
                   if (parseInt(destination.droppableId) === el.id) {
                    
                    if(el.card === undefined){
                        el.card = [removedCard]
                    }else{
                        if(el.card.length === 0){
                          el.card.push(removedCard)
                        }else{
                          el.card = [...el.card, removedCard]
                        }
                    }
                }
            })
            context.updateCardPosition(context.currentBoard)
        }
    };


return ( 
  <ViewBoardContextConsumer>
    {(context) => (
        <div style = {{whiteSpace: 'nowrap',display: 'flex',flexDirection: 'row',overflowY: 'scroll'}}>     
          {
           context.currentBoard.block !== undefined?
           (
               <DragDropContext  onDragEnd={(e)=>onDragEnd(e, context)}>
                   {
                        context.currentBoard.block.map(el => {
                            return(
                                <div key={el.id} style={{margin: '20px',flex: '1 1 auto'}}>
                                  <Card style={{ border:"1px dashed green",margin:'10%'}}>
                                    <CardHeader style={{borderBottom: '1px solid black'}}
                                        action={
                                            <IconButton
                                            onClick={(e)=>handleClickOpen(el.id)}
                                            >
                                            <AddIcon />
                                            </IconButton>
                                        }
                                        title={el.blockName} 
                                        />
                                        <CardContent>
                                            <Droppable droppableId={el.id.toString()}>
                                                {(provided, snapshot) => (
                                                    <div style={{minHeight:'198px', minWidth: '300px', maxWidth:'200px'}} ref={provided.innerRef}>
                                                        <CardMain block={el} />
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </CardContent>
                                  </Card>
                                <Dialog
                                    maxWidth='md'
                                    open={modalOpen}
                                    onClose={handleClose}
                                    aria-labelledby="form-dialog-title"
                                    >
                                    <DialogTitle id="form-dialog-title">Add new card</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Add a new card"
                                        type="text"
                                        fullWidth
                                        value={newCardName}
                                        onChange={handleChange}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                        Cancel
                                        </Button>
                                        
                                        <Button onClick={(e)=>handleAdd(e,context)} color="primary">
                                        Add
                                        </Button>
                                    </DialogActions>
                                    </Dialog>
                                            
                                </div>
                            )
                        })
                    }                  
                    </DragDropContext>
            
           ): (
               <NoColumnCard/>
           )
          }
        </div> 
    )}
  </ViewBoardContextConsumer>
  )
}


export default container

