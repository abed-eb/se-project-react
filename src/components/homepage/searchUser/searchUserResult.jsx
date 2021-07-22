import React, {Component} from 'react';
import EllipsisToolTip from "ellipsis-tooltip-react-chan";
import default_logo from '../../../assets/img/default-profile-picture.jpg'
import {getItem} from "../../util";
import {API_BASE_URL, API_START_CHAT} from '../../constants'
import axios from "axios";
const ellipsisToolTipOptions = {
    effect: "solid",
    place: "top",
}

class SearchUserResult extends Component {
    constructor(props) {
        super(props);
        console.log(getItem('user-id'))
        console.log(this.props.userid)
    }


    async startChat() {
        let FormData = require("form-data");
        let data = new FormData();
        data.append("contact", "1");
        let config = {
            method: "post",
            url: API_START_CHAT,
            headers: {
                Authorization: "Token ".concat(getItem("user-token")),
            },
            data: data,
        };

        let chat = await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                return response.data.data;
            })
            .catch(function (error) {
                console.log(error);
                return null;
            });
        if (chat) {
            sessionStorage.setItem("goToChat", "chat-item-" + chat.chat_id);
            document.getElementById("open-chat-button").click();
            // console.log('chat-item-' + chat.chat_id)

            // document.getElementById('chat-item-' + chat.chat_id).click()
        }
    }


    render() {
        return (
            <div className={"container p-2 border-primary m-1  rounded"} style={{border:'2px solid',width:'inherit'}}>
                <div className={"d-flex flex-row"}>
                    <img className={"rounded-circle align-self-center mr-3"}
                     src={this.props.profile ? API_BASE_URL.substring(0, API_BASE_URL.length -1) + this.props.profile:default_logo} height={"50px"}
                     />
                    <div className={'align-self-center d-flex flex-column'} style={{maxWidth:"calc(100% - 115px)"}}>
                        <div className={'w-100'}>
                            <EllipsisToolTip options={ellipsisToolTipOptions}>
                            {this.props.email}
                            </EllipsisToolTip>
                        </div>
                        <small className={'w-100'}>
                            <EllipsisToolTip options={ellipsisToolTipOptions}>
                            {this.props.first_name +" "+ this.props.last_name}
                            </EllipsisToolTip>
                        </small>
                    </div>
                    <div className={'ml-auto'}>
                        {parseInt(getItem('user-id'))===this.props.userid?"":
                        <button onClick={this.startChat} className={'ml-auto btn transparent-button shadow-none'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                            className="bi bi-chat-text mt-2" viewBox="0 0 16 16">
                            <path
                            d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                            <path
                            d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"/>
                            </svg>
                        </button>}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchUserResult;
