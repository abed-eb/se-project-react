import React, { Component } from "react";
import "./reserve.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Modal, ModalFooter, ModalHeader } from "react-bootstrap";
import plusImg from "../../../assets/img/plus.png";
import minusImg from "../../../assets/img/minus.png";
import { DatePicker, Space } from "antd";
import moment from "moment";
import date from "date-and-time";
import { STORAGE_KEY, API_GET_RESERVED_DATES } from "../../constants";
import { getItem } from "../../util";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const now = new Date();

class Reserve1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passangers: 1,
      checkIn: new Date().toLocaleString(),
      checkOut: new Date().toLocaleString(),
      currentDate: null,
      price: this.props.PlacePrice,
      total: this.props.PlacePrice,
      stayingDays: 1,
      size: null,
      invalidDate: false,
      disableBtn: true,
      range: [],
      disabledDates: [],
    };
  }

  componentDidMount = async () => {
    console.log(this.props.PlacePrice);
    if (sessionStorage.getItem("travel-startDate")) {
      this.setState({
        passangers: sessionStorage.getItem("passangers"),
        stayingDays: sessionStorage.getItem("travel-staying-days"),
        total: sessionStorage.getItem("travel-total-cost"),
        range: [
          moment(sessionStorage.getItem("travel-startDate")),
          moment(sessionStorage.getItem("travel-endDate")),
        ],
        disableBtn: false,
      });
      let range = [
        moment(sessionStorage.getItem("travel-startDate")),
        moment(sessionStorage.getItem("travel-endDate")),
      ];
    }
    this.setState({
      currentDate: date.format(now, "YYYY/MM/DD"),
    });

    console.log("villa_id : ", this.props.place_id);
    await axios
      .get(API_GET_RESERVED_DATES, {
        headers: {
          Authorization: "Token ".concat(getItem("user-token")),
        },
        params: {
          villa_id: this.props.place_id,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          console.log("data is shown successfuly");
          this.loadCalendar(res.data);
        } else {
          console.log("unknown status");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    document.addEventListener(STORAGE_KEY + "screen-size-changed", (event) =>
      this.setState({ size: event.detail })
    );
  };

  loadCalendar = (data) => {
    console.log("this is sadegh data : ", data.dates);
    this.setState({
      disabledDates: data.dates,
    });
  };

  exit() {
    document.getElementById("redirect-to-villa-profile").click();
  }

  handleSubmit = () => {
    let dataIsValid = false;
    if (!this.state.invalidDate) {
      dataIsValid = true;
    } else if (this.state.invalidDate) {
      dataIsValid = false;
      return;
    }

    if (dataIsValid) {
      sessionStorage.setItem("travel-startDate", this.state.checkIn);
      sessionStorage.setItem("travel-endDate", this.state.checkOut);
      sessionStorage.setItem("travel-staying-days", this.state.stayingDays);
      sessionStorage.setItem("passangers", this.state.passangers);
      sessionStorage.setItem("travel-total-cost", this.state.total);
      document.getElementById("goToReserve2").click();
    }
  };

  onDateChange = (range) => {
    if (range !== null) {
      let value = range.value;
      let startDate = range[0].format();
      let endDate = range[1].format();
      let a = moment(startDate);
      let b = moment(endDate);
      b.diff(a, "days"); // =1
      // let Difference_In_Time = endDate.getTime() - startDate.getTime();
      // let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      this.setState({
        disableBtn: false,
        stayingDays: b.diff(a, "days"),
        checkIn: startDate.slice(0, -15),
        checkOut: endDate.slice(0, -15),
        invalidDate: false,
        range: [moment(range[0].format()), moment(range[1].format())],
      });
      this.calculateCost(b.diff(a, "days"));
      console.log("start date  ", startDate.slice(0, -15));
      console.log("end date  ", endDate.slice(0, -15));
    }
    if (range === null) {
      this.setState({ invalidDate: true, disableBtn: true });
    }
  };

  getDaysBetweenDates = (startDate, endDate) => {
    let now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("MM/DD/YYYY"));
      now.add(1, "days");
    }
    return dates;
  };

  disabledDate = (current) => {
    // Can not select days before today and today
    let disabledDate = this.state.disabledDates;
    let result = current && current < moment().endOf("day");

    for (let i = 0; i < disabledDate.length; i++) {
      let date = Date.parse(disabledDate[i]);
      result =
        result ||
        (moment(date).startOf("day") <= current &&
          moment(date).endOf("day") >= current);
    }
    return result;
  };

  handleCounter = (select, operator) => {
    if (
      select === 1 &&
      operator === "+" &&
      this.state.passangers < this.props.placeMaxCapacity
    ) {
      this.setState({
        passangers: this.state.passangers + 1,
      });
      return;
    } else if (operator === "+") {
      toast.error("This option can not be more than this value.");
    }
    if (select === 1 && operator === "-" && this.state.passangers > 1) {
      this.setState({
        passangers: this.state.passangers - 1,
      });
      return;
    } else if (operator === "-") {
      toast.error("This option can not be less than this value.");
    }
  };

  calculateCost = (stayingDays) => {
    let total = stayingDays * this.state.price;
    console.log("total : " + total);
    this.setState({ total: total });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <ToastContainer />
          <Link
            className={"display-none"}
            to="/villa/villaProfile"
            id={"redirect-to-villa-profile"}
          />
          <Modal.Header closeButton={true}>
            <div>
              <h4>Step One</h4>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="reserver-datePicker">
                <Space className="w-100" direction="vertical" size={12}>
                  <RangePicker
                    allowClear={false}
                    data-testid="reserve1-rangePicker"
                    value={this.state.range ? this.state.range : ""}
                    placeholder={["Check In", "Check Out"]}
                    name="Picker"
                    disabledDate={(current) => this.disabledDate(current)}
                    format={dateFormat}
                    onChange={this.onDateChange}
                    size={20}
                  />
                  {this.state.invalidDate ? (
                    <p className="ml-2 reserve-invalid-date">
                      You must specify your travel date!
                    </p>
                  ) : (
                    ""
                  )}
                </Space>
              </div>

              <div className="row reserve-counter-cost">
                <div className="mt-2 col-xl-6">
                  <label className="mt-2" htmlFor="reserve-counter">
                    number of passengers
                  </label>
                  <div className="reserve-counter col-md-12 justify-content-center">
                    <div className="d-flex flex-row justify-content-start w-100">
                      <img style={{width:25,height:25}}
                        data-testid="counter-icon-minus"
                        name="passangers"
                        onClick={(select, operator) =>
                          this.handleCounter(1, "-")
                        }
                        className=""
                        alt="minus icon"
                        src={minusImg}
                      />
                      <div
                        data-testid="reserve-passangers"
                        className="reserve-counter-number"
                      >
                        <b
                          data-testid="passanger-count"
                          className="reserve-numOfPassanger pr-4 pl-4"
                        >
                          {this.state.passangers}
                        </b>
                      </div>
                      <img style={{width:25,height:25}}
                        data-testid="counter-icon-plus"
                        name="passangers"
                        onClick={(select, operator) =>
                          this.handleCounter(1, "+")
                        }
                        className=""
                        alt="plus icon"
                        src={plusImg}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 col-xl-6">
                  <label className="mt-2" htmlFor="reserve-cost">
                    Total
                  </label>
                  <div className="reserve-cost">
                    <div className="d-flex flex-row justify-content-start w-100">
                      <div data-testid="reserve-cost">
                        <b className="reserve-price pr-4 pl-4">
                          {this.state.stayingDays +
                            " * " +
                            this.state.price +
                            " = " +
                            this.state.total +
                            "$"}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>
        <ModalFooter>
          <button
            data-testid="reserve1-nextBtn"
            disabled={this.state.disableBtn}
            onClick={this.handleSubmit}
            className="btn btn-outline-primary"
          >
            Next
          </button>
          <Link id="goToReserve2" to="/villa/villaProfile/reserve/2/"></Link>
        </ModalFooter>
      </React.Fragment>
    );
  }
}

export default Reserve1;
