import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid
} from '@material-ui/core'
import Textfield from '../utilities/FormsUI/TextField/index.js'
import DateTimePicker from '../utilities/FormsUI/DateTimePicker/index.js'
import Checkbox from '../utilities/FormsUI/Checkbox/index.js'
import Button from '../utilities/FormsUI/Button/index.js'
import CandidateService from '../services/candidateService'

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const initialValues = {
    firstName: '',
    lastName: '',
    yearOfBirth: '',
    nationalIdentityNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = yup.object().shape({
    firstName: yup
        .string('Enter your first name')
        .required('First name is required'),
    lastName: yup
        .string('Enter your last name')
        .required('Last name is required'),
    yearOfBirth: yup
        .date('Enter your year of birth')
        .min(1920, 'Enter your real year of birth')
        .max(2004, 'You must be over 18 to sign up')
        .required('Year of birth is required'),
    nationalIdentityNumber: yup
        .number('Enter your national identity number')
        .min(11, 'National identity number should be of 11 characters length')
        .required('National identity number is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Condirm password is required'),
    termsOfService: yup
        .boolean()
        .oneOf([true], 'The terms and conditions must be accepted.')
        .required('The terms and conditions must be accepted.'),
});

export default function CandidateAdd() {
    let candidateService = new CandidateService();
    const classes = useStyles();

    const handleAddCandidate = (firstName, lastName, nationalIdentityNumber, email, password, confirmPassword, yearOfBirth) => {
        candidateService.addCandidate(firstName, lastName, nationalIdentityNumber, email, password, confirmPassword, yearOfBirth);
    };

    return (
        <Grid item xs={12}>
            <Container maxWidth="md">
                <div className={classes.formWrapper}>
                    <Formik
                        initialValues={{ ...initialValues }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            handleAddCandidate(values.firstName, values.lastName, values.nationalIdentityNumber, values.email, values.password, values.confirmPassword, values.yearOfBirth)
                        }}
                    >
                        <form>
                            <Grid container spacing={2}>

                                <Grid item xs={6}>
                                    <Textfield
                                        name="firstName"
                                        label="First Name"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Textfield
                                        name="lastName"
                                        label="Last Name"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Textfield
                                        name="email"
                                        label="E-mail Address"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Textfield
                                        name="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Textfield
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Textfield
                                        name="nationalIdentityNumber"
                                        label="National Identity Number"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <DateTimePicker
                                        name="yearOfBirth"
                                        label="Year Of Birth"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Checkbox
                                        name="termsOfService"
                                        legend="Terms Of Service"
                                        label="I agree"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                        <Button>
                                            Sign Up
                                        </Button>
                                </Grid>

                            </Grid>
                        </form>
                    </Formik>
                </div>
            </Container>
        </Grid >
    )
}