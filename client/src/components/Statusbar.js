import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';
import { ScreenType } from '../store';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    function handleCreate() {
        store.createNewList();
    }

    
    const styles = {
        largeIcon: {
        width: 200,
        height: 200,
        },
    };
  

    let text ="";
    let addListButton = "";
    if (auth.loggedIn) {
        if(store.searchText) {
            text = "searchText " + "Lists"
        }
        else if (store.currentScreen === ScreenType.ALL) {
            text = "All Lists"
        }
        else if (store.currentScreen === ScreenType.HOME) {
            text = "Your Lists";
            addListButton = (
                <IconButton 
                iconStyle={styles.largeIcon}
                disabled={!auth.loggedIn || auth.isGuest || store.currentList}
                sx={{margin: "0px 5px 0px 0px", color: "#f1faee"}} 
                onClick={handleCreate}>
                    <AddCircleOutlineIcon sx={{fontSize: "2em"}}/>
                </IconButton>
            );
        }
    }
    return (
        <div id="top5-statusbar">
            {addListButton}
            <p class="statustext">{text}</p>
            {/* <Typography variant="h4">{text}</Typography> */}
        </div>
    );
}

export default Statusbar;