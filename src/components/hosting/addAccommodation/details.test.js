import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Details from "./details";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Router>
      <Details />
    </Router>,
    div
  );
});

test("place name doesn not accept string over 40 character and null value", () => {
  render(
    <Router>
      <Details />
    </Router>
  );
  const inputPlaceName = screen.getByTestId("details-placeName");
  userEvent.type(
    inputPlaceName,
    "seaSide villa in front of the jungle and near to facilities in city."
  );
  expect(inputPlaceName).not.toHaveValue(
    "seaSide villa in front of the jungle and near to facilities in city."
  );
  expect(inputPlaceName).not.toBeNull;
});

test("Area doesn not accept string and null value", () => {
  render(
    <Router>
      <Details />
    </Router>
  );
  const inputArea = screen.getByTestId("details-area");
  userEvent.type(inputArea, "This is string input");
  expect(inputArea).not.toHaveValue("This is string input");
  expect(inputArea).not.toBeNull;
});

test("Price doesn not accept string and null value", () => {
  render(
    <Router>
      <Details />
    </Router>
  );
  const inputPrice = screen.getByTestId("details-price");
  userEvent.type(inputPrice, "This is string input");
  expect(inputPrice).not.toHaveValue("This is string input");
  expect(inputPrice).not.toBeNull;
});

test("villa description does not accept over 120 characters", () => {
  render(
    <Router>
      <Details />
    </Router>
  );
  const inputDescription = screen.getByTestId("details-description");
  userEvent.type(
    inputDescription,
    "Tehran was first chosen as the capital of Iran by Agha Mohammad Khan of the Qajar dynasty in 1786, in order to remain within close reach of Irans territories  the Caucasus, before being separated from Iran Iranian Wars, and to avoid the vying factions  the previously ruling Iranian dynasties. The capital has been moved several times throughout history, and Tehran is the 32nd national capital of Persia. Large-scale demolition and rebuilding began in the 1920s, and Tehran has been a destination for mass migrations from all over Iran since the 20th century."
  );
  expect(inputDescription).not.toHaveValue(
    "Tehran was first chosen as the capital of Iran by Agha Mohammad Khan of the Qajar dynasty in 1786, in order to remain within close reach of Irans territories  the Caucasus, before being separated from Iran Iranian Wars, and to avoid the vying factions  the previously ruling Iranian dynasties. The capital has been moved several times throughout history, and Tehran is the 32nd national capital of Persia. Large-scale demolition and rebuilding began in the 1920s, and Tehran has been a destination for mass migrations from all over Iran since the 20th century."
  );
  expect(inputDescription).not.toBeNull;
});
