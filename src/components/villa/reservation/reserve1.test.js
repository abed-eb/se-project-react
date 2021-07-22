import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Reserve1 from "./reserve1";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Router>
      <Reserve1 />
    </Router>,
    div
  );
});

test("Range picker is in document", () => {
  render(
    <Router>
      <Reserve1 />
    </Router>
  );
  const rangePicker = screen.getByTestId("reserve1-rangePicker");
  expect(rangePicker).toBeInTheDocument();
});

test("counter first icon be in document", () => {
  render(
    <Router>
      <Reserve1 />
    </Router>
  );
  const counterIcon1 = screen.getByTestId("counter-icon-minus");
  expect(counterIcon1).toBeInTheDocument();
});

test("counter second icon be in document", () => {
  render(
    <Router>
      <Reserve1 />
    </Router>
  );
  const counterIcon2 = screen.getByTestId("counter-icon-plus");
  expect(counterIcon2).toBeInTheDocument();
});

// test('Next button is enabled', () =>{
//     render(<Router><Reserve1 /></Router>);
//     const rangePicker = screen.getByTestId("reserve1-rangePicker")
//     userEvent.type(rangePicker, '2021/05/05')
//     expect('reserve1-nextBtn').toBeEnabled();
// });

// test('should increment the counter on click', () => {
//     const { getByTestId } = render(<Router><Reserve1 /></Router>);
//     userEvent.click(getByTestId('counter-icon-plus'))
//     expect(getByTestId('passanger-count')).toHaveTextContent('2')
//     // fireEvent.click(getByTestId('counter-icon-minus'))
//     // expect(getByTestId('passanger-count')).toHaveTextContent('1')
// })

// fireEvent.click(screen.getByTestId("counter-icon-plus"))

// expect(screen.getByTestId("passanger-count")).toHaveDisplayValue(6)
// })

// test('should decrement the counter on click', async () => {
//     await render(Reserve1, {
//     componentProperties: { [passangers]: 5 },
//     })

//     fireEvent.click(screen.getByTestId("counter-icon-minus"))

//     expect(screen.getByTestId("passanger-count")).toHaveDisplayValue(4)
// })

test("Range picker does not accept null value", () => {
  render(
    <Router>
      <Reserve1 />
    </Router>
  );
  const rangePicker = screen.getByTestId("reserve1-rangePicker");
  expect(rangePicker).not.toBeNull;
});

test("Range picker does not accept invalid value", () => {
  render(
    <Router>
      <Reserve1 />
    </Router>
  );
  const rangePicker = screen.getByTestId("reserve1-rangePicker");
  userEvent.type(rangePicker, [
    "223232323021/1323232323/23223232323",
    "232323232021/1234/21",
  ]);
  expect(rangePicker).not.toHaveValue([
    "223232323021/1323232323/23223232323",
    "232323232021/1234/21",
  ]);
});

// test('Next button is enabled by entering valid value', () =>{
//     render(<Router><Reserve1 /></Router>);
//     const rangePicker = screen.getByTestId("reserve1-rangePicker")
//     userEvent.type(rangePicker, ["2021/13/23" , "2021/13/28"])
//     expect("reserve1-nextBtn").toBeEnabled();
// });

// test('Next button is disabled by entering valid value', () =>{
//     render(<Router><Reserve1 /></Router>);
//     const rangePicker = screen.getByTestId("reserve1-rangePicker")
//     userEvent.type(rangePicker, [])
//     expect("reserve1-nextBtn").toBeDisabled();
// });

// test('Next button is disabled by null value', () =>{
//     render(<Router><Reserve1 /></Router>);
//     const endDate = screen.getAllByPlaceholderText("Check Out")
//     userEvent.type(endDate, null)
//     expect(screen.getByTestId("reserve1-nextBtn")).toBeDisabled();
// });

// test('Next button is enabled by entering valid value', () =>{
//     render(<Router><Reserve1 /></Router>);
//     const startDate = screen.getAllByPlaceholderText("Check In")
//     userEvent.type(startDate, "2021/05/12")
//     expect(screen.getByTestId("reserve1-nextBtn")).toBeEnabled();
// });
