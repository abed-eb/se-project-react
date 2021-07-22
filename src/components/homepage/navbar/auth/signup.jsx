//@Sajad
import React, { Component, Fragment } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import "./auth.css";
// https://www.npmjs.com/package/react-phone-input-2
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  getItem,
  saveCredentials,
  showMemoryVariables,
  validateEmail,
  validatePass,
} from "../../../util";
import {
  API_EMAIL_CHECK_URL,
  API_EMAIL_VERIFY_URL, API_REGISTER_FIREBASE_TOKEN,
  API_SIGNUP_URL, STORAGE_KEY,
  VERIFY_LENGTH,
} from "../../../constants";
import axios from "axios";
import { isValidPhoneNumber } from "react-phone-number-input";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.exit = this.exit.bind(this);
    this.setPage = this.setPage.bind(this);
    this.pageTop = this.pageTop.bind(this);
    this.pageButton = this.pageButton.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.emailVerification = this.emailVerification.bind(this);
    this.signup = this.signup.bind(this);
    this.confirmPass = this.confirmPass.bind(this);
    this.checkPass = this.checkPass.bind(this);
    this.sendVerification = this.sendVerification.bind(this);
  }

  state = {
    pageNum: 0,
    loading: false,
    terms: false,
    email: null,
    verify: null,
    isInvalid1: false,
    isInvalid2: false,
    isInvalid3: false,
    isValid4: false,
    isInvalid4: false,
    isInvalid5: false,
    isValid5: false,
    isInvalid6: false,
    vc_code: null,
    showResend: true,
  };

  componentDidMount() {
    if (this.props.email) {
      console.log(this.props.email);
      document.getElementById("email-input").value = this.props.email;
      this.emailValidation();
    }
  }

  // componentDidUpdate(prevProps) {
  //     if (prevProps.email !== this.props.email)
  //     {
  //         if (this.props.email)
  //         {
  //             console.log(this.props.email)
  //             document.getElementById("email-input").value = this.props.email
  //             console.log(document.getElementById("email-input"))
  //             console.log(document.getElementById("email-input").value)
  //             this.forceUpdate()
  //             // this.emailValidation()
  //         }
  //     }
  //     if(this.state.pageNum===0 && this.state.email)
  //         document.getElementById("email-input").value = this.state.email
  // }

  // componentWillMount() {
  //
  // }
  //
  //
  // componentWillReceiveProps(nextProps) {
  //
  // }
  //
  // shouldComponentUpdate(nextProps, nextState) {
  //
  // }
  //
  // componentWillUpdate(nextProps, nextState) {
  //
  // }
  //
  //
  // componentWillUnmount() {
  //
  // }

  exit(authModal, modalOnLogin, email) {
    this.setState({
      pageNum: 0,
      loading: false,
      email: null,
      verify: null,
      isInvalid1: false,
      isInvalid2: false,
      isInvalid3: false,
      isInvalid4: false,
      isValid4: false,
      isInvalid5: false,
      isValid5: false,
      isInvalid6: false,
    });
    this.props.changeModal(authModal, modalOnLogin, email);
  }

  setPage(pageNum) {
    switch (this.state.pageNum) {
      case 0:
        this.setState({
          email: document.getElementById("email-input").value,
          isInvalid1: false,
          loading: false,
        });
        document.getElementById("email-input").value = "";
        break;
      case 1:
        switch (pageNum) {
          case 0:
            document.getElementById("verify-input").value = this.state.email;
            this.setState({ isInvalid1: false, loading: false });
            break;
          case 2:
            this.setState({
              verify: document.getElementById("verify-input").value,
              isInvalid1: false,
              loading: false,
            });
            break;
          default:
            break;
        }
        break;
      case 2:
        document.getElementById("firstname-input").value = this.state.email;
        this.setState({
          isInvalid1: false,
          isInvalid2: false,
          isInvalid3: false,
          isInvalid4: false,
          isValid4: false,
          isInvalid5: false,
          isValid5: false,
          isInvalid6: false,
          loading: false,
        });
        break;
      default:
        break;
    }
    this.setState({ pageNum });
  }

  pageTop() {
    switch (this.state.pageNum) {
      case 0:
        return (
          <div className="form-group">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="text-primary input-group-text">
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
                </span>
              </div>
              <Form.Control
                onChange={(event) =>
                  validateEmail(event.target.value) && this.state.isInvalid1
                    ? this.setState({ isInvalid1: false })
                    : ""
                }
                id={"email-input"}
                className="form-control shadow-none"
                type="email"
                required
                isInvalid={this.state.isInvalid1}
                placeholder="Email"
              />
              <Form.Control.Feedback type="invalid" className={"ml-1"}>
                Email is invalid!
              </Form.Control.Feedback>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-group">
            <div className="input-group">
              <p>Enter Verification code sent to your Email. </p>
              <div className="input-group-prepend">
                <span className="text-primary input-group-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check2-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                  </svg>
                </span>
              </div>
              <Form.Control
                onChange={() =>
                  this.state.isInvalid1
                    ? this.setState({ isInvalid1: false })
                    : ""
                }
                id={"verify-input"}
                className="form-control shadow-none"
                type="verify"
                required
                isInvalid={this.state.isInvalid1}
                placeholder="Verification code"
              />
              <Form.Control.Feedback type="invalid" className={"ml-1"}>
                verification code is wrong!
              </Form.Control.Feedback>
            </div>
          </div>
        );
      case 2:
        return (
          <Fragment>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="text-primary input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                  </span>
                </div>
                <Form.Control
                  onChange={(event) =>
                    this.state.isInvalid1 && event.target.value.length > 0
                      ? this.setState({ isInvalid1: false })
                      : ""
                  }
                  id={"firstname-input"}
                  className="form-control shadow-none"
                  type="first-name"
                  required
                  isInvalid={this.state.isInvalid1}
                  placeholder="First name"
                />
                <Form.Control.Feedback type="invalid" className={"ml-1"}>
                  Fill this field!
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="text-primary input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-dash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      <path
                        fill-rule="evenodd"
                        d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                      />
                    </svg>
                  </span>
                </div>
                <Form.Control
                  onChange={(event) =>
                    this.state.isInvalid2 && event.target.value.length > 0
                      ? this.setState({ isInvalid2: false })
                      : ""
                  }
                  id={"lastname-input"}
                  className="form-control shadow-none"
                  type="last-name"
                  required
                  // isValid={true}
                  isInvalid={this.state.isInvalid2}
                  placeholder="Last name"
                />
                <Form.Control.Feedback type="invalid" className={"ml-1"}>
                  Fill this Field!
                </Form.Control.Feedback>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div
                  className="input-group-prepend"
                  style={{ width: "inherit" }}
                >
                  <span className="text-primary input-group-text">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-phone"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                      <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    </svg>
                  </span>
                  <span className="input-group-btn">
                    <PhoneInput
                      onChange={(event) =>
                        this.state.isInvalid3
                          ? this.setState({ isInvalid3: false })
                          : ""
                      }
                      placeholder={"Phone number"}
                      preferredCountries={["ir"]}
                      // country={'ir'}
                      // onlyCountries={["ir","uk","fr","ru"]}
                      // enableSearch={true}
                      // disableSearchIcon={true}
                      inputProps={{
                        id: "phonenumber-input",
                        required: true,
                        type: "phone-number",
                        className: "form-control shadow-none".concat(
                          this.state.isInvalid3 ? " not-valid" : ""
                        ),
                        style: {
                          width: "inherit",
                          borderRadius: "5px 0 0 5px",
                        },
                      }}
                    />
                  </span>
                </div>
                {this.state.isInvalid3 ? (
                  <div>
                    <small id="passwordHelp" className="text-danger">
                      Must be 11 digit long.
                    </small>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="text-primary input-group-text">
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
                  </span>
                </div>
                <Form.Control
                  onChange={this.checkPass}
                  id={"pass-input"}
                  className="form-control shadow-none"
                  type="password"
                  required
                  isValid={this.state.isValid4}
                  isInvalid={this.state.isInvalid4}
                  placeholder="Password"
                />
                <Form.Control.Feedback type="invalid" className={"ml-1"}>
                  Must contain digit, upper and lowercase character and be at
                  least 7 characters long!
                </Form.Control.Feedback>
                {!this.state.isValid4 && !this.state.isInvalid4 ? (
                  <div>
                    <small
                      id="passwordHelp"
                      className="text-primary"
                      style={{ lineHeight: "1" }}
                    >
                      Must contain digit, upper and lowercase character and be
                      at least 8 characters long.
                    </small>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="text-primary input-group-text">
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
                  </span>
                </div>
                <Form.Control
                  onChange={this.confirmPass}
                  id={"pass2-input"}
                  className="form-control shadow-none"
                  type="password"
                  required
                  isValid={this.state.isValid5}
                  isInvalid={this.state.isInvalid5}
                  placeholder="Confirm password"
                />
                <Form.Control.Feedback type="invalid" className={"ml-1"}>
                  Password doesn't match!
                </Form.Control.Feedback>
              </div>
            </div>
          </Fragment>
        );
      case 3:
        return (
          <div className="form-group">
            <div className="input-group">
              <Fragment>
                <span style={{ lineHeight: "0.75" }}>
                  <p>This email is already registered !</p>
                  <p>do you want to sign in instead?</p>
                </span>
              </Fragment>
            </div>
          </div>
        );
      default:
        return <p>some thing is wrong!</p>;
    }
  }

  pageButton() {
    switch (this.state.pageNum) {
      case 0:
        return (
          <button
            className="btn btn-outline-primary btn-lg"
            style={{ width: "100%" }}
            onClick={this.emailValidation}
            disabled={this.state.loading}
            type="button"
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
            Next
          </button>
        );
      case 1:
        return (
          <button
            className="btn btn-outline-primary btn-lg"
            style={{ width: "100%" }}
            onClick={() => this.emailVerification()}
            disabled={this.state.loading}
            type="button"
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
            Verify
          </button>
        );
      case 2:
        return (
          <button
            className="btn btn-primary btn-lg text-white"
            style={{ width: "100%" }}
            onClick={() => this.signup()}
            disabled={this.state.loading}
            type="button"
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
            Sign up
          </button>
        );
      case 3:
        return (
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
                onClick={() => this.exit(true, true, this.state.email)}
              >
                Sign in
              </button>
            </div>
          </div>
        );
      default:
    }
  }

  async emailValidation() {
    this.setState({ loading: true });
    let email = document.getElementById("email-input").value;
    if (!validateEmail(email))
      return this.setState({ loading: false, isInvalid1: true });

    let FormData = require("form-data");
    let data = new FormData();
    data.append("email", email);
    await axios
      .post(API_EMAIL_CHECK_URL, data)
      .then((res) => {
        if (res.status === 200) {
          this.setPage(3);
        } else {
          console.log("unknown status");
          return this.setState({ connectionError: true, loading: false });
        }
      })
      .catch((error) => {
        // console.log(error)
        this.sendVerification(false);
        return this.setPage(1);

        // console.log("error")
        // console.log(error)
        // return this.setState({connectionError:true,loading:false})
      });
  }

  async sendVerification(resend) {
    this.setState({ loading: true });
    if (resend) {
      this.setState({ showResend: false });
    }
    let email = document.getElementById("email-input")
      ? document.getElementById("email-input").value
      : this.state.email;
    let FormData = require("form-data");
    let data = new FormData();
    data.append("first_name", "user");
    data.append("email", email);
    await axios
      .post(API_EMAIL_VERIFY_URL, data)
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          return this.setState({ vc_code: res.data.vc_code, loading: false });
        } else {
          console.log("unknown status");
          return this.setState({ connectionError: true, loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        // console.log("error")
        // console.log(error)
        // return this.setState({connectionError:true,loading:false})
      });
    if (resend) {
      this.setState({ loading: false });
      setTimeout(() => {
        this.setState({ showResend: true });
      }, 10000);
    }
  }

  emailVerification() {
    this.setState({ loading: true });
    let verify = document.getElementById("verify-input").value;
    if (String(verify).length !== VERIFY_LENGTH)
      return this.setState({ loading: false, isInvalid1: true });

    // console.log(this.state.vc_code)
    // console.log(verify)
    if (this.state.vc_code.toString() !== verify)
      return this.setState({ loading: false, isInvalid1: true });

    this.setPage(2);
  }

  async signup() {
    this.setState({ loading: true });
    let isInvalid = false;
    let firstname = document.getElementById("firstname-input").value;
    let lastname = document.getElementById("lastname-input").value;
    let phonenumber = document
      .getElementById("phonenumber-input")
      .value.replaceAll(" ", "");
    let pass = document.getElementById("pass-input").value;
    let pass2 = document.getElementById("pass2-input").value;
    if (firstname.length === 0) {
      this.setState({ isInvalid1: true });
      isInvalid = true;
    } else this.setState({ isInvalid1: false });
    if (lastname.length === 0) {
      this.setState({ isInvalid2: true });
      isInvalid = true;
    } else this.setState({ isInvalid2: false });
    if (!isValidPhoneNumber(phonenumber)) {
      this.setState({ isInvalid3: true });
      isInvalid = true;
    } else this.setState({ isInvalid3: false });
    if (!this.state.terms) {
      this.setState({ isInvalid6: true });
      isInvalid = true;
    } else this.setState({ isInvalid6: false });
    if (!validatePass(pass)) {
      this.setState({ isInvalid4: true });
      isInvalid = true;
    } else this.setState({ isInvalid4: false });
    if (pass2 !== pass) {
      this.setState({ isInvalid5: true });
      isInvalid = true;
    } else this.setState({ isInvalid5: false });

    if (isInvalid) return this.setState({ loading: false });

    let FormData = require("form-data");
    let data = new FormData();
    data.append("first_name", firstname);
    data.append("last_name", lastname);
    data.append("email", this.state.email);
    data.append("phone_number", phonenumber);
    data.append("password", pass);
    data.append("vc_code", this.state.vc_code);
    await axios
      .post(API_SIGNUP_URL, data)
      .then((res) => {
        if (res.status === 201) {
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
        return this.setState({ loading: false });
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
  }

  checkPass() {
    let pass = document.getElementById("pass-input").value;
    if (this.state.isInvalid4)
      this.setState({ isInvalid4: false, isValid4: validatePass(pass) });
    else this.setState({ isValid4: validatePass(pass) });
    this.confirmPass();
  }

  confirmPass() {
    if (this.state.isValid4) {
      let pass = document.getElementById("pass-input").value;
      let pass2 = document.getElementById("pass2-input").value;
      this.setState({ isValid5: pass === pass2, isInvalid5: pass !== pass2 });
    }
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
              data-testid={"back-button-signup"}
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
              Sign Up
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form novalidate>
            {this.pageTop()}

            {/*agree with terms*/}
            {this.state.pageNum === 2 ? (
              <div className="form-group pb-1">
                <div className="form-check">
                  <Form.Check
                    className="form-check-input"
                    style={{ marginTop: "0" }}
                    onClick={() =>
                      this.setState({
                        isInvalid6: !this.state.terms
                          ? false
                          : this.state.isInvalid6,
                        terms: !this.state.terms,
                      })
                    }
                    type="checkbox"
                    id="formCheck-1"
                    required
                    feedback="You must agree before submitting."
                    isInvalid={this.state.isInvalid6}
                  />
                  <p>
                    Agree to <a href={"#"}>terms</a> and conditions
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="form-group">{this.pageButton()}</div>
          </form>
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

          {this.state.pageNum === 0 ? (
            <Fragment>
              <hr style={{ backgroundColor: "#bababa" }} />
              <p className="text-center">
                Already have an Account?
                <a
                  className="text-decoration-none"
                  onClick={() => this.exit(true, true, null)}
                  href="#"
                >
                  Log In
                </a>
              </p>
            </Fragment>
          ) : (
            ""
          )}
          {this.state.pageNum === 1 && !this.state.loading ? (
            <Fragment>
              <hr style={{ backgroundColor: "#bababa" }} />
              {this.state.showResend ? (
                <p className="text-center">
                  Didn't get it?
                  <a
                    className="text-decoration-none"
                    onClick={() => this.sendVerification(true)}
                    href="#"
                  >
                    Resend!
                  </a>
                </p>
              ) : (
                <p className="text-center">Sent!</p>
              )}
            </Fragment>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default Signup;
