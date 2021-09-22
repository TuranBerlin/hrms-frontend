import React from 'react'
import { Route } from 'react-router'
import CandidateList from '../pages/CandidateList'
import EmployerList from '../pages/EmployerList'
import JobAdvertList from '../pages/JobAdvertList'
import AdvertVerify from '../pages/AdvertVerify'
import CandidateAdd from '../pages/CandidateAdd'
import EmployerAdd from '../pages/EmployerAdd'
import SignUp from '../pages/SignUp'
import JobAdvertCreate from '../pages/JobAdvertCreate'

export default function Dashboard() {
    return (
        <div>
            <Route exact path="/candidates" component={CandidateList}/>
            <Route exact path="/employers" component={EmployerList}/>
            <Route exact path="/jobAdverts" component={JobAdvertList}/>
            <Route exact path="/advertVerify" component={AdvertVerify}/>
            <Route exact path="/candidateAdd" component={CandidateAdd}/>
            <Route exact path="/employerAdd" component={EmployerAdd}/>
            <Route exact path="/signUp" component={SignUp}/>
            <Route exact path="/jobAdvertCreate" component={JobAdvertCreate}/>
        </div>
    )
}
