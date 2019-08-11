import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button from "components/Button";
import "./styles.scss";

export default function Confirm(props) {
  return (
    <main class="appointment__card appointment__card--confirm">
      <h1 class="text--semi-bold">
        Are you sure you want to cancel your Interview?
      </h1>
      <section class="appointment__actions">
        <Button danger onClick={props.onCancel}>
          Cancel
        </Button>
        <Button danger onClick={props.onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}
