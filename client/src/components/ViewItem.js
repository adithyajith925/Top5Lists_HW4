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
function ViewItem(props) {
    const { store } = useContext(GlobalStoreContext);

    let text = <p style={{color: 'white'}} className="listview">{props.index + 1 + ". " + props.text}</p>

    let item = 
    <div className="listcontainer">
        {text}
    </div>

    if(props.index === 0) {
        item = 
        <div style={{borderRadius: '25px 25px 0px 0px'}} className="listcontainer">
            {text}
        </div>
    }

    if(props.index === 4) {
        item = 
        <div style={{borderRadius: '0px 0px 25px 25px'}} className="listcontainer">
            {text}
        </div>
    }

    return item;
}

export default ViewItem;