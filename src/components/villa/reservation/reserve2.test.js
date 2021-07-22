import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import Reserve2 from "./reserve2";
afterEach(cleanup);

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Router>
      <Reserve2 />
    </Router>,
    div
  );
});

test("nationalCode", () => {
  render(
    <Router>
      <Reserve2 />
    </Router>
  );
  const nationalCode = screen.getByTestId("reserve2-nationalCode");
  expect(nationalCode).not.toBeNull;
});

test("nationalCode does not accpet more than 10 digits", () => {
  render(
    <Router>
      <Reserve2 />
    </Router>
  );
  const nationalCode = screen.getByTestId("reserve2-nationalCode");
  userEvent.type("12345678901212");
  expect(nationalCode).not.toHaveValue("12345678901212");
});

test("nationalCode does not accpet less than 10 digits", () => {
  render(
    <Router>
      <Reserve2 />
    </Router>
  );
  const nationalCode = screen.getByTestId("reserve2-nationalCode");
  userEvent.type("12345");
  expect(nationalCode).not.toHaveValue("12345");
});

test("input is rendered", () => {
  render(
    <Router>
      <Reserve2 />
    </Router>
  );
  const nationalCode = screen.getByTestId("reserve2-nationalCode");
  expect(nationalCode).toBeInTheDocument();
});
