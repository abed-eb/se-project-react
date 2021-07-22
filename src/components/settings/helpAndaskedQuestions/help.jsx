import React, { Component } from "react";
import Card from "../../card/cardBox";
import travelImg from "../img/travel.png";
import hostingImg from "../img/villa.png";
import cookingImg from "../img/cooking.png";
import paymentImg from "../img/debit-card.png";
import problemImg from "../img/problem.png";
import connectionImg from "../img/social-media.png";
import "./help.css";
class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="help-main bg-white">
        <h3>Hi, How can we help you ?</h3>
        <div className="help-card mt-4 row">
          <div className="help-card-responsiveForXl col-xl-4 col-lg-6 col-md-8 col-sm-8 mt-4">
            <Card
              text="Learn how to book and rent a palce for your travel."
              title="Booking and traveling"
              img={travelImg}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 mt-4">
            <Card
              text="Learn how to use SweetHome for making money by being a host."
              title="Hosting stays"
              img={hostingImg}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 mt-4">
            <Card
              text="Learn how to host an exprience with your friends."
              title="Hosting experiences"
              img={cookingImg}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 mt-4">
            <Card
              text="Learn how to pay to your host and what tips are best to follow."
              title="payemnt tips"
              img={paymentImg}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 mt-4">
            <Card
              text="Learn how to report your problems about your host or passenger."
              title="report a problem"
              img={problemImg}
            />
          </div>
          <div className="col-xl-4 col-lg-6 col-md-8 col-sm-8 mt-4">
            <Card
              text="Learn how to make connections and find your friends at SweetHome."
              title="connect with people"
              img={connectionImg}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
