import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "./styles.scss";

export default function Error(props) {
  return (
    <main class="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        onClick={props.onClose}
        class="appointment__error-close"
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
}
