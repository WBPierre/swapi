import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    Grid, IconButton, Input, InputAdornment,
    InputLabel,
} from "@material-ui/core";
import ApplicationBar from "../components/AppBar/ApplicationBar";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Person} from "@material-ui/icons";
import Cookies from 'js-cookie'
import axios from "axios";
import {useHistory} from "react-router-dom";
import * as Routes from "../navigation/Routes";


function Home(){
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect( () => {
        async function verifyConnection(){
            let token = Cookies.get('Token');
            if(token){
                const res = await axios.post('/user/verifyToken', {token:token});
                if(res.status === 200){
                    history.push(Routes.EXPLORER);
                }
            }
        }
        verifyConnection();
    }, [history]);

    const handleChange = (e) => {
        if(e.target.name === "username"){
            setUsername(e.target.value);
        }else{
            setPassword(e.target.value);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleFormSubmit = async () => {
        if(username.length > 0 && password.length > 0){
            await axios.post(
                '/user/login',
                {
                    username:username,
                    password:password
                }
            ).then((res)=>{
                if(res.status === 200){
                    Cookies.set('Token', res.data.token);
                    history.push(Routes.EXPLORER);
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    return(
        <Container maxWidth={false} disableGutters={true} style={{height: '100%', minHeight:'100vh'}} >
            <ApplicationBar/>
            <div className="App">
                <header className="App-header">
                    <Card variant="outlined">
                        <CardHeader title="Connexion"/>
                        <CardContent>
                            <Grid container spacing={4} direction="column">
                                <Grid item>
                                    <FormControl>
                                        <InputLabel htmlFor="standard-adornment-username">Username</InputLabel>
                                        <Input
                                            id="standard-adornment-username"
                                            type='text'
                                            name="username"
                                            value={username}
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton>
                                                        <Person />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormControl>
                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            name="password"
                                            onChange={handleChange}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                                        Se connecter
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>
                </header>
            </div>
        </Container>
    )
}

export default Home;
