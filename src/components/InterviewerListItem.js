import React from "react";

import "./interviewerListItem.scss";
import classnames from "classnames";
// Creates Interviewers List - On Create Interview
export default function InterviewerListItem(props) {
  const noName = props.selected ? props.name : null;

  const interviewerListItemClass = classnames("interviewers__item", {
    interviewers__item: true,
    "interviewers__item--selected": props.selected
  });

  const interviewerListImageClass = classnames("interviewers__item-image", {
    "interviewers__item-image": true,
    "interviewers__item--selected-image": props.selected
  });

  return (
    <li className={interviewerListItemClass} onClick={props.setInterviewer}>
      <img
        className={interviewerListImageClass}
        src={props.avatar}
        alt={props.name}
      />
      {noName}
    </li>
  );
}
