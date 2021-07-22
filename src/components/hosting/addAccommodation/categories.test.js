import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Categories from "./categories";
import { BrowserRouter } from "react-router-dom";

const categories = [
  { id: 1, label: "Coastal" },
  { id: 2, label: "Urban" },
  { id: 3, label: "Wild" },
  { id: 4, label: "Mountainous" },
  { id: 5, label: "Rural" },
  { id: 6, label: "Suburban" },
  { id: 7, label: "Motel" },
  { id: 8, label: "Desert" },
];

describe("category page tests", () => {
  test("render page", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
  });

  test("category options render", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    categories.map((category) => {
      expect(screen.getAllByText(category.label).length > 0).toBe(true);
    });
  });

  test("next button render", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("next button disabled", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );
    expect(screen.getByText("Next")).toBeDisabled();
  });

  categories.map((category) => {
    test(
      "category ".concat(category.label).concat(" css applied on selection"),
      () => {
        render(
          <BrowserRouter>
            <Categories />
          </BrowserRouter>
        );

        userEvent.click(screen.getAllByText(category.label)[1]);
        expect(
          screen.getByTestId("category-select-test-".concat(category.id))
        ).toHaveClass("selected");
      }
    );
  });

  categories.map((category) => {
    test(
      "next button render on category "
        .concat(category.label)
        .concat(" selection."),
      () => {
        render(
          <BrowserRouter>
            <Categories />
          </BrowserRouter>
        );
        userEvent.click(screen.getAllByText(category.label)[1]);
        expect(screen.getByText("Next")).toBeInTheDocument();
      }
    );
  });

  categories.map((category) => {
    test(
      "next button enabled on category "
        .concat(category.label)
        .concat(" selection."),
      () => {
        render(
          <BrowserRouter>
            <Categories />
          </BrowserRouter>
        );
        userEvent.click(screen.getAllByText(category.label)[1]);
        expect(screen.getByText("Next")).toBeEnabled();
      }
    );
  });

  categories.map((category) => {
    test(
      "save selected category ".concat(category.label).concat(" on selection."),
      () => {
        render(
          <BrowserRouter>
            <Categories />
          </BrowserRouter>
        );
        userEvent.click(screen.getAllByText(category.label)[1]);
        userEvent.click(screen.getByText("Next"));
        expect(
          parseInt(sessionStorage.getItem("add-villa-selected-category"))
        ).toBe(category.id);
        expect(sessionStorage.getItem("add-villa-selected-category-name")).toBe(
          category.label
        );
      }
    );
  });
});
