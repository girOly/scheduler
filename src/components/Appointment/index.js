import React from "react";


import "./styles.scss";
import Empty from "components/Appointment/empty";
import Show from "components/Appointment/show";
export default function Appointment(props) {
  return (
    <article className="appointment">
      <header class="appointment__time">
        <h4 class="text--semi-bold">{props.time}</h4>
        <hr class="appointment__separator" />
      </header>
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
