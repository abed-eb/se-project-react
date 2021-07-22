import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Search from "./search";

describe("search component test", () => {
  test("render component", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
  });

  test("Title 1 render", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByText("Tell us where:")).toBeInTheDocument();
  });

  test("Title 2 render", () => {
    render(
      <BrowserRouter>
        <Search country={true} />
      </BrowserRouter>
    );
    expect(screen.getByText("Showing search results for:")).toBeInTheDocument();
  });

  test("Title 3 render", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByText("Almost there!")).toBeInTheDocument();
  });

  test("Country select render", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByText("Country")).toBeInTheDocument();
  });

  test("State select render", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByText("State")).toBeInTheDocument();
  });

  test("City select render", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByText("City")).toBeInTheDocument();
  });

  test("City select render", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getAllByPlaceholderText("Select date").length).toBe(2);
  });
});
