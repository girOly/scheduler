import React from "react";

import "./styles.scss";

export default function Empty(props) {
  return (
    <main className="appointment__add" onClick={props.onAdd}>
      <img className="appointment__add-button" src="images/add.png" alt="Add" />
    </main>
  );
}
