import React, { useState, useEffect } from "react";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import axios from "axios";
import { getInterview, getAppointmentsForDay } from "./helpers/selectors";

const appointments = [
  {
    id: 1,
    time: "12pm"
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Frodo Baggins",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 4,
    time: "5pm",
    interview: {
      student: "Bilbo Baggins",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 5,
    time: "8pm",
    interview: {
      student: "Samwise Gamgee",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
      }
    }
  },
  {
    id: 0,
    time: "",
    interview: {
      student: "",
      interviewer: {
        id: 0,
        name: "",
        avatar: ""
      }
    }
  }
];

export default function Application(props) {
  // const [days, setDays] = useState();
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState({ ...state, days });
  useEffect(() => {
    //   axios
    //     .get("/api/days")
    //     .then(({ data }) => {
    //       setDays(data);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    // ______________________________
    // Incorporate axios
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

  const appointments = getAppointmentsForDay(state, day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  // ______________________________
  // Pass SetDays(data)? -- Update Appointment Object using Helper Function?

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
        <DayList days={state.days} day={state.day} setDay={state.setDay} />;
      </section>
      <section className="schedule">
        {appointments.map(appointment => (
          <Appointment
            id={appointment.id}
            time={appointment.time}
            interview={appointment.interview}
          />
          // <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
