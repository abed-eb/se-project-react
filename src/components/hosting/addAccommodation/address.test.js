import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Address from "./address";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Router>
      <Address />
    </Router>,
    div
  );
});

test("Postal code doesn not accept string and null value", () => {
  render(
    <Router>
      <Address />
    </Router>
  );
  const inputPostalCode = screen.getByTestId("address-postalCode");
  userEvent.type(inputPostalCode, "This is postal code");
  expect(inputPostalCode).not.toHaveValue("This is postal code");
  expect(inputPostalCode).not.toBeNull;
});

test("Postal code must be more than 5 digits", () => {
  render(
    <Router>
      <Address />
    </Router>
  );
  const inputPostalCode = screen.getByTestId("address-postalCode");
  userEvent.type(inputPostalCode, "123");
  expect(inputPostalCode).not.toHaveValue("123");
});

test("Postal code must less than 15 digits", () => {
  render(
    <Router>
      <Address />
    </Router>
  );
  const inputPostalCode = screen.getByTestId("address-postalCode");
  userEvent.type(inputPostalCode, "123456789012345678");
  expect(inputPostalCode).not.toHaveValue("123456789012345678");
});

test("Full address does not accept null value.", () => {
  render(
    <Router>
      <Address />
    </Router>
  );
  const inputFullAddress = screen.getByTestId("address-fullAddress");
  expect(inputFullAddress).not.toBeNull;
});

test("Country doesn not accept null value", () => {
  render(
    <Router>
      <Address />
    </Router>
  );
  const countrySelect = screen.getByTestId("address-country");
  expect(countrySelect).not.toBeNull;
});

test("State doesn not accept null value", () => {
  render(
    <Router>
      <Address />
    </Router>
  );
  const stateSelect = screen.getByTestId("address-state");
  expect(stateSelect).not.toBeNull;
});

test("City doesn not accept null value", () => {
  render(
    <Router>
      <Address />
    </Router>
  );
  const citySelect = screen.getByTestId("address-city");
  expect(citySelect).not.toBeNull;
});
