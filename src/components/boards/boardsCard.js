import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {BoardContextConsumer} from './boardContext'
import {
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
function AllBoards(props){
const {id, name} = props.board
    return(
    <BoardContextConsumer>
     {(context) => (
        <Card style={{ border:"1px dashed green", minHeight:'198px'}}>
            <CardContent>
                <Grid  container   direction="column" justify="center" alignItems="center">
                <Grid item xs={9} >  <Typography component="div"> <div style={{fontSize:'20px', marginTop:'20px'}}> {name} </div> </Typography></Grid>
                <Grid item xs={9} > 
                    <div style={{margin: '40px auto'}}>
                        <Link to={`/view/${id}`}>
                                <Button variant="contained" color="primary">
                                     View board
                                </Button>
                        </Link>
                    </div>
                </Grid>
                </Grid>
            </CardContent>
        </Card>  
       )}
     </BoardContextConsumer>
    )
}

export default AllBoards;
