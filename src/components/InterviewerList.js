import React from "react";
import PropTypes from "prop-types";
import "./interviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };
  const { interviewers } = props;
  const interviewerList = interviewers.map(mentor => (
    <InterviewerListItem
      selected={props.value === mentor.id}
      setInterviewer={event => props.onChange(mentor.id)}
      name={mentor.name}
      avatar={mentor.avatar}
    />
  ));

  return (
    <section class="interviewers">
      <h4 class="interviewers__header text--light">{props.name}</h4>
      <ul class="interviewers__list"> {interviewerList} </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
