import React, {useState, useEffect} from 'react'
import {Formik} from 'formik'
import * as yup from 'yup'
import {LocalDate} from '@js-joda/core'
import {createMuiTheme, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import {
    Container,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography
} from '@material-ui/core'
import Textfield from '../utilities/FormsUI/TextField/index.js'
import DateTimePicker from '../utilities/FormsUI/DateTimePicker/index.js'
import Button from '../utilities/FormsUI/Button/index.js'
import JobAdvertService from '../services/jobAdvertService'
import JobPositionService from '../services/jobPositionService'
import JobTimeService from '../services/jobTimeService'
import CityService from '../services/cityService'

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

const useStyles = makeStyles((theme) => ({
    jobPositionFormControl: {
        margin: theme.spacing(0),
        minWidth: 600,
    },
    jobTimeFormControl: {
        margin: theme.spacing(0),
        minWidth: 450,
    },
    cityFormControl: {
        margin: theme.spacing(0),
        minWidth: 450,
    },
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
    },
}));

const initialValues = {
    title: '',
    description: '',
    deadline: '',
    numberOfOpenPositions: '',
    minSalary: '',
    maxSalary: '',
    jobPosition: '',
    jobTime: '',
    city: '',
}

const validationSchema = yup.object().shape({
    title: yup
        .string('Enter a title')
        .required('Title is required'),
    description: yup
        .string('Enter a description')
        .required('Desciption is required'),
    deadline: yup
        .date('Enter a deadline')
        .min(LocalDate.now(), 'Enter a valid deadline')
        .required('Deadline is required'),
    numberOfOpenPositions: yup
        .number('Enter number of open positions')
        .required('Number of open positions is required'),
    minSalary: yup
        .number('Enter a minimum salary')
        .required('Minimum salary is required'),
    maxSalary: yup
        .number('Enter a maximum salary')
        .required('Maximum salary is required'),
    jobPosition: yup
        .object()
        .required('Select a job position'),
    jobTime: yup
        .object()
        .required('Select a job time'),
    city: yup
        .object()
        .required('Select a city'),
});

export default function JobAdvertCreate() {
    let jobAdvertService = new JobAdvertService();

    const classes = useStyles();
    const [jobPositions, setJobPositions] = useState([]);
    const [jobTimes, setJobTimes] = useState([]);
    const [cities, setCities] = useState([]);
    const [jobPosition, setJobPosition] = useState('');
    const [jobTime, setJobTime] = useState('');
    const [city, setCity] = useState('');

    const handleJobPositionChange = (event) => {
        setJobPosition(event.target.value);
    };

    const handleJobTimeChange = (event) => {
        setJobTime(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    useEffect(() => {
        let cityService = new CityService();
        cityService
            .getCities()
            .then((result) => setCities(result.data.data));
    }, []);

    useEffect(() => {
        let jobPositionService = new JobPositionService();
        jobPositionService
            .getJobPositions()
            .then((result) => setJobPositions(result.data.data));
    }, []);

    useEffect(() => {
        let jobTimeService = new JobTimeService();
        jobTimeService
            .getJobTimes()
            .then((result) => setJobTimes(result.data.data));
    }, []);

    // const handleAddJobAdvert = (title, description, deadline, numberOfOpenPositions, minSalary, maxSalary, jobPosition, jobTime, city) => {
    //     jobAdvertService.addJobAdvert(title, description, deadline, numberOfOpenPositions, minSalary, maxSalary, jobPosition, jobTime, city);
    // };

    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <div className={classes.formWrapper}>
                        <Formik
                            initialValues={{...initialValues}}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log(values);
                                // handleAddJobAdvert(values.title, values.description, values.deadline, values.numberOfOpenPositions, values.minSalary, values.maxSalary, values.jobPosition, values.jobTime, values.city)
                            }}
                        >
                            <form>
                                <Grid container spacing={2}>

                                    <Typography variant="h3">
                                        Create Job Advertisement
                                    </Typography>

                                    <Grid item xs={12}>
                                        <Textfield
                                            name="title"
                                            label="Title"
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Textfield
                                            name="description"
                                            label="Description"
                                            multiline={true}
                                            rows="3"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <DateTimePicker
                                            name="deadline"
                                            label="Deadline"
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Textfield
                                            name="minSalary"
                                            label="Min. Salary"
                                        />
                                    </Grid>

                                    <Grid item xs={3}>
                                        <Textfield
                                            name="maxSalary"
                                            label="Max. Salary"
                                        />
                                    </Grid>

                                    <Grid item xs={8}>
                                        <FormControl variant="outlined" className={classes.jobPositionFormControl}>
                                            <InputLabel>Job Position</InputLabel>
                                            <Select value={jobPosition} onChange={handleJobPositionChange} autoWidth>
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    jobPositions.map((jobPosition) => (
                                                        <MenuItem value={jobPosition}>
                                                            {jobPosition.positionName}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Textfield
                                            name="numberOfOpenPositions"
                                            label="Number Of Open Positions"
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.jobTimeFormControl}>
                                            <InputLabel>Job Time</InputLabel>
                                            <Select value={jobTime} onChange={handleJobTimeChange} autoWidth>
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    jobTimes.map((jobTime) => (
                                                        <MenuItem value={jobTime}>
                                                            {jobTime.jobTimeName}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.cityFormControl}>
                                            <InputLabel>City</InputLabel>
                                            <Select value={city} onChange={handleCityChange} autoWidth>
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    cities.map((city) => (
                                                        <MenuItem value={city}>
                                                            {city.cityName}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Button>
                                            Publish
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>
                        </Formik>
                    </div>
                </Container>
            </Grid>
        </ThemeProvider>
    )
}