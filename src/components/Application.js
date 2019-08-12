import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay
} from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
export default function Application(props) {
  // const [days, setDays] = useState();
  const {
    state,
    setDay,
    setDays,
    setInterviewers,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

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
