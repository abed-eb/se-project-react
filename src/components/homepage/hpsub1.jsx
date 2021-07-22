import React, { Component } from "react";
import {
  RContext,
  RControl,
  RFeature,
  RLayerVector,
  RMap,
  ROSM,
  RStyle,
} from "rlayers";
import { Carousel } from "react-bootstrap";
import VillaCard from "../villa/card/villaCard";
import { API_BASE_URL, API_SEARCH_VILLA } from "../constants";
import { fromLonLat, toLonLat } from "ol/proj";
import { Point } from "ol/geom";
import geo_fill from "../../assets/icon/geo_fill.png";
import geo_mt from "../../assets/icon/geo_mt.png";
import { cosh } from "ol/math";
import axios from "axios";
import csc from "country-state-city";
import { Empty, Spin } from "antd";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const GeoCodio = require("geocodio-library-node");
const geocoder = new GeoCodio("c616c01cb1104fe0d88ae0b003a06fb0dfdae80");
let center = fromLonLat([-90.108862, 29.909324]);
const states = csc.getAllStates();
let cards0 = [];
// [
//     {
//         id:0,
//         name:'City center apartment with 3 rooms',
//         addr:"Iran ,Tehran ,Shar-rey",
//         cost:10000,
//         rate:'4.3 (35 reviews)',
//         x:2.300,
//         y:48.8737,
//     },
//     {
//         id:1,
//         name:'City center apartment with 3 rooms',
//         addr:"Iran ,Tehran ,Shar-rey",
//         cost:10000,
//         rate:'4.3 (35 reviews)',
//         x:2.295,
//         y:48.8237,
//     },
//     {
//         id:2,
//         name:'City center apartment with 3 rooms',
//         addr:"Iran ,Tehran ,Shar-rey",
//         cost:10000,
//         rate:'4.3 (35 reviews)',
//         x:2.31,
//         y:48.8237,
//     },
//     {
//         id:3,
//         name:'City center apartment with 3 rooms',
//         addr:"Iran ,Tehran ,Shar-rey",
//         cost:10000,
//         rate:'4.3 (35 reviews)',
//         x:2.315,
//         y:48.8437,
//     },
//     {
//         id:4,
//         name:'City center apartment with 3 rooms',
//         addr:"Iran ,Tehran ,Shar-rey",
//         cost:10000,
//         rate:'4.3 (35 reviews)',
//         x:2.285,
//         y:48.8537,
//     },
// ]

class HPSub1 extends Component {
  constructor(props) {
    super(props);
    this.onMapCarouselChange = this.onMapCarouselChange.bind(this);
    this.mapGoTo = this.mapGoTo.bind(this);
    this.setCenterOnMove = this.setCenterOnMove.bind(this);
    this.loadCards = this.loadCards.bind(this);
    this.handleStateSelect = this.handleStateSelect.bind(this);
    this.mapMarkOnClick = this.mapMarkOnClick.bind(this);
  }

  state = {
    mapActiveIndex: 0,
    loading: false,
    state: "Louisiana",
  };

  componentDidMount() {
    this.loadCards();
  }

  async loadCards() {
    let param = "?page=1&number_of_villa=1000&state=" + this.state.state;
    let config = {
      method: "get",
      url: API_SEARCH_VILLA + param,
      headers: {
        // 'Authorization': 'Token '.concat(getItem('user-token')),
      },
    };
    console.log(config);
    cards0 = await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
    // this.setState({cards:cardList})
    console.log(cards0);
    this.forceUpdate();
  }

  renderAMap = (card, id) => {
    let fill = this.state.mapActiveIndex === id;
    if (fill) {
      // console.log(this.state.center)
      // if (this.state.center[0] !==card.x && this.state.center[1] !== card.y)
      // this.state.center = fromLonLat([card.x, card.y])
      // this.forceUpdate()

      return (
        <RFeature
          geometry={new Point(fromLonLat([card.latitude, card.longitude]))}
          onClick={(e) =>
            e.map.getView().fit(e.target.getGeometry().getExtent(), {
              duration: 250,
              maxZoom: 12,
            })
          }
        >
          <RStyle.RStyle>
            <RStyle.RIcon src={geo_fill} />
          </RStyle.RStyle>
        </RFeature>
      );
    } else return "";
  };

  mapMarkOnClick(e, id) {
    e.map.getView().fit(e.target.getGeometry().getExtent(), {
      duration: 250,
      maxZoom: 11,
    });
    this.setState({ mapActiveIndex: id });
  }

  renderDMap = (card, id) => {
    // console.log(card.id+'-map-pin')
    let fill = this.state.mapActiveIndex === id;
    if (fill) return "";
    else
      return (
        <RFeature
          geometry={new Point(fromLonLat([card.latitude, card.longitude]))}
          onClick={(e) => this.mapMarkOnClick(e, id)}
        >
          <RStyle.RStyle>
            <RStyle.RIcon src={geo_mt} color={"#364d79"} />
          </RStyle.RStyle>
        </RFeature>
      );
  };

  getMapCenter = () => {
    let center = null;
    for (let z = 0; z < cards0.length; z++) {
      if (cards0[z].id === this.state.mapActiveIndex) {
        center = fromLonLat([cards0[z].x, cards0[z].y]);
        break;
      }
    }
    return center;
  };

  onMapCarouselChange(selectedIndex, e) {
    this.setState({ mapActiveIndex: selectedIndex });
  }

  mapGoTo(x, y) {
    center = fromLonLat([x, y]);
    document.getElementById("map-go-to").click();
    // this.setState({})
  }

