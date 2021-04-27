import React, {useEffect, useState} from "react";
import {Card, CardContent, Container, Grid, List, ListItem, ListItemText, Typography} from "@material-ui/core";
import ApplicationBar from "../components/AppBar/ApplicationBar";
import {
    useParams
} from "react-router-dom";
import axios from "axios";
import DataLabel from "../components/DataLabel";

function Details(){
    let { resource, id } = useParams();

    const [result, setResult] = useState(null);

    useEffect(async () => {
        const res = await axios.get('/swapi/'+resource+'/'+id);
        setResult(res.data);
    },[resource, id])
    if(result !== null){
        return(
            <Container maxWidth={false} disableGutters={true} style={{height: '100%', minHeight:'100vh'}} >
                <ApplicationBar logout={true}/>
                <Grid container spacing={5} direction="column" justify="center" alignItems="center" style={{marginTop:'5%'}}>
                    <Grid item>
                        <Card>
                            <CardContent >
                                <Grid container spacing={3} direction="column" justify="center" alignItems="center">
                                    {Object.keys(result).map((item, i) => {
                                        return(
                                            <DataLabel key={i} item={item} data={result[item]}/>
                                        )
                                    })}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        )
    }else{
        return(<div/>);
    }


}
export default Details;
