import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    FormControl,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter, TablePagination,
    TableRow,
    TextField,
    Typography
} from "@material-ui/core";
import ApplicationBar from "../components/AppBar/ApplicationBar";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import CustomTablePagination from "../components/Table/CustomTablePagination";
import {useHistory} from "react-router-dom";
import * as Routes from "../navigation/Routes";


function Explorer(){
    const history = useHistory();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("people");
    const [listType, setListType] = useState([]);
    const [result, setResult] = useState(null);
    const [page, setPage] = useState(0);
    const [from, setFrom] = useState(1);
    const [to, setTo] = useState(1);


    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSelectChange = (event) => {
        setType(event.target.value);
    };

    const submitSearch = async () => {
        const res = await axios.get('/swapi/'+type+'/?search='+search);
        setResult(res.data);
        setPage(0);
        setFrom(1);
        console.log(res.data);
        if(res.data.count <= 10){
            setTo(res.data.count);
        }else{
            setTo(10);
        }
    }

    useEffect(async () => {
        const res = await axios.get('/swapi/');
        setListType(Object.keys(res.data));
        setType(Object.keys(res.data)[0]);
    }, []);

    const handleChangePage = async (event, newPage) => {
        let res;
        if(newPage > page){
            res = await axios.get('/swapi/'+result.next.split("/api/")[1]);
            setFrom(from+10);
            if(res.data.count > to+10){
                setTo(to+10)
            }else{
                setTo(res.data.count);
            }
        }else if(newPage < page){
            res = await axios.get('/swapi/'+result.previous.split("/api/")[1]);
            setFrom(from-10);
            if(res.data.count === to){
                setTo(Math.floor((to/10))*10);
            }else{
                setTo(to-10);
            }
        }
        setPage(newPage);
        setResult(res.data);
    }

    const details = (url) => {
        const idScheme = url.split("/");
        const id = idScheme[idScheme.length-2];
        history.push(Routes.EXPLORER+type+"/"+id);
    }

    return(
        <Container maxWidth={false} disableGutters={true} style={{height: '100%', minHeight:'100vh'}} >
            <ApplicationBar logout={true}/>
            <Grid container spacing={5} direction="column" justify="center" alignItems="center" style={{marginTop:'5%'}}>
                <Grid item>
                    <Card>
                        <CardContent>
                            <Grid container direction="row" alignItems="center" justify="center">
                                <Grid item>
                                    <FormControl variant="filled">
                                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            onChange={handleSelectChange}
                                            style={{minWidth:100}}
                                        >
                                            {listType.map((item, i) => {
                                                if(i === 0){
                                                    return(
                                                        <MenuItem value={item} key={i}>{item.charAt(0).toUpperCase()}{item.slice(1)}</MenuItem>
                                                    )
                                                }else{
                                                    return(
                                                        <MenuItem value={item} key={i}>{item.charAt(0).toUpperCase()}{item.slice(1)}</MenuItem>
                                                    )
                                                }

                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <TextField id="outlined-basic" name="search" label="Search" variant="filled" value={search} onChange={handleChange}/>
                                </Grid>
                                <Grid item>
                                    <Button onClick={submitSearch} variant="contained" color="primary">
                                        <SearchIcon/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {result!==null && (
                    <Grid item style={{width:'80%'}}>
                        <TableContainer component={Paper}>
                            <Table aria-label="custom pagination table">
                                <TableBody>
                                    {result.results.map((item, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">
                                                {item.hasOwnProperty('name') ? (
                                                    item.name
                                                ):(
                                                    item.title
                                                )}

                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="primary" onClick={() => details(item.url)}>Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[]}
                                            labelDisplayedRows={
                                                () =>
                                                    `${from}-${to} sur ${result.count} résultats`
                                            }
                                            rowsPerPage={10}
                                            colSpan={3}
                                            count={result.count}
                                            page={page}
                                            ActionsComponent={CustomTablePagination}
                                            onChangePage={handleChangePage}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}

            </Grid>
        </Container>
    )
}
export default Explorer;
