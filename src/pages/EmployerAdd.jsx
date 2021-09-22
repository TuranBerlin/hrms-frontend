import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Grid
} from '@material-ui/core'
import Textfield from '../utilities/FormsUI/TextField/index.js'
import Checkbox from '../utilities/FormsUI/Checkbox/index.js'
import Button from '../utilities/FormsUI/Button/index.js'
import EmployerService from '../services/employerService'

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const initialValues = {
    companyName: '',
    webAddress: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = yup.object().shape({
    companyName: yup
        .string('Company name is required')
        .required('Company name is required'),
    webAddress: yup
        .string('Web address is required')
        .url('Enter a valid web address')
        .required('Web address is required'),
    phoneNumber: yup
        .number("Enter your company phone number")
        .required('Phone number is required')
        .min(12, 'Phone number should be of 12 characters length'),
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
    let employerService = new EmployerService();
    const classes = useStyles();

    const handleAddEmployer = (companyName, webAddress, phoneNumber, email, password, confirmPassword) => {
        employerService.addEmployer(companyName, webAddress, phoneNumber, email, password, confirmPassword);
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
                            handleAddEmployer(values.companyName, values.webAddress, values.phoneNumber, values.email, values.password, values.confirmPassword)
                        }}
                    >
                        <form>
                            <Grid container spacing={2}>

                                <Grid item xs={6}>
                                    <Textfield
                                        name="companyName"
                                        label="Company Name"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Textfield
                                        name="webAddress"
                                        label="Web Address"
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
                                        name="phoneNumber"
                                        label="Company Phone Number"
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