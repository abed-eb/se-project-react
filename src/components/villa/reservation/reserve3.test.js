import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Reserve3 from "./reserve3";
afterEach(cleanup);

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Router>
      <Reserve3 />
    </Router>,
    div
  );
});

test("Next button is enabled", () => {
  render(
    <Router>
      <Reserve3 />
    </Router>
  );
  const nextBtn = screen.getByTestId("reserve3-nextBtn");
  const acceptRules = screen.getByTestId("reserve3-accept-rules");
  userEvent.click(acceptRules);
  fireEvent.change(acceptRules, { target: { checked: true } });
  expect(nextBtn).toBeEnabled();
});

test("Next button is disabled", () => {
  render(
    <Router>
      <Reserve3 />
    </Router>
  );
  const nextBtn = screen.getByTestId("reserve3-nextBtn");
  const acceptRules = screen.getByTestId("reserve3-accept-rules");
  userEvent.dblClick(acceptRules);
  fireEvent.change(acceptRules, { target: { checked: false } });
  expect(nextBtn).toBeDisabled();
});
