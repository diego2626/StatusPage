import React from 'react'
import ServiceCard from './ServiceCard';
import {Grid, Paper} from "@material-ui/core/";

const CardContainer = (props) => {
    return (
        <Grid
            container
            justify="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid container alignItems="flex-start" item xs={11} style={{marginTop:'10vh',minHeight: "100vh"}}>
            <Grid container justify="center" spacing={4}>
                {Object.keys(props.data).map((item,i) => {
                return (
                    <Grid key={i} sm={4} md={3} lg={2} item>
                        <Paper elevation={10}>
                        <ServiceCard
                            name={item}
                            data={props.data[item]}
                        ></ServiceCard>
                        </Paper>
                    </Grid>
                );
                })}
            </Grid>
            </Grid>
        </Grid>
    );
}

export default CardContainer;
