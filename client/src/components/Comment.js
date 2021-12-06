import { React, useContext, useState } from "react";
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
function Comment(props) {
    const { store } = useContext(GlobalStoreContext);

    let text = <p style={{color: 'white'}} className="listview">{props.text}</p>

    let item = 
    <div style={{backgroundColor: 'transparent', borderBottom: '2px solid white'}} className="listcontainer">
        {text}
    </div>

    return item;
}

export default Comment;