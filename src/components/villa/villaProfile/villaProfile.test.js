import React from "react";
import ReactDom from "react-dom";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VillaProfile from "./villaProfile";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
afterEach(cleanup);

test("Reserver button is rendered", () => {
  render(
    <Router>
      <VillaProfile />
    </Router>
  );
  expect(screen.getByText("Reserve")).toBeInTheDocument();
});

test("Map is rendered", () => {
  render(
    <Router>
      <VillaProfile />
    </Router>
  );
  expect(screen.getByTestId("villaProfile-map")).toBeInTheDocument();
});

for (let k = 1; k < 17; k++) {
  test("facility icons are rendered", () => {
    render(
      <Router>
        <VillaProfile />
      </Router>
    );
    expect(
      screen.getByTestId("villaProfile-villaProfile-fasility-" + k)
    ).toBeInTheDocument();
  });
}

for (let k = 1; k < 4; k++) {
  test("gallery images are rendered", () => {
    render(
      <Router>
        <VillaProfile />
      </Router>
    );
    expect(
      screen.getByTestId("villaProfile-gallery-image-" + k)
    ).toBeInTheDocument();
  });
}

for (let k = 1; k < 6; k++) {
  test("gallery images are rendered", () => {
    render(
      <Router>
        <VillaProfile />
      </Router>
    );
    expect(
      screen.getByTestId("villaProfile-properties-image-" + k)
    ).toBeInTheDocument();
  });
}
