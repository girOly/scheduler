import React, { useState, useEffect } from "react";
import axios from "axios";

import "./styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Empty from "components/Appointment/empty";
import Show from "components/Appointment/show";
import Confirm from "components/Appointment/confirm";
import Error from "components/Appointment/error";
import Header from "components/Appointment/header";
import Status from "components/Appointment/status";
import Form from "components/Appointment/form";

export default function Appointment(props) {
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const EMPTY = "EMPTY";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  console.log("========== prpos in APOINTMENT ========");
  console.log(props);
  console.log("==============================");

  console.log(props.interview, " <<<<<<< Props.interview in Index.js");
  const onSave = function() {
    transition(SAVING);
  };
  const onCancel = function() {
    back();
  };

  const onAdd = function() {
    transition(CREATE);
  };

  const onEdit = function() {
    transition(EDIT);
  };

  const onCompleteSave = function() {
    transition(SAVING);
  };
  const onCompleteEmpty = function() {
    transition(EMPTY);
  };

  const onConfirm = function() {
    deleted(props.id);
    transition(DELETING);
  };

  const onDelete = function() {
    transition(CONFIRM);
  };
  const deleted = function(id) {
    props
      .deleteInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => transition(ERROR_DELETE, true));
  };
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  return (
    <article className="appointment">
      <header class="appointment__time">
        <h4 class="text--semi-bold">{props.time}</h4>
        <hr class="appointment__separator" />
      </header>
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          // interviewers={[]}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
          // onBook={props.bookInterview().then(() => transition(SHOW))}
        />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={onCancel} onConfirm={onConfirm} />
      )}

      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form
          // interviewers={props.interviewers}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
        />
      )}
      {mode === ERROR_SAVE && <Error message={"Error Saving"} />}

      {mode === ERROR_DELETE && <Error message={"Error Deleting"} />}
    </article>
  );
}
