import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import axios from "axios";
import {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay
} from "helpers/selectors";

export default function Application(props) {
  // const [days, setDays] = useState();
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });
  const setInterviewers = interviewers => setState({ ...state, interviewers });
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(result => {
      setState(prev => ({
        ...prev,
        days: result[0].data,
        appointments: result[1].data,
        interviewers: result[2].data
      }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

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
        setState(state => ({
          ...state,
          appointments
        }));
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
        setState({
          ...state,
          appointments
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <main className="layout">
      <section className="sidebar">
        {
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
        }
        <DayList days={state.days} day={state.day} setDay={setDay} />;
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          const interviewCurrent = getInterview(state, appointment.interview);
          return (
            <Appointment
              id={appointment.id}
              time={appointment.time}
              interview={interviewCurrent}
              interviewers={interviewers}
              bookInterview={bookInterview}
              deleteInterview={deleteInterview}
            />
          );
          // <Appointment key={appointment.id} {...appointment} />
        })}
        <Appointment />
      </section>
    </main>
  );
}
