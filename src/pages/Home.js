import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  CurrentTimeIndicator,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = new Date();
const schedulerData = [
  {
    startDate: new Date(),
    endDate: new Date() + 1,
    title: "Meeting",
  },
  {
    startDate: "2022-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
  },
];

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#FFC107",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const Home = ({ setAuth, addShift, shifts, deleteShift }) => {
  const theme = useTheme();

  const [data, setData] = useState(schedulerData);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [addedAppointment, setAddedAppointment] = useState({});
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [editingAppointment, setEditingAppointment] = useState(undefined);


  const changeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    setAppointmentChanges(appointmentChanges);
  };

  const changeEditingAppointment = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let newData = [...data];
    if (added) {
      const startingAddedId = newData > 0 ? newData[data.length - 1].id + 1 : 0;
      newData = [...newData, { id: startingAddedId, ...added }];
      // addShift(added);
    }
    if (changed) {
      newData = newData.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      // updateShift(changed);
    }
    if (deleted !== undefined) {
      console.log(deleted);
      newData = newData.filter(appointment => appointment.id !== deleted);
    }
    setData(newData);
  };

  return (
    // <Container
    //   maxWidth="lg"
    //   sx={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     flexDirection: "column",
    //     height: "100vh",
    //   }}
    // >

    //   <Button size="large" variant="contained" onClick={() => setAuth(false)}>
    //     Log out
    //   </Button>
    // </Container>
    <Paper>
      <Scheduler data={data} height={600}>
        <ViewState currentDate={currentDate} />
        <EditingState
          onCommitChanges={commitChanges}
          addedAppointment={addedAppointment}
          onAddedAppointmentChange={changeAddedAppointment}
          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={changeAppointmentChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={changeEditingAppointment}

        />
        <IntegratedEditing />
        <DayView startDayHour={0} endDayHour={24} />
        <ConfirmationDialog />
        <Appointments appointmentComponent={Appointment} />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
        <CurrentTimeIndicator />
      </Scheduler>
    </Paper>
  );
};

export default Home;
