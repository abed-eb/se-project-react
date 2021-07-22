import React, { Component } from "react";
import "./slideShow.css";
import "react-slideshow-image/dist/styles.css";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { Modal, ModalFooter, ModalHeader } from "react-bootstrap";
import sampleImage1 from "../../img/1.jpg";
import sampleImage2 from "../../img/2.jpg";
import sampleImage3 from "../../img/3.jpg";
import sampleImage4 from "../../img/4.jpg";
import { STORAGE_KEY } from "../../../constants";
import { getViewport } from "../../../util";
import { API_BASE_URL } from "../../../constants";
import { Carousel } from "react-bootstrap";

class SlideShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.show,
      size: "",
      images: this.props.images,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      this.setState({ show: this.props.show, images: this.props.images });
    }
  }

  componentDidMount() {
    console.log("hi");
    document.addEventListener(STORAGE_KEY + "screen-size-changed", (event) =>
      this.setState({ size: event.detail })
    );
  }

  render() {
    return (
      <div id="slideShow">
        <Modal
          ClassName="slideShowModal-custom-css"
          id="slideShow-Modal"
          centered
          size={"lg"}
          animation
          show={this.state.show}
          onHide={this.props.exit}
        >
          <div>
            <Modal.Header closeButton={true}>
              <div>
                <h4>Photo Gallery</h4>
              </div>
            </Modal.Header>
            <Modal.Body id="slideShow-modal-body">
              <div className="slideShow d-flex justify-content-center align-self-center">
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        API_BASE_URL.substring(0, API_BASE_URL.length - 1) +
                        this.state.images[0]
                      }
                      alt="First slide"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        API_BASE_URL.substring(0, API_BASE_URL.length - 1) +
                        this.state.images[1]
                      }
                      alt="First slide"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        API_BASE_URL.substring(0, API_BASE_URL.length - 1) +
                        this.state.images[2]
                      }
                      alt="First slide"
                    />
                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={
                        API_BASE_URL.substring(0, API_BASE_URL.length - 1) +
                        this.state.images[3]
                      }
                      alt="Second slide"
                    />

                    <Carousel.Caption></Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Modal.Body>
          </div>
          {/* <ModalFooter>
                        <button onClick={this.props.exit} className="btn btn-primary">Close</button>
                    </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default SlideShow;
