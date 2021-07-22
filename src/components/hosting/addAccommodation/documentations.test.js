import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
// import Photos from "./photos";
import axios from "axios";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  API_BASE_URL,
  API_CHECK_DOC_URL,
  API_UPLOAD_DOC_RESIDANCE_URL,
  API_UPLOAD_DOC_URL,
  API_UPLOAD_IMAGE_URL,
} from "../../constants";
import Documentations from "./documentations";

const server = setupServer(
  rest.post(API_BASE_URL + API_UPLOAD_DOC_RESIDANCE_URL, (req, res, ctx) => {
    console.log("=========================================================");
    // console.log(req)
    return res(ctx.status(400));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("documentations page test", () => {
  test("render page", () => {
    render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );
  });

  test("submit button render", () => {
    render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("submit button disabled", () => {
    render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );
    expect(screen.getByText("Submit")).toBeDisabled();
  });

  test("back button render", () => {
    render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  test("back button enabled", () => {
    render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );
    expect(screen.getByText("Back")).toBeEnabled();
  });

  // test('upload button not rendering if doc already provided', async () => {
  //   window.URL.createObjectURL = function() {};
  //
  //   server.use(
  //     rest.get(API_BASE_URL+API_CHECK_DOC_URL, (req, res, ctx) => {
  //         console.log("=====================================")
  //         return res(ctx.status(400))
  //     })
  //   )
  //
  //   await act(async () => {
  //     let {container} = render(<BrowserRouter><Documentations /></BrowserRouter>);
  //   });
  //
  //
  //   await waitFor(() => {
  //     expect(screen.queryAllByText('Upload').length).toBe(1)
  //   })
  // });

  test("submit enabled after succeeded uploading single file for all fields", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    await act(async () => {
      const input = screen.getByTestId("residence-doc-upload-button-add-villa");

      server.use(
        rest.post(
          API_BASE_URL + API_UPLOAD_DOC_RESIDANCE_URL,
          (req, res, ctx) => {
            return res(ctx.status(200));
          }
        )
      );

      await fireEvent.change(input, {
        target: {
          files: [new File(["(⌐□_□)"], "hello.png", { type: "image/png" })],
        },
      });
    });
    await waitFor(() => {
      expect(
        container.querySelectorAll("div.ant-upload-list-item-done").length
      ).toBe(1);
    });

    await act(async () => {
      const input = screen.getByTestId("doc-upload-button-add-villa");

      server.use(
        rest.post(API_BASE_URL + API_UPLOAD_DOC_URL, (req, res, ctx) => {
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
        container.querySelectorAll("div.ant-upload-list-item-done").length
      ).toBe(2);
      expect(screen.getByText("Submit")).toBeEnabled();
    });
  });

  test("failed uploading single file for residence", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );
    // axios.post.mockImplementationOnce(() =>
    //   Promise.reject(new Error())
    // );

    await act(async () => {
      const input = screen.getByTestId("residence-doc-upload-button-add-villa");
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

  test("submit disabled after failed uploading single file for residence", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    await act(async () => {
      const input = screen.getByTestId("residence-doc-upload-button-add-villa");
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

    expect(screen.getByText("Submit")).toBeDisabled();
  });

  test("succeeded uploading single file for residence", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    await act(async () => {
      const input = screen.getByTestId("residence-doc-upload-button-add-villa");

      server.use(
        rest.post(
          API_BASE_URL + API_UPLOAD_DOC_RESIDANCE_URL,
          (req, res, ctx) => {
            return res(ctx.status(200));
          }
        )
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

  test("failed uploading several files for residence", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    for (let k = 0; k < 10; k++) {
      await act(async () => {
        const input = screen.getByTestId(
          "residence-doc-upload-button-add-villa"
        );

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

  test("submit button disabled after failed uploading several files for residence", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    for (let k = 0; k < 10; k++) {
      await act(async () => {
        const input = screen.getByTestId(
          "residence-doc-upload-button-add-villa"
        );

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
        expect(screen.getByText("Submit")).toBeDisabled();
      });
    }
  });

  test("upload button removed after uploading 3 files for residence", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    server.use(
      rest.post(
        API_BASE_URL + API_UPLOAD_DOC_RESIDANCE_URL,
        (req, res, ctx) => {
          return res(ctx.status(200));
        }
      )
    );

    for (let k = 0; k < 3; k++) {
      expect(
        screen.getByTestId("residence-doc-upload-button-add-villa")
      ).toBeInTheDocument();
      await act(async () => {
        const input = screen.getByTestId(
          "residence-doc-upload-button-add-villa"
        );
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

    expect(screen.queryAllByText("Upload").length).toBe(1);
  });

  test("failed uploading single file for user", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );
    // axios.post.mockImplementationOnce(() =>
    //   Promise.reject(new Error())
    // );

    await act(async () => {
      const input = screen.getByTestId("doc-upload-button-add-villa");
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

  test("submit disabled after failed uploading single file for user", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    server.use(
      rest.post(API_BASE_URL + API_UPLOAD_DOC_URL, (req, res, ctx) => {
        console.log(
          "========================================================="
        );
        // console.log(req)
        return res(ctx.status(400));
      })
    );

    await act(async () => {
      const input = screen.getByTestId("doc-upload-button-add-villa");
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

    expect(screen.getByText("Submit")).toBeDisabled();
  });

  test("succeeded uploading single file for user", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    await act(async () => {
      const input = screen.getByTestId("doc-upload-button-add-villa");

      server.use(
        rest.post(API_BASE_URL + API_UPLOAD_DOC_URL, (req, res, ctx) => {
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

  test("failed uploading several files for user", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    server.use(
      rest.post(API_BASE_URL + API_UPLOAD_DOC_URL, (req, res, ctx) => {
        console.log(
          "========================================================="
        );
        // console.log(req)
        return res(ctx.status(400));
      })
    );

    for (let k = 0; k < 10; k++) {
      await act(async () => {
        const input = screen.getByTestId("doc-upload-button-add-villa");

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

  test("submit button disabled after failed uploading several files for user", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    server.use(
      rest.post(API_BASE_URL + API_UPLOAD_DOC_URL, (req, res, ctx) => {
        console.log(
          "========================================================="
        );
        // console.log(req)
        return res(ctx.status(400));
      })
    );

    for (let k = 0; k < 10; k++) {
      await act(async () => {
        const input = screen.getByTestId("doc-upload-button-add-villa");

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
        expect(screen.getByText("Submit")).toBeDisabled();
      });
    }
  });

  test("upload button removed after uploading 3 files for user", async () => {
    window.URL.createObjectURL = function () {};
    let { container } = render(
      <BrowserRouter>
        <Documentations />
      </BrowserRouter>
    );

    server.use(
      rest.post(API_BASE_URL + API_UPLOAD_DOC_URL, (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );

    for (let k = 0; k < 3; k++) {
      expect(
        screen.getByTestId("doc-upload-button-add-villa")
      ).toBeInTheDocument();
      await act(async () => {
        const input = screen.getByTestId("doc-upload-button-add-villa");
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

    expect(screen.queryAllByText("Upload").length).toBe(1);
  });
});
