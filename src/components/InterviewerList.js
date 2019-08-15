import React from "react";
import PropTypes from "prop-types";
import "./interviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
// Creates the Interviewer List on Create
export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  const { interviewers } = props;
  const interviewerList = interviewers.map(mentor => (
    <InterviewerListItem
      key={mentor.id}
      selected={props.value === mentor.id}
      setInterviewer={event => props.onChange(mentor.id)}
      name={mentor.name}
      avatar={mentor.avatar}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{props.name}</h4>
      <ul className="interviewers__list"> {interviewerList} </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
