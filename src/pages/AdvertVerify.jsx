import React, { useState, useEffect } from 'react';
import JobAdvertService from '../services/jobAdvertService';
import PropTypes from 'prop-types';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Container from '@material-ui/core/Container';
import useTheme from '@material-ui/core/styles/useTheme';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { SnackbarProvider, useSnackbar } from 'notistack';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(0),
  },
}));

const buttonTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#2979ff',
      },
      secondary: {
        main: '#f44336',
      },
    },
  }
)

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { jobAdvert } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const { enqueueSnackbar } = useSnackbar();
  let jobAdvertService = new JobAdvertService();

  const handleVerifyAdvert = (advertId, variant) => {
    jobAdvertService.verifyAdvert(advertId);
    enqueueSnackbar('Job advertisement published!',{variant});
  };

  const handleDeleteAdvert = (advertId, variant) => {
    jobAdvertService.deleteAdvert(advertId);
    enqueueSnackbar('Job advertisement deleted!',{variant});
  };

  return (
    <ThemeProvider theme={buttonTheme}>
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {jobAdvert.title}
        </TableCell>
        <TableCell align="right">{jobAdvert.cityName}</TableCell>
        <TableCell align="right">{jobAdvert.jobPosition}</TableCell>
        <TableCell align="right">{jobAdvert.numberOfOpenPositions}</TableCell>
        <TableCell align="right">{jobAdvert.deadline}</TableCell>
        <TableCell align="right">
          <Button
            onClick={() => handleVerifyAdvert(jobAdvert.id,"success")}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Publish
          </Button>
        </TableCell>
        <TableCell align="right">
          <Button
            onClick={() => handleDeleteAdvert(jobAdvert.id,"warning")}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Release Date</TableCell>
                    <TableCell>Employer</TableCell>
                    <TableCell align="right">Min. Salary ($)</TableCell>
                    <TableCell align="right">Max. Salary ($)</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={jobAdvert.id}>
                    <TableCell component="th" scope="row">
                      {jobAdvert.releaseDate}
                    </TableCell>
                    <TableCell>{jobAdvert.companyName}</TableCell>
                    <TableCell align="right">{jobAdvert.minSalary}</TableCell>
                    <TableCell align="right">{jobAdvert.maxSalary}</TableCell>
                    <TableCell align="right">{jobAdvert.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
    </ThemeProvider>
  );
}

function JobAdvertListing() {
  const [jobAdverts, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getJobAdvertsWithDetailsOnlyUnverified()
      .then((result) => setJobAdverts(result.data.data));
  });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, jobAdverts.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="md">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Job Title</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Number of open positions</TableCell>
              <TableCell align="right">Deadline</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? jobAdverts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : jobAdverts
            ).map((jobAdvert) => (
              <Row key={jobAdvert.id} jobAdvert={jobAdvert} />
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={jobAdverts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default function JobAdvertList() {
  return (
    <SnackbarProvider maxSnack={3}>
      <JobAdvertListing />
    </SnackbarProvider>
  );
}