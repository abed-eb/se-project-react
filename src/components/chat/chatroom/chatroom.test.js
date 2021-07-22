import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Chatroom from "./chatroom";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);

// test("Input is available", () => {
//   render(
//     <Router>
//       <Chatroom />
//     </Router>
//   );
//   const input = screen.getByTestId("chat-input");
//   expect(input).toBeInTheDocument();
// });

// test("Input is handling long text", () => {
//   render(
//     <Router>
//       <Chatroom />
//     </Router>
//   );
//   const input = screen.getByTestId("chat-input");
//   userEvent.type(
//     "aaaa assaaacmkvz?<|(&^&%\nflpg\n5n5n5\n5\n5n5\n5n5gaaaaaaa xas#@)#O_^TI#@K$@<#!$)#!()WDKWS(DKWSDsaas23!@~@~"
//   );
//   expect(input).toBeValid();
//   expect(input).toBeVisible();
// });

test("Input button 1 is available", () => {
  render(
    <Router>
      <Chatroom />
    </Router>
  );
  const sendButton = screen.getByTestId("chat-sendButton");
  expect(sendButton).toBeInTheDocument();
});

test("Input button 2 is available", () => {
  render(
    <Router>
      <Chatroom />
    </Router>
  );
  const fileButton = screen.getByTestId("chat-fileButton");
  expect(fileButton).toBeInTheDocument();
});
