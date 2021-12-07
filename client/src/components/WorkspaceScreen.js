import { useContext, useState } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AuthContext from '../auth';
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [newTitle, setNewTitle] = useState(store.currentList.name);
    const [newTexts, setNewTexts] = useState([store.currentList.items[0], store.currentList.items[1],store.currentList.items[2],store.currentList.items[3],store.currentList.items[4]]);
    var userOwned = false;
    const [fieldsCorrect, setFieldsCorrect] = useState(false);

    var tCor = false;
    var iCor = false;
    var fCor = false;

    
    function handleTitleChange(event) {
        console.log(event.target.value);
        setNewTitle(event.target.value);
        if(event.target.value === "" || !checkAlpha(event.target.value.charCodeAt(0))) {
            tCor = false;
        }
        else {
            tCor = true;
        }
        newTexts.forEach(element => {
            if(element === "" || !checkAlpha(element.charCodeAt(0))) {
                iCor = false;
            }
            else {
                iCor = true;
            }
        });
        setFieldsCorrect(tCor && iCor);
    }

    function handleSave() {
        store.changeListName(store.currentList._id, newTexts, newTitle, false);
        handleClose();
    }

    function handlePublish() {
        store.changeListName(store.currentList._id, newTexts, newTitle, true);
        handleClose();

    }

    const updateTexts = (id, text) => {
        newTexts[id] = text;
        if(text === "" || !checkAlpha(text.charCodeAt(0))) {
            iCor = false;
        }
        newTexts.forEach(element => {
            if(element === "" || !checkAlpha(element.charCodeAt(0))) {
                iCor = false;
            }
            else {
                iCor = true;
            }
        });
        if(newTitle === "" || !checkAlpha(newTitle.charCodeAt(0))) {
            tCor = false;
        }
        else {
            tCor = true;
        }
        setFieldsCorrect(tCor && iCor);
    }

    if (store.currentList) {
        userOwned = store.currentList.ownerEmail === auth.user.email;
    }
    const handleClose = () => {
        store.closeCurrentList();
    };

    let listName = "";
    if(store.currentList) {
        listName = store.currentList.name;
    }

    function checkAlpha(code) {
        if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
        }
        return true;
    }

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%'}}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item
                            updateCallback = {updateTexts}
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    }
    return (
        <div id="top5-workspace">
            <Dialog
                    open={!userOwned}
                    // onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >         
                    <DialogTitle id="alert-dialog-title">
                        {"Uh oh!"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {"This isn't your list. You can't make changes here."}
                        </DialogContentText>
                        </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Return
                    </Button>
                    </DialogActions>
                </Dialog>
            <div id="workspace-edit">
                <div id="workspace-top-bar">
                    <div id="savebutton">
                        <Button
                        onClick={handleSave}
                        variant="contained"
                            sx={{width: '33%', color: 'white',backgroundColor: '#1d3557',verticalAlign: 'center', fontSize: 37}}>Save
                        </Button>
                    </div>
                    <div id="edit-title">
                        <TextField 
                            sx={{backgroundColor:'white'}}
                            margin="normal"
                            required
                            fullWidth
                            label="Top 5 List Name"
                            name="name"
                            autoComplete="Top 5 List Name"
                            defaultValue={listName}
                            inputProps={{style: {fontSize: 37}}}
                            InputLabelProps={{style: {fontSize: 24}}}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div id="savebutton">
                        <Button
                        variant="contained"
                        onClick={handlePublish}
                        disabled={!fieldsCorrect}
                        sx={{width: '33%', color: 'white',backgroundColor: '#1d3557',verticalAlign: 'center', fontSize: 37}}>PUBLISH
                        </Button>
                    </div>
                </div>
                <div id="edit-numbering">
                    <div className="item-number">1.</div>
                    <div className="item-number">2.</div>
                    <div className="item-number">3.</div>
                    <div className="item-number">4.</div>
                    <div className="item-number">5.</div>
                </div>
                {editItems}
            </div>
        </div>
    )
}

export default WorkspaceScreen;