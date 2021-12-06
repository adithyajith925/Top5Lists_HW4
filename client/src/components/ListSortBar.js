import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import EditToolbar from './EditToolbar'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FunctionsIcon from '@mui/icons-material/Functions';
import Button from '@mui/material/Button';
import { ScreenType } from '../store';
import TextField from '@mui/material/TextField';
import SortIcon from '@mui/icons-material/Sort';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function ListSortBar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';

    const sortMenu =(
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            >

                <MenuItem onClick={handleMenuClose}>Publish Date (Newest)</MenuItem>
                <MenuItem onClick={handleMenuClose}>Publish Date (Oldest)</MenuItem>
                <MenuItem onClick={handleMenuClose}>Views</MenuItem>
                <MenuItem onClick={handleMenuClose}>Likes</MenuItem>
                <MenuItem onClick={handleMenuClose}>Dislikes</MenuItem>
            </Menu>
    )

    function handleHome() {
        store.loadIdNamePairs(ScreenType.HOME);
    }

    function handleAll() {
        store.loadIdNamePairs(ScreenType.ALL);
    }

    let homeButton = "";
    let allButton = "";
    let userButton = "";
    let commButton = "";
    let searchBar ="";
    let sortButton = "";

    if(auth.loggedIn) {
        homeButton = (
            <IconButton 
            disabled={!auth.loggedIn || auth.isGuest || store.currentList}
            sx={{margin: "0px 30px 0px 0px", color: "#f1faee"}} 
            onClick={handleHome}>
                <HomeIcon
                fontSize={"large"} />
            </IconButton>
        );

        allButton = (
            <IconButton 
            onClick={handleAll}
            disabled={!auth.loggedIn || store.currentList}
            sx={{margin: "0px 30px 0px 0px", color: "#f1faee"}}>
                <GroupsIcon
                fontSize={"large"} />
            </IconButton>
        );

        userButton = (
            <IconButton 
            disabled={!auth.loggedIn || store.currentList}
            sx={{margin: "0px 30px 0px 0px", color: "#f1faee"}}>
                <PersonIcon
                fontSize={"large"} />
            </IconButton>
        );

        commButton = (
            <IconButton 
            disabled={!auth.loggedIn || store.currentList}
            sx={{margin: "0px 30px 0px 0px", color: "#f1faee"}}>
                <FunctionsIcon
                fontSize={"large"} />
            </IconButton>
        );

        searchBar = (
            <TextField
                sx={{margin: "0px 500px 0px 0px", backgroundColor: "white"}}
                disabled={!auth.loggedIn || store.currentList}
                borderRadius="25px"
                padding="0px 30px 0px 30px"
                fullWidth
                label="Search"
                variant="filled"
            />
        );

        sortButton = (
            <Button
                fontSize={"2vm"}
                disabled={!auth.loggedIn || store.currentList}
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleSortMenuOpen}
                color="inherit"
                sx={{fontFamily: "'Rubik', sans-serif;"}} 
            >
                SORT BY
                <SortIcon 
                sx={{margin: "0px 0px 0px 30px"}}
                fontSize={"large"}
                />
            </Button>
        );

        
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >
                <Toolbar className={"sortbar"}>
                    {homeButton}
                    {allButton}
                    {userButton}
                    {commButton}

                    {searchBar}

                    <Box sx={{ flexGrow: 1 }}>{""}</Box>
                    <Box sx={{display: { xs: 'none', md: 'flex' } }}>
                        {sortButton}
                    </Box>
                </Toolbar>
            </AppBar>
            {
                sortMenu
            }
        </Box>
    )
}

export default ListSortBar;