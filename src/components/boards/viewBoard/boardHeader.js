import React, {useState} from 'react'
import AddIcon from '@material-ui/icons/Add';
import {
  withStyles
} from '@material-ui/core/styles';
import {
    Fab, Toolbar, AppBar,
    Typography, Button, 
    TextField, Dialog, DialogActions, 
    DialogContent, DialogTitle
} from '@material-ui/core';
import {ViewBoardContextConsumer} from './viewBoardContext'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
function BoardHeader(props) {
  const { classes } = props;
  const [modalOpen, setToggleModal] = useState(false)
  const [newListName, setNewListName] = useState('')
    function handleChange(e) {
        setNewListName(e.target.value)
    }

    function handleAdd(context, event) {
        event.preventDefault();
        context.AddListColumn(newListName)
        setToggleModal(false)
    }

    function handleClickOpen(){
        setToggleModal(true)
    };

    function handleClose(){
        setToggleModal(false)
    };
    return (
        <ViewBoardContextConsumer>
        {(context) => (
            
            <div className={classes.root}>
            <AppBar color="default" position="static">
                <Toolbar>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    {props.title}
                </Typography>
                <Fab onClick={handleClickOpen} size='small' color="primary" aria-label="Add" className={classes.fab}>
                    <AddIcon/>
                </Fab>
                </Toolbar>
            </AppBar>
            <Dialog
                maxWidth='md'
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Add list</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Add a new List"
                    type="text"
                    fullWidth
                    value={newListName}
                    onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={(e)=>handleAdd(context, e)} color="primary">
                    Add
                    </Button>
                </DialogActions>
                </Dialog>
                
            </div>
        )}
        </ViewBoardContextConsumer>
    )
}

export default withStyles(styles)(BoardHeader)
