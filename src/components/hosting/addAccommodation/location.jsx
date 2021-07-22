import React, { Component } from "react";
import "./location.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fromLonLat, toLonLat } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import { Point } from "ol/geom";
import "ol/ol.css";
import { RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle } from "rlayers";
import locationIcon from "../../../assets/location.png";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 0,
      charsPerPage: 1,
      invalidPlaceName: false,
      invalidDescription: false,
      invalidPrice: false,
      origin: [2.364, 48.82],
      location: sessionStorage.getItem("place-latitude")
        ? [
            parseFloat(sessionStorage.getItem("place-longitude")),
            parseFloat(sessionStorage.getItem("place-latitude")),
          ]
        : [2.364, 48.82],
    };
  }

  // handleLocDragStart = (e) =>{
  //    let newLoc = e.map.getCoordinateFromPixel(e.pixel);
  //     e.target.setGeometry(new Point(newLoc));
  //     e.preventDefault();
  // }

  // handleLocDragEnd = (e) =>{
  //     let loc = e.map.getCoordinateFromPixel(e.pixel)
  //     setLoc(toLonLat(loc))
  //     e.preventDefault();
  // }

  // handlePointerEnter = (e) =>{
  //     e.map.getTargetElement().style.cursor = "move") && undefined
  // }

  // handlePointerLeft = (e) =>{

  // }

  // componentDidMount = () =>{
  //     if (sessionStorage.getItem("place-latitude")){
  //         this.setState({
  //             location: [parseFloat(sessionStorage.getItem("place-latitude")), parseFloat(sessionStorage.getItem("place-longitude"))]
  //         })
  //     }
  // }

  handleSubmit = () => {
    console.log("location : ", this.state.loc);
    sessionStorage.setItem("place-latitude", this.state.location[1]);
    sessionStorage.setItem("place-longitude", this.state.location[0]);
    document.getElementById("goToPhotos").click();
  };
  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <h4>Locate your villa</h4>
        </Modal.Header>
        <Modal.Body>
          <div className={"mr-5 ml-5 villaProfile-map"}>
            <RMap
              width={"100%"}
              height={"60vh"}
              initial={{ center: fromLonLat(this.state.location), zoom: 9 }}
            >
              <ROSM />
              <RLayerVector>
                <RFeature
                  geometry={new Point(fromLonLat(this.state.location))}
                  // useCallback is here for performance reasons
                  // without it RFeature will have its props updated at every call
                  onPointerDrag={(e) => {
                    const coords = e.map.getCoordinateFromPixel(e.pixel);
                    e.target.setGeometry(new Point(coords));
                    // this stops OpenLayers from interpreting the event to pan the map
                    e.preventDefault();
                  }}
                  onPointerDragEnd={(e) => {
                    const coords = e.map.getCoordinateFromPixel(e.pixel);
                    this.setState({ location: toLonLat(coords) });
                  }}
                  onPointerEnter={(e) =>
                    (e.map.getTargetElement().style.cursor = "move") &&
                    undefined
                  }
                  onPointerLeave={(e) =>
                    (e.map.getTargetElement().style.cursor = "initial") &&
                    undefined
                  }
                >
                  <RStyle.RStyle>
                    <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                  </RStyle.RStyle>
                  <ROverlay className="location-move-me">Move me</ROverlay>
                </RFeature>
              </RLayerVector>
            </RMap>
            {/* <div className="mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow">
                                <p>
                                Pin location is{" "}
                                <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
                                </p>
                            </div> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/hosting/addaccommodation/address/"}>
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
            className="display-none"
            to={"/hosting/addaccommodation/photos/"}
          ></Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Location;
