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
function Top5Item(props) {
    const [ text, setText ] = useState(props.text);
    const { store } = useContext(GlobalStoreContext);
    
    function handleUpdateText(event) {
        setText(event.target.value);
        props.updateCallback(props.index, event.target.value);
    }

    let item = <TextField
        sx={{backgroundColor:'white'}}
        margin="normal"
        required
        fullWidth
        // id={"list-" + idNamePair._id}
        label="Top 5 Item"
        name="name"
        autoComplete="Top 5 Item"
        // className='list-card'
        defaultValue={props.text}
        inputProps={{style: {fontSize: 37}}}
        InputLabelProps={{style: {fontSize: 24}}}
        autoFocus
        onChange={handleUpdateText}
    />
    return item;
}

export default Top5Item;