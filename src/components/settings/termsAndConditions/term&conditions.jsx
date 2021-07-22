import React, { Component } from "react";
import "./term&conditions.css";
class TermsConditions extends Component {
  state = {};
  render() {
    return (
      <div className="terms-main">
        <h1>SweetHome Terms and Conditions</h1>
        <hr className="terms-line" />
        <h4 className="mt-2 mb-2">Terms and Conditions</h4>
        <p>
          Last updated: (3/20/2021) Please read these Terms and Conditions
          carefully before using the{" "}
          <a href="#" target="blank">
            {" "}
            http://www.SweetHome.com{" "}
          </a>
          website and the SweetHome mobile application operated by SweetHome.
          Your access to and use of the Service is conditioned on your
          acceptance of and compliance with these Terms. These Terms apply to
          all visitors, users and others who access or use the Service.
        </p>
        <b style={{ color: "red" }}>
          By accessing or using the Service you agree to be bound by these
          Terms. If you disagree with any part of the terms then you may not
          access the Service.
        </b>
        <hr className="terms-line" />
        <b>Purchases</b>
        <p>
          If you wish to purchase any product or service made available through
          the Service , you may be asked to supply certain information relevant
          to your Purchase including, without limitation, your …
        </p>
        <b>Subscriptions</b>
        <p>
          Some parts of the Service are billed on a subscription basis. You will
          be billed in advance on a recurring ...
        </p>
        <b>Content</b>
        <p>
          Our Service allows you to post, link, store, share and otherwise make
          available certain information, text, graphics, videos, or other
          Content. You are responsible for the …
        </p>
        <b>Links To Other Web Sites</b>
        <p>
          Our Service may contain links to third-party web sites or services
          that are not owned or controlled by SweetHome. SweetHome has no
          control over, and assumes no responsibility for, the content, privacy
          policies, or practices of any third party web sites or services. You
          further acknowledge and agree that SweetHome shall not be responsible
          or liable, directly or indirectly, for any damage or loss caused or
          alleged to be caused by or in connection with use of or reliance on
          any such content, goods or services available on or through any such
          web sites or services.
        </p>
        <b>Changes</b>
        <p>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. If a revision is material we will try to
          provide at least 30 days' notice prior to any new terms taking effect.
          What constitutes a material change will be determined at our sole
          discretion.
        </p>
        <b>Contact Us</b>
        <p>If you have any questions about these Terms, please contact us.</p>
      </div>
    );
  }
}

export default TermsConditions;
