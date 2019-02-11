import React from "react";
import { Link } from "react-router-dom";
import {
  withStyles
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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

function Header(props){
  const { classes } = props;
  return(
  <Link to="/">
    {/* <div style={{ textAlign: "center", textDecoration: "none" }}>
      Hello, welcome to somewhere!
    </div> */}
    <div  className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow} style={{textDecoration:'none'}}>
            GoIn todo
          </Typography>
          <Button color="inherit">Home</Button>
        </Toolbar>
      </AppBar>
    </div>
  </Link>
)};

export default withStyles(styles)(Header);;
