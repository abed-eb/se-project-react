import React, {Component} from "react";
import "./chatroomInfo.css";
import userImg from "../../../assets/img/default-profile-picture.jpg";

class ChatroomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chat_id: this.props.chat_id,
            src: this.props.chatAvatar,
            chatName: this.props.chatName,
            // firstName: "Ali",
            // lastname: "Ebadi",
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.chat_id !== this.props.chat_id)
            this.setState({chat_id: this.props.chat_id});
        if (prevProps.chatName !== this.props.chatName)
            this.setState({chatName: this.props.chatName});
        if (prevProps.chatAvatar !== this.props.chatAvatar)
            this.setState({src: this.props.chatAvatar});
    }

    render() {
        return (
            <React.Fragment>
                <div style={{height: 90}}>
                    <div className="user-profile">
                        <div className="user-profile-details pt-2 d-flex flex-row">
                            <img
                                className="ml-2 mb-2"
                                src={this.state.src}
                                alt="user-profile-image"
                                data-testid="chatInfo-profile-avatar"
                            />
                            <div className="col-9 d-flex">
                                <h4 className={'mt-auto mb-auto'} data-testid="chatInfo-name">
                                    <div className={'pb-3'} style={{height: "fit-content"}}>
                                        {this.props.chatName}
                                    </div>
                                </h4>
                                {/*<medium className={'ml-3'} data-testid="chatInfo-lastSeen">*/}
                                {/*  Last seen in Back Naresond*/}
                                {/*</medium>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ChatroomInfo;
