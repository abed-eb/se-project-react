import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import ChatroomInfo from "./chatroomInfo";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);

it("Renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(
    <Router>
      <chatroomInfo />
    </Router>,
    div
  );
});

test("Profile avatar is available", () => {
  render(
    <Router>
      <ChatroomInfo />
    </Router>
  );
  const profileAvatar = screen.getByTestId("chatInfo-profile-avatar");
  expect(profileAvatar).toBeInTheDocument();
});

test("name is available", () => {
  render(
    <Router>
      <ChatroomInfo />
    </Router>
  );
  const name = screen.getByTestId("chatInfo-name");
  expect(name).toBeInTheDocument();
});

// test("lastSeen is available", () => {
//   render(
//     <Router>
//       <ChatroomInfo />
//     </Router>
//   );
//   const lastSeen = screen.getByTestId("chatInfo-lastSeen");
//   expect(lastSeen).toBeInTheDocument();
// });
