import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ScreenType } from '../store';
import { ViewItem } from '.';
import { Comment } from '.';
import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const { idNamePair } = props;
    const [text, setText] = useState("");

    
    function handleComment(event) {
        setText(event.target.value);
    }

    function handleCommentSubmit(event) {
        event.stopPropagation();
        if (event.code === "Enter") {
            store.addComment(idNamePair._id, text);
        }
    }

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }


    async function handleDeleteList(event) {
        event.stopPropagation();
        store.markListForDeletion(idNamePair._id);
    }
    var dateObj = new Date(idNamePair.date);
    var month = dateObj.toLocaleString('default', {month: 'short'});
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();

    let newdate = month + " " + day + ", "  + year;

    let uploaded = <p class='minitext listinfo'>Uploaded: {newdate}</p>

    if(!idNamePair.published) {
        uploaded = <Link onClick={handleEdit}>Edit</Link>
    }

    function handleEdit(event) {
        event.preventDefault();
        store.setCurrentList(idNamePair._id);
    }

    // default list card
    let cardElement = (
        <Box
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1, backgroundColor: 'rgba(69, 123, 157, .5)', borderRadius: '25px',
            fontFamily: "'Rubik', sans-serif"}}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }
            // }
            style={{
                fontSize: '24pt',
                width: '100%',
                marginBottom: '20px'
            }}>
            <Box height='50%' sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>

                    {/* FIRST ROW */}
                    <Grid height='100%' item xs={9}>
                        <p class="listinfo">{idNamePair.name}</p>
                    </Grid>
                    <Grid item xs={1}>
                        <div class="likecounter">
                            <IconButton>
                                <ThumbUpIcon fontSize={'large'} />
                            </IconButton>
                            <p class='minitext'>{idNamePair.likes}</p>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <div class="likecounter">
                            <IconButton>
                                <ThumbDownIcon fontSize={'large'} />
                            </IconButton>
                            <p class='minitext'>{idNamePair.dislikes}</p>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                            <IconButton
                                    disabled={store.currentScreen !== ScreenType.HOME}
                                    onClick={handleDeleteList}>
                                <DeleteIcon 
                                    fontSize={'large'} />
                            </IconButton>
                    </Grid>

                    {/* SECOND ROW */}
                    <Grid item xs={12}>
                        <p class='minitext listinfo'>By: {idNamePair.ownerEmail}</p>
                    </Grid>

                    {/* Need to add expanded list viewer here! */}

                    {/* THIRD ROW */}
                    <Grid item xs={9}>
                        {uploaded}
                    </Grid>
                    <Grid item xs={1}>
                        <p class='minitext listinfo'>Views: {idNamePair.views}</p>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>

                    {/* change to expand less when expanded */}
                    <Grid item xs={1}>
                            <IconButton
                            onClick={toggleExpand}>
                                <ExpandMoreIcon className={''} fontSize={'large'} />
                            </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>);
    // expanded list card
    if(isExpanded) {
        cardElement = (
            <Box
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ marginTop: '15px', display: 'flex', p: 1, backgroundColor: 'rgba(69, 123, 157, .5)', borderRadius: '25px',
                fontFamily: "'Rubik', sans-serif"}}
                button
                // onClick={(event) => {
                //     handleLoadList(event, idNamePair._id)
                // }
                // }
                style={{
                    fontSize: '24pt',
                    width: '100%',
                    marginBottom: '20px'
                }}>
                <Box height='50%' sx={{ flexGrow: 1 }}>
                    <Grid container spacing={1}>
    
                        {/* FIRST ROW */}
                        <Grid height='100%' item xs={9}>
                            <p class="listinfo">{idNamePair.name}</p>
                        </Grid>
                        <Grid item xs={1}>
                            <div class="likecounter">
                                <IconButton>
                                    <ThumbUpIcon fontSize={'large'} />
                                </IconButton>
                                <p class='minitext'>{idNamePair.likes}</p>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                            <div class="likecounter">
                                <IconButton>
                                    <ThumbDownIcon fontSize={'large'} />
                                </IconButton>
                                <p class='minitext'>{idNamePair.dislikes}</p>
                            </div>
                        </Grid>
                        <Grid item xs={1}>
                                <IconButton 
                                disabled={store.currentScreen !== ScreenType.HOME}
                                onClick={handleDeleteList}>
                                    <DeleteIcon 
                                    
                                    fontSize={'large'} />
                                </IconButton>
                        </Grid>
    
                        {/* SECOND ROW */}
                        <Grid item xs={6}>
                            <p class='minitext listinfo'>By: {idNamePair.ownerEmail}</p>
                            {/* <div className="listcontainer"></div> */}
                                {
                                    idNamePair.items.map((item, index) => (
                                        <ViewItem 
                                            key={'top5-item-' + (index+1)}
                                            text={item}
                                            index={index} 
                                        />
                                    ))
                                }
                        </Grid>
                        <Grid item xs={6}>
                            <p class='minitext listinfo'></p>
                            <div className="commentcontainer">
                                <div className="comments">
                                {
                                    idNamePair.comments.map((item) => (
                                        <Comment 
                                            owner={item.owner}
                                            text={item.comment}
                                        />
                                    ))}
                                </div>
                                <div className="commentmaker">
                                    <TextField
                                        inputProps={{style: {fontSize: 12}}}
                                        fullWidth
                                        borderRadius="25px"
                                        label="Add Comment"
                                        variant="filled"
                                        disabled={auth.isGuest}
                                        sx={{backgroundColor: "white"}}
                                        onChange={handleComment}
                                        onKeyPress={handleCommentSubmit}/>
                                </div>
                            </div>
                        </Grid>
    
                        {/* Need to add expanded list viewer here! */}
    
                        {/* THIRD ROW */}
                        <Grid item xs={9}>
                            {uploaded}
                        </Grid>
                        <Grid item xs={1}>
                            <p class='minitext listinfo'>Views: {idNamePair.views}</p>
                        </Grid>
                        <Grid item xs={1}>
                        </Grid>
                        <Grid item xs={1}>
                                <IconButton
                                onClick={toggleExpand}>
                                    <ExpandLessIcon className={''} fontSize={'large'} />
                                </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>);
    }

    return cardElement;
}

export default ListCard;