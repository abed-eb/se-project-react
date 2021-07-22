import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Signup from "./signup";
import { BrowserRouter } from "react-router-dom";
import { Form } from "react-bootstrap";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { API_BASE_URL, API_EMAIL_CHECK_URL } from "../../../constants";
import { act } from "react-dom/test-utils";

afterEach(cleanup);
const server = setupServer(
  rest.post(API_BASE_URL + API_EMAIL_CHECK_URL, (req, res, ctx) => {
    // console.log(req)
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("signup page tests", () => {
  test("render page", () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
  });

  test("back button not render", () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    expect(screen.queryByTestId("back-button-signup")).toBe(null);
  });

  test("next button render", () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("Email input render", () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    // screen.debug()
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  test("invalid Email input", async () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    userEvent.type(screen.getByPlaceholderText("Email"), "9knight9n");
    await act(async () => {
      userEvent.click(screen.getByText("Next"));
    });
    // screen.debug()
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Email")).toHaveClass("is-invalid");
    });
  });

  test("entered valid new Email as input ", async () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    userEvent.type(screen.getByPlaceholderText("Email"), "9knight9n@gmail.com");
    await act(async () => {
      userEvent.click(screen.getByText("Next"));
    });
    // screen.debug()
    await waitFor(() => {
      expect(screen.getByText("Sign in")).toBeInTheDocument();
    });
  });

  test("back button render", async () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    server.use(
      rest.post(API_BASE_URL + API_EMAIL_CHECK_URL, (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    userEvent.type(screen.getByPlaceholderText("Email"), "9knight9n@gmail.com");
    await act(async () => {
      userEvent.click(screen.getByText("Next"));
    });
    // screen.debug()
    await waitFor(() => {
      expect(screen.getByTestId("back-button-signup")).toBeInTheDocument();
    });
  });

  test("entered valid new Email as input then back pressed", async () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    userEvent.type(screen.getByPlaceholderText("Email"), "9knight9n@gmail.com");
    await act(async () => {
      userEvent.click(screen.getByText("Next"));
    });
    // screen.debug()
    await waitFor(() => {
      expect(screen.getByText("Back")).toBeInTheDocument();
    });
    await act(async () => {
      userEvent.click(screen.getByText("Back"));
    });
    await waitFor(() => {
      expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    });
  });
  //
  //
  //
  test("entered valid new Email as input", async () => {
    render(
      <BrowserRouter>
        <Signup show={true} />
      </BrowserRouter>
    );
    server.use(
      rest.post(API_BASE_URL + API_EMAIL_CHECK_URL, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    userEvent.type(screen.getByPlaceholderText("Email"), "9knight9n@gmail.com");
    await act(async () => {
      userEvent.click(screen.getByText("Next"));
    });
    // screen.debug()
    await waitFor(() => {
      expect(screen.getByText("Verify")).toBeInTheDocument();
    });
  });
});
