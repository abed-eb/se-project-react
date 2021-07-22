//@Sajad
import React, {Component, Fragment} from "react";
import "./homepage.css";
import {Link, Route, Switch} from "react-router-dom";
import search_bg from "../../assets/img/homepage-bg.jpg";
import search_1_bg from "../../assets/img/homepage-bg-4.jpg";
import host_bg from "../../assets/img/homepage-bg-7.jpg";
// import map_bg from '../../assets/img/homepage-bg.jpg'
import {Map, MapBrowserEvent} from "ol";
import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import {Point} from "ol/geom";
import "ol/ol.css";
import {
    RMap,
    ROSM,
    RLayerVector,
    RFeature,
    ROverlay,
    RStyle,
    RMapProps,
    RContext,
    RControl,
} from "rlayers";
import Search from "./search";
import {
    Link as SLink,
    Element as SElement,
    Events as SEvents,
    animateScroll as scroll,
    scroller,
} from "react-scroll";
import VillaCard from "../villa/card/villaCard";
import {
    API_BASE_URL, API_FAVORITE_VILLA,
    API_MOST_REGISTERED_VILLA,
    API_SEARCH_VILLA,
    API_TOP_RATED_VILLA,
    STORAGE_KEY,
} from "../constants";
import {getItem, getViewport} from "../util";
import {Carousel} from "react-bootstrap";
import axios from "axios";
import geo_mt from "../../assets/icon/geo_mt.png";
import geo_fill from "../../assets/icon/geo_fill.png";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import HPSub1 from "./hpsub1";
import VillaCarousel from "../villa/card/villaCarousel";

const left_option_selected = (
    <svg
        style={{cursor: "pointer"}}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#0d6efd"
        className="bi bi-circle-fill mb-3"
        viewBox="0 0 16 16"
    >
        <circle cx="8" cy="8" r="8"/>
    </svg>
);
const left_option = (
    <svg
        style={{cursor: "pointer"}}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#0d6efd"
        className="bi bi-circle mb-3"
        viewBox="0 0 16 16"
    >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg>
);

const left_option_arrow = (
    <svg
        style={{cursor: "pointer"}}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#0d6efd"
        className="bi bi-caret-down mb-3"
        viewBox="0 0 16 16"
    >
        <path
            d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
    </svg>
);

const left_option_arrow_selected = (
    <svg
        style={{cursor: "pointer"}}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#0d6efd"
        className="bi bi-caret-down-fill mb-3"
        viewBox="0 0 16 16"
    >
        <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>
);

