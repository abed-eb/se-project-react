import React, { Component } from "react";
import "./address.css";
import { Modal } from "react-bootstrap";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import csc from "country-state-city";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      charsPerPage: 1,
      invalidPlaceName: "",
      postalCode: null,
      invalidPostalCode: false,
      invalidCountry: false,
      invalidState: false,
      invalidCity: false,
      invalidFullAddress: false,
      countries: [],
      states: [],
      cityOptions: [],
      cities: [],
      countryCode: null,
      cityCode: null,
      stateCode: null,
      country: null,
      state: null,
      city: null,
    };
  }

  componentDidMount() {
    this.setState({ countries: csc.getAllCountries() });

    if (
      sessionStorage.getItem("add-villa-selected-country") ||
      sessionStorage.getItem("add-villa-selected-state") ||
      sessionStorage.getItem("add-villa-selected-city") ||
      sessionStorage.getItem("add-villa-fullAddress") ||
      sessionStorage.getItem("add-villa-postalCode")
    ) {
      this.setState({
        country: sessionStorage.getItem("add-villa-selected-country"),
        states: csc.getStatesOfCountry(
          sessionStorage.getItem("add-villa-selected-countryCode")
        ),
        state: sessionStorage.getItem("add-villa-selected-state"),
        cities: csc.getCitiesOfState(
          sessionStorage.getItem("add-villa-selected-countryCode"),
          sessionStorage.getItem("add-villa-selected-stateCode")
        ),
        city: sessionStorage.getItem("add-villa-selected-city"),
      });

      document.getElementById("address-fullAddress").value =
        sessionStorage.getItem("add-villa-fullAddress");
      document.getElementById("address-postalCode").value =
        sessionStorage.getItem("add-villa-postalCode");

      console.log(sessionStorage.getItem("add-villa-selected-country"));
      console.log(sessionStorage.getItem("add-villa-selected-state"));
      console.log(sessionStorage.getItem("add-villa-selected-city"));
      console.log(sessionStorage.getItem("add-villa-postalCode"));
      console.log(sessionStorage.getItem("add-villa-fullAddress"));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let country = document.getElementById("address-country").value;
    let state = document
      .getElementById("address-state")
      .value.replace("Province", "");
    let city = document.getElementById("address-city").value;
    let fullAddress = document.getElementById("address-fullAddress").value;
    let postalCode = document.getElementById("address-postalCode").value;
    let dataIsValid = true;
    if (country === "Select your country") {
      dataIsValid = false;
      this.setState({
        invalidCountry: true,
      });
    } else {
      this.setState({ invalidCountry: false });
    }

    if (
      state === "Select your state" &&
      csc.getStatesOfCountry(this.state.countryCode).length !== 0
    ) {
      dataIsValid = false;
      this.setState({ invalidState: true });
    } else {
      this.setState({ invalidState: false });
    }

    if (
      city === "Select your city" &&
      csc.getCitiesOfState(this.state.countryCode, this.state.stateCode)
        .length !== 0
    ) {
      dataIsValid = false;
      this.setState({ invalidCity: true });
    } else {
      this.setState({ invalidCity: false });
    }

    if (fullAddress.length === 0) {
      dataIsValid = false;
      this.setState({ invalidFullAddress: true });
    } else {
      this.setState({ invalidFullAddress: false });
    }

    if (this.state.invalidPostalCode) {
      dataIsValid = false;
    }

    if (dataIsValid) {
      sessionStorage.setItem("add-villa-selected-country", country);
      sessionStorage.setItem(
        "add-villa-selected-countryCode",
        this.state.countryCode
      );
      sessionStorage.setItem("add-villa-selected-state", state);
      sessionStorage.setItem(
        "add-villa-selected-stateCode",
        this.state.stateCode
      );
      sessionStorage.setItem("add-villa-selected-city", city);
      sessionStorage.setItem("add-villa-fullAddress", fullAddress);
      sessionStorage.setItem("add-villa-postalCode", postalCode);

      document.getElementById("goToPhotos").click();
    } else {
      toast.error("You may entered invalid amounts!");
    }
  };

  handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    if (name === "fullAddress") {
      let currentText = e.target.value;
      //Now we need to recalculate the number of characters that have been typed in so far
      let characterCount = currentText.length;
      let charsPerPageCount = this.state.charsPerPage;
      let unitCount = Math.round(characterCount / charsPerPageCount);
      this.setState({ pageCount: unitCount });
    }
    if (name === "postalCode" && value.length === 10) {
      this.setState({ postalCode: value, invalidPostalCode: false });
    } else if (
      name === "postalCode" &&
      (value.length > 10 || value.length < 10)
    ) {
      this.setState({ postalCode: value, invalidPostalCode: true });
    }
  };

  onCountrySelect = (e) => {
    let selectedindex = e.target.options.selectedIndex;
    let countryCode =
      e.target.options[selectedindex].getAttribute("countryCode");
    if (csc.getStatesOfCountry(countryCode).length === 0) {
      console.log(csc.getCitiesOfCountry(countryCode));
      this.setState({
        country: e.target.value,
        countryCode: countryCode,
        cities: csc.getCitiesOfCountry(countryCode),
      });
    } else {
      this.setState({
        country: e.target.value,
        countryCode: countryCode,
        states: csc.getStatesOfCountry(countryCode),
      });
    }
    if (e.target.value === "Select your country") {
      this.setState({
        states: [],
      });
    }
  };

  onStateSelect = (e) => {
    let selectedindex = e.target.options.selectedIndex;
    let stateCode = e.target.options[selectedindex].getAttribute("stateCode");
    if (csc.getCitiesOfState(this.state.countryCode, stateCode).length !== 0)
      this.setState({
        state: e.target.value,
        stateCode: stateCode,
        cities: csc.getCitiesOfState(this.state.countryCode, stateCode),
      });
    else
      this.setState({
        state: e.target.value,
        stateCode: stateCode,
        cities: csc.getCitiesOfCountry(this.state.countryCode),
      });
    if (e.target.value === "Select your state") {
      this.setState({
        cities: [],
      });
    }
  };

  onCitySelect = (e) => {
    let selectedindex = e.target.options.selectedIndex;
    let cityCode = e.target.options[selectedindex].getAttribute("cityCode");
    let citiesOfCountry = csc.getCitiesOfCountry(this.state.countryCode);
    for (let i = 0; i < citiesOfCountry.length; i++) {
      console.log(
        "citycode : " +
          e.target.value +
          " cities of country : " +
          citiesOfCountry[i].name
      );
      if (e.target.value === citiesOfCountry[i].name) {
        sessionStorage.setItem("place-latitude", citiesOfCountry[i].latitude);
        sessionStorage.setItem("place-longitude", citiesOfCountry[i].longitude);
        console.log(
          "location :    " +
            sessionStorage.getItem("place-latitude") +
            " " +
            sessionStorage.getItem("place-longitude")
        );
      }
    }
    this.setState({
      city: e.target.value,
      cityCode: cityCode,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <div>
            <h4>Place address</h4>
            <p className="subTitle">
              This information is only for better accessibility of your guests
              and will be shown only after reservations
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="address-main">
            <b>Enter your place address details here.</b>
            <div className="address-form">
              <Form>
                <div className="row mb-4 mt-2">
                  <div className="col-md-12">
                    <label htmlFor="address-country">Country :</label>
                    <div>
                      <select
                        id="address-country"
                        style={{ width: "100%" }}
                        value={this.state.country}
                        className={
                          this.state.invalidCountry
                            ? "address-select-control"
                            : ""
                        }
                        data-testid="address-country"
                        onChange={this.onCountrySelect}
                      >
                        <option countryCode="default">
                          Select your country
                        </option>
                        {this.state.countries.map((country) => (
                          <option
                            countryCode={country.isoCode}
                            key={country.isoCode}
                          >
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {this.state.invalidCountry ? (
                      <div className="ml-2 address-errors">
                        You must choose your country!
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="address-state">State :</label>
                    <div>
                      <select
                        id="address-state"
                        style={{ width: "100%" }}
                        value={this.state.state}
                        className={
                          this.state.invalidState
                            ? "address-select-control"
                            : ""
                        }
                        data-testid="address-state"
                        onChange={this.onStateSelect}
                      >
                        <option stateCode="default">Select your state</option>
                        {this.state.states.map((state) => (
                          <option stateCode={state.isoCode} key={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {this.state.invalidState ? (
                      <div className="ml-2 address-errors">
                        You must choose your country!
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="address-state">City :</label>
                    <div>
                      <select
                        id="address-city"
                        value={this.state.city}
                        className={
                          this.state.invalidCity ? "address-select-control" : ""
                        }
                        style={{ width: "100%" }}
                        data-testid="address-city"
                        onChange={this.onCitySelect}
                      >
                        <option cityCode="default">Select your city</option>
                        {this.state.cities.map((city) => (
                          <option cityCode={city.isoCode} key={city.isoCode}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {this.state.invalidCity ? (
                      <div className="ml-2 address-errors">
                        You must choose your city!
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="address-fullAddress">
                  <div className="address-full">
                    <label className="form-label" htmlFor="address-full">
                      Your place full address :
                    </label>
                    <p>
                      Write your full address containing City, state, Street,
                      Alley and ...
                    </p>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Control
                        onChange={this.handleChange}
                        as="textarea"
                        rows={3}
                        maxLength="120"
                        id="address-fullAddress"
                        className="form-control shadow-none"
                        type="text"
                        name="fullAddress"
                        placeholder="Example: Tehran, Vali-asr street, Zaferaniyeh street, Kafi-abadi alley ...."
                        data-testid="address-fullAddress"
                        isInvalid={this.state.invalidFullAddress}
                      />
                      <Form.Control.Feedback type="invalid" className={"ml-1"}>
                        You must enter your place full address!
                      </Form.Control.Feedback>
                    </div>
                    <div className="personalInfo-textAreaCounter">
                      {this.state.pageCount} of 120
                    </div>
                  </div>
                </div>

                <div className="address-postalCode">
                  <div className="address-postalCode">
                    <label className="form-label" htmlFor="address-postalCode">
                      Postal code :{" "}
                      <span className="address-optional">(Optional)</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <Form.Control
                        onChange={this.handleChange}
                        id="address-postalCode"
                        className="form-control shadow-none"
                        type="number"
                        min="0"
                        name="postalCode"
                        placeholder="Example : 1234567890"
                        value={this.state.postalCode}
                        data-testid="address-postalCode"
                        isInvalid={this.state.invalidPostalCode}
                      />
                      <Form.Control.Feedback type="invalid" className={"ml-1"}>
                        Postal code must be 10 digits.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/hosting/addaccommodation/facilities/"}>
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
            id="goToPhotos"
            to={"/hosting/addaccommodation/location/"}
          ></Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Address;
