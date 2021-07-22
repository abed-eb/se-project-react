import React, { Component } from "react";
import "./details.css";
import { Modal } from "react-bootstrap";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { valueIsNumber } from "../../util";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      charsPerPage: 1,
      invalidPlaceName: false,
      invalidDescription: false,
      invalidPrice: false,
    };
  }

  componentDidMount() {
    if (
      sessionStorage.getItem("add-villa-placeName") ||
      sessionStorage.getItem("add-villa-description") ||
      sessionStorage.getItem("add-villa-area") ||
      sessionStorage.getItem("add-villa-price")
    ) {
      document.getElementById("details-placeName").value =
        sessionStorage.getItem("add-villa-placeName");
      document.getElementById("details-description").value =
        sessionStorage.getItem("add-villa-description");
      document.getElementById("details-area").value =
        sessionStorage.getItem("add-villa-area");
      document.getElementById("details-price").value =
        sessionStorage.getItem("add-villa-price");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let placeName = document.getElementById("details-placeName").value;
    let description = document.getElementById("details-description").value;
    let area = document.getElementById("details-area").value;
    let price = document.getElementById("details-price").value;
    let dataIsValid = true;

    // if (country.contains("<")) {
    //     dataIsValid = false
    //     this.setState({
    //         invalidCountry: true,
    //     });
    // }
    // else{
    //     this.setState({invalidCountry: false});
    // }

    if (placeName.length === 0 || placeName.length > 40) {
      dataIsValid = false;
      this.setState({ invalidPlaceName: true });
    } else {
      this.setState({ invalidPlaceName: false });
    }

    if (price.length === 0) {
      dataIsValid = false;
      this.setState({ invalidPrice: true });
    } else {
      this.setState({ invalidPrice: false });
    }

    if (area.length === 0 || area.length > 40) {
      dataIsValid = false;
      this.setState({ invalidArea: true });
    } else {
      this.setState({ invalidArea: false });
    }

    if (dataIsValid) {
      sessionStorage.setItem("add-villa-placeName", placeName);
      sessionStorage.setItem("add-villa-description", description);
      sessionStorage.setItem("add-villa-area", area);
      sessionStorage.setItem("add-villa-price", price);
      console.log("set");
      document.getElementById("goToRules").click();
    } else {
      toast.error("You may entered invalid amounts!");
    }
  };

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    if (name === "description") {
      let currentText = e.target.value;
      //Now we need to recalculate the number of characters that have been typed in so far
      let characterCount = currentText.length;
      let charsPerPageCount = this.state.charsPerPage;
      let unitCount = Math.round(characterCount / charsPerPageCount);
      this.setState({ pageCount: unitCount });
    }

    if (name === "price") {
      target.value.toLocaleString();
    }
  };
  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <h4>Place details</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="details-main">
            <b>Describe your place for guests.</b>
            <div className="details-form">
              <Form>
                <div className="details-placeName">
                  <div className="details-input-description">
                    <label className="form-label" htmlFor="details-placeName">
                      Place name:
                    </label>
                    <p>Use a name to describe your place attributes well.</p>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Control
                        onChange={this.handleChange}
                        id="details-placeName"
                        className="form-control shadow-none"
                        type="text"
                        name="placeName"
                        maxLength="40"
                        placeholder="Example: Seaside villa"
                        data-testid="details-placeName"
                        isInvalid={this.state.invalidPlaceName}
                      />
                      <Form.Control.Feedback type="invalid" className={"ml-1"}>
                        You can use at most 40 characters for place name!
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>

                <div className="details-description">
                  <div className="details-input-description">
                    <label className="form-label" htmlFor="details-description">
                      About Place :{" "}
                      <span classNmae="details-optinal">(Optional)</span>
                    </label>
                    <p>
                      Write about features, sightseeing and anything that makes
                      your place spectacular and unique compared to the others.
                    </p>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Control
                        onChange={this.handleChange}
                        as="textarea"
                        rows={3}
                        maxLength="120"
                        id="details-description"
                        className="form-control shadow-none"
                        type="text"
                        name="description"
                        placeholder="Example: Luxurious villa with swimming pool near the sea and close to ..."
                        data-testid="details-description"
                      />
                    </div>
                    <div className="personalInfo-textAreaCounter">
                      {this.state.pageCount} of 120
                    </div>
                  </div>
                </div>

                <div className="details-area">
                  <div className="details-input-description">
                    <label className="form-label" htmlFor="details-area">
                      Area (Meters):
                    </label>
                    {/* <p>Enter the price per day for your place.</p> */}
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Control
                        onChange={this.handleChange}
                        id="details-area"
                        className="form-control shadow-none"
                        type="number"
                        min="0"
                        name="area"
                        maxLength="4"
                        placeholder="Example: 150"
                        data-testid="details-area"
                        isInvalid={this.state.invalidArea}
                      />
                      <Form.Control.Feedback type="invalid" className={"ml-1"}>
                        Area must be digits and more than 9!
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>

                <div className="details-price">
                  <div className="details-input-price">
                    <label className="form-label" htmlFor="details-price">
                      Price :{" "}
                    </label>
                    <p>Enter the price per day in dollars for your place.</p>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Control
                        onChange={this.handleChange}
                        id="details-price"
                        className="form-control shadow-none"
                        type="number"
                        min="0"
                        name="price"
                        placeholder="Example: 1000"
                        data-testid="details-price"
                        isInvalid={this.state.invalidPrice}
                      />
                      <Form.Control.Feedback type="invalid" className={"ml-1"}>
                        Price can only contains digits.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/hosting/addaccommodation/categories/"}>
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
            id="goToRules"
            className="display-none"
            to={"/hosting/addaccommodation/rules/"}
          ></Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Details;
