import React, { useReducer, useEffect } from "react";
import axios from "axios";
import {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay
} from "helpers/selectors";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function(state, action) {
  console.log(state, "State from Reducer");
  console.log(action, "Action from Reducer");
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        interviewers: action.interviewers,
        appointments: action.appointments,
        days: action.days
      };
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      return { ...state, appointments };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default function useApplicationData(props) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });
  // const setDay = day => dispatch({ type: SET_DAY, day });
  // const setDays = days => dispatch({ ...state, days });
  // const setInterviewers = interviewers => dispatch({ ...state, interviewers });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(result => {
      console.log(result, "Result");
      dispatch({
        type: SET_APPLICATION_DATA,
        days: result[0].data,
        appointments: result[1].data,
        interviewers: result[2].data
      });
    });
  }, []);
  console.log(state, "State ---------------------------");
  // const appointments = getAppointmentsForDay(state, state.day);
  // const interviewers = getInterviewersForDay(state, state.day);

  // const schedule = appointments.map(appointment => {
  //   const interviewCurrent = getInterview(state, appointment.interview);
  //
  //   console.log(interviewCurrent, "===============getInterview=============");
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interviewCurrent}
  //       interviewers={interviewers}
  //     />
  //   );
  // });
  // ______________________________
  // Pass SetDays(data)? -- Update Appointment Object using Helper Function?

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        // setState(state => ({
        // ...state,
        // appointments
        // }));
        dispatch({ type: SET_INTERVIEW, id, interview });
      })
      .catch(err => {
        console.log(err);
      });
    // transition to SHOW using onBook
  };
  const deleteInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(res => {
        // setState({
        //   ...state,
        //   appointments
        // });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return {
    state,
    dispatch,
    // setDays,
    // setInterviewers,
    // appointments,
    // interviewers,
    bookInterview,
    deleteInterview
  };
}
