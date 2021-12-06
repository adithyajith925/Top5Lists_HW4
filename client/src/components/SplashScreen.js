import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});


export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <div id="sidebar">
                <h1 className="splashtext textcolor">The Top Five Lister</h1>
            </div>
            <div id="returning">
                <h1 className="splashinfo"><br /> Welcome to the Top Five Lister!</h1>
                <p className="splashinfo">The Top Five Lister is a project by Adithya Ajith, Richard McKenna, and others designed to create a website for ranking the Top Five of Anything!</p>
        
                <br />
                <div className="buttons">
                    <Button
                        href="/register/"
                        variant="contained"
                        color="primary"
                        size="large">
                            Create Account
                    </Button>
                    <Button
                    href="/login/"
                        variant="contained"
                        size="large">
                            Log In To Existing Account
                    </Button>
                    <Button
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