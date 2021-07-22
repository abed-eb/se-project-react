//@Sajad
import React, { Component } from "react";
import beach_icon from "../../../assets/img/beach.png";
import urban_icon from "../../../assets/img/urban.png";
import wild_icon from "../../../assets/img/wild.png";
import mountainous_icon from "../../../assets/img/mountainous.png";
import rural_icon from "../../../assets/img/rural.png";
import suburban_icon from "../../../assets/img/suburban.png";
import motel_icon from "../../../assets/img/motel.png";
import desert_icon from "../../../assets/img/desert.png";
import "./categories.css";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  state = {
    categories: [
      { src: beach_icon, id: 1, label: "Coastal" },
      { src: urban_icon, id: 2, label: "Urban" },
      { src: wild_icon, id: 3, label: "Wild" },
      { src: mountainous_icon, id: 4, label: "Mountainous" },
      { src: rural_icon, id: 5, label: "Rural" },
      { src: suburban_icon, id: 6, label: "Suburban" },
      { src: motel_icon, id: 7, label: "Motel" },
      { src: desert_icon, id: 8, label: "Desert" },
    ],
    selectedItem: null,
  };

  componentDidMount() {
    if (sessionStorage.getItem("add-villa-selected-category")) {
      this.setState({
        selectedItem: parseInt(
          sessionStorage.getItem("add-villa-selected-category")
        ),
      });
    }
  }

  save() {
    sessionStorage.setItem(
      "add-villa-selected-category",
      this.state.selectedItem
    );
    for (let k = 0; k < this.state.categories.length; k++) {
      if (this.state.categories[k].id === this.state.selectedItem) {
        sessionStorage.setItem(
          "add-villa-selected-category-name",
          this.state.categories[k].label
        );
        console.log(sessionStorage.getItem("add-villa-selected-category-name"));
        break;
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <h4>What area is your residence located in?</h4>
        </Modal.Header>
        <Modal.Body>
          <div className={"row mt-2 mr-2 ml-2"} id={"categories"}>
            {this.state.categories.map((category) => (
              <div
                key={category.id}
                className={"col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4 "}
                onClick={() => this.setState({ selectedItem: category.id })}
              >
                <div className={"fade-in-overlay"}>
                  <img
                    className={"w-100 image"}
                    src={category.src}
                    key={category.id}
                  />
                  <div
                    data-testid={"category-select-test-".concat(category.id)}
                    className={"overlay".concat(
                      category.id === this.state.selectedItem
                        ? " selected border-success"
                        : ""
                    )}
                  >
                    {category.id === this.state.selectedItem ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="green"
                        className=" mt-2 ml-2 bi bi-check-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                      </svg>
                    ) : (
                      ""
                    )}
                    <div className="text">{category.label}</div>
                  </div>
                </div>
                <div className={"w-100 d-flex mt-1"}>
                  <label className="ml-auto mr-auto">{category.label}</label>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/hosting/addaccommodation/details/"}>
            <button
              className={"ml-auto btn btn-outline-primary"}
              onClick={this.save}
              disabled={!this.state.selectedItem}
            >
              Next
            </button>
          </Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Categories;
