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
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import MoreIcon from "@mui/icons-material/MoreVert";
import Grid from "@mui/material/Grid";
import Room from "@mui/icons-material/Room";
import { styled } from "@mui/material/styles";
import classNames from "clsx";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../redux/thunks/task.thunk";
import { setTasks } from "../redux/slices/task.slice";

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#51C8BC",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (nextValue) => {
    onFieldChange({ customField: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      {/* <AppointmentForm.Label text="Custom Field" type="ordinaryLabel" /> */}
      <AppointmentForm.TextEditor
        type="multilineTextEditor"
        value={appointmentData.customField}
        onValueChange={onCustomFieldChange}
        placeholder="Description"
      />
    </AppointmentForm.BasicLayout>
  );
};

// APPOINTMENT TOOLTIP
const PREFIX = "Demo";
const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(
  () => ({
    [`&.${classes.firstRoom}`]: {
      background:
        "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)",
    },
    [`&.${classes.secondRoom}`]: {
      background:
        "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)",
    },
    [`&.${classes.thirdRoom}`]: {
      background:
        "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)",
    },
    [`&.${classes.header}`]: {
      height: "260px",
      backgroundSize: "cover",
    },
  })
);

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
}));

const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: "center",
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const StyledAppointmentTooltipCommandButton = styled(
  AppointmentTooltip.CommandButton
)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
}));

const getClassByLocation = (location) => {
  if (location === "Room 1") return classes.firstRoom;
  if (location === "Room 2") return classes.secondRoom;
  return classes.thirdRoom;
};

const Header = ({ children, appointmentData, ...restProps }) => (
  <StyledAppointmentTooltipHeader
    {...restProps}
    className={classNames(
      getClassByLocation(classes, appointmentData.location),
      classes.header
    )}
    appointmentData={appointmentData}
  >
    <StyledIconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(JSON.stringify(appointmentData))}
      className={classes.commandButton}
      size="large"
    >
      <MoreIcon />
    </StyledIconButton>
  </StyledAppointmentTooltipHeader>
);

const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Grid container alignItems="center">
      <StyledGrid item xs={2} className={classes.textCenter}>
        <StyledRoom className={classes.icon} />
      </StyledGrid>
      <Grid item xs={10}>
        <span>{appointmentData.location}</span>
      </Grid>
    </Grid>
  </AppointmentTooltip.Content>
);

const CommandButton = ({ ...restProps }) => (
  <StyledAppointmentTooltipCommandButton
    {...restProps}
    className={classes.commandButton}
  />
);

const DailyTasks = ({ setAuth, addShift, shifts, deleteShift }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);

  // const [data, setData] = useState(tsks);
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
    console.log("----------", deleted, changed, added);

    let newData = [...tasks];
    if (added) {
      const startingAddedId =
        newData > 0 ? newData[tasks.length - 1].id + 1 : 0;
      newData = [
        ...newData,
        {
          id: startingAddedId,
          ...added,
        },
      ];

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
      dispatch(
        updateTask({
          id: changed.id,
          name: changed.title,
          start_date: new Date(changed.startDate),
          end_date: new Date(changed.endDate),
        })
      );
      // updateShift(changed);
    }
    if (deleted !== undefined) {
      dispatch(deleteTask({ id: deleted }));
      // newData = newData.filter((appointment) => appointment.id !== deleted);
    }
    dispatch(setTasks(newData));
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Paper>
      {tasks && (
        <Scheduler data={tasks} height={500}>
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
          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            textEditorComponent={TextEditor}
          />
          <CurrentTimeIndicator />
        </Scheduler>
      )}
    </Paper>
  );
};

export default DailyTasks;
