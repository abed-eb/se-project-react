import React, { Component } from "react";
import "./reserve.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Modal, ModalFooter, ModalHeader } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { DatePicker, Space } from "antd";
import { STORAGE_KEY } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import { fromLonLat } from "ol/proj";
import {RFeature, RLayerVector, RMap, ROSM, ROverlay, RStyle} from "rlayers";
import {Point} from "ol/geom";
import locationIcon from "../../../assets/location.png";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const { size } = 20;
const now = new Date();

let center = fromLonLat([-90.108862, 29.909324]);

class Reserve2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidNationalCode: false,
      nationalCode: null,
    };
  }

  componentDidMount = () => {
    document.addEventListener(STORAGE_KEY + "screen-size-changed", (event) =>
      this.setState({ size: event.detail })
    );
    console.log("addr : " + this.props.place_address);
    // let config = {
    //     method: 'get',
    //     url: API_CHECK_DOC_URL,
    //     headers: { 'Authorization': 'Token '.concat(getItem('user-token')),}
    // };

    // console.log(config)

    // let response = await axios(config)
    //     .then(function (response) {
    //         return response.data;
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //         return false
    //     });
  };

  handleSubmit = () => {
    this.props.exit();
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
              <h4>Landlord information</h4>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="reserve-nationalCode">
                <label
                  style={{ color: "red" }}
                  className="form-label"
                  htmlFor="reserve-nationalCode"
                >
                  Keep this information{" "}
                </label>
              </div>
              <div className="reserve-nationalCode">
                <div>
                  <div>
                    <label>First name : </label>
                    <b> {this.props.placeOwner}</b>
                  </div>
                </div>
                <div>
                  <div>
                    <label>Phone number : </label>
                    <b> {this.props.owner_phoneNumber}</b>
                  </div>
                </div>
                <div>
                  <div>
                    <label>Place full address : </label>
                    <b> {this.props.place_address}</b>
                  </div>
                </div>
              </div>
              <div className={"mr-5 ml-5 villaProfile-map"}>
                <RMap
                  width={this.props.mapWidth}
                  height={this.props.mapHeight}
                  initial={{
                    center: this.props.mapInitial.center,
                    zoom: 11,
                  }}
                >
                  <RLayerVector zIndex={10}>
                    <RStyle.RStyle>
                      <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                    </RStyle.RStyle>
                    <RFeature
                        geometry={new Point(this.props.mapInitial.center)}
                        onClick={(e) =>
                            e.map
                                .getView()
                                .fit(e.target.getGeometry().getExtent(), {
                                  duration: 250,
                                  zoom: 11,
                                })
                        }
                    >
                    </RFeature>
                  </RLayerVector>
                  <ROSM />
                </RMap>
              </div>
            </Form>
          </Modal.Body>
        </div>
        <Modal.Footer>
          {/* <Link to={'/villa/villaProfile/reserve/3/'} >
                            <button className={'ml-auto btn btn-outline-secondary'}>Back</button>
                        </Link> */}
          <button
            onClick={this.handleSubmit}
            className={"ml-auto btn btn-outline-primary"}
          >
            I am keeping this information
          </button>
          <Link
            id="goToReserve3"
            className="display-none"
            to={"/villa/villaProfile/reserve/final/"}
          ></Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Reserve2;