let scrolling = false;

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.leftMenuClicked = this.leftMenuClicked.bind(this);
        this.leftOptionsSelectedShow = this.leftOptionsSelectedShow.bind(this);
        this.handleScreenSizeChange = this.handleScreenSizeChange.bind(this);
        // this.renderList = this.renderList.bind(this);
    }

    async componentDidMount() {
        // const self = this;
        this.handleScreenSizeChange(getViewport());
        document.addEventListener(STORAGE_KEY + "screen-size-changed", (event) =>
            this.handleScreenSizeChange(event.detail)
        );
        // document.addEventListener("scroll", this.leftOptionsSelectedShow);
        // sessionStorage.removeItem("scroll-hp-sub");
        // await this.loadCardList(API_TOP_RATED_VILLA);
        // await this.loadCardList(API_MOST_REGISTERED_VILLA);
        // let config = {
        //     method: 'get',
        //     url: API_SEARCH_VILLA+'?page=1&number_of_villa=100',
        //     headers: {
        //         // 'Authorization': 'Token '.concat(getItem('user-token')),
        //     }
        // };
        // let cardList = await axios(config)
        //     .then(function (response) {
        //         // console.log(JSON.stringify(response.data));
        //         console.log(response.data.data)
        //         return response.data.data
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //         return []
        //     });
        // console.log(cardList)
        // this.setState({cards1:cardList,cards2:cardList})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (scrolling)
        //     return
        // if (this.state.selectedSubPage!==prevState.selectedSubPage)
        // {
        //     scroller.scrollTo('hp-sub-'.concat(this.state.selectedSubPage)
        //         , {
        //             duration: 750,
        //             delay: 0,
        //             smooth: true,
        //             containerId: 'body-tag',
        //             // offset: 50, // Scrolls to element + 50 pixels down the page
        //         }
        //     )
        // }
    }

    state = {
        cards0: [],
        cards1: [
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
            {
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
            },
        ],
        cards2: [
            {
                id: 0,
                name: "City center apartment with 3 rooms",
                addr: "Iran ,Tehran ,Shar-rey",
                cost: 10000,
                rate: "4.3 (35 reviews)",
                x: 2.3,
                y: 48.8737,
            },
            // {
            //         id:1,
            //     name:'City center apartment with 3 rooms',
            //     addr:"Iran ,Tehran ,Shar-rey",
            //     cost:10000,
            //     rate:'4.3 (35 reviews)',
            //     x:2.295,
            //     y:48.8737,
            // },
            // {
            //         id:2,
            //     name:'City center apartment with 3 rooms',
            //     addr:"Iran ,Tehran ,Shar-rey",
            //     cost:10000,
            //     rate:'4.3 (35 reviews)',
            //     x:2.295,
            //     y:48.8737,
            // },
            // {
            //         id:3,
            //     name:'City center apartment with 3 rooms',
            //     addr:"Iran ,Tehran ,Shar-rey",
            //     cost:10000,
            //     rate:'4.3 (35 reviews)',
            //     x:2.295,
            //     y:48.8737,
            // },
            // {
            //         id:4,
            //     name:'City center apartment with 3 rooms',
            //     addr:"Iran ,Tehran ,Shar-rey",
            //     cost:10000,
            //     rate:'4.3 (35 reviews)',
            //     x:2.295,
            //     y:48.8737,
            // },
        ],
        cardsSize: 1,
        scrolling: false,
        subPages: [{id: 0}, {id: 1}, {id: 2}, {id: 3}],
        selectedSubPage: 0,
    };

    handleScreenSizeChange(size) {
        let cards = 1;
        if (size === "xl") cards = 4;
        else if (size === "lg") cards = 2;
        else if (size === "md") cards = 2;
        else if (size === "sm") cards = 2;
        this.setState({cardsSize: cards});
        // console.log('new size ',cards)
        this.forceUpdate();
    }

    leftOptionsSelectedShow() {
        // console.log(document.scrollingElement.scrollTop)
        if (scrolling) return;
        if (document.scrollingElement.scrollTop < window.innerHeight / 2) {
            if (this.state.selectedSubPage !== 0)
                this.setState({selectedSubPage: 0});
        } else if (
            document.scrollingElement.scrollTop <
            (3 * window.innerHeight) / 2
        ) {
            if (this.state.selectedSubPage !== 1)
                this.setState({selectedSubPage: 1});
        } else if (
            document.scrollingElement.scrollTop <
            (5 * window.innerHeight) / 2
        ) {
            if (this.state.selectedSubPage !== 2)
                this.setState({selectedSubPage: 2});
        } else if (
            document.scrollingElement.scrollTop <
            (7 * window.innerHeight) / 2
        ) {
            if (this.state.selectedSubPage !== 3)
                this.setState({selectedSubPage: 3});
        }
    }

    leftMenuClicked(id) {
        let scrollContainer2 = document.getElementById("body-tag");
        // let scrollContainer3 = document.getElementById('hp-sub');
        // let scrollContainer4 = document.getElementById('hp-sub-1');
        // console.log(scrollContainer2.scrollTop)
        // console.log(document.body.scrollTop)
        console.log(document.scrollingElement.scrollTop);
        // console.log(scrollContainer3.scrollTop)
        // console.log(scrollContainer4.scrollTop)
        // console.log(scrollContainer.scrollHeight)

        this.setState({selectedSubPage: id});
        // scroll.scrollMore(10, null);
        scrolling = true;
        scroller.scrollTo("hp-sub-".concat(id), {
            duration: 750,
            delay: 0,
            smooth: true,
            containerId: "body-tag",
            // offset: 50, // Scrolls to element + 50 pixels down the page
        });
        setTimeout(() => {
            scrolling = false;
        }, 800);

        // scroll.scrollToBottom(null);
        // scroll.scrollTo(window.innerHeight*parseInt(id), null);
    }

    onMarkerLocationChange = () => {
        this.setState({
            position: {
                lat: 52,
                lng: 30,
            },
            center: {
                lat: 52,
                lng: 30,
            },
        });
    };

    renderList(id) {
        const cards = id === 1 ? this.state.cards1 : this.state.cards2;
        let arr = [];
        for (let k = 0; k <= cards.length / this.state.cardsSize; k++) {
            let cardGroups = [];
            for (let z = 0; z < this.state.cardsSize; z++) {
                let card = cards[k * this.state.cardsSize + z];
                if (!card) break;
                cardGroups = [
                    ...cardGroups,
                    <VillaCard
                        name={card.name}
                        id={card.villa_id}
                        src={API_BASE_URL.substr(0, API_BASE_URL.length - 1).concat(
                            card.default_image_url
                        )}
                        addr={card.country + ", " + card.state + ", " + card.city}
                        cost={card.price_per_night}
                        rate={card.rate__avg}
                    />,
                ];
            }
            // if (cardGroups[0])
            // console.log(cardGroups[0].toString())
            // if (cardGroups[1])
            // console.log(cardGroups[1].toString())
            // if (cardGroups[2])
            // console.log(cardGroups[2].toString())
            if (cardGroups.length > 0)
                arr = [
                    ...arr,
                    <Carousel.Item>
                        <div
                            style={{
                                background: "#364d79",
                                borderRadius: "0.5rem",
                                width: "fit-content",
                            }}
                            className={"p-5"}
                        >
                            <div
                                style={{width: 320 * this.state.cardsSize}}
                                className={"d-flex flex-row"}
                            >
                                {cardGroups.map((cardGroup) => cardGroup)}
                            </div>
                        </div>
                    </Carousel.Item>,
                ];
        }
        return arr;
    }

    render() {
        return (
            // <div id='homepage' className="d-flex flex-column" style={{overflowY: 'auto'}}>
            <React.Fragment>
                <div
                    style={{
                        position: "fixed",
                        height: "100vh",
                        top: "40%",
                        zIndex: "400",
                    }}
                    className={"ml-3 d-flex flex-column"}
                >
                    {this.state.subPages.map((subPage) => (
                        <div
                            key={subPage.id}
                            onClick={() => this.leftMenuClicked(subPage.id)}
                        >
                            {subPage.id === this.state.subPages.length - 1
                                ? subPage.id === this.state.selectedSubPage
                                    ? left_option_arrow_selected
                                    : left_option_arrow
                                : subPage.id === this.state.selectedSubPage
                                    ? left_option_selected
                                    : left_option}
                        </div>
                    ))}
                </div>
                <div
                    id={"hp-sub"}
                    className={"w-100"}
                    style={{height: "fit-content", overflowY: "auto"}}
                >
                    <SElement
                        id={"hp-sub-0"}
                        name={"hp-sub-0"}
                        className={"homepage-div-bg"}
                        style={{background: "url(" + search_1_bg + ")"}}
                    >
                        <div
                            className={"d-flex pl-5 pr-5"}
                            style={{maxWidth: "60%", height: "50%"}}
                        >
                            <Search/>
                        </div>
                    </SElement>
                    <SElement
                        id={"hp-sub-1"}
                        name={"hp-sub-1"}
                        className={"homepage-div-bg d-flex w-100"}
                    >
                        <HPSub1/>
                    </SElement>
                    <SElement
                        id={"hp-sub-2"}
                        name={"hp-sub-2"}
                        className={"homepage-div-bg d-flex m-auto"}
                    >
                        <div className={"w-100 h-100 d-flex flex-column"}>
                            <h4
                                className={" mt-auto mb-4"}
                                style={{fontFamily: "cursive", marginLeft: "10%"}}
                            >
                                Maybe try becoming a host yourself:
                            </h4>
                            <div
                                style={{
                                    backgroundImage: "url(" + host_bg + ")",
                                    borderRadius: "1.5rem",
                                }}
                                className={
                                    "d-flex  mb-auto ml-auto mr-auto become-host-div-bg pr-5"
                                }
                            >
                                <Link
                                    to="/Hosting/"
                                    className={"ml-auto  mt-auto mb-auto mr-5"}
                                    style={{height: "fit-content"}}
                                >
                                    <button className={"btn btn-primary"}>Become a Host</button>
                                </Link>
                            </div>
                        </div>
                    </SElement>
                    <SElement
                        id={"hp-sub-3"}
                        name={"hp-sub-3"}
                        className={"homepage-div-bg pt-5 pb-5"}
                        style={{backgroundColor: "white", borderRadius: "1.5rem"}}
                    >
                        <VillaCarousel url={API_SEARCH_VILLA} addNum={true} cardSize={parseInt(this.state.cardsSize)} title={'New places:'}/>
                        <VillaCarousel url={API_TOP_RATED_VILLA} addNum={true} cardSize={parseInt(this.state.cardsSize)} title={'High rate places:'}/>
                        <VillaCarousel url={API_MOST_REGISTERED_VILLA} addNum={true} cardSize={parseInt(this.state.cardsSize)} title={'Most reserved places:'}/>

                        {getItem('user-id')?
                            <VillaCarousel url={API_FAVORITE_VILLA} cardSize={parseInt(this.state.cardsSize)} title={'Your Favorite places:'}/>:""}
                    </SElement>
                </div>
            </React.Fragment>
            // </div>
        );
    }
}

export default Homepage;
