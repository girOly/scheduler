import React from "react";
// List of Days on Sidebar
import DayListItem from "./DayListItem";
export default function DayList(props) {
  const { days } = props;
  const dayList = days.map(day => (
    <DayListItem
      key={day.id}
      selected={day.name === props.day}
      name={day.name}
      spots={day.spots}
      setDay={props.setDay}
    />
  ));

  return <ul>{dayList}</ul>;
}
