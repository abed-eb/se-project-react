import React from "react";
import ReactDom from "react-dom";
import {
  render,
  fireEvent,
  cleanup,
  screen,
  getByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Amentities from "./amentities";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Router>
      <Amentities />
    </Router>,
    div
  );
});

test("Normal capacity can not be 0", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  const { rerender } = render(<amentities-normalCapacity normalCapacity={1} />);
  rerender(<amentities-normalCapacity number={0} />);
  expect(screen.getByTestId("amentities-normalCapacity")).not.toHaveTextContent(
    "0"
  );
});

test("maximum capacity can not be 0", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  const { rerender } = render(<amentities-maxCapacity maxCapacity={1} />);
  rerender(<amentities-maxCapacity number={0} />);
  expect(screen.getByTestId("amentities-maxCapacity")).not.toHaveTextContent(
    "0"
  );
});

test("Number of bedrooms can not be lower than 0", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  const { rerender } = render(<amentities-bedrooms bedrooms={0} />);
  rerender(<amentities-bedrooms number={-1} />);
  expect(screen.getByTestId("amentities-bedrooms")).not.toHaveTextContent("-1");
});

test("Number of double beds can not be lower than 0", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  const { rerender } = render(<amentities-doubleBeds doubleBeds={0} />);
  rerender(<amentities-doubleBeds number={-1} />);
  expect(screen.getByTestId("amentities-doubleBeds")).not.toHaveTextContent(
    "-1"
  );
});

test("Number of single beds can not be lower than 0", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  const { rerender } = render(<amentities-singleBeds singleBeds={0} />);
  rerender(<amentities-singleBeds number={-1} />);
  expect(screen.getByTestId("amentities-singleBeds")).not.toHaveTextContent(
    "-1"
  );
});

test("Number of bathrooms can not be lower than 1", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  const { rerender } = render(<amentities-bathrooms bathrooms={1} />);
  rerender(<amentities-bathrooms number={0} />);
  expect(screen.getByTestId("amentities-bathrooms")).not.toHaveTextContent("0");
});

test("Number of showers can not be lower than 1", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  const { rerender } = render(<amentities-showers showers={1} />);
  rerender(<amentities-showers number={0} />);
  expect(screen.getByTestId("amentities-showers")).not.toHaveTextContent("0");
});

test("Plus icons is rendered", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  expect(screen.getAllByAltText("plus icon")).toBeInTheDocument;
});

test("Plus icons is rendered", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  expect(screen.getAllByAltText("minus icon")).toBeInTheDocument;
});

test("back button is rendered", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  expect(screen.getAllByTestId("back-btn")).toBeInTheDocument;
});

test("next button is rendered", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  expect(screen.getAllByTestId("next-btn")).toBeInTheDocument;
});

test("Normal Capacity counter increments", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  userEvent.click(screen.getByTestId("nCapPlus"));
  expect(screen.getByTestId("amentities-normalCapacity")).toHaveTextContent(
    "2"
  );
});

// test('Normal Capacity counter decrements', () =>{
//     render(<Router><Amentities /></Router>);
//     userEvent.click(screen.getByTestId('nCapMinus'));
//     expect(screen.getByTestId('amentities-normalCapacity')).not.toHaveTextContent('0');
// });

test("Maximum Capacity counter increments", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  userEvent.click(screen.getByTestId("mCapPlus"));
  expect(screen.getByTestId("amentities-maxCapacity")).toHaveTextContent("2");
});

// test('Maximum Capacity counter decrements', () =>{
//     render(<Router><Amentities /></Router>);
//     userEvent.click(screen.getByTestId('mCapMinus'));
//     expect(screen.getByTestId('amentities-maxCapacity')).not.toHaveTextContent('0');
// });

test("Bedrooms counter increments", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  userEvent.click(screen.getByTestId("bedroomPlus"));
  expect(screen.getByTestId("amentities-bedrooms")).toHaveTextContent("1");
});

// test('Bedrooms counter decrements', () =>{
//     render(<Router><Amentities /></Router>);
//     userEvent.click(screen.getByTestId('bedroomMinus'));
//     expect(screen.getByTestId('amentities-bedrooms')).toHaveTextContent('0');
// });

test("Double beds counter increments", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  userEvent.click(screen.getByTestId("doubleBedPlus"));
  expect(screen.getByTestId("amentities-doubleBeds")).toHaveTextContent("1");
});

// test('Double beds counter decrements', () =>{
//     render(<Router><Amentities /></Router>);
//     userEvent.click(screen.getByTestId('doubleBedMinus'));
//     expect(screen.getByTestId('amentities-doubleBeds')).toHaveTextContent('0');
// });

test("Single beds counter increments", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  userEvent.click(screen.getByTestId("singleBedPlus"));
  expect(screen.getByTestId("amentities-singleBeds")).toHaveTextContent("1");
});

// test('Single beds counter decrements', () =>{
//     render(<Router><Amentities /></Router>);
//     userEvent.click(screen.getByTestId('singleBedMinus'));
//     expect(screen.getByTestId('amentities-singleBeds')).toHaveTextContent('0');
// });

test("Bathrooms counter increments", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  userEvent.click(screen.getByTestId("bathroomPlus"));
  expect(screen.getByTestId("amentities-bathrooms")).toHaveTextContent("2");
});

// test('Bathrooms counter decrements', () =>{
//     render(<Router><Amentities /></Router>);
//     userEvent.click(screen.getByTestId('bathroomMinus'));
//     expect(screen.getByTestId('amentities-bathrooms')).toHaveTextContent('0');
// });

test("Showers counter increments", () => {
  render(
    <Router>
      <Amentities />
    </Router>
  );
  userEvent.click(screen.getByTestId("showerPlus"));
  expect(screen.getByTestId("amentities-showers")).toHaveTextContent("2");
});

// test('Showers counter decrements', () =>{
//     render(<Router><Amentities /></Router>);
//     userEvent.click(screen.getByTestId('showerMinus'));
//     expect(screen.getByTestId('amentities-showers')).toHaveTextContent('0');
// });

// test('Minus icons are rendered', () =>{
//     render(<Router><Amentities /></Router>);
//     expect(screen.findAllByAltText('minus icon')).toBeCalled;
// });