  async setCenterOnMove(e, conf) {
    let newCenter = toLonLat(e.map.getView().getCenter());
    console.log(newCenter);

    var config = {
      method: "get",
      url:
        "https://api.geocod.io/v1.6/reverse?q=" +
        newCenter[1] +
        "," +
        newCenter[0] +
        "&api_key=c616c01cb1104fe0d88ae0b003a06fb0dfdae80",
      headers: {},
    };
    let code = await axios(config)
      .then(function (response) {
        console.log(response.data.results[0].address_components);
        if (
          response.data.results &&
          response.data.results[0] &&
          response.data.results[0].address_components &&
          response.data.results[0].address_components.state &&
          response.data.results[0].address_components.country
        )
          return {
            stateCode: response.data.results[0].address_components.state,
            countryCode: response.data.results[0].address_components.country,
          };
        return null;
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });

    if (code) {
      let states = csc.getStatesOfCountry(code.countryCode);
      for (let z = 0; z < states.length; z++)
        if (states[z].isoCode === code.stateCode) {
          if (this.state.state !== states[z].name)
            this.setState(
              { state: states[z].name, loading: true, mapActiveIndex: 0 },
              this.loadCards
            );
        }
    }

    this.setState({ loading: false });
    // console.log(state)

    // geocoder.reverse()
    //     .then(response => console.log(response))
    //     .catch(err => console.log(err));
    //
    // this.setState({center},()=>console.log(this.state.center))
  }

  handleStateSelect(value) {
    for (let k = 0; k < states.length; k++) {
      if (value.toString().startsWith(states[k].name)) {
        console.log("========>", states[k].name);
        this.setState({ state: states[k].name }, this.loadCards);
        this.mapGoTo(states[k].longitude, states[k].latitude);
        console.log(states[k].longitude, states[k].latitude);
        // center = fromLonLat(,states[k].longitude)
        break;
      }
    }
  }

  render() {
    return (
      <div className={"row w-100 mt-auto mb-auto"}>
        <div className={" col-lg-12 col-xl-12 col-md-12 col-sm-12 col-12"}>
          <h4 className={"ml-5 mb-3 mt-5"} style={{ fontFamily: "cursive" }}>
            Or You may use a map:
          </h4>
        </div>
        <div className={"col-lg-8 col-xl-8 col-md-6 col-sm-12 col-12"}>
          {/*<div className={'mr-5 ml-5'}>*/}
          {/*https://www.npmjs.com/package/rlayers*/}
          <div className={"pl-5 mt-4"}>
            <div style={{ border: "2px solid #8f8ff8" }}>
              {/*{this.state.center?*/}
              <RMap
                width={"100%"}
                height={"50vh"}
                initial={{ center: center, zoom: 11 }}
                onMoveEnd={this.setCenterOnMove}
                maxZoom={11}
              >
                <ROSM />
                <RControl.RCustom>
                  <RContext.Consumer>
                    {({ map }) => (
                      <button
                        id={"map-go-to"}
                        className={"display-none"}
                        onClick={() => map.getView().setCenter(center)}
                      >
                        hidden
                      </button>
                    )}
                  </RContext.Consumer>
                </RControl.RCustom>
                <RLayerVector zIndex={10}>
                  {cards0.map((card, index) => this.renderAMap(card, index))}
                  {cards0.map((card, index) => this.renderDMap(card, index))}
                </RLayerVector>
              </RMap>
              {/*<button onClick={()=>this.mapGoTo(cards0[0].x,cards0[0].y)}>change</button>*/}
            </div>
          </div>

          {/*</div>*/}
        </div>
        <div className={"col-md-5 col-lg-4 col-xl-4 col-sm-12 col-12"}>
          <div
            style={{ width: "320px" }}
            className={"h-100 ml-auto mr-auto d-flex flex-column mt-3"}
          >
            <Select
              size={"large"}
              value={this.state.state}
              notFoundContent={null}
              className={"placeholder-visible ml-auto mr-auto mb-3"}
              showSearch
              bordered={false}
              style={{ width: 200, backgroundColor: "#e2e2e2" }}
              placeholder={"City"}
              onChange={this.handleStateSelect}
            >
              {csc.getAllStates().map((state) => (
                <Option key={state.name + " " + state.isoCode}>
                  {state.name}
                </Option>
              ))}
            </Select>
            {this.state.loading ? (
              <Spin
                className={"mt-auto mb-auto ml-auto mr-auto"}
                tip="Loading..."
                size="large"
              />
            ) : cards0.length > 0 ? (
              <Carousel
                className={
                  "map-side-Carousel d-flex mt-auto mb-auto ml-auto mr-auto"
                }
                activeIndex={this.state.mapActiveIndex}
                onSelect={this.onMapCarouselChange}
                interval={2000}
                // onSlide={()=>this.forceUpdate()}
              >
                {cards0.map((card) => (
                  <Carousel.Item key={card.id}>
                    <div
                      style={{ background: "#364d79", borderRadius: "0.5rem" }}
                      className={"pb-5"}
                    >
                      <VillaCard
                        name={card.name}
                        id={card.villa_id}
                        src={API_BASE_URL.substr(
                          0,
                          API_BASE_URL.length - 1
                        ).concat(card.default_image_url)}
                        addr={
                          card.country + ", " + card.state + ", " + card.city
                        }
                        cost={card.price_per_night}
                        rate={card.rate__avg}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Empty className={"mt-auto mb-auto ml-auto mr-auto"} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HPSub1;
