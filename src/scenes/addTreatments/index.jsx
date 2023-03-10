import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const message = "Whitespace is not allowed"

const treatmentSchema = yup.object().shape({
  treatmentname: yup
    .string()
    .matches(/^\s*\S.*$/, message)
    .required("required"),
  description: yup
    .string()
    .matches(/^\s*\S.*$/, message)
    .required("required"),
  about: yup
    .string()
    .matches(/^\s*\S.*$/, message)
    .required("required"),
});
const initialValues = {
  treatmentname: "",
  description: "",
  about: "",
};

const AddTreatments = () => {
  const [image, setImage] = useState();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    axios
      .post(`${process.env.REACT_APP_PORT}/addTreatments`, {values,image})
      .then((response) => {
        if (response) {
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
      <Header title="Add Treatments" subtitle="Add Treatment" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={treatmentSchema}
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
                label="Treatment Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.treatmentname}
                name="treatmentname"
                error={!!touched.treatmentname && !!errors.treatmentname}
                helperText={touched.treatmentname && errors.treatmentname}
                sx={{ gridColumn: "span 2" }}
              />

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
                type="text"
                label="About"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.about}
                name="about"
                error={!!touched.about && !!errors.about}
                helperText={touched.about && errors.about}
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
                Add New Treatment
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddTreatments;
