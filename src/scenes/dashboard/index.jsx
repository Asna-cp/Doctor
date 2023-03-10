import { Box,useTheme } from "@mui/material";
import { tokens } from "../../theme";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import SwitchAccountOutlinedIcon from '@mui/icons-material/SwitchAccountOutlined';
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import StatBox from "../../components/StatBox";


const Dashboard = () => {
  const [userCount, setUserCount] = useState("");
  const [doctorCount, setDoctorCount] = useState("");
  const [appointmentCount, setappointmentCount] = useState("");
  const [treatmentCount, setTreatmentCount] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const getShortInfo = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_PORT}/allCounts`);
    setUserCount(data.patientsCount);
    setDoctorCount(data.doctorsCount);
    setappointmentCount(data.appointmentsCount);
    setTreatmentCount(data.treatmentsCount);
  };

  useEffect(() => {
    getShortInfo();
  }, []);

 
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box> */}
          {/* <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          > */}
            {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports */}
          {/* </Button> */}
        {/* </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={doctorCount}
            subtitle="AllDoctors"
            progress="0.75"
            increase="+14%"
            icon={
              <PeopleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={treatmentCount}
            subtitle="Treatments"
            progress="0.50"
            increase="+21%"
            icon={
              <VaccinesOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userCount}
            subtitle="New Patients"
            progress="0.30"
            increase="+5%"
            icon={
          
              <LocalHospitalOutlinedIcon
              // <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={appointmentCount}
            subtitle="Appointments Received"
            // progress="0.80"
            // increase="+43%"
           
            icon={
              <SwitchAccountOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
      
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        > */}
        {/* <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography> */}
        {/* <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          > */}
        {/* <ProgressCircle size="125" /> */}
        {/* <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography> */}
        {/* <Typography>Includes extra misc expenditures and costs</Typography> */}
        {/* </Box>
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
   
        </Box> */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
    
         
        </Box> */}
      </Box>
    </Box>
  );
};

export default Dashboard;
