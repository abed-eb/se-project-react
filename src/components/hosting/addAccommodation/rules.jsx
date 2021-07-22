import React, { Component } from "react";
import "./rules.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { getItem } from "../../util";
import { API_GET_SPECIAL_RULES } from "../../constants";
class rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedRules: [],
      rules: [],
    };
  }

  componentDidMount = async () => {
    await axios
      .get(API_GET_SPECIAL_RULES, {
        headers: {
          Authorization: "Token ".concat(getItem("user-token")),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          console.log("data is shown successfuly");
          this.loadRules(res.data);
        } else {
          console.log("unknown status");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (sessionStorage.getItem("selected-rules")) {
      this.setState({
        checkedRules: JSON.parse(
          "[" + sessionStorage.getItem("selected-rules") + "]"
        ),
      });
    }
  };

  loadRules = (data) => {
    console.log("data rules : ", data);
    this.setState({
      rules: data,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("goToAmentities").click();
    sessionStorage.setItem("selected-rules", this.state.checkedRules);
  };

  handleChange = (e) => {
    let checked = this.state.checkedRules;
    console.log("checked rules : " + this.state.checkedRules);
    console.log("is checked? : " + e.target.checked);
    if (!e.target.checked) {
      console.log("enter if");
      let index = checked.indexOf(parseInt(e.target.id));
      checked = [
        ...checked.slice(0, index),
        ...checked.slice(index + 1, checked.length),
      ];
    } else {
      console.log("enter else : " + e.target.id);
      checked = [...checked, parseInt(e.target.id)];
    }

    console.log("checked rules : " + checked);

    this.setState({
      checkedRules: checked,
    });
    // this.setState({
    //     selectedRules: this.state.selectedRules.concat([e.target.id, !this.state.ruleState])
    // })
  };
  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <h4>Place rules</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="rules-main">
            <b>Check the rules which need to be followed.</b>
            <div className="rules-form mt-2">
              <Form>
                <div className="rules-smoke">
                  {this.state.rules.map((rule) => (
                    <div key={rule.rule_id} className="form-group">
                      <div className="input-group">
                        <Form.Group controlId="formBasicCheckbox">
                          <Form.Check
                            id={rule.rule_id}
                            checked={
                              this.state.checkedRules.indexOf(rule.rule_id) !==
                              -1
                            }
                            onChange={this.handleChange}
                            data-testid="rule"
                            name="rule"
                            type="checkbox"
                            label={rule.text}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  ))}
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/hosting/addaccommodation/details/"}>
            <button className={"ml-auto btn btn-outline-secondary"}>
              Back
            </button>
          </Link>
          <button
            onClick={this.handleSubmit}
            className={"ml-auto btn btn-outline-primary"}
          >
            Next
          </button>
          <Link
            id="goToAmentities"
            className="display-none"
            to={"/hosting/addaccommodation/amentities/"}
          ></Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default rules;
