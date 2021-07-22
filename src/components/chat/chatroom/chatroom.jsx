import React, { Component } from "react";
import MessageBox from "./messageBox";
import { Input } from "react-chat-elements";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import { ToastContainer, toast } from "react-toastify";
import ResizeObserver from "rc-resize-observer";
import { Dropdown } from "react-bootstrap";
import * as Scroll from "react-scroll";
import {
  Link as SLink,
  Element as SElement,
  Events as SEvents,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import "./chatroom.css";
import ChatroomInfo from "./chatroomInfo";
import { getItem } from "../../util";
import { connect, disConnect, listen, send } from "./socket";
import {
  API_BASE_URL,
  API_CHAT_UPLOAD_FILE,
  WS_BASE_URL,
  WS_CHAT_URL,
} from "../../constants";
import { Progress, Upload } from "antd";

let rws = null;

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      chatID: this.props.chatID,
      chatName: this.props.chatName,
      chatAvatar: this.props.chatAvatar,
      chatroomInfoHeight: 0,
      isOwner: false,
      replying: null,
      editing: null,
      replyingTo: null,
      editingTo: null,
      inputValue: "",
      loading: false,
      inputRef: React.createRef(),
      chats: [],
      inputHeight: 37,
      file: null,
    };
    // this.loadQuestions=this.loadQuestions.bind(this)
  }

  async componentDidMount() {
    this.setState({
      chatroomInfoHeight: document.getElementById("chatroom-info").offsetHeight,
    });

    let button = document.getElementById("generalChatroomSendButton");
    let textBox = document.getElementById("sendOnEnter");
    textBox.addEventListener("keyup", function (event) {
      if (event.keyCode === 13 && event.shiftKey) {
        button.click();
      }
    });

    this.connectSocket();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.chatID !== this.props.chatID)
      this.setState({ chatID: this.props.chatID });
    if (prevProps.chatName !== this.props.chatName)
      this.setState({ chatName: this.props.chatName });
    if (prevProps.chatAvatar !== this.props.chatAvatar)
      this.setState({ chatAvatar: this.props.chatAvatar });
  }

  async componentWillUnmount() {
    await disConnect();
  }

  connectSocket = async () => {
    if (rws) return;
    rws = await connect(WS_BASE_URL + WS_CHAT_URL + this.state.chatID + "/");
    await listen(rws, "message", this.newMessage);
    await send(rws, {
      type: "authenticate",
      Authorization: getItem("user-token"),
    });
    await send(rws, {
      type: "fetch",
    });
  };

  newMessage = async (obj) => {
    console.log(obj);
    if (obj.message === "delete message successfully") {
      let temp = this.state.chats.filter(function (item) {
        return item.message_id !== obj.data.message_id;
      });
      this.setState({ chats: temp });
    } else if (obj.message === "fetch successfully") {
      this.setState({ chats: obj.data }, () =>
        scroll.scrollToBottom({
          duration: 0,
          delay: 0,
          smooth: false,
          containerId: "generalChatroomOptionsHover",
          offset: 50,
        })
      );
      console.log(obj.data);
    } else if (obj.message === "update message successfully") {
      for (let k = 0; k < this.state.chats.length; k++) {
        if (this.state.chats[k].message_id === obj.data.message_id) {
          // temp[k] = obj.data
          this.setState({
            chats: [
              ...this.state.chats.slice(0, k),
              obj.data,
              ...this.state.chats.slice(k + 1, this.state.chats.length),
            ],
          });
          // console.log('test:'+[...this.state.chats.slice(0,k),obj.data,...this.state.chats.slice(k+1,this.state.chats.length-1)])
          // console.log(temp)
          break;
        }
        if (k === this.state.chats.length - 1) {
          this.setState({ chats: [...this.state.chats, obj.data] });
          let scrollContainer = document.getElementById(
            "generalChatroomOptionsHover"
          );
          if (
            Math.floor(
              scrollContainer.scrollHeight - scrollContainer.scrollTop - 150
            ) <= scrollContainer.clientHeight
          ) {
            scroll.scrollToBottom({
              duration: 750,
              delay: 100,
              smooth: true,
              containerId: "generalChatroomOptionsHover",
              offset: 50,
            });
          }
        }
      }
    } else if (obj.message === "authenticate needed.") {
      await send(rws, {
        type: "authenticate",
        Authorization: getItem("user-token"),
      });
    } else if (obj.message === "create message successfully") {
      // scroll.scrollToTop();
      // scroll.scrollToTop( {
      //     duration: 1500,
      //     delay: 100,
      //     smooth: true,
      //     containerId: 'scroll-container-discussion',
      //     offset: 50});
      this.setState({ chats: [...this.state.chats, obj.data] });
      let scrollContainer = document.getElementById(
        "generalChatroomOptionsHover"
      );
      // get scroll position in px

      // console.log(Math.floor(scrollContainer.scrollHeight - scrollContainer.scrollTop -100) +'<='+scrollContainer.clientHeight)
      if (
        Math.floor(
          scrollContainer.scrollHeight - scrollContainer.scrollTop - 150
        ) <= scrollContainer.clientHeight
      ) {
        scroll.scrollToBottom({
          duration: 750,
          delay: 100,
          smooth: true,
          containerId: "generalChatroomOptionsHover",
          offset: 50,
        });
      }
    }
  };

  sendFile = async (id) => {
    await send(rws, {
      // text:this.state.inputRef.input.value,
      message_id: id,
      type: "update",
    });
  };

  sendMessage = async () => {
    if (this.state.inputRef.input.value === "") {
      toast.dark("Message is empty!");
      return 0;
    }
    if (this.state.replying) {
      await send(rws, {
        message: this.state.inputRef.input.value,
        type: "create",
        parent_message: String(this.state.replying),
      });
    } else if (this.state.editing) {
      await send(rws, {
        text: this.state.inputRef.input.value,
        message_id: this.state.editingTo,
        type: "update",
      });
      await this.handleEdit(null, null);
    } else {
      await send(rws, {
        message: this.state.inputRef.input.value,
        type: "create",
      });
    }

    this.state.inputRef.clear();
    this.setState({ inputRef: "", replying: null, replyingTo: null });
  };

  handleDelete = async (message_id) => {
    await send(rws, {
      message_id: message_id,
      type: "delete",
    });
  };
  handleEdit = async (editing, message_id) => {
    if (editing) {
      let temp = this.state.chats.filter(function (item) {
        return item.message_id === message_id;
      });
      this.state.inputRef.input.value = temp[0].text;
      this.state.inputRef.input.focus();
      // this.setState({inputRef:temp[0].text})
    } else this.state.inputRef.clear();
    this.setState({ editing, editingTo: message_id });
  };

  reply = (id, username) => {
    // console.log("replying")
    this.setState({ replying: id, replyingTo: username });
  };

  onReplyMessageClick = (e, id) => {
    console.log(
      "ran :",
      id,
      " to ",
      this.state.chats.find((chat) => chat.message_id === id).parent_message
    );
    e.stopPropagation();
    // console.log(this.state.chats.find(chat => chat.message_id === id))
    scroller.scrollTo(
      "chat".concat(
        this.state.chats.find((chat) => chat.message_id === id).parent_message
      ),
      {
        duration: 750,
        delay: 100,
        smooth: true,
        containerId: "generalChatroomOptionsHover",
        offset: -20, // Scrolls to element + 50 pixels down the page
      }
    );
  };

  getRepliedMessageText = (chat) => {
    let RepliedMessage = this.state.chats.find(
      (reply) => reply.message_id === chat.parent_message
    );
    if (RepliedMessage) return RepliedMessage.text;
    return null;
  };

  onChange = (info) => {
    console.log(info);
    this.setState({
      uploading: info.file.status === "uploading",
      file: info.file,
    });
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      toast.success(`${info.file.name} file uploaded successfully`);
      console.log("Pay attention!!!!!!!!!!!!!!!!! : ", info);
      this.sendFile(info.file.response.data.message_id);
    } else if (info.file.status === "error") {
      toast.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const props = {
      name: "file",
      action: API_BASE_URL + API_CHAT_UPLOAD_FILE,
      headers: {
        Authorization: "Token ".concat(getItem("user-token")),
      },
    };
    return (
      <React.Fragment>
        <div className="w-100 h-100 p-0 mt-3">
          <div id="question-page" className="d-flex flex-column h-100 w-100">
            <div
              id="chatroom-info"
              className="chat-chatroomInfo"
              style={{ backgroundColor: "transparent" }}
            >
              <ChatroomInfo
                chat_id={this.state.chatID}
                chatName={this.state.chatName}
                chatAvatar={this.state.chatAvatar}
                data-testid="chat-chatInfo"
              />
            </div>
            <div
              className="d-flex flex-row"
              style={{
                height: "calc(100% - "
                  .concat(this.state.chatroomInfoHeight)
                  .concat("px)"),
              }}
            >
              <div className="d-flex flex-column w-100 p-0">
                <div
                  id="scroll-container-discussion"
                  className="messages-box"
                  style={{
                    height: "calc(100% - "
                      .concat(this.state.inputHeight)
                      .concat("px)"),
                  }}
                >
                  <div
                    className="mb-2 h-100"
                    id="generalChatroomOptionsHover"
                    style={{
                      height: "100%",
                      overflowY: "scroll",
                    }}
                  >
                    {this.state.chats.map((chat) => (
                      <SElement
                        name={"chat".concat(chat.message_id)}
                        key={chat.message_id}
                        className="mb-3 d-flex flex-row w-100"
                      >
                        <div
                          className={
                            chat.owner === parseInt(getItem("user-id"))
                              ? "ml-auto d-flex flex-row-reverse"
                              : "d-flex flex-row"
                          }
                        >
                          <MessageBox
                            data={
                              // "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.zip"
                              // null
                              chat.file
                                ? API_BASE_URL.substr(
                                    0,
                                    API_BASE_URL.length - 1
                                  ) + chat.file
                                : null
                            }
                            reply={this.reply}
                            message_id={chat.message_id}
                            userid={chat.owner}
                            // title={chat.username}
                            onReplyMessageClick={this.onReplyMessageClick}
                            text={chat.text}
                            dateString={chat.ctime}
                            isReply={chat.parent_message}
                            // titleRep={
                            //     chat.parent_message
                            //         ? this.state.chats.find(
                            //         (reply) => reply.message_id === chat.replyTo
                            //         ).username
                            //         : null
                            // }
                            messageRep={
                              chat.parent_message
                                ? this.getRepliedMessageText(chat)
                                : null
                            }
                          />
                          <div
                            id="options"
                            className={
                              chat.owner === parseInt(getItem("user-id"))
                                ? "option-right"
                                : "option-left"
                            }
                          >
                            <Dropdown>
                              <Dropdown.Toggle
                                className={"btn shadow-none transparent-button"}
                                id="dropdown-basic"
                              >
                                <svg
                                  width="15px"
                                  height="15px"
                                  viewBox="0 0 16 16"
                                  class="bi bi-three-dots-vertical"
                                  fill="black"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                                  />
                                </svg>
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="dropDown">
                                <Dropdown.Item
                                  as="button"
                                  onClick={() =>
                                    this.reply(chat.message_id, chat.username)
                                  }
                                >
                                  Reply
                                </Dropdown.Item>
                                {chat.owner === parseInt(getItem("user-id")) ? (
                                  <Dropdown.Item
                                    as="button"
                                    onClick={() =>
                                      this.handleDelete(chat.message_id)
                                    }
                                  >
                                    Delete
                                  </Dropdown.Item>
                                ) : (
                                  ""
                                )}
                                {chat.owner === parseInt(getItem("user-id")) ? (
                                  <Dropdown.Item
                                    as="button"
                                    onClick={() =>
                                      this.handleEdit(true, chat.message_id)
                                    }
                                  >
                                    Edit
                                  </Dropdown.Item>
                                ) : (
                                  ""
                                )}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </SElement>
                    ))}
                  </div>
                </div>
                <ResizeObserver
                  onResize={({ width, height }) =>
                    this.setState({ inputHeight: height })
                  }
                >
                  <div id="sendOnEnter">
                    <div className="chat-input-div pb-4">
                      {this.state.replying || this.state.editing ? (
                        <div className="black-text input-buttons w-100">
                          <button
                            className="p-1"
                            style={{ backgroundColor: "transparent" }}
                            onClick={
                              this.state.editing
                                ? () => this.handleEdit(null, null)
                                : () => this.reply(null, null)
                            }
                          >
                            <svg
                              width="2em"
                              height="2em"
                              viewBox="0 0 16 16"
                              className="bi bi-x"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                          </button>
                          <b>{this.state.replying ? "Replying " : "Editing"}</b>
                        </div>
                      ) : (
                        ""
                      )}
                      <Input
                        inputStyle={{
                          height: "45px",
                          width: "100%",
                          padding: "5px",
                          paddingLeft: "10px",
                          paddingRight: "45px",
                          resize: "none",
                          overflowY:
                            this.state.inputHeight < 200 ? "hidden" : "auto",
                          border: "none",
                          backgroundColor: "white",
                          boxShadow: "none",
                          outline: "none",
                        }}
                        data-testid="chat-input"
                        className={"rounded"}
                        ref={(el) => (this.state.inputRef = el)}
                        // onChange={this.inputOnChange}
                        minHeight={45}
                        placeholder="Type here..."
                        multiline={true}
                        autoHeight={true}
                        autofocus={true}
                        rightButtons={
                          <div className={"d-flex flex-column"}>
                            <button
                              data-testid="chat-sendButton"
                              className="btn btn-primary transparent-button shadow-none ml-2 mb-2"
                              // {this.state.inputValue.length===0?disabled:""}
                              onClick={this.sendMessage}
                              id="generalChatroomSendButton"
                              style={{ color: "white", padding: "0" }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="35"
                                height="35"
                                fill="#007bff"
                                className="bi bi-telegram"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
                              </svg>
                            </button>
                          </div>
                        }
                        leftButtons={
                          <React.Fragment>
                            <Progress
                              onClick={() => console.log(this.state)}
                              className={"ml-2 mb-2"}
                              style={{
                                fontSize: "12px",
                                display: this.state.uploading ? null : "none",
                              }}
                              width={"35px"}
                              type="circle"
                              percent={
                                this.state.file
                                  ? Math.floor(this.state.file.percent)
                                  : 0
                              }
                            />
                            <div
                              id={"chat-upload-button"}
                              style={{
                                display: this.state.uploading ? "none" : null,
                              }}
                            >
                              <Upload
                                onChange={this.onChange}
                                data={{ chat_id: this.state.chatID }}
                                {...props}
                              >
                                <button
                                  data-testid="chat-fileButton"
                                  className="btn btn-primary transparent-button mt-auto shadow-none ml-2 mb-2"
                                  // {this.state.inputValue.length===0?disabled:""}
                                  // onClick={this.sendMessage}
                                  style={{ color: "white", padding: "0" }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35"
                                    height="35"
                                    fill="lightseagreen"
                                    className="bi bi-plus-circle-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                  </svg>
                                </button>
                              </Upload>
                            </div>
                          </React.Fragment>
                        }
                      />
                    </div>
                  </div>
                </ResizeObserver>
              </div>
              {/*<div className="w-25 h-100">*/}
              {/*    <UsersList Cid={this.state.ChatroomID} />*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Chatroom;
