import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import * as consts from "../../Const/Const";

const useStyles = makeStyles({
  card: {
    minHeight: "180px",
    width: '100%'
  },
});
//Format unix timestamp to 24 hour format
function formatDate(unixDate) {
  let date = new Date(unixDate);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let timestamp = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return timestamp;
}

//Individual Service Card Component
const ServiceCard = (props) => {
  const classes = useStyles();

  let status = consts.error;
  let color = consts.red;
  let serviceName = props.name.toUpperCase();
  let timestamp = '';
  let hostname = '';
  let errorStatus = '';
  let errorMessage = '';

  //Check if props are empty, if not assign correct variables
  if (props.data.message !== undefined) {
    if (props.data.message.includes(consts.healthy)) {
      status = consts.healthy;
      color = "Green";
      hostname = props.data.hostname;
      timestamp = formatDate(props.data.time);
    } else {
      if(props.data.error !== undefined){
        errorStatus = props.data.error.status;
        errorMessage = props.data.error.statusText;
      }
    }
  }
  
  return (
    <Card className={classes.card} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {serviceName}
        </Typography>
        <Typography
          style={{ color: "White", backgroundColor: color }}
          color="textSecondary"
        >
          {status}
        </Typography>
        <Typography variant="body2" component="p">
          {hostname}
        </Typography>
        <Typography variant="body2" component="p">
          {timestamp}
        </Typography>
        {/* On Error/Outage display outage message */}
        {status === "Error" ? (
          <div>
            <Typography style={{ color: "Red" }} variant="h6" component="p">
              OUTAGE
            </Typography>
            <Typography style={{ color: "Red" }} variant="body2" component="p">
              {errorStatus}
            </Typography>
            <Typography style={{ color: "Red" }} variant="body2" component="p">
              {errorMessage}
            </Typography>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
