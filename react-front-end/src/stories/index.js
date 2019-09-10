import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { Button, Welcome } from "@storybook/react/demo";
import FlightList from "../frontcomponents/FlightList";
import SearchForm from "../frontcomponents/SearchForm";
import flights from "../frontcomponents/fakeData/fakeData.json";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));



storiesOf("FlightList", module).add("list", () => {
  return <FlightList flights={flights} />;
});

storiesOf("SearchForm", module).add("normal", () => {
  return <SearchForm />;
});
