import React from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";

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

export default function SignedOut({ handleSignIn }) {
  const classes = useStyles();

  return (
    <div>
      <Button
        className={classes.menuButton}
        aria-label="Sign Up"
        variant="contained"
        color="secondary"
        startIcon={<EmojiPeopleIcon />}
        component={NavLink}
        to="/signUp"
      >
        <Typography variant="button" className={classes.title}>
          I'm New
        </Typography>
      </Button>

      <Button
        className={classes.menuButton}
        aria-label="Sign In"
        variant="contained"
        color="secondary"
        onClick={handleSignIn}
        startIcon={<ExitToAppIcon />}
      >
        <Typography variant="button" className={classes.title}>
          Sign In
        </Typography>
      </Button>
    </div>
  )
}
