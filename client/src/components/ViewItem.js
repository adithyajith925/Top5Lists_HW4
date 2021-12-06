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
    // let item = <TextField

    //     margin="normal"
    //     required
    //     fullWidth
    //     // id={"list-" + idNamePair._id}
    //     label="Top 5 Item"
    //     name="name"
    //     autoComplete="Top 5 Item"
    //     // className='list-card'
    //     defaultValue={props.text}
    //     inputProps={{style: {fontSize: 48}}}
    //     InputLabelProps={{style: {fontSize: 24}}}
    //     autoFocus   
    // />

    // let item = <Box
    //         sx={{ marginTop: '15px', display: 'flex', p: 1, backgroundColor: 'rgba(69, 123, 157, .5)', borderRadius: '25px',
    //         fontFamily: "'Rubik', sans-serif"}}
    //         button
    //         style={{
    //             fontSize: '24pt',
    //             width: '100%',
    //             marginBottom: '20px'
    //         }}
    // >
    // </Box>

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