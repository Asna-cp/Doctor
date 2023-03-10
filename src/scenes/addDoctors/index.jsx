import {
  Box,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const doctorSchema = yup.object().shape({
  doctorName: yup
    .string()
    .matches(/^\s*\S.*$/, 'Whitespace is not allowed')
    .required("required"),
    
  specialist: yup.string().required("required"),
  description: yup
  .string()
  .matches(/^\s*\S.*$/, 'Whitespace is not allowed')
  .required("required"),
  // image: yup.string().required("required"),
  experience: yup.number().required("required"),
});

const initialValues = {
  doctorName: "",
  specialist: "",
  description: "",
  // image: "",
  experience: "",
};
const AddDoctors = () => {
const [image, setImage] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const handleFormSubmit = (values) => {

    axios
      .post(`${process.env.REACT_APP_PORT}/addDoctors`, {values,image})
      .then((response) => {
        if (response) {
          console.log(response);
          window.location.reload();
        }
      })
      .catch((error) => {});
  };

  //FOR IMAGE

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const fileUpload = async (e) => {
  const file = e.target.files[0];
  console.log(file);
  const base64 = await convertBase64(file);
  setImage(base64);
};



  return (
    <Box m="20px">
      <Header title="Add Doctors" subtitle="Add New Doctor Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={doctorSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.doctorName}
                name="doctorName"
                error={!!touched.doctorName && !!errors.doctorName}
                helperText={touched.doctorName && errors.doctorName}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl
                required
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="demo-simple-select-required-label">
                  Specialist
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={values?.specialist}
                  label="Time Schedule"
                  name="specialist"
                  defaultValue=""
                  onBlur={handleBlur}
                  error={!!touched.specialist && !!errors.specialist}
                  helperText={touched.specialist && errors.specialist}
                  onChange={handleChange}
                >
                  <MenuItem value="Prosthodontist">Prosthodontist</MenuItem>
                  <MenuItem value="Oral and Maxillofacial Surgeon">
                    Oral and Maxillofacial Surgeon
                  </MenuItem>
                  <MenuItem value="Orthodontics">Orthodontics</MenuItem>
                  <MenuItem value="Pedodontics">Pedodontics</MenuItem>
                  <MenuItem value="Implantologis">Implantologis</MenuItem>
                  <MenuItem value="   Root Canal Treatment">
                    Root Canal Treatment
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Experience"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.experience}
                name="experience"
                error={!!touched.experience && !!errors.experience}
                helperText={touched.experience && errors.experience}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="file"
                label="Image"
                onBlur={handleBlur}
                onChange={fileUpload}
             
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box>
              {image && <img style={{height: '36px',width: '42px'}} src={image} alt='' /> }
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Doctor
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddDoctors;
