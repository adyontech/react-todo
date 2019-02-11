import React, { useState } from 'react'
const BoardContext = React.createContext();

export default function BoardProvider(props){
 const [AllBoardsItems, updateAllBoardsItems] = useState(localStorage.getItem('AllBoards'));
 let ParsedAllBoardsItems = []

 if (AllBoardsItems !== undefined && AllBoardsItems !== null) {
  if(typeof AllBoardsItems === 'string'){
   ParsedAllBoardsItems = JSON.parse(AllBoardsItems)
  } else {
    ParsedAllBoardsItems = AllBoardsItems
  }
 }


 function updateBoardListItem(boardName) {
    let newBoard = {id: new Date().getTime(), name: boardName}
    ParsedAllBoardsItems = [...ParsedAllBoardsItems, newBoard]
    updateAllBoardsItems(ParsedAllBoardsItems)
    localStorage.setItem('AllBoards', JSON.stringify(ParsedAllBoardsItems));
 }

 return (
      <div>
        <BoardContext.Provider value={{AllBoardsItems ,updateList:updateBoardListItem}}> 

        <React.Fragment>{props.children}</React.Fragment>
        </BoardContext.Provider>
      </div>
    )
}

export const BoardContextConsumer = BoardContext.Consumer;
