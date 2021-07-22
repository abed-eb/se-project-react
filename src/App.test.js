import { render, screen } from "@testing-library/react";
import ReactDom from "react-dom";
import App from "./App";

it("app.js renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<App />, div);
  ReactDom.unmountComponentAtNode(div);
});
