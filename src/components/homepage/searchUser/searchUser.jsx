import React, {Component,Fragment} from 'react';
import './searchUser.css'
import {Link} from "react-router-dom";
import SearchUserResult from "./searchUserResult";
import icon from '../../../assets/img/default-profile-picture.jpg'
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import {Spinner} from "react-bootstrap";
import {API_SEARCH_USER_URL} from "../../constants";
import axios from "axios";

const ellipsisToolTipOptions = {
    effect: "solid",
    place: "top",
}

class SearchUser extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        focused:false,
        panelOpened:false,
        searchInput:"",
        suggestions:[],
        notFound:false,
    }

    componentDidMount(){
        // document.addEventListener("mousedown",this.handleClick,true)
    }
    componentWillUnmount(){
        // document.removeEventListener("mousedown",this.handleClick,false)
    }

    handleClick=(e)=>{
        console.log(e.target)
        if(!document.getElementById("search-user").contains(e.target))
        {
            this.setState({focused:false,panelOpened:false,searchInput:""})
        }
    }

    handleSearch=()=>{
        if(!this.state.focused)
        {
            let input = document.getElementById('search-input-field-chat');
            input.focus();
            input.select();
        }
        else
            this.setState({panelOpened:false,searchInput:"",notFound:false})
        this.setState({focused:!this.state.focused})

    }


    handleInputChange=(event)=>{
        let input = event.target.value;
        this.setState({searchInput:input,notFound:false})
        if (input && input.length >0)
        {
            // toast.dismiss()
            this.setState({panelOpened:true})
            this.loadSuggestions(input);
        }
        else
            this.setState({panelOpened:false,suggestions:[]})
    }

    loadSuggestions= async (input)=>{
        console.log("searching for : ",input)

        let config = {
            method: 'get',
            url: API_SEARCH_USER_URL.concat("?search=").concat(input),
            headers: { }
        };
        
        let response = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({notFound:(!response || response.length===0)})
        this.setState({suggestions:response})
        console.log(response)

        // this.setState({notFound:0})

    }


    render() {
        return (
            <Fragment>
                <div id='search-user' className="d-flex flex-row w-100">
                    <div style={{width:'inherit',position:'relative'}}>
                        <div id='bar' className={"ml-auto d-flex flex-row-reverse".concat(this.state.focused?" active ":"")}>
                            <input value={this.state.searchInput}
                                   onChange={this.handleInputChange}
                                   className=" form-control shadow-none search-user" placeholder="Search" id="search-input-field-chat"/>
                        </div>
                        <div id='panel' className={"mt-2 w-100".concat(this.state.panelOpened?" active":"")}>
                            <div id='search-sub-panel1' className={"ml-3 mr-3 mt-3".concat(this.state.panelOpened?" ":" display-none")}>
                                {/*<EllipsisToolTip options={ellipsisToolTipOptions}>*/}
                                {/*    {this.state.suggestions.length>0?*/}
                                {/*    "users matching ".concat(this.state.searchInput)*/}
                                {/*    :"can't find any user matching ".concat(this.state.searchInput)}*/}
                                {/*</EllipsisToolTip>*/}
                                {!this.state.suggestions || this.state.suggestions.length===0 ?
                                    (this.state.notFound?
                                    <p>
                                        No user found.
                                    </p>:
                                    <p>
                                        <Spinner className={'ml-2 mr-2'} as="span"
                                             animation="grow"
                                             size="sm"
                                             role="status"
                                             aria-hidden="true"/>Searching ...
                                    </p>)
                                    :""}
                            </div>
                            <div id='search-sub-panel2' className={"search-result".concat((this.state.suggestions && this.state.suggestions.length>0 && this.state.searchInput !== "")?" active":"")}>
                                {this.state.panelOpened && this.state.suggestions?
                                this.state.suggestions.map(sug =>
                                        <SearchUserResult userid={sug.user_id} email={sug.email} profile={sug.image} last_name={sug.last_name}
                                                          isFriend={sug.isFriend} first_name={sug.first_name}/>
                                    ):""}

                            </div>
                        </div>
                    </div>

                    <button onClick={this.handleSearch}
                            className="shadow-none rounded-circle d-flex flex-row button-hover
                                    transparent-button btn-outline-primary">
                        {this.state.focused?
                        <svg xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" fill="currentColor"
                             className="bi bi-x align-self-center" viewBox="0 0 16 16">
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>:
                        <svg width="27px" height="27px" viewBox="0 0 16 16" className=" bi bi-search align-self-center" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>}
                    </button>

                </div>
            </Fragment>

        );
    }
}

export default SearchUser;
