import React from 'react'
import {Card, CardContent} from '@material-ui/core';
import {
    Typography,
    Grid,
    Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import ViewBoardProvider,{ViewBoardContextConsumer} from "./viewBoardContext";
import BoardHeader from "./boardHeader";
import ListContainer from "./list/container";

const viewBoard = (props) => {
    const {boardId} = props.match.params
    function showBoard(context){
    let {currentBoard} = context
    if(currentBoard === undefined){
        return (
        <Card style={{ border:"1px dashed green",margin:'10%', minHeight:'198px'}}>
            <CardContent>
                <Grid  container   direction="column" justify="center" alignItems="center">
                <Grid item xs={9} >  <Typography component="div"> <div  style={{fontSize:'20px', marginTop:'20px'}}>The following board do not exists. </div> </Typography></Grid>
                <Grid item xs={9} style={{marginTop:"5%"}}> 
                    <Link to={`/`}>
                        <Button variant="contained" color="primary">
                                Home ?
                        </Button>
                    </Link>
                </Grid>
                </Grid>
                
            </CardContent>
     </Card>)
    } else{

    return (
         <div>
            <BoardHeader title={currentBoard.name}/>
             <ListContainer/>
        </div>
    )}
  }
  return (
    <ViewBoardProvider boardId={boardId}>
         <React.Fragment>
            <div>
              <ViewBoardContextConsumer>
                {(context) => (
                  showBoard(context)
                )}
              </ViewBoardContextConsumer>
            </div> 
        </React.Fragment>
    </ViewBoardProvider>
  )
}

export default viewBoard
