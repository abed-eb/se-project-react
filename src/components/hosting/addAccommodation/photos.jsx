import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Upload, Modal as antdModal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64, getItem } from "../../util";
import { API_BASE_URL, API_UPLOAD_IMAGE_URL } from "../../constants";
import { toast } from "react-toastify";

class Photos extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.openBase64 = this.openBase64.bind(this);
    this.saveFileListToSessionStorage =
      this.saveFileListToSessionStorage.bind(this);
    this.loadFileList = this.loadFileList.bind(this);
    this.getNumOfUploaded = this.getNumOfUploaded.bind(this);
  }

  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  componentDidMount() {
    if (sessionStorage.getItem("add-villa-uploaded-photos")) {
      this.loadFileList();
    }
  }

  async handlePreview(file) {
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
  }

  handleChange({ fileList }) {
    this.setState({ fileList });
  }

  openBase64(data) {
    let image = new Image();
    image.src = data;

    let w = window.open("");
    w.document.write(image.outerHTML);
  }

  saveFileListToSessionStorage() {
    sessionStorage.setItem(
      "add-villa-uploaded-photos",
      JSON.stringify(this.state.fileList)
    );
  }

  loadFileList() {
    this.setState({
      fileList: JSON.parse(sessionStorage.getItem("add-villa-uploaded-photos")),
    });
    console.log(
      JSON.parse(sessionStorage.getItem("add-villa-uploaded-photos"))
    );
  }

  getNumOfUploaded() {
    let num = 0;
    for (let k = 0; k < this.state.fileList.length; k++) {
      if (this.state.fileList[k].status === "done") num++;
    }
    // this.forceUpdate()
    return num;
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <React.Fragment>
        <Modal.Header closeButton={true}>
          <h4>
            Upload at least 4 photo of accommodation.(
            {4 - this.getNumOfUploaded() > -1
              ? 4 - this.getNumOfUploaded()
              : "0"}{" "}
            photos left)
            {/*{this.getNumOfUploaded()<3?'('.concat((3-this.getNumOfUploaded()))+' photos left)':null}*/}
          </h4>
        </Modal.Header>
        <Modal.Body>
          <Upload
            headers={{ Authorization: "Token ".concat(getItem("user-token")) }}
            // headers={{'Authorization':'Token 78e997f0da492bbe5ee02f1650ada77c0c8c8fcd'}}
            // method={'post'}
            accept={"image/*"}
            action={API_BASE_URL + API_UPLOAD_IMAGE_URL}
            listType="picture-card"
            fileList={fileList}
            data-testid={"image-upload-button-add-villa"}
            // customRequest={(obj)=>this.rename(obj)}
            // onSuccess={()=>console.log(this.state.fileList)}
            onRemove={() => console.log(this.state.fileList)}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {this.getNumOfUploaded() >= 8 ? null : uploadButton}
          </Upload>
        </Modal.Body>
        <Modal.Footer>
          <Link
            to={"/hosting/addaccommodation/location/"}
            className={"mr-auto"}
          >
            <button className={"btn btn-outline-secondary"}>Back</button>
          </Link>
          <Link to={"/hosting/addaccommodation/documentations/"}>
            <button
              onClick={this.saveFileListToSessionStorage}
              disabled={this.getNumOfUploaded() < 4}
              className={"ml-auto btn btn-outline-primary"}
            >
              Next
            </button>
          </Link>
        </Modal.Footer>
      </React.Fragment>
    );
  }
}

export default Photos;
