import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllKids, fetchTaskByKid } from "../redux/thunks/parent.thunk";
import SingleTask from "./SingleTask";
import { Card, Stack } from "@mui/material";

function createData(id, fullName, phone, email) {
  return {
    id,
    fullName,
    phone,
    email,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { kidTasks } = useSelector((state) => state.parent);

  const handleTaskByKid = () => {
    setOpen(!open);
    dispatch(fetchTaskByKid(row.id));
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleTaskByKid()}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.fullName}
        </TableCell>
        <TableCell align="right">{row.email}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Tasks
              </Typography>
              <Table size="small" aria-label="purchases">
                {/* <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell align="right">End Time</TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  <Card sx={{ overflow: "auto", maxWidth: "100vw" }}>
                    <Stack direction="row" spacing={2}>
                      {kidTasks &&
                        kidTasks.map((kidsRow, index) => (
                          <TableRow key={index}>
                            {/* <TableCell component="th" scope="row">
                          {kidsRow.name}
                        </TableCell>
                        <TableCell>
                          {new Date(kidsRow.start_date).toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {new Date(kidsRow.end_date).toLocaleString()}
                        </TableCell> */}

                            <SingleTask
                              name={kidsRow.name}
                              id={kidsRow.id}
                              description={kidsRow.description}
                              end_date={new Date(
                                kidsRow.end_date
                              ).toLocaleString()}
                              start_date={new Date(
                                kidsRow.start_date
                              ).toLocaleString()}
                              userId={kidsRow.userid}
                            />
                          </TableRow>
                        ))}
                    </Stack>
                  </Card>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    // kids: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     amount: PropTypes.number.isRequired,
    //     customerId: PropTypes.string.isRequired,
    //     date: PropTypes.string.isRequired,
    //   })
    // ).isRequired,
  }).isRequired,
};

export default function AllKids() {
  const dispatch = useDispatch();

  const { kids } = useSelector((state) => state.parent);
  const rows =
    kids &&
    kids.map((kid) => createData(kid.id, kid.fullname, kid.phone, kid.email));

  React.useEffect(() => {
    dispatch(fetchAllKids());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Full names</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
