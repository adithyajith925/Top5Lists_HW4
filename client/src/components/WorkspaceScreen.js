import { useContext } from 'react'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
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
    var userOwned = false;
    if (store.currentList) {
        userOwned = store.currentList.ownerEmail === auth.user.email;
    }
    const handleClose = () => {
        store.closeCurrentList();
    };

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%'}}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5Item 
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
                            defaultValue={store.currentList.name}
                            inputProps={{style: {fontSize: 37}}}
                            InputLabelProps={{style: {fontSize: 24}}}
                        />
                    </div>
                    <div id="savebutton">
                        <Button
                        variant="contained"
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