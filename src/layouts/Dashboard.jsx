import React from 'react'
import { Route } from 'react-router'
import CandidateList from '../pages/CandidateList'
import EmployerList from '../pages/EmployerList'
import JobAdvertList from '../pages/JobAdvertList'


export default function Dashboard() {
    return (
        <div>
            <Route exact path="/candidates" component={CandidateList}/>
            <Route exact path="/employers" component={EmployerList}/>
            <Route exact path="/jobAdverts" component={JobAdvertList}/>
        </div>
    )
}
