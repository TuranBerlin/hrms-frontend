import React, { useState } from 'react'
import CandidateAdd from './CandidateAdd'
import EmployerAdd from './EmployerAdd'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
    Grid,
    Switch,
    Typography
} from '@material-ui/core'


export default function SignUp() {
    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div>
            <Grid container spacing={10}>
                <Grid item xs={8}>
                    <Typography variant="h3">
                        Sign Up
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={checked} onChange={toggleChecked} />}
                            label="I'm Employer"
                        />
                    </FormGroup>
                </Grid>
            </Grid>
            {checked ?
                <EmployerAdd />
                :
                <CandidateAdd />
            }
        </div>
    )
}
