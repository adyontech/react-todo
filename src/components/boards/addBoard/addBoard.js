import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Typography, Grid, Button} from '@material-ui/core';
function AddBoard(props){
    
    function toggleCard() {
        props.handler()
    }
    return ( 
    <Card style={{ border:"1px dashed green", minHeight:'198px'}}>
      <CardContent>
         <Grid  container   direction="column" justify="center" alignItems="center">
          <Grid item xs={9} >  <Typography component="div"> <div  style={{fontSize:'20px', marginTop:'20px'}}> Add a new Board? </div> </Typography></Grid>
          <Grid item xs={9} >  <Button variant="contained" onClick = {toggleCard} color="primary" style={{margin:'40px auto'}}>
            Add Board
        </Button></Grid>
         </Grid>
        
      </CardContent>
     </Card>
    )
    
};

export default AddBoard
