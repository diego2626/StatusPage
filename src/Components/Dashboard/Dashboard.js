import React, { useState, useEffect } from 'react'
import CardContainer from './CardContainer';
import DenseAppBar from '../../AppBar/AppBar';
import axios from 'axios'
import { timeInterval } from '../../Const/Const';

const initilStatus = {
    accounts: {},
    assets: {},
    customers: {},
    datapoints: {},
    devices: {},
    documents: {},
    forms: {},
    invites: {},
    media: {},
    messages: {},
    namespaces: {},
    orders: {},
    patients: {},
    relationships: {},
    rules: {},
    templates: {},
    users: {},
    workflows: {}
}

const Dashboard = () => {
    const [status, setStatus] = useState(initilStatus);
    
    const fetchAPI = async () => {
        let newStatus = {};
        for (var [key] of  Object.entries(status)) {
            console.log(key);
            await axios
           .get("https://api.factoryfour.com/" + key + "/health/status")
           // eslint-disable-next-line no-loop-func
           .then((res) => {
                       newStatus[key] = res.data
                   })
           // eslint-disable-next-line no-loop-func
           .catch((error) => {
               newStatus[key] = {success: false, message:'error', error: error.response};
           });
       };
       setStatus(newStatus);
    }

    useEffect( () => {
            fetchAPI();
            setInterval(async () => {
                fetchAPI();
            }, timeInterval)
    }, []);
    
    return (
        <div>
            <DenseAppBar></DenseAppBar>           
            <CardContainer data= {status} />
            
        </div>
    );
}

export default Dashboard;