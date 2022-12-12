import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { Stack } from "@mui/system";
import moment from "moment";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Blotter() {
  const [expanded, setExpanded] = React.useState("");
  const [replog, setReplog] = useState([])
  const [search, setSearch] = useState("");
  const [statuss, setStatuss] = useState("");
  const [sort, setSort] = useState([]);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const [blotsort, setBlotsort] = useState(false);
  console.log(search);
  const getData = async () => {
    
    
    try {
        const res = await axios.get("https://barangay-talon-uno.vercel.app/log")

        // console.log("data: ", res.data.replog.map( i => ({
        //   ...i,
        //   reports: i.reports.filter( a => a.report === "Crime Related" )
        // }) ) );

        switch (localStorage.getItem("usertype")) {
          case "police":
            setSort(res.data.sortreport)
            setReplog(res.data.replog.map( i => ({
              ...i,
              reports: i.reports.filter( a => a.report === "Crime Related" )
            }) ) )
            break;
          case "fire":
            setSort(res.data.sortreport)
            setReplog(res.data.replog.map( i => ({
              ...i,
              reports: i.reports.filter( a => a.report === "Fire" )
            }) ) )
            break;  
          default:
            setReplog(res.data.replog)
            break;
        }

    } catch (error) {
        console.log(error);
    }
}
  useEffect(() => {
    getData();
  }, [submit]);
  const handleSubmit = async({id, email,process}) => {
    try{
      const res = await axios.post("https://barangay-talon-uno.vercel.app/admin/report", {
       ref: id,
         email: email,
         status: process
      })
        console.log(res.data)
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Status Changed',
          showConfirmButton: true,
          timer: 1500
        })
        window.location.reload('/report');
        navigate('/report')
    }catch(error){
        console.log(error)
    }
  console.log(id,email,process)
  
}
  
  const handleExpandClick = (e) => {
    if (e === expanded) {
      setExpanded("123123");
    } else {
      setExpanded(e);
    }
    console.log(e);
  };

  return (
    <Container bgcolor="#f2f4fb" sx={{ flexGrow: 1, p: 2, mt: 15 }}>
      <Typography color="white" variant="h2" mb={2}>
      Report
      </Typography>

      <TextField
        label="Search for Report Records"
        color="secondary"
        focused
        fullWidth
        sx={{ input: { color: "white" }, mb: 2 }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Typography color="white"> Filter Status By: </Typography>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setStatuss("Cancelled")}>
          Cancelled
        </Button>
        {/* <Button variant="contained" color="warning" onClick={() => setStatuss("Pending")}>
        Pending
      </Button> */}
        <Button
          variant="contained"
          color="success"
          onClick={() => setStatuss("Success")}>
          Success
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStatuss("")}>
          Show All
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setBlotsort(!blotsort)}>
          {blotsort ? "Newest-Oldest" : "Oldest-Newest"}
        </Button>
      </Stack>

      <Box color="white" mt={2} p={1}>
        <Stack direction="column" gap={4} justifyContent="space-between">
          {replog.map((users, index) =>
            users.reports
              .filter((item) => {
                return statuss === "" ? item : item.process.includes(statuss);
              })
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search);
              })
              .sort((a, b) =>
                blotsort
                  ? new moment(b.requestTime).format("YYYYMMDD") -
                    new moment(a.requestTime).format("YYYYMMDD")
                  : new moment(a.requestTime).format("YYYYMMDD") -
                    new moment(b.requestTime).format("YYYYMMDD")
              )
              .map((blot, index) => (
                <React.Fragment key={index}>
                  <Stack
                    direction="row"
                    width="100%"
                    textAlign="center"
                    justifyContent="space-between">
                    <Box width="20%" textAlign="left">
                      <Typography variant="h6" textTransform="capitalize">
                        {blot.name} 
                      </Typography>
                    </Box>
                    <Box width="60%">
                      <Typography variant="inherit">
                        {moment(blot.ReportTime).format("LLLL")}
                      </Typography>
                    </Box>
                    <Box width="20%" textAlign="right" color="white">
                      <IconButton
                        disableRipple
                        onClick={() => handleExpandClick(blot._id)}>
                        <VisibilityRoundedIcon color="info" />
                      </IconButton>
                    </Box>
                  </Stack>
                  <Divider sx={{ bgcolor: "white" }} />
                  <Dialog
                    open={expanded === blot._id ? true : false}
                    onClose={() => handleExpandClick(blot._id)}
                    fullWidth
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle
                      sx={{ textTransform: "capitalize" }}
                      id="alert-dialog-title">
                      {blot.name} 
                    </DialogTitle>
                    <DialogContent dividers>
                      <Box id="alert-dialog-description">
                      <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            Name of Reporter: {blot.name}
                          </Typography>
                        </CardContent>
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                          Address: {blot.addressdetail}
                          </Typography>
                        </CardContent>

                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                          Report Type: {blot.report}
                          </Typography>
                        </CardContent>
                        
                        <Divider />

                        <Typography>
                          {" "}
                        
                        </Typography>
                        
                       
                        <br />
                        <Divider />
                        <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        Photo:
                        </Typography>
                        <Avatar 
                          variant="square"
                          sx={{height:300, width:300}}
                          src={blot.Image}
                        />
                        </CardContent>
                        <Divider />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary">
                            Status: {blot.process}
                          </Typography>
                        </CardContent>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <IconButton
                        disabled={ blot.process === "Cancelled" && true || blot.process === "Success" && true}
                        aria-label="add to favorites"
                        onClick={() =>
                          handleSubmit({
                            id: blot._id,
                            email: users.email,
                            process: "Cancelled",
                          })
                        }
                        color="error">
                        <CancelIcon />
                        <Typography>cancel</Typography>
                      </IconButton>
                      {/* <IconButton
                        disabled={
                          blot.process === "Success" &&
                          true &&
                          blot.process !== "Pending" &&
                          true
                        }
                        aria-label="share"
                        onClick={() =>
                          handleSubmit({
                            id: blot._id,
                            email: users.email,
                            process: "Pending",
                          })
                        }
                        color="warning">
                        <PendingActionsIcon />
                        <Typography>pending</Typography>
                      </IconButton> */}
                      <IconButton
                        disabled={blot.process === "Cancelled" && true || blot.process === "Success" && true}
                        onClick={() =>
                          handleSubmit({
                            id: blot._id,
                            email: users.email,
                            process: "Success",
                          })
                        }
                        color="success">
                        <CheckCircleIcon />
                        <Typography>Completed</Typography>
                      </IconButton>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              ))
          )}
        </Stack>
      </Box>

     
    </Container>
  );
}
