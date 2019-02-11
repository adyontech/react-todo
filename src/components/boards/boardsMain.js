import React from 'react';
import AddNewBoard from "./addBoard/addNewBoard";
import BoardCard from './boardsCard'
import {Grid} from '@material-ui/core';
import BoardProvider,{BoardContextConsumer} from "./boardContext";
function BoardMain (){
    function renderBoardItems(context){
        let {AllBoardsItems} = context
        if (AllBoardsItems !== undefined && AllBoardsItems !== '' && AllBoardsItems !== null) {
            if (typeof AllBoardsItems === 'string'){
                 AllBoardsItems = JSON.parse(AllBoardsItems)
            }
            return (
                AllBoardsItems.map(boardData => {
                            return (
                <Grid item xs={3} style={{padding:'5px'}}  key={boardData.id}> 
                    <BoardCard board={boardData}/>
                </Grid>
                )
                })            
            )
        }
    }
    return ( 
        <div> 
        <BoardProvider>
            <React.Fragment>
                <Grid style={{ margin: '20px auto', padding: '20px 40px',}}  container   direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid item xs={3} style={{padding:'5px'}}> 
                        <AddNewBoard/> 
                    </Grid> 
                    <BoardContextConsumer>
                        {(context) => (
                                renderBoardItems(context)
                        )}
                    </BoardContextConsumer>
                </Grid>
            </React.Fragment>
        </BoardProvider>
        </div>
        );
}

export default BoardMain;