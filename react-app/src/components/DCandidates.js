import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { 
  Grid, 
  Paper, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  ButtonGroup, 
  Button 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DCandidateForm from "./DCandidateForm";
import toast from "react-hot-toast";

const DCandidates = ({ fetchAllDCandidates, deleteDCandidate, dCandidateList, ...props }) => {
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    fetchAllDCandidates()
  }, [fetchAllDCandidates])

  const onDelete = id => {
    if (window.confirm('Are you sure to delete this record?')) {
      deleteDCandidate(id, () => {
        toast.success("Deleted successfully");
        // Refetch data after successful deletion
        fetchAllDCandidates();
      });
    }
  }
  
  return (
    <Paper sx={{ m: 2, p: 2 }} elevation={3}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DCandidateForm currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ 
                  "& .MuiTableCell-head": {
                    fontSize: "1.25rem"
                  }
                }}>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dCandidateList.map((record, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell>{record.fullName}</TableCell>
                        <TableCell>{record.mobile}</TableCell>
                        <TableCell>{record.bloodGroup}</TableCell>
                        <TableCell>
                          <ButtonGroup variant="text">
                            <Button>
                              <EditIcon color="primary"
                                onClick={() => { setCurrentId(record.id) }} 
                              />
                            </Button>
                            <Button>
                              <DeleteIcon color="secondary"
                                onClick={() => onDelete(record.id)} 
                              />
                            </Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}

const mapStateToProps = state => ({
  dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
  deleteDCandidate: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(DCandidates);