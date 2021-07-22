import React, { Component } from "react";
import {
  Modal,
  Button,
  Select,
  Tooltip,
  Drawer,
  DatePicker,
  Space,
} from "antd";
import "./search.css";
import { SearchOutlined } from "@ant-design/icons";
import csc from "country-state-city";
import { Link } from "react-router-dom";
import moment from "moment";

const { Option } = Select;
const dateFormat = "YYYY/MM/DD";
const { size } = 20;
const now = new Date();

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.handleStateSelect = this.handleStateSelect.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
    this.search = this.search.bind(this);
    this.loadOptions1 = this.loadOptions1.bind(this);
    this.loadOptions2 = this.loadOptions2.bind(this);
    this.loadOptions3 = this.loadOptions3.bind(this);
  }

  state = {
    showDatePicker: false,
    startDate: null,
    endDate: null,
    currentDate: null,
    size: null,
    searchPage: false,
    countries: csc.getAllCountries(),
    sCountry: null,
    sCountryCode: null,
    states: [],
    sState: null,
    sStateCode: null,
    cities: [],
    sCity: null,
    sCityCode: null,
  };

  componentDidMount() {
    this.loadOptions1();
    if (this.props.startDate !== this.state.startDate)
      this.setState({ startDate: this.props.startDate });
    if (this.props.endDate !== this.state.endDate)
      this.setState({ endDate: this.props.endDate });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) this.loadOptions1();
    if (
      prevState.states !== this.state.states ||
      prevState.sCountryCode !== this.state.sCountryCode
    )
      this.loadOptions2();
    if (prevState.cities !== this.state.cities) this.loadOptions3();
    if (this.props.startDate !== prevProps.startDate)
      this.setState({ startDate: this.props.startDate });
    if (this.props.endDate !== prevProps.endDate)
      this.setState({ endDate: this.props.endDate });
  }

  loadOptions1() {
    if (this.props.country) this.handleCountrySelect(this.props.country);
    this.setState({ searchPage: this.props.country, newLoad: true });
  }

  loadOptions2() {
    if (this.props.state && this.state.newLoad)
      this.handleStateSelect(this.props.state);
  }

  loadOptions3() {
    if (this.props.city && this.state.newLoad)
      this.handleCitySelect(this.props.city);
    this.setState({ newLoad: false });
  }

  handleCountrySelect(value) {
    let sCountryCode = null;
    for (let k = 0; k < this.state.countries.length; k++) {
      if (this.state.countries[k].name === value) {
        sCountryCode = this.state.countries[k].isoCode;
        break;
      }
    }
    let states = csc.getStatesOfCountry(sCountryCode);
    if (states.length === 0) {
      this.setState({
        sCountry: value,
        sCountryCode: sCountryCode,
        sStatesCode: null,
        sCity: null,
        sCityCode: null,
        states: [],
        sState: null,
        cities: csc.getCitiesOfCountry(sCountryCode),
      });
    } else
      this.setState({
        sCountry: value,
        sCountryCode: sCountryCode,
        sState: null,
        sStateCode: null,
        sCity: null,
        sCityCode: null,
        cities: [],
        states: states,
      });
  }

  handleStateSelect(value) {
    let sStateCode = null;
    for (let k = 0; k < this.state.states.length; k++) {
      if (this.state.states[k].name === value) {
        sStateCode = this.state.states[k].isoCode;
        break;
      }
    }
    this.setState({
      sState: value,
      sStateCode: sStateCode,
      sCity: null,
      sCityCode: null,
      cities: csc.getCitiesOfState(this.state.sCountryCode, sStateCode),
    });
  }

  handleCitySelect(value) {
    let sCityCode = null;
    for (let k = 0; k < this.state.cities.length; k++) {
      if (this.state.cities[k].name === value) {
        sCityCode = this.state.cities[k].isoCode;
        break;
      }
    }
    this.setState({ sCity: value, sCityCode: sCityCode });
  }

  showDrawer = () => {
    if (this.state.sCountry)
      this.setState({
        showDatePicker: true,
      });
  };

  onClose = () => {
    this.setState({
      showDatePicker: false,
    });
  };

  onStartDateChange = (date, date2) => {
    console.log(date, "+", date2);
    this.setState({ startDate: date2 === "" ? null : date2 });
    this.forceUpdate();
  };

  onEndDateChange = (date, date2) => {
    console.log(date, "+", date2);
    this.setState({ endDate: date2 === "" ? null : date2 });
  };

  disabledDate = (current, start) => {
    // Can not select days before today and today
    if (start) {
      if (this.state.endDate) {
        return (
          current > moment(this.state.endDate).endOf("day") ||
          current < moment().endOf("day")
        );
      } else {
        return current && current < moment().endOf("day");
      }
    } else {
      if (this.state.startDate) {
        return current && current < moment(this.state.startDate).endOf("day");
      } else {
        return current && current < moment().endOf("day");
      }
    }
  };

  search() {
    // if (this.state.sCountry)
    if (this.props.search)
      this.props.search(
        this.state.sCountry,
        this.state.sState,
        this.state.sCity,
        this.state.startDate,
        this.state.endDate
      );
    else {
      this.setState({ showDatePicker: false });
      document.getElementById("search-button").click();
    }
  }

  render() {
    let drawerContent = (
      <div className={"w-100 d-flex"}>
        <div className={"w-100 row"}>
          {/*<Space className="w-100"  direction="horizontal" size={12} >*/}
          {/*<DatePicker onChange={onChange} />*/}
          <div className={"pl-4 w-50 d-flex flex-row pr-3"}>
            <p
              className={""}
              style={{ fontFamily: "cursive", width: "fit-content" }}
            >
              Arrival:
            </p>
            <DatePicker
              className={""}
              value={
                this.state.startDate
                  ? moment(
                      this.state.startDate.replaceAll("/", "-"),
                      dateFormat
                    )
                  : null
              }
              bordered={false}
              disabledDate={(current) => this.disabledDate(current, true)}
              format={dateFormat}
              onChange={this.onStartDateChange}
            />
          </div>
          <div className={"w-50 d-flex flex-row pl-3 pr-2"}>
            <p
              className={""}
              style={{ fontFamily: "cursive", width: "fit-content" }}
            >
              Departure:
            </p>
            <DatePicker
              className={""}
              value={
                this.state.endDate
                  ? moment(this.state.endDate.replaceAll("/", "-"), dateFormat)
                  : null
              }
              bordered={false}
              disabledDate={(current) => this.disabledDate(current, false)}
              format={dateFormat}
              onChange={this.onEndDateChange}
            />
          </div>

          {/*</Space>*/}
        </div>
        <Tooltip className={"flex-shrink-1 m-2 mt-auto mb-auto"} title="search">
          <Button onClick={this.search} type="primary" shape="circle">
            <SearchOutlined style={{ verticalAlign: "0" }} />
          </Button>
        </Tooltip>
      </div>
    );
    return (
      <div
        className={"mt-auto mb-auto ml-auto mr-auto"}
        style={{ width: "fit-content" }}
      >
        <div
          className={"pr-5 pl-4 pt-4 pb-4"}
          style={{
            backgroundColor: "#ffffff70",
            borderRadius: "1rem",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <h4 style={{ fontFamily: "cursive", width: "fit-content" }}>
            {this.state.searchPage
              ? "Showing search results for:"
              : "Tell us where:"}
          </h4>
          <div className={"row"}>
            <Select
              size={"large"}
              value={this.state.sCountry}
              autoFocus
              className={"placeholder-visible mr-auto ml-auto"}
              showSearch
              bordered={false}
              placeholder={"Country"}
              style={{ width: 200 }}
              notFoundContent={null}
              onChange={this.handleCountrySelect}
            >
              {this.state.countries.map((country) => (
                <Option key={country.name}>{country.name}</Option>
              ))}
            </Select>
            <Select
              size={"large"}
              value={this.state.sState}
              disabled={this.state.states.length === 0}
              notFoundContent={null}
              className={"placeholder-visible mr-auto ml-auto"}
              showSearch
              bordered={false}
              style={{ width: 200 }}
              placeholder={"State"}
              onChange={this.handleStateSelect}
            >
              {this.state.states.map((state) => (
                <Option key={state.name}>{state.name}</Option>
              ))}
            </Select>
            <div
              className={"d-flex flex-row mr-auto ml-auto"}
              style={{ width: 232, left: "16px", position: "relative" }}
            >
              <Select
                size={"large"}
                disabled={this.state.cities.length === 0}
                value={this.state.sCity}
                notFoundContent={null}
                className={"placeholder-visible"}
                showSearch
                bordered={false}
                style={{ width: 200 }}
                placeholder={"City"}
                onChange={this.handleCitySelect}
              >
                {this.state.cities.map((city) => (
                  <Option key={city.name}>{city.name}</Option>
                ))}
              </Select>
              {this.props.search ? (
                ""
              ) : (
                <Tooltip title="search">
                  <Button
                    onClick={this.showDrawer}
                    style={
                      this.state.sCountry ? null : { cursor: "not-allowed" }
                    }
                    type="primary"
                    shape="circle"
                  >
                    <SearchOutlined style={{ verticalAlign: "0" }} />
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
          {this.props.search ? (
            <div className={"mt-4"}>{drawerContent}</div>
          ) : (
            <Drawer
              // title="Basic Drawer"
              placement="right"
              width={"90%"}
              closable={true}
              onClose={this.onClose}
              visible={this.state.showDatePicker}
              getContainer={false}
              style={{ position: "absolute", overflow: "hidden" }}
            >
              <h4 className={'pt-3 pl-3'} style={{ fontFamily: "cursive", width: "fit-content" }}>
                Almost there!
              </h4>
              {drawerContent}
            </Drawer>
          )}
        </div>
        <Link
          id={"search-button"}
          to={
            "/search/?" +
            (this.state.sCountry ? "country=" + this.state.sCountry : "") +
            (this.state.sState ? "&state=" + this.state.sState : "") +
            (this.state.sCity ? "&city=" + this.state.sCity : "") +
            (this.state.startDate ? "&start=" + this.state.startDate : "") +
            (this.state.endDate ? "&end=" + this.state.endDate : "")
          }
        />
      </div>
    );
  }
}

export default Search;
