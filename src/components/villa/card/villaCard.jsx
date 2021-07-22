import React, { Component } from "react";
import { Card, Carousel, Descriptions, Rate } from "antd";
import "./villacard.css";
import { Link } from "react-router-dom";

const { Meta } = Card;

class VillaCard extends Component {
  constructor(props) {
    super(props);
    this.showOnMap = this.showOnMap.bind(this);
  }

  state = {
    loading: false,
  };

  componentDidMount() {
    console.log("src", this.props.src);
  }

  showOnMap(e) {
    e.stopPropagation();
    this.props.mapGoTo(this.props.lan, this.props.lon, this.props.index);
  }

  render() {
    return (
      <div className={'m-1'}
        onClick={() =>
          document
            .getElementById("go-to-villa-id-".concat(this.props.id))
            .click()
        }
      >
        <Link
          id={"go-to-villa-id-".concat(this.props.id)}
          to={"/villa/villaProfile/?id=".concat(this.props.id)}
        />
        <Card
          loading={false}
          hoverable
          style={{ width: 320, height: "100%" }}
          cover={
            <div>
              <div className={'d-flex flex-row pr-2 pl-2 rounded'}
                   style={{ width: "fit-content", height: "fit-content",position:'absolute',backgroundColor:'white',right:0,bottom:0 }}>
                <Rate disabled defaultValue={1} count={1} /> <div className={'ml-2 mt-2'}>{this.props.rate?this.props.rate:"Not rated"}{" "}</div>
              </div>
              <img
                style={{ width: "320px", height: "200px", objectFit: "cover" }}
                alt="example"
                src={this.props.src}
              />
            </div>
          }
        >
          <Meta
          // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          // title={this.props.name}
          // description="This is the description"
          />
          <div className={"w-100 d-flex"}>
            {" "}
            {this.props.mapGoTo ? (
              <button
                onClick={(event) => this.showOnMap(event)}
                className={"btn btn-sm ml-auto btn-outline-primary"}
              >
                Map
              </button>
            ) : null}
          </div>
          <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
            <Descriptions.Item>{this.props.name}</Descriptions.Item>
            <Descriptions.Item>{this.props.addr}</Descriptions.Item>
            <Descriptions.Item>
              {this.props.cost} <small>/ dollar per night</small>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    );
  }
}

export default VillaCard;
