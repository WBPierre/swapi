import React from "react";
import {
    AppBar,
    Button,
    Divider,
    Grid,
    IconButton,
    InputBase,
    Paper,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {useHistory} from "react-router-dom";
import * as Routes from "../../navigation/Routes";
import Cookies from 'js-cookie'

function ApplicationBar(props){
    const history = useHistory();

    const logOut = () => {
        Cookies.remove('Token');
        history.push(Routes.HOME);
    }
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    Swapi API
                </Typography>
                <div style={{flexGrow:1}}/>
                {props.logout && (
                    <div>
                        <Button variant="contained" onClick={logOut}>
                            Logout
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )

}

export default ApplicationBar;
