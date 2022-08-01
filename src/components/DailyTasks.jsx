import { useEffect, useState } from "react";
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
import { ConstructionOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks } from "../redux/thunks/task.thunk";
import { setTasks } from "../redux/slices/task.slice";

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

const DailyTasks = ({ setAuth, addShift, shifts, deleteShift }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);
  let tsks, nwdt;
  if (tasks) {
    tsks = tasks.data.map((task) => {
      return {
        title: task.name,
        startDate: task.start_date,
        endDate: task.end_date,
      };
    });
  }

  const [data, setData] = useState(tsks);
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

  const commitChanges = async ({ added, changed, deleted }) => {
    let newData = [...tsks];
    if (added) {
      const startingAddedId = newData > 0 ? newData[tsks.length - 1].id + 1 : 0;
      newData = [...newData, { id: startingAddedId, ...added }];

      const res = dispatch(
        createTask({
          name: added.title,
          start_date: new Date(added.startDate),
          end_date: new Date(added.endDate),
        })
      );
      console.log(res);
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
      newData = newData.filter((appointment) => appointment.id !== deleted);
    }
    setData(newData);
    nwdt = newData.map((task) => {
      return {
        name: task.title,
        start_date: task.startDate,
        end_date: task.endDate,
      };
    });
    // dispatch(setTasks(nwdt));
    console.log(nwdt)
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Paper>
      {tsks && (
        <Scheduler data={tsks} height={500}>
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
          {/* <IntegratedEditing /> */}
          <DayView startDayHour={0} endDayHour={24} />
          <ConfirmationDialog />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
          <CurrentTimeIndicator />
        </Scheduler>
      )}
    </Paper>
  );
};

export default DailyTasks;
