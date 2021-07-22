import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Photos from "./photos";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { API_BASE_URL, API_UPLOAD_IMAGE_URL } from "../../constants";

const server = setupServer(
  rest.post(API_BASE_URL + API_UPLOAD_IMAGE_URL, (req, res, ctx) => {
    console.log("=========================================================");
    // console.log(req)
    return res(ctx.status(400));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("photos page test", () => {
  test("render page", () => {
    render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );
  });

  test("upload button render", () => {
    render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );
    expect(screen.getByText("Upload")).toBeInTheDocument();
  });

  test("next button render", () => {
    render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("next button disabled", () => {
    render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );
    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("back button render", () => {
    render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  test("back button enabled", () => {
    render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );
    expect(screen.getByText("Back")).toBeEnabled();
  });

  test("failed uploading single file ", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );
    // axios.post.mockImplementationOnce(() =>
    //   Promise.reject(new Error())
    // );

    await act(async () => {
      const input = screen.getByTestId("image-upload-button-add-villa");
      await fireEvent.change(input, {
        target: {
          files: [new File(["(⌐□_□)"], "hello.png", { type: "image/png" })],
        },
      });
    });

    await waitFor(() => {
      expect(
        container.querySelectorAll("div.ant-upload-list-item-error").length ===
          1
      ).toBe(true);
    });
  });

  test("next disabled after failed uploading single file ", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );

    await act(async () => {
      const input = screen.getByTestId("image-upload-button-add-villa");
      await fireEvent.change(input, {
        target: {
          files: [new File(["(⌐□_□)"], "hello.png", { type: "image/png" })],
        },
      });
    });

    await waitFor(() => {
      expect(
        container.querySelectorAll("div.ant-upload-list-item-error").length ===
          1
      ).toBe(true);
    });

    expect(screen.getByText("Next")).toBeDisabled();
  });

  test("succeeded uploading single file ", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );

    await act(async () => {
      const input = screen.getByTestId("image-upload-button-add-villa");

      server.use(
        rest.post(API_BASE_URL + API_UPLOAD_IMAGE_URL, (req, res, ctx) => {
          return res(ctx.status(200));
        })
      );

      await fireEvent.change(input, {
        target: {
          files: [new File(["(⌐□_□)"], "hello.png", { type: "image/png" })],
        },
      });
    });
    await waitFor(() => {
      expect(
        container.querySelector("div.ant-upload-list-item-done")
      ).toBeInTheDocument();
    });
    // const succeeded = container.querySelectorAll("div.ant-upload-list-item-done")
    // screen.debug()
    // expect(succeeded.length===1).toBe(true)
  });

  // test('next enabled after succeeded uploading single file ', async () => {
  //   window.URL.createObjectURL = function() {};
  //   let {container} = render(<BrowserRouter><Photos /></BrowserRouter>);
  //
  //
  //   await act(async () => {
  //     const input = screen.getByTestId("image-upload-button-add-villa")
  //
  //     server.use(
  //       rest.post(API_BASE_URL+API_UPLOAD_IMAGE_URL, (req, res, ctx) => {
  //         return res(ctx.status(200))
  //       })
  //     )
  //
  //     await fireEvent.change(input, {
  //       target: {
  //         files: [new File(['(⌐□_□)'], 'hello1.png', { type: 'image/png' })],
  //       },
  //     })
  //     await fireEvent.change(input, {
  //       target: {
  //         files: [new File(['(⌐□_□)'], 'hello2.png', { type: 'image/png' })],
  //       },
  //     })
  //     await fireEvent.change(input, {
  //       target: {
  //         files: [new File(['(⌐□_□)'], 'hello3.png', { type: 'image/png' })],
  //       },
  //     })
  //     await fireEvent.change(input, {
  //       target: {
  //         files: [new File(['(⌐□_□)'], 'hello4.png', { type: 'image/png' })],
  //       },
  //     })
  //
  //
  //   });
  //   await waitFor(() => {
  //     // expect(container.querySelector("div.ant-upload-list-item-done")).toBeInTheDocument()
  //     expect(screen.findByText('hello4')).toBeInTheDocument()
  //     expect(screen.getByText('Next')).toBeEnabled();
  //   })
  // });

  test("failed uploading several files ", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );

    for (let k = 0; k < 10; k++) {
      await act(async () => {
        const input = screen.getByTestId("image-upload-button-add-villa");

        await fireEvent.change(input, {
          target: {
            files: [new File(["(⌐□_□)"], "hello.png", { type: "image/png" })],
          },
        });
      });
      await waitFor(() => {
        expect(
          container.querySelectorAll("div.ant-upload-list-item-error")
            .length ===
            k + 1
        ).toBe(true);
      });
    }
  });

  test("next button disabled after failed uploading several files ", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );

    for (let k = 0; k < 10; k++) {
      await act(async () => {
        const input = screen.getByTestId("image-upload-button-add-villa");

        await fireEvent.change(input, {
          target: {
            files: [new File(["(⌐□_□)"], "hello.png", { type: "image/png" })],
          },
        });
      });
      await waitFor(() => {
        expect(
          container.querySelectorAll("div.ant-upload-list-item-error")
            .length ===
            k + 1
        ).toBe(true);
        expect(screen.getByText("Next")).toBeDisabled();
      });
    }
  });

  test("upload button removed after uploading 8 files ", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Photos />
      </BrowserRouter>
    );

    server.use(
      rest.post(API_BASE_URL + API_UPLOAD_IMAGE_URL, (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );

    for (let k = 0; k < 8; k++) {
      expect(screen.getByText("Upload")).toBeInTheDocument();
      await act(async () => {
        const input = screen.getByTestId("image-upload-button-add-villa");
        await fireEvent.change(input, {
          target: {
            files: [new File(["(⌐□_□)"], "hello.png", { type: "image/png" })],
          },
        });
      });
      await waitFor(() => {
        expect(
          container.querySelectorAll("div.ant-upload-list-item-done").length ===
            k + 1
        ).toBe(true);
      });
    }

    expect(screen.queryByText("Upload")).toBeNull();
  });
});
