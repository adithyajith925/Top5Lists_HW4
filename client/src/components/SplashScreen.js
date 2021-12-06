import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';


export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div id="sidebar">
                <h1 className="splashtext textcolor">The Top Five Lister</h1>
            </div>
            <div id="returning">
                <h1 className="splashinfo"><br /> Welcome to the Top Five Lister.</h1>
                <p className="splashinfo">The Top Five Lister is a project by Adithya Ajith, Richard McKenna, and others to create a website designed to rank the Top Five of Anything!</p>
        
                <br />
                <div className="buttons">
                    <Button
                        sx={{backgroundColor: '#457b9d', fontFamily: "'Rubik', sans-serif;"}} 
                        href="/register/"
                        variant="contained"
                        color="primary"
                        size="large">
                            Create Account
                    </Button>
                    <Button
                        sx={{backgroundColor: '#457b9d', fontFamily: "'Rubik', sans-serif;"}}
                        href="/login/"
                        variant="contained"
                        size="large">
                            Log In To Existing Account
                    </Button>
                    <Button
                        sx={{backgroundColor: '#457b9d', fontFamily: "'Rubik', sans-serif;"}}
                        variant="contained"
                        color="primary"
                        size="large">
                            Continue as Guest
                    </Button>
                </div>
            </div>
        </div>
    )
}