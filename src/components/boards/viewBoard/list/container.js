import React,{useState} from 'react'
import  {ViewBoardContextConsumer} from "../viewBoardContext";
import { Grid, IconButton} from '@material-ui/core';
import {Card,CardHeader, CardContent} from '@material-ui/core';
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
// import {
//     DragDropContext,
//     Droppable,
//     Draggable
// } from 'react-beautiful-dnd'

function toggleComplete(e, cardId, currentBoard, context, {blockId}) {
    e.preventDefault();
    context.toggleCompleteCard(cardId, currentBoard, blockId)
}

function renderCard(blockData, currentBoard, context){
    if (blockData.card === undefined) {
        return (<div>No card here, Add a new one!</div>)
    } else{
       return (blockData.card.map((el) => (
       <div key={el.id} style={{height: '20px', backgroundColor: '#f5f5f5', margin: '10px auto', fontSize:'20px', cursor:'pointer'}}>
            <div  onClick={(e) => toggleComplete(e,el.id, currentBoard, context, {blockId: blockData.id})} >
            {(el.completed === false)? 
                <span>{el.name}</span>:
                <strike>{el.name}</strike>
                }
            </div>
       </div>
       )))
    }    
}

function container(props) {
 const [modalOpen, setToggleModal] = useState(false)
 const [newCardName, setNewCardName] = useState('')
 const [newListName, setNewListName] = useState('')
 const [currentBlockId, setCurrentBlockId] = useState(0)
 function handleChange(e) {
     setNewCardName(e.target.value)
 }

 function handleListChange(e){
     setNewListName(e.target.value)
 }

 function handleAdd(event,context) {
    if (newCardName.length === 0) return
    event.preventDefault();
    context.UpdateCard(context.currentBoard.id, currentBlockId , newCardName)
    setToggleModal(false)
    setNewCardName('')

 }

 function handleListAdd(event, context) {
     if (newListName.length === 0) return
     event.preventDefault();
     context.AddListColumn(newListName)
     setNewListName('')
 }

 function handleClickOpen(id) {
     setCurrentBlockId(id)
     setToggleModal(true)
 };

 function handleClose() {
     setToggleModal(false)
 };

return ( 
  <ViewBoardContextConsumer>
    {(context) => (
        <div style = {{whiteSpace: 'nowrap',display: 'flex',flexDirection: 'row',overflowY: 'scroll'}}>     
          {
           context.currentBoard.block !== undefined?
           (
            context.currentBoard.block.map(el => {
             return(
                <div key={el.id} style={{margin: '20px',flex: '1 1 auto'}}>
                    <Card style={{ border:"1px dashed green",margin:'10%', minHeight:'198px', minWidth: '300px', maxWidth:'200px'}}>
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
                        {
                            renderCard(el, context.currentBoard, context)
                        }
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
           ): (
               <Card style={{ border:"1px dashed green",margin:'10%', minHeight:'198px', width:"100%"}}>
                    <CardContent>
                        <Grid  container   direction="column" justify="center" alignItems="center">
                            <Grid item xs={12} >  <Typography component="div"> <div  style={{fontSize:'20px', marginTop:'20px'}}>No current blocks exists, Add one. </div> </Typography></Grid>
                            <Grid item xs={9} style={{marginTop:"5%"}}> 
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Add a new card"
                                type="text"
                                fullWidth
                                value={newListName}
                                onChange={handleListChange}
                                />
                            </Grid>
                            <Grid item xs={9} style={{marginTop:"5%"}}> 
                                <Button onClick={(e)=>handleListAdd(e,context)} color="primary">
                                Add
                                </Button>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
              </Card>
           )
          }
        </div> 
    )}
  </ViewBoardContextConsumer>
                    
  )
}


export default container

