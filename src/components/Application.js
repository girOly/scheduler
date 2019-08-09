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
//
// const appointments = [
//   {
//     id: 1,
//     time: "12pm"
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "3pm",
//     interview: {
//       student: "Frodo Baggins",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "5pm",
//     interview: {
//       student: "Bilbo Baggins",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "8pm",
//     interview: {
//       student: "Samwise Gamgee",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png"
//       }
//     }
//   },
//   {
//     id: 0,
//     time: "",
//     interview: {
//       student: "",
//       interviewer: {
//         id: 0,
//         name: "",
//         avatar: ""
//       }
//     }
//   }
// ];
// // const interviewers = {
//   "1": {
//     id: 1,
//     name: "Sylvia Palmer",
//     avatar: "https://i.imgur.com/LpaY82x.png"
//   },
//   "2": {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   },
//   "3": {
//     id: 3,
//     name: "Mildred Nazir",
//     avatar: "https://i.imgur.com/T2WwVfS.png"
//   },
//   "4": { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   "5": { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
//   "6": {
//     id: 6,
//     name: "Susan Reynolds",
//     avatar: "https://i.imgur.com/TdOAdde.jpg"
//   },
//   "7": { id: 7, name: "Alec Quon", avatar: "https://i.imgur.com/3tVgsra.jpg" },
//   "8": {
//     id: 8,
//     name: "Viktor Jain",
//     avatar: "https://i.imgur.com/iHq8K8Z.jpg"
//   },
//   "9": {
//     id: 9,
//     name: "Lindsay Chu",
//     avatar: "https://i.imgur.com/nPywAp1.jpg"
//   },
//   "10": {
//     id: 10,
//     name: "Samantha Stanic",
//     avatar: "https://i.imgur.com/okB9WKC.jpg"
//   }
// };

export default function Application(props) {
  // const [days, setDays] = useState();
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const [chicken, setChicken] = useState("bob");
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
  console.log("from app.js", interviewers);

  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    console.log(interview, "Cest lui");
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });
  // ______________________________
  // Pass SetDays(data)? -- Update Appointment Object using Helper Function?

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  };

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
      .put(`http://localhost:3001/api/appointments/${id}`, appointment)
      .then(() => {
        setState(state => ({
          ...state,
          appointments
        }));
      });
    // transition to SHOW usig onBook
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
        {appointments.map(appointment => (
          <Appointment
            id={appointment.id}
            time={appointment.time}
            interview={appointment.interview}
            interviewers={interviewers}
          />
          // <Appointment key={appointment.id} {...appointment} />
        ))}
      </section>
    </main>
  );
}
