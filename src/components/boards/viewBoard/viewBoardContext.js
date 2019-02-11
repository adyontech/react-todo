import React, { useState } from 'react'
const ViewBoardContext = React.createContext();

export default function ViewBoardProvider(props){
  const {boardId} = props
  const [AllBoardsItems, updateAllBoardsItems] = useState(localStorage.getItem('AllBoards'));
  let currentBoard;
  let ParsedAllBoardsItems = []
  if (AllBoardsItems !== undefined && AllBoardsItems !== null ){
    if (typeof AllBoardsItems === 'string') {
    ParsedAllBoardsItems = JSON.parse(AllBoardsItems)
    } else {
      ParsedAllBoardsItems = AllBoardsItems
    }
  }
  // ParsedAllBoardsItems.map(el => {
  //   if(el.id === parseInt(boardId)){
  //         currentBoard = el
  //     }
  // })
  currentBoard = ParsedAllBoardsItems.filter(el => {
    return el.id === parseInt(boardId)
  })[0]
  function AddListColumn(newBlockName) {
    let newList = {
      blockName: newBlockName,
      id: new Date().getTime(),
    }
    currentBoard = ParsedAllBoardsItems.map(el => {
      if (el.id === parseInt(boardId)) {
       if(el.block === undefined){
        el.block = [newList]
       }else{
        el.block = [...el.block, newList]
      }
    }
    return el
    })[0]
    updateAllBoardsItems(JSON.stringify(ParsedAllBoardsItems))
    localStorage.setItem('AllBoards', JSON.stringify(ParsedAllBoardsItems));
 }

 function AddBoardCardItem(mainBoardId, currentBlockId, cardName) {
   let newCard = {
     id: new Date().getTime(),
     name: cardName,
     completed: false
   }
   
  currentBoard = ParsedAllBoardsItems.map(el => {
     if (el.id === parseInt(mainBoardId)) {
       if (el.block === undefined) {
        return false
       } else {
        el.block.map(block => {
          if(block.id === currentBlockId){
           if (block.card === undefined) {
             block.card = [newCard]
           } else {
             block.card = [...block.card, newCard]
            }
          }
          return null
        })
      }
    }
    return el
   })[0]
   updateAllBoardsItems(JSON.stringify(ParsedAllBoardsItems))
   localStorage.setItem('AllBoards', JSON.stringify(ParsedAllBoardsItems));
 
  }

  function toggleCompleteCard(cardId, currentBoardData, blockId) {
   currentBoard = ParsedAllBoardsItems.map(el => {
      if (el.id === parseInt(currentBoardData.id)) {
        if (el.block === undefined) {
          return false
        } else {
          el.block.map(block=> {
            if (block.id === blockId) {
              if (block.card === undefined) {
                return false
              } else {
                block.card.map(cardItem=>{
                  if (cardItem.id === cardId) {
                    cardItem.completed = !cardItem.completed
                  }
                  return false
                })
              }
            }
            return false
          })
        }
      }
      return el
    })[0]
    updateAllBoardsItems(JSON.stringify(ParsedAllBoardsItems))
   localStorage.setItem('AllBoards', JSON.stringify(ParsedAllBoardsItems));
 
  }


 return (
      <div>
        <ViewBoardContext.Provider value={{AddListColumn:AddListColumn, currentBoard,toggleCompleteCard, UpdateCard:AddBoardCardItem}}> 
          <React.Fragment>{props.children}</React.Fragment>
        </ViewBoardContext.Provider>
      </div>
    )
}

export const ViewBoardContextConsumer = ViewBoardContext.Consumer;