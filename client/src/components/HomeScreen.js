import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    var lname = "";
    if (store.listMarkedForDeletion) {
        lname = store.listMarkedForDeletion.name;
    }

    // useEffect(() => {
    //     store.loadIdNamePairs(store.currentScreen);
    // }, []);

    const handleConfirm = () => {
        store.deleteMarkedList();
    };

    const handleCancel = () => {
        store.unmarkListForDeletion();
    }

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '100%', left: '0%', bgcolor: 'background.paper'}}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }
    return (
        <div id="top5-list-selector">
            <Dialog
                open={store.listMarkedForDeletion}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >         
                <DialogTitle id="alert-dialog-title">
                    {"Confirm deletion!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {"Are you sure you want to delete the Top 5 " + lname +" List?"}
                    </DialogContentText>
                    </DialogContent>
                <DialogActions>
                <Button onClick={handleConfirm} autoFocus>
                    Yes, delete
                </Button>
                <Button onClick={handleCancel} autoFocus>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
            {/* <div id="list-selector-heading">
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography variant="h2">Your Lists</Typography>
            </div> */}
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
        </div>)
}

export default HomeScreen;