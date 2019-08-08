import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "./styles.scss";

export default function Header(props) {
  return (
    <header class="appointment__time">
      <h4 class="text--semi-bold">{props.time}</h4>
      <hr class="appointment__separator" />
    </header>
  );
}
