import React from "react";
import {MessageBox as MB} from "react-chat-elements";
import {Image} from 'antd';
// import { Avatar } from 'react-chat-elements'
// import { getUserAvatar } from './util';
import {Dropdown} from "react-bootstrap";
// CE CSS
import "react-chat-elements/dist/main.css";
// MessageBox component
import "./messageBox.css";
import {getItem} from "../../util";
import ReactHtmlParser from "react-html-parser";
import EllipsisToolTip from "ellipsis-tooltip-react-chan";

// import ProfilePreview from './ProfilePreview';

class MessageBox extends React.Component {
    state = {
        data: this.props.data,
        isPhoto: ((String(this.props.data).match(/\.(jpeg|jpg|gif|png)$/) !== null) && (this.props.data !== null)),
        isFile: ((String(this.props.data).match(/\.(jpeg|jpg|gif|png)$/) == null) && (this.props.data !== null)),
        showProfilePreview: false,
        isOwner: this.props.userid === parseInt(getItem("user-id")),
        message_id: this.props.message_id,
        userid: this.props.userid,
        title: this.props.title,
        text: this.props.text,
        dateString: this.props.dateString,
        isReply: this.props.isReply,
        titleRep: this.props.titleRep,
        messageRep: this.props.messageRep,
    };

    async componentDidMount() {
        console.log(String(this.state.text).split('/')[0])
        console.log(String(this.state.text))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.text !== this.props.text)
        {
            this.setState({text: this.props.text})
        }
    }

    render() {
        return (
            <React.Fragment>
                <div
                    className={"w-fit-content d-flex w-100 flex-row".concat(
                        this.state.isOwner ? "-reverse" : ""
                    )}
                >
                    <div className="w-100"
                         onClick={() =>{if (this.state.isFile) window.open(this.state.data, '_blank')}}>
                        <MB
                            id={this.state.id}
                            position={this.state.isOwner ? "right" : "left"}
                            type={this.state.isFile ? "file" : "text"}
                            // type={'file'}
                            // type={'photo'}
                            // title={!this.state.isOwner?this.state.title:""}
                            titleColor="#8717ae"
                            text={<div className={'d-flex flex-column'}>
                                {this.state.isPhoto ?
                                    <Image
                                        className={'mb-2'}
                                        width={'100%'}
                                        src={this.state.data}
                                    />
                                    : null}
                                {this.state.isFile ?
                                    <div style={{maxWidth: '250px', color: "black"}}>
                                        <EllipsisToolTip>
                                            {String(this.state.data).split('/')[String(this.state.data).split('/').length - 1]}
                                        </EllipsisToolTip>
                                    </div> :
                                    <span style={{whiteSpace: "pre-line"}}>
                                        {ReactHtmlParser(this.state.text)}
                                    </span>
                                }
                            </div>}
                            dateString={this.state.dateString}
                            // onReplyClick={()=>this.props.reply(this.state.message_id,this.state.title)}
                            // onClick
                            onReplyMessageClick={(event) =>
                                this.props.onReplyMessageClick(event,this.state.message_id)
                            }

                            data={
                                (this.state.data && !this.state.isPhoto) ?
                                    {
                                        uri: this.state.data,
                                        status: {
                                            click: false,
                                            // loading:0.5,
                                        }
                                    }
                                    : null
                            }
                            // replyButton={true}
                            reply={
                                this.state.isReply
                                    ? {
                                        title: ' ',
                                        titleColor: "#8717ae",
                                        message: this.state.messageRep,
                                    }
                                    : false
                            }

                            // reply
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default MessageBox;
