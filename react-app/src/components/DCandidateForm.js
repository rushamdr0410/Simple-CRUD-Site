import React, { useEffect } from "react";
import { 
  Grid, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  FormHelperText,
  Box
} from "@mui/material";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import toast from "react-hot-toast";

const initialFieldValues = {
  fullName: '',
  mobile: '',
  email: '',
  age: '',
  bloodGroup: '',
  address: ''
}

const DCandidateForm = ({ ...props }) => {
  // Enhanced validation function
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    
    // Handle case where fieldValues might be a string (field name)
    const checkObj = typeof fieldValues === 'string' 
      ? { [fieldValues]: values[fieldValues] } 
      : fieldValues;
    
    // Full Name validation
    if ('fullName' in checkObj) {
      const name = checkObj.fullName?.trim();
      if (!name) {
        temp.fullName = "Full name is required";
      } else if (name.length < 2) {
        temp.fullName = "Name must be at least 2 characters";
      } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        temp.fullName = "Name can only contain letters and spaces";
      } else {
        temp.fullName = "";
      }
    }
    
    // Mobile validation
    if ('mobile' in checkObj) {
      const mobile = checkObj.mobile?.trim();
      if (!mobile) {
        temp.mobile = "Mobile number is required";
      } else if (!/^[0-9]{10}$/.test(mobile)) {
        temp.mobile = "Please enter a valid 10-digit mobile number";
      } else {
        temp.mobile = "";
      }
    }
    
    // Blood Group validation
    if ('bloodGroup' in checkObj) {
      temp.bloodGroup = checkObj.bloodGroup ? "" : "Please select a blood group";
    }
    
    // Email validation (optional field)
    if ('email' in checkObj) {
      const email = checkObj.email?.trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        temp.email = "Please enter a valid email address";
      } else {
        temp.email = "";
      }
    }
    
    // Age validation (optional field)
    if ('age' in checkObj) {
      const age = checkObj.age;
      if (age) {
        const ageNum = parseInt(age);
        if (isNaN(ageNum) || ageNum < 0) {
          temp.age = "Age must be a positive number";
        } else if (ageNum > 120) {
          temp.age = "Please enter a valid age";
        } else {
          temp.age = "";
        }
      } else {
        temp.age = "";
      }
    }
    
    setErrors(temp);
    
    // Return true if all errors are empty strings
    if (fieldValues === values || typeof fieldValues === 'string') {
      return Object.values(temp).every(x => x === "");
    }
    
    return false;
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = e => {
    e.preventDefault();
    
    // Validate all fields before submission
    const isValid = validate(values);
    
    if (isValid) {
      const onSuccess = () => {
        resetForm();
        toast.success(props.currentId === 0 ? "Candidate created successfully!" : "Candidate updated successfully!");
      };
      
      if (props.currentId === 0) {
        props.createDCandidate(values, onSuccess);
      } else {
        props.updateDCandidate(props.currentId, values, onSuccess);
      }
    } else {
      toast.error("Please fix the errors before submitting");
    }
  };

  // Function to validate a single field
  const validateField = (fieldName) => {
    const fieldValue = { [fieldName]: values[fieldName] };
    validate(fieldValue);
  };

  // Handle blur event for immediate validation
  const handleBlur = (e) => {
    const { name } = e.target;
    validateField(name);
  };

  useEffect(() => {
    if (props.currentId !== 0 && props.dCandidateList) {
      const candidate = props.dCandidateList.find(x => x.id === props.currentId);
      if (candidate) {
        setValues({
          ...candidate
        });
        setErrors({});
      }
    }
  }, [props.currentId, props.dCandidateList, setValues, setErrors]);

  return (
    <Box 
      component="form" 
      autoComplete="off" 
      noValidate 
      onSubmit={handleSubmit}
      sx={{ 
        '& .MuiTextField-root': {
          m: 1,
          minWidth: 230,
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name *"
            value={values.fullName}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.fullName}
            helperText={errors.fullName}
            fullWidth
            required
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            type="email"
            placeholder="example@domain.com"
          />
          <FormControl 
            variant="outlined" 
            error={!!errors.bloodGroup}
            sx={{ m: 1, minWidth: 230 }}
            fullWidth
            required
          >
            <InputLabel>Blood Group *</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handleInputChange}
              onBlur={handleBlur}
              label="Blood Group *"
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A +ve</MenuItem>
              <MenuItem value="A-">A -ve</MenuItem>
              <MenuItem value="B+">B +ve</MenuItem>
              <MenuItem value="B-">B -ve</MenuItem>
              <MenuItem value="AB+">AB +ve</MenuItem>
              <MenuItem value="AB-">AB -ve</MenuItem>
              <MenuItem value="O+">O +ve</MenuItem>
              <MenuItem value="O-">O -ve</MenuItem>
            </Select>
            {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile *"
            value={values.mobile}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.mobile}
            helperText={errors.mobile}
            fullWidth
            required
            inputProps={{ maxLength: 10 }}
            placeholder="10-digit mobile number"
          />
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={!!errors.age}
            helperText={errors.age}
            fullWidth
            type="number"
            InputProps={{ inputProps: { min: 0, max: 120 } }}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={2}
            inputProps={{ maxLength: 200 }}
          />
          <Box sx={{ m: 1, display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ m: 1 }}
              fullWidth
            >
              {props.currentId === 0 ? 'Create' : 'Update'}
            </Button>
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              onClick={resetForm}
              fullWidth
            >
              Reset
            </Button>
          </Box>
          <Box sx={{ m: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
            <em>* Required fields</em>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const mapStateToProps = state => ({
  dCandidateList: state.dCandidate.list
})

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(DCandidateForm);