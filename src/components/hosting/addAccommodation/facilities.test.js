import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Facilities from "./facilities";
import { BrowserRouter } from "react-router-dom";

const facilities = [
  {
    id: 0,
    label: "Washing machine",
  },
  {
    id: 1,
    label: "Air-conditioner",
  },
  {
    id: 2,
    label: "Hair dryer",
  },
  {
    id: 3,
    label: "Refrigerator",
  },
  {
    id: 4,
    label: "Phone",
  },
  {
    id: 5,
    label: "Safe",
  },
  {
    id: 6,
    label: "Cooking basics",
  },
  {
    id: 7,
    label: "TV",
  },
  {
    id: 8,
    label: "Furniture",
  },
  {
    id: 9,
    label: "Hot water",
  },
  {
    id: 10,
    label: "Microwave",
  },
  {
    id: 11,
    label: "Pool",
  },
  {
    id: 12,
    label: "Parking",
  },
  {
    id: 13,
    label: "Wifi",
  },
  {
    id: 14,
    label: "Oven",
  },
  {
    id: 15,
    label: "Fireplace",
  },
  {
    id: 16,
    label: "Bathroom essentials",
  },
];

describe("facility page tests", () => {
  test("render page", () => {
    render(
      <BrowserRouter>
        <Facilities />
      </BrowserRouter>
    );
  });

  test("facilities options render", () => {
    render(
      <BrowserRouter>
        <Facilities />
      </BrowserRouter>
    );
    facilities.map((category) => {
      expect(screen.getAllByText(category.label).length > 0).toBe(true);
    });
  });

  test("next button render", () => {
    render(
      <BrowserRouter>
        <Facilities />
      </BrowserRouter>
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("back button render", () => {
    render(
      <BrowserRouter>
        <Facilities />
      </BrowserRouter>
    );
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  facilities.map((facility) => {
    test(
      "facility ".concat(facility.label).concat(" css applied on selection"),
      () => {
        render(
          <BrowserRouter>
            <Facilities />
          </BrowserRouter>
        );

        userEvent.click(screen.getAllByText(facility.label)[0]);
        expect(
          screen.getByTestId("facility-select-test-".concat(facility.id))
        ).toHaveClass("selected");
      }
    );
  });

  facilities.map((facility) => {
    test(
      "next button render on facility "
        .concat(facility.label)
        .concat(" selection."),
      () => {
        render(
          <BrowserRouter>
            <Facilities />
          </BrowserRouter>
        );
        userEvent.click(screen.getAllByText(facility.label)[0]);
        expect(screen.getByText("Next")).toBeInTheDocument();
      }
    );
  });

  facilities.map((facility) => {
    test(
      "next button enabled on facility "
        .concat(facility.label)
        .concat(" selection."),
      () => {
        render(
          <BrowserRouter>
            <Facilities />
          </BrowserRouter>
        );
        userEvent.click(screen.getAllByText(facility.label)[0]);
        expect(screen.getByText("Next")).toBeEnabled();
      }
    );
  });

  facilities.map((facility) => {
    sessionStorage.removeItem("add-villa-selected-facilities-id");
    sessionStorage.removeItem("add-villa-selected-facilities-label");
    test(
      "save selected facility ".concat(facility.label).concat(" on selection."),
      () => {
        render(
          <BrowserRouter>
            <Facilities />
          </BrowserRouter>
        );
        userEvent.click(screen.getAllByText(facility.label)[0]);
        userEvent.click(screen.getByText("Next"));
        expect(
          sessionStorage.getItem("add-villa-selected-facilities-id") && true
        ).toBe(true);
        expect(
          sessionStorage.getItem("add-villa-selected-facilities-label") && true
        ).toBe(true);
      }
    );
  });
});
