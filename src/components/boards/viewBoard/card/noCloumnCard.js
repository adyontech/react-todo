import React, {useState} from 'react'
import  {ViewBoardContextConsumer} from "../viewBoardContext";
import { Grid, Typography,Button,TextField, Card, CardContent} from '@material-ui/core';



function noCloumnCard() {
  const [newListName, setNewListName] = useState('')
  function handleListAdd(event, context) {
      if (newListName.length === 0) return
      event.preventDefault();
      context.AddListColumn(newListName)
      setNewListName('')
  }

  function handleListChange(e) {
      setNewListName(e.target.value)
  }

  return (
    <div> 
    <ViewBoardContextConsumer>
        {(context) => (
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
        </Card> )}
        </ViewBoardContextConsumer>
    </div>
  )
}

export default noCloumnCard
