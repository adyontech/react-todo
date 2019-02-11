import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Grid,Button,Typography, TextField} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import {BoardContextConsumer} from '../boardContext'

const styles = {
    textField: {
        marginLeft:  10,
        marginRight: 10,
        width: 200,
    }, button: {
        margin: 4,
    }, 
}
function addingBoard(props) {
    const [boardName, setBoardName] = useState('')
    function toggleCard() {
        props.handler()
    }
    function handleChange(e){
        setBoardName(e.target.value)
    }
    function addBoard(context, event) {
        event.preventDefault();
        context.updateList(boardName)
        setBoardName('')
    }
    return ( <BoardContextConsumer>
     {(context) => (
            <Card style={{ border:"1px dashed green"}}>
                <CardContent>
                    <Grid  container   direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={9} >  <Typography component="div"> <div style={{fontSize:'16px'}}> Give a name to board </div> </Typography></Grid>
                        <Grid item xs={3}><Close style={{cursor:'pointer'}} onClick = {toggleCard}></Close></Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={7}>
                            <TextField
                                id="standard-name"
                                label="Name"
                                style={styles.textField}
                                value={boardName}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </Grid>       
                    </Grid>
                    <Grid style={{marginTop:'15px'}}  container   direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={5}>
                        
                        <Button onClick = {toggleCard} variant="contained" color="primary" style={styles.button}>
                            Close
                        </Button>
                        </Grid>
                        <Grid item xs={5}>
                        <Button disabled={boardName.length===0} variant="contained" onClick={(e) => addBoard(context,e)}  color="primary" style={[styles.button, {marginLeft:'2px'}]}>
                            Add
                        </Button>
                            </Grid>
                        </Grid>
                </CardContent>
            </Card>  )}
     </BoardContextConsumer>
         
    )
};
export default addingBoard
