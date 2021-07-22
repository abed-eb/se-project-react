import React, { Component } from "react";
import "./auth.css";
import { Alert, Form, Modal, Spinner } from "react-bootstrap";
import { Fragment } from "react";
import {
  getItem,
  saveCredentials,
  showMemoryVariables,
  validateEmail,
  validatePass,
} from "../../../util";
import axios from "axios";
import {API_EMAIL_CHECK_URL, API_LOGIN_URL, API_REGISTER_FIREBASE_TOKEN, STORAGE_KEY} from "../../../constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailValidation = this.emailValidation.bind(this);
    this.login = this.login.bind(this);
    this.exit = this.exit.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  state = {
    pageNum: 0,
    loading: false,
    email: null,
    isInvalid: false,
    connectionError: false,
  };

  componentDidMount() {
    if (this.props.email) {
      document.getElementById("email-input").value = this.props.email;
      this.emailValidation();
    }
  }

  exit(authModal, modalOnLogin, email) {
    this.setState({
      pageNum: 0,
      loading: false,
      email: null,
      isInvalid: false,
    });
    this.props.changeModal(authModal, modalOnLogin, email);
  }

  setPage(pageNum) {
    switch (this.state.pageNum) {
      case 0:
        this.setState({
          email: document.getElementById("email-input").value,
          isInvalid: false,
          loading: false,
        });
        document.getElementById("email-input").value = "";
        break;
      case 1:
        document.getElementById("pass-input").value = this.state.email;
        this.setState({ isInvalid: false, loading: false });
        break;
      case 2:
        this.setState({ email: null });
        break;
      default:
        break;
    }
    this.setState({ pageNum });
  }

  async emailValidation() {
    this.setState({ loading: true });
    let email = document.getElementById("email-input").value;
    if (!validateEmail(email))
      return this.setState({ loading: false, isInvalid: true });

    let FormData = require("form-data");
    let data = new FormData();
    data.append("email", email);
    await axios
      .post(API_EMAIL_CHECK_URL, data)
      .then((res) => {
        if (res.status === 200) {
          this.setPage(1);
        } else {
          console.log("unknown status");
          return this.setState({ connectionError: true, loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        return this.setPage(2);
        // console.log("error")
        // console.log(error)
        // return this.setState({connectionError:true,loading:false})
      });
  }

  async login() {
    this.setState({ loading: true });
    let pass = document.getElementById("pass-input").value;

    let FormData = require("form-data");
    let data = new FormData();
    data.append("username", this.state.email);
    data.append("password", pass);
    await axios
      .post(API_LOGIN_URL, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          saveCredentials(
            res.data.user_id,
            res.data.email,
            res.data.token,
            res.data.image,
            true
          );
          showMemoryVariables();
          this.props.onSuccess();
          return this.exit(false, false, null);
        } else {
          console.log("unknown status");
          return this.setState({ connectionError: true, loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        return this.setState({ loading: false, isInvalid: true });
        // return this.setPage(2)
        // console.log("error")
        // console.log(error)
        // return this.setState({connectionError:true,loading:false})
      });

    if(getItem('user-token'))
    {
      let data = new FormData();
      data.append('token', sessionStorage.getItem(STORAGE_KEY+'firebase-token'));

      var config = {
        method: 'post',
        url: API_REGISTER_FIREBASE_TOKEN,
        headers: {
          Authorization: "Token ".concat(getItem("user-token")),
        },
        data : data
      };

      axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    // return setTimeout(() => , 500);
  }

  render() {
    return (
      <Modal
        centered
        size={"sm"}
        backdrop="static"
        show={this.props.show}
        onHide={() => this.exit(false, true, null)}
      >
        <Modal.Header className={"d-flex w-100"} closeButton>
          {this.state.pageNum > 0 ? (
            <button
              data-testid={"back-button-login"}
              className="btn btn-sm close shadow-none"
              style={{
                margin: "-1rem 0 0 -1rem",
                zIndex: "1000",
                position: "absolute",
              }}
              onClick={() => this.setPage(0)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
          ) : (
            ""
          )}
          <Modal.Title className={"w-100 position-absolute"}>
            <p style={{ textAlign: "center" }} className={"m-auto w-auto pr-4"}>
              Sign In
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            {this.state.connectionError ? (
              <Alert
                variant="danger"
                onClick={() => this.setState({ connectionError: false })}
              >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                  there was a problem while signing you in! check your
                  connection ! If the problem still persist, try reloading page.{" "}
                </p>
              </Alert>
            ) : (
              ""
            )}

            {/*inputs and labels*/}
            <div className="form-group">
              <div className="input-group">
                {this.state.pageNum < 2 ? (
                  <Fragment>
                    <div className="input-group-prepend">
                      <span className="text-primary input-group-text">
                        {this.state.pageNum < 1 ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-envelope"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-key-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                          </svg>
                        )}
                      </span>
                    </div>
                    {this.state.pageNum < 1 ? (
                      <Fragment>
                        <Form.Control
                          onChange={(event) =>
                            validateEmail(event.target.value) &&
                            this.state.isInvalid
                              ? this.setState({ isInvalid: false })
                              : ""
                          }
                          id={"email-input"}
                          className="form-control shadow-none"
                          type="email"
                          required
                          isInvalid={this.state.isInvalid}
                          placeholder="Email"
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className={"ml-1"}
                        >
                          Email is not valid!
                        </Form.Control.Feedback>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Form.Control
                          onChange={() =>
                            this.state.isInvalid
                              ? this.setState({ isInvalid: false })
                              : ""
                          }
                          id={"pass-input"}
                          className="form-control shadow-none"
                          type="password"
                          required
                          isInvalid={this.state.isInvalid}
                          placeholder="Password"
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className={"ml-1"}
                        >
                          Password is Wrong!
                        </Form.Control.Feedback>
                      </Fragment>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    <span style={{ lineHeight: "0.75" }}>
                      <p>This email is not registered !</p>
                      <p>do you want to register now?</p>
                    </span>
                  </Fragment>
                )}
              </div>
            </div>

            {/*buttons*/}
            <div className="form-group">
              {this.state.pageNum < 2 ? (
                <button
                  type="button"
                  className={"btn btn-lg btn-".concat(
                    this.state.pageNum === 0
                      ? "outline-primary"
                      : "primary text-white"
                  )}
                  style={{ width: "100%" }}
                  disabled={this.state.loading}
                  onClick={
                    this.state.pageNum < 1 ? this.emailValidation : this.login
                  }
                >
                  {this.state.loading ? (
                    <Spinner
                      className={"mb-1 mr-1"}
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    ""
                  )}
                  {this.state.pageNum < 1 ? "Next" : "Log in"}
                </button>
              ) : (
                <div className={"w-100 row"} style={{ marginLeft: "0" }}>
                  <div className={"col-6"} style={{ paddingLeft: "0" }}>
                    <button
                      className="btn btn-outline-primary btn-lg "
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => this.setPage(0)}
                    >
                      Back
                    </button>
                  </div>
                  <div className={"col-6"} style={{ paddingRight: "0" }}>
                    <button
                      className="btn btn-primary btn-lg text-white "
                      style={{ width: "100%" }}
                      type="button"
                      onClick={() => this.exit(true, false, this.state.email)}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/*continue with google button*/}
          {/*{this.state.pageNum===0?*/}
          {/*<Fragment>*/}
          {/*    <h5 className={"ml-auto mr-auto"} style={{width:"fit-content"}}>Or</h5>*/}
          {/*    <div className="text-center mt-3">*/}
          {/*        <button className="btn btn-light text-left border-dark" style={{"width": "100%"}}*/}
          {/*                type="button">*/}
          {/*            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"*/}
          {/*                 className="bi bi-google mr-2  mb-1" viewBox="0 0 16 16">*/}
          {/*                <path*/}
          {/*                    d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>*/}
          {/*            </svg>*/}
          {/*            Continue with Google*/}
          {/*        </button>*/}
          {/*    </div>*/}
          {/*</Fragment>:""}*/}

          {/*forget pass or signin buttons*/}
          {this.state.pageNum < 2 ? (
            <Fragment>
              <hr style={{ backgroundColor: "#bababa" }} />
              <p className="text-center">
                {this.state.pageNum === 1 ? (
                  <a className="text-decoration-none" href="#">
                    {" "}
                    Forget password?
                  </a>
                ) : (
                  <Fragment>
                    Don&#39;t have an account?
                    <a
                      className="text-decoration-none"
                      href="#"
                      onClick={() => this.exit(true, false, null)}
                    >
                      Sign Up
                    </a>
                  </Fragment>
                )}
              </p>
            </Fragment>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Login;
