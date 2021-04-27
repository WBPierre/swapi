import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import * as Routes from "../navigation/Routes";


function DataLabel(props){
    const history = useHistory();

    let text = props.item.charAt(0).toUpperCase()+props.item.slice(1);

    if(typeof props.data === "string"){
        if(props.data.includes('http')){
            return(
                <Grid item  style={{width:'100%'}}>
                    <Grid container direction="row" spacing={5}>
                        <Grid item xs={6}>
                            <Typography>{text.replace(/_/g, ' ')}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={() => history.push(Routes.EXPLORER+props.data.split("/api/")[1])}>Link</Button>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }else{
            return(
                <Grid item style={{width:'100%'}}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Typography>{text.replace(/_/g, ' ')}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>{props.data}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }else{
        if(Array.isArray(props.data)){
            return(
                <Grid item style={{width:'100%'}}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Typography>{text.replace(/_/g, ' ')}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {props.data.map((list, y) => {
                                return(
                                    <Button style={{margin:'1%'}} variant="contained" color="primary" key={y} onClick={() => history.push(Routes.EXPLORER+list.split("/api/")[1])}>Link</Button>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            )
        }else{
            return(
                <Grid item  style={{width:'100%'}}>
                    <Grid container direction="row">
                        <Grid item xs={6}>
                            <Typography>{text.replace(/_/g, ' ')}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

    }
/*
    return(
        <ListItem>
            <ListItemText primary={text.replace(/_/g, ' ')}/>
            {Array.isArray(props.data) && (
                <div>
                    {props.data.map((item, i ) => {
                        return (
                            <Button key={i} onClick={() => history.push(Routes.EXPLORER+item.split("/api/")[1])}>{text} - {i}</Button>
                        )
                    })}
                </div>
            )}
        </ListItem>
    )

 */
}


export default DataLabel;
