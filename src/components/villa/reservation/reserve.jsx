import React, { Component } from "react";
import "./reserve.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Modal, ModalFooter, ModalHeader } from "react-bootstrap";
import { STORAGE_KEY } from "../../constants";
import Reserve1 from "./reserve1";
import Reserve2 from "./reserve2";
import Reserve3 from "./reserve3";
import Reserve4 from "./reserve4";
class Reserve extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passangers: 1,
      checkIn: new Date().toLocaleString(),
      checkOut: new Date().toLocaleString(),
      currentDate: null,
      price: this.props.PlacePrice,
      total: this.props.PlacePrice + " $",
      stayingDays: 1,
      size: null,
    };
  }

  componentDidMount = () => {
    document.addEventListener(STORAGE_KEY + "screen-size-changed", (event) =>
      this.setState({ size: event.detail })
    );
    console.log("addr : " + this.props.place_address);
  };

  exit() {
    sessionStorage.removeItem("travel-startDate");
    sessionStorage.removeItem("travel-endDate");
    sessionStorage.removeItem("travel-staying-days");
    sessionStorage.removeItem("passangers");
    sessionStorage.removeItem("travel-total-cost");
    sessionStorage.removeItem("passanger-national-code");
    document.getElementById("redirect-to-villa-profile").click();
  }

  render() {
    return (
      <Modal
        centered
        size={"md"}
        animation
        height={600}
        show={true}
        onHide={this.exit}
      >
        <Switch>
          <Route path="/villa/villaProfile/reserve/1/">
            <Reserve1
              place_id={this.props.place_id}
              exit={this.exit}
              placeMaxCapacity={this.props.placeMaxCapacity}
              PlacePrice={this.props.PlacePrice}
            />
          </Route>

          <Route path="/villa/villaProfile/reserve/2/">
            <Reserve2 exit={this.exit} />
          </Route>

          <Route path="/villa/villaProfile/reserve/3/">
            <Reserve3 place_id={this.props.place_id} exit={this.exit} />
          </Route>

          <Route path="/villa/villaProfile/reserve/4/">
            <Reserve4
              mapWidth={this.props.mapWidth}
              mapHeight={this.props.mapHeight}
              mapInitial={this.props.mapInitial}
              place_address={this.props.place_address}
              owner_phoneNumber={this.props.owner_phoneNumber}
              exit={this.exit}
              fullAddress={this.props.fullAddress}
              placeOwner={this.props.placeOwner}
              ownerPhoneNumber={this.props.ownerPhoneNumber}
            />
          </Route>
        </Switch>
      </Modal>
    );
  }
}

export default Reserve;
