import React from 'react';
import Image from 'material-ui-image';
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import WorkIcon from '@material-ui/icons/Work';
import BusinessIcon from '@material-ui/icons/Business';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CreateIcon from '@material-ui/icons/Create';
import Container from '@material-ui/core/Container';
import Logo from '../hrms_logo.png';
import {useHistory} from "react-router";
import {NavLink} from "react-router-dom";
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';

const theme = createMuiTheme(
    {
        palette: {
            primary: {
                main: '#2979ff',
            },
            secondary: {
                main: '#ef6c00',
            },
        },
    }
)

const useStylesDrawer = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const history = useHistory();
    const [auth, setAuth] = React.useState(true);
    const classesDrawer = useStylesDrawer();

    function handleSignOut() {
        setAuth(false)
        history.push("/")
    }

    function handleSignIn() {
        setAuth(true)
    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classesDrawer.list, {
                [classesDrawer.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button component={NavLink} to="/jobAdverts" key="Advertisements">
                    <ListItemIcon>{<WorkIcon/>}</ListItemIcon>
                    <ListItemText primary={"Advertisements"}/>
                </ListItem>
                <ListItem button component={NavLink} to="/employers" key="Employers">
                    <ListItemIcon>{<BusinessIcon/>}</ListItemIcon>
                    <ListItemText primary={"Employers"}/>
                </ListItem>
                <ListItem button component={NavLink} to="/candidates" key="Candidates">
                    <ListItemIcon>{<PermIdentityIcon/>}</ListItemIcon>
                    <ListItemText primary={"Candidates"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListItem button component={NavLink} to="/jobAdvertCreate" key="Create Job Ad">
                    <ListItemIcon>{<CreateIcon/>}</ListItemIcon>
                    <ListItemText primary={"Create Job Ad"}/>
                </ListItem>
                <ListItem button component={NavLink} to="/advertVerify" key="Verify Job Ads">
                    <ListItemIcon>{<AssignmentTurnedInIcon/>}</ListItemIcon>
                    <ListItemText primary={"Verify Job Ads"}/>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <Box m={10}>
                <ThemeProvider theme={theme}>
                    <AppBar position="fixed">
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                                        onClick={toggleDrawer('left', true)}>
                                <MenuIcon/>
                            </IconButton>
                            <Container component={NavLink} to="/" maxWidth="xs">
                                <Image aspectRatio='1/10' src={Logo}/>
                            </Container>
                            <Typography variant="h6" className={classes.title}/>
                            {auth ?
                                <SignedIn handleSignOut={handleSignOut}/>
                                :
                                <SignedOut handleSignIn={handleSignIn}/>
                            }
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <React.Fragment key={'left'}>
                <SwipeableDrawer
                    left={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    {list('left')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}
