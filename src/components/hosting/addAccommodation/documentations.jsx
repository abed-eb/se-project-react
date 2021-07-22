import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Upload, Modal as antdModal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  getBase64,
  getItem,
  saveCredentials,
  showMemoryVariables,
} from "../../util";
import { toast } from "react-toastify";
import {
  API_BASE_URL,
  API_CHECK_DOC_URL,
  API_ADD_VILLA_URL,
  API_LOGIN_URL,
  API_SEARCH_USER_URL,
  API_UPLOAD_DOC_URL,
  API_UPLOAD_DOC_RESIDANCE_URL,
  API_UPLOAD_IMAGE_URL,
} from "../../constants";
import axios from "axios";

class Documentations extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    identityProvided: false,
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList1: [],
    fileList2: [],
  };

  getPhotoList = (input) => {
    let array = [];
    let temp = JSON.parse(sessionStorage.getItem(input));
    console.log(sessionStorage.getItem(input));
    for (let k = 0; k < temp.length; k++) {
      if (input === "add-villa-uploaded-doc-residence")
        array = [...array, temp[k].response.document_id];
      else array = [...array, temp[k].response.image_id];
    }
    return array;
  };

  async handleSubmit(event) {
    event.preventDefault();
    this.SaveFileListToSessionStorage();
    console.log("this is rules : " + sessionStorage.getItem("selected-rules"));
    let data = JSON.stringify({
      name: sessionStorage.getItem("add-villa-placeName"),
      type: sessionStorage.getItem("add-villa-selected-category-name"),
      description: sessionStorage.getItem("add-villa-description"),
      state: sessionStorage.getItem("add-villa-selected-state"),
      country: sessionStorage.getItem("add-villa-selected-country"),
      city: sessionStorage.getItem("add-villa-selected-city"),
      address: sessionStorage.getItem("add-villa-fullAddress"),
      postal_code: sessionStorage.getItem("add-villa-postalCode"),
      rule_id_list: JSON.parse(
        "[" + sessionStorage.getItem("selected-rules") + "]"
      ),
      latitude: parseFloat(sessionStorage.getItem("place-longitude")),
      longitude: parseFloat(sessionStorage.getItem("place-latitude")),
      number_of_bathrooms: parseInt(
        JSON.parse(sessionStorage.getItem("add-villa-amentities")).bathrooms
      ),
      number_of_single_beds: parseInt(
        JSON.parse(sessionStorage.getItem("add-villa-amentities")).singleBeds
      ),
      number_of_bedrooms: parseInt(
        JSON.parse(sessionStorage.getItem("add-villa-amentities")).bedrooms
      ),
      number_of_double_beds: parseInt(
        JSON.parse(sessionStorage.getItem("add-villa-amentities")).doubleBeds
      ),
      area: parseInt(sessionStorage.getItem("add-villa-area")),
      capacity: parseInt(
        JSON.parse(sessionStorage.getItem("add-villa-amentities"))
          .normalCapacity
      ),
      max_capacity: parseInt(
        JSON.parse(sessionStorage.getItem("add-villa-amentities"))
          .maximumCapacity
      ),
      price_per_night: parseInt(sessionStorage.getItem("add-villa-price")),
      number_of_showers: parseInt(
        JSON.parse(sessionStorage.getItem("add-villa-amentities")).showers
      ),
      image_id_list: this.getPhotoList("add-villa-uploaded-photos"),
      facilities_list: JSON.parse(
        sessionStorage.getItem("add-villa-selected-facilities-label")
      ),
      doc_id_list: this.getPhotoList("add-villa-uploaded-doc-residence"),
    });

    console.log("data sent:", data);

    let res = await axios
      .post(API_ADD_VILLA_URL, data, {
        headers: {
          Authorization: "Token ".concat(getItem("user-token")),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          console.log("added");
          toast.success("Your villa added");
          document.getElementById("go-to-hosting-page-from-add-villa").click();
          return true;
        } else {
          console.log("unknown status");
          toast.error("Something went wrong! Try again later.");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong! Try again later.");
      });

    if (res) {
      sessionStorage.removeItem("add-villa-selected-category");
      sessionStorage.removeItem("add-villa-placeName");
      sessionStorage.removeItem("add-villa-description");
      sessionStorage.removeItem("add-villa-area");
      sessionStorage.removeItem("add-villa-price");
      sessionStorage.removeItem("add-villa-amentities");
      sessionStorage.removeItem("add-villa-selected-country");
      sessionStorage.removeItem("add-villa-selected-state");
      sessionStorage.removeItem("add-villa-selected-city");
      sessionStorage.removeItem("add-villa-fullAddress");
      sessionStorage.removeItem("add-villa-selected-facilities-label");
      sessionStorage.removeItem("add-villa-selected-facilities-id");
      sessionStorage.removeItem("add-villa-uploaded-photos");
      sessionStorage.removeItem("add-villa-uploaded-doc-residence");
      sessionStorage.removeItem("add-villa-selected-category");
      sessionStorage.removeItem("add-villa-postalCode");
      sessionStorage.removeItem("add-villa-selected-stateCode");
      sessionStorage.removeItem("add-villa-selected-countryCode");
      sessionStorage.removeItem("place-latitude");
      sessionStorage.removeItem("place-longitude");
      sessionStorage.removeItem("selected-rules");
    }
  }

  async componentDidMount() {
    // if(sessionStorage.getItem('add-villa-uploaded-doc-residence') || sessionStorage.getItem('add-villa-uploaded-doc-person'))
    // {
    //    this.loadFileList()
    // }

    let config = {
      method: "get",
      url: API_CHECK_DOC_URL,
      headers: { Authorization: "Token ".concat(getItem("user-token")) },
    };

    console.log(config);

    let response = await axios(config)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return false;
      });
    this.setState({ identityProvided: response });
  }

  handlePreview = async (file) => {
    if (file.originFileObj) {
      try {
        let base46 = await getBase64(file.originFileObj);
        this.openBase64(base46);
      } catch (TypeError) {
        return toast.info(
          "We don't have access to this file on your machine,so it can not be previewed ,but it's uploaded to our server and you can continue on your operation without any problem. "
        );
      }
    }
  };

  handleChange1 = ({ fileList }) => this.setState({ fileList1: fileList });
  handleChange2 = ({ fileList }) => this.setState({ fileList2: fileList });

  openBase64 = (data) => {
    let image = new Image();
    image.src = data;
    let w = window.open("");
    w.document.write(image.outerHTML);
  };

  SaveFileListToSessionStorage = () => {
    sessionStorage.setItem(
      "add-villa-uploaded-doc-residence",
      JSON.stringify(this.state.fileList2)
    );
    console.log(sessionStorage.getItem("add-villa-uploaded-doc-residence"));
    sessionStorage.setItem('add-villa-uploaded-doc-person', JSON.stringify(this.state.fileList1));
  };

  // loadFileList=()=>{
  //     if(sessionStorage.getItem('add-villa-uploaded-doc-residence'))
  //         this.setState({fileList1:JSON.parse(sessionStorage.getItem('add-villa-uploaded-doc-residence'))})
  //     if(sessionStorage.getItem('add-villa-uploaded-doc-person'))
  //         this.setState({fileList2:JSON.parse(sessionStorage.getItem('add-villa-uploaded-doc-person'))})
  // }

  getNumOfUploaded = (number) => {
    let num = 0;
    if (number === 1) {
      for (let k = 0; k < this.state.fileList1.length; k++) {
        if (this.state.fileList1[k].status === "done") num++;
      }
      return num;
    } else {
      for (let k = 0; k < this.state.fileList2.length; k++) {
        if (this.state.fileList2[k].status === "done") num++;
      }
      return num;
    }
  };

  showSubmit = () => {
    if (this.state.identityProvided) {
      return this.getNumOfUploaded(2) > 0;
    } else {
      return this.getNumOfUploaded(1) > 0 && this.getNumOfUploaded(2) > 0;
    }
  };

  render() {
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <h4>Upload some documentations</h4>
        </Modal.Header>
        <Modal.Body>
          <div className={"d-flex row pl-4 pr-4"}>
            {this.state.identityProvided ? (
              ""
            ) : (
              <div className={"col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"}>
                <div
                  className={
                    "mt-2 mb-2 d-flex flex-column p-3 border-secondary rounded"
                  }
                  style={{ border: "2px dotted" }}
                >
                  <label>
                    Prove your identity by providing your id card, driving
                    licence or ...(upload at least one photo)
                  </label>
                  <Upload
                    headers={{
                      Authorization: "Token ".concat(getItem("user-token")),
                    }}
                    // headers={{'Authorization':'Token 78e997f0da492bbe5ee02f1650ada77c0c8c8fcd'}}
                    // method={'post'}
                    // accept={'image/*'}
                    action={API_BASE_URL + API_UPLOAD_DOC_URL}
                    listType="picture-card"
                    fileList={this.state.fileList1}
                    data-testid={"doc-upload-button-add-villa"}
                    // customRequest={(obj)=>this.rename(obj)}
                    // onSuccess={()=>console.log(this.state.fileList)}
                    onRemove={() => console.log(this.state.fileList)}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange1}
                  >
                    {this.getNumOfUploaded(1) >= 3 ? null : uploadButton}
                  </Upload>
                </div>
              </div>
            )}
            <div
              className={"col-12 col-sm-12 col-md-12 ".concat(
                this.state.identityProvided
                  ? "col-lg-12 col-xl-12"
                  : "col-lg-6 col-xl-6"
              )}
            >
              <div
                className={
                  "mt-2 mb-2 ml-auto d-flex flex-column p-3 border-secondary rounded"
                }
                style={{ border: "2px dotted" }}
              >
                <label>
                  Prove your ownership of accommodation by any means.(upload at
                  least one photo)
                </label>
                <Upload
                  headers={{
                    Authorization: "Token ".concat(getItem("user-token")),
                  }}
                  // headers={{'Authorization':'Token 78e997f0da492bbe5ee02f1650ada77c0c8c8fcd'}}
                  // method={'post'}
                  // accept={'image/*'}
                  action={API_BASE_URL + API_UPLOAD_DOC_RESIDANCE_URL}
                  listType="picture-card"
                  fileList={this.state.fileList2}
                  data-testid={"residence-doc-upload-button-add-villa"}
                  // customRequest={(obj)=>this.rename(obj)}
                  // onSuccess={()=>console.log(this.state.fileList)}
                  onRemove={() => console.log(this.state.fileList)}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange2}
                >
                  {this.getNumOfUploaded(2) >= 3 ? null : uploadButton}
                </Upload>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/hosting/addaccommodation/photos/"} className={"mr-auto"}>
            <button className={"btn btn-outline-secondary"}>Back</button>
          </Link>
          <Link to={""}>
            <button
              onClick={this.handleSubmit}
              disabled={!this.showSubmit()}
              className={"ml-auto btn btn-primary"}
            >
              Submit
            </button>
          </Link>
          <Link id={"go-to-hosting-page-from-add-villa"} to={"/hosting/"} />
          {/*<button onClick={()=>console.log('doc_id_list : ', this.state.fileList2)}>*/}
          {/*    fefe*/}
          {/*</button>*/}
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Documentations;
