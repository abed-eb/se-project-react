import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./settings.css";
import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoMenuSharp } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa";
import PersonalInfo from "./account-setting/personal-info";
import PaymentsPayouts from "./account-setting/payments-payouts";
import Notfications from "./account-setting/notifications";
import Temp from "../temp";
import Terms from "./termsAndConditions/term&conditions";
import Help from "./helpAndaskedQuestions/help";
import Footer from "../homepage/footer";
import NavBar from "../homepage/navbar/navbar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from "react-router-dom";
import Homepage from "../homepage/homepage";

// function setLocation() {
//     const location = useLocation();
//     console.log(location.pathname);
//     return location.pathname;
//   }

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePersonalInfo: true,
      activePay: false,
      activeNotif: false,
      activeAskedQ: false,
      activeHelp: false,
      activeTerms: false,
      activeListSpace: false,
      activeLearnHosting: false,
      activeUpdatePass: false,
      activeConnectedApps: false,
      collapsed: false,
      height: props.height,
      screenWidth: null,
      screenHeight: null,
      redirectPath: "/personalInfo",
    };
  }

  // componentDidMount=()=>{
  //     if(window.location.pathname.toLowerCase() !=="/login" && window.location.pathname.toLowerCase() !=="/signup")
  //     {
  //       // console.log(window.location.pathname.toLowerCase()," !== ","/nan")

  //       // console.log("target:",sessionStorage.getItem("targetURL"),":",window.location.pathname)
  //       if(!sessionStorage.getItem("id"))
  //       {
  //         sessionStorage.setItem("targetURL",window.location.pathname)
  //         document.getElementById("GoToLoginPage").click()
  //       }
  //       else
  //         sessionStorage.removeItem("targetURL")
  //     }
  //     else
  //     {
  //       sessionStorage.setItem("targetURL","/")
  //     }

  //   }

  componentDidMount() {
    if (this.props.windowWidth <= 786 * 667) {
      this.setState({ collapsed: true });
    }
    // if(setLocation() === "/personalInfo"){
    //     this.setState({
    //         activePersonalInfo: true,
    //         activePay: false,
    //         activeNotif: false,
    //         activeAskedQ: false,
    //         activeHelp: false,
    //         activeTerms: false,
    //         activeListSpace: false,
    //         activeLearnHosting: false,
    //         activeUpdatePass: false,
    //         activeConnectedApps: false,
    //     })
    // }
  }

  componentWillMount = () => {};

  handleMenu = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleActivation = (b) => {
    if (b === 1) {
      this.setState({
        activePersonalInfo: true,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: false,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }
    if (b === 2) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: false,
        activePay: true,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }
    if (b === 3) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: true,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }
    if (b === 4) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: false,
        activePay: false,
        activeListSpace: true,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }

    if (b === 5) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: false,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: true,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }

    if (b === 6) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: false,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: true,
        activeConnectedApps: false,
      });
    }

    if (b === 7) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: false,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: true,
      });
    }

    if (b === 8) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: true,
        activeHelp: false,
        activeNotif: false,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }

    if (b === 9) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: false,
        activeAskedQ: false,
        activeHelp: true,
        activeNotif: false,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }

    if (b === 10) {
      this.setState({
        activePersonalInfo: false,
        activeTerms: true,
        activeAskedQ: false,
        activeHelp: false,
        activeNotif: false,
        activePay: false,
        activeListSpace: false,
        activeLearnHosting: false,
        activeUpdatePass: false,
        activeConnectedApps: false,
      });
    }
  };

  render() {
    return (
      <Router>
        <div className="setting m-0 w-100" id={"settings"}>
          <div className="setting-main d-flex row w-100">
            <div style={{borderRight:'dotted 1px black'}} className="mb-5 setting-left justify-content-start col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-4">
              <ProSidebar
                collapsed={this.state.collapsed}
                className="setting-sideBar"
              >
                <SidebarHeader>
                  <h4
                    onClick={this.handleMenu}
                    className="d-flex justify-content-center"
                  >
                    {" "}
                    Setting{" "}
                  </h4>
                  {/* <button onClick={this.handleCollapsed}>close</button> */}
                </SidebarHeader>
                <SidebarContent>
                  <Menu iconShape="circle">
                    <SubMenu
                      defaultOpen
                      icon={<AiOutlineIdcard />}
                      title="Account settings"
                    >
                      <MenuItem
                        onClick={() => this.handleActivation(1)}
                        active={
                          window.location.pathname === "/settings/personalInfo"
                        }
                      >
                        Personal information
                        <Link to="/settings/personalInfo" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleActivation(2)}
                        active={
                          window.location.pathname ===
                          "/settings/paymentsPayouts"
                        }
                      >
                        Payments and payouts
                        <Link to="/settings/paymentsPayouts" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleActivation(3)}
                        active={
                          window.location.pathname === "/settings/notifications"
                        }
                      >
                        Notifications
                        <Link to="/settings/notifications" />
                      </MenuItem>
                    </SubMenu>

                    <SubMenu icon={<AiOutlineHome />} title="Hosting">
                      <MenuItem
                        onClick={() => this.handleActivation(4)}
                        active={
                          window.location.pathname === "/settings/listSpace"
                        }
                      >
                        List your space
                        <Link to="/settings/listSpace" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleActivation(5)}
                        active={
                          window.location.pathname === "/settings/learnHosting"
                        }
                      >
                        Learn about hosting
                        <Link to="/settings/learnHosting" />
                      </MenuItem>
                    </SubMenu>

                    <SubMenu icon={<SiGnuprivacyguard />} title="Secutiry">
                      <MenuItem
                        onClick={() => this.handleActivation(6)}
                        active={
                          window.location.pathname === "/settings/updatePass"
                        }
                      >
                        Update your password
                        <Link to="/settings/updatePass" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleActivation(7)}
                        active={
                          window.location.pathname === "/settings/connectedApps"
                        }
                      >
                        Manage connected apps
                        <Link to="/settings/connectedApps" />
                      </MenuItem>
                    </SubMenu>

                    <SubMenu
                      icon={<IoMdHelpCircleOutline />}
                      title="Help & asked questions"
                    >
                      <MenuItem
                        onClick={() => this.handleActivation(8)}
                        active={
                          window.location.pathname ===
                          "/settings/askedQuestions"
                        }
                      >
                        Asked questions
                        <Link to="/settings/askedQuestions" />
                      </MenuItem>
                      <MenuItem
                        onClick={() => this.handleActivation(9)}
                        active={window.location.pathname === "/settings/help"}
                      >
                        Help
                        <Link to="/settings/help" />
                      </MenuItem>
                    </SubMenu>

                    <MenuItem
                      onClick={() => this.handleActivation(10)}
                      icon={<FaRegHandshake />}
                      active={this.state.activeTerms}
                    >
                      Terms & aggreement
                      <Link to="/settings/terms"></Link>
                    </MenuItem>
                  </Menu>
                </SidebarContent>
                {/* <SidebarFooter>
                                <Link to="/">
                                    <button className="w-100 btn btn-primary">Back</button>
                                </Link>
                            </SidebarFooter> */}
              </ProSidebar>
            </div>

            <div className="setting-center col-xl-9 col-lg-8 col-md-8 col-sm-6 col-xs-8">
              <Switch>
                <Route exact path="/settings/personalInfo">
                  <PersonalInfo />
                </Route>
                <Route exact path="/settings/paymentsPayouts">
                  <PaymentsPayouts />
                </Route>
                <Route exact path="/settings/notifications">
                  <Notfications />
                </Route>
                <Route exact path="/settings/learnHosting">
                  <Temp />
                </Route>
                <Route exact path="/settings/listSpace">
                  <Temp />
                </Route>
                <Route exact path="/settings/updatePass">
                  <Temp />
                </Route>
                <Route exact path="/settings/connectedApps">
                  <Temp />
                </Route>
                <Route exact path="/settings/askedQuestions">
                  <Temp />
                </Route>
                <Route exact path="/settings/help">
                  <Help />
                </Route>
                <Route exact path="/settings/terms">
                  <Terms />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Settings;
