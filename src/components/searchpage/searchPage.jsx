import React, { Component } from "react";
import Search from "../homepage/search";
import { CardGroup } from "react-bootstrap";
import { API_BASE_URL, API_SEARCH_VILLA } from "../constants";
import axios from "axios";
import VillaCard from "../villa/card/villaCard";
import Empty from "antd/es/empty/empty";
import {
  RContext,
  RControl,
  RFeature,
  RLayerVector,
  RMap,
  ROSM,
  RStyle,
} from "rlayers";
import { fromLonLat } from "ol/proj";
import "./searchPage.css";
import { Point } from "ol/geom";
import geo_fill from "../../assets/icon/geo_fill.png";
import geo_mt from "../../assets/icon/geo_mt.png";

let center = fromLonLat([-90.108862, 29.909324]);

let cards = [];

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.mapGoTo = this.mapGoTo.bind(this);
  }

  state = {
    mapActiveIndex: 0,
    country: null,
    state: null,
    city: null,
    startDate: null,
    endDate: null,
  };

  async componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const country = urlParams.get("country");
    const state = urlParams.get("state");
    const city = urlParams.get("city");
    const startDate = urlParams.get("start");
    const endDate = urlParams.get("end");
    this.setState({ country, state, city, startDate, endDate }, this.loadData);
  }

  async loadData() {
    let param = "?page=1&number_of_villa=100&country=" + this.state.country;
    if (this.state.state) param = param + "&state=" + this.state.state;
    if (this.state.city) param = param + "&city=" + this.state.city;
    if (this.state.startDate)
      param =
        param + "&start_date=" + this.state.startDate.replaceAll("/", "-");
    if (this.state.endDate)
      param = param + "&end_date=" + this.state.endDate.replaceAll("/", "-");
    console.log(param);
    let config = {
      method: "get",
      url: API_SEARCH_VILLA + param,
      headers: {
        // 'Authorization': 'Token '.concat(getItem('user-token')),
      },
    };
    cards = await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
        return [];
      });
    // cards = cardList
    console.log(cards);
    this.forceUpdate();
    if (cards.length) this.mapGoTo(cards[0].latitude, cards[0].longitude);
    // this.setState({cards:cardList})
    // console.log(this.state.country)
  }
  mapGoTo(x, y, index) {
    console.log(index);
    if (index !== null) this.setState({ mapActiveIndex: index });

    center = fromLonLat([x, y]);
    document.getElementById("map-go-to").click();
    // this.setState({})
  }

  search = (country, state, city, startDate, endDate) => {
    this.setState({ country, state, city, startDate, endDate }, this.loadData);
  };
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

  render() {
    return (
      <div style={{ marginTop: "10%" }}>
        <Search
          search={this.search}
          country={this.state.country}
          state={this.state.state}
          city={this.state.city}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
        <div className={"d-flex w-100 h-100 mt-4 row pl-5 pr-5"} style={{}}>
          <div className={"ml-auto mr-auto mb-5"}>
            <RMap
              width={"60vw"}
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
                {cards.map((card, index) => this.renderAMap(card, index))}
                {cards.map((card, index) => this.renderDMap(card, index))}
              </RLayerVector>
            </RMap>
          </div>
          <div className={"pr-5 pl-5 w-100"}>
            <CardGroup style={{ minWidth: "300px" }}>
              {cards.map((card, index) => (
                <div
                  className={
                    this.state.mapActiveIndex === index
                      ? "active-villa-card mr-4 ml-4 mb-4"
                      : "mb-4"
                  }
                >
                  <VillaCard
                    key={index}
                    index={index}
                    name={card.name}
                    id={card.villa_id}
                    mapGoTo={this.mapGoTo}
                    lan={card.latitude}
                    lon={card.longitude}
                    src={API_BASE_URL.substr(0, API_BASE_URL.length - 1).concat(
                      card.default_image_url
                    )}
                    addr={card.country + ", " + card.state + ", " + card.city}
                    cost={card.price_per_night}
                    rate={card.rate__avg}
                  />
                </div>
              ))}
            </CardGroup>
            <div
              className={"ml-auto mr-auto mb-5"}
              style={{ width: "fit-content" }}
            >
              {cards.length === 0 ? (
                <Empty description={"Nothing found!"} />
              ) : null}
            </div>
            <div
              className={"ml-auto mr-auto mb-5"}
              style={{ width: "fit-content" }}
            >
              {cards.length === 0 ? <text> Nothing found!</text> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
