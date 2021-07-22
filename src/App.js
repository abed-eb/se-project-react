import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Component, Fragment} from "react";
import {BrowserRouter} from "react-router-dom";
import PageRouter from "./components/pageRouter";
import {toast, ToastContainer} from "react-toastify";
import {eventViewport, getItem} from "./components/util";
import Chat from "./components/chat/chat";
import {sendToken, getMessaging} from './components/firebase'
import {
    API_REGISTER_FIREBASE_TOKEN,
    STORAGE_KEY,
    WEB_PUSH_CERTIFICATE
} from "./components/constants";
import axios from "axios";

class App extends Component {
    async componentDidMount() {
        window.onresize = () => eventViewport();
        window.onload = () => eventViewport();



        let msg = getMessaging();
        msg.onMessage((payload)=>{
            console.log('message:',payload)
            toast.info(<div>
                <h4 style={{color:"white"}}>
                    {payload.notification.title}
                </h4>
                <p>
                    {payload.notification.body}
                </p>
                </div>
                ,{
                position: "top-right",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        });

        if(getItem('user-token'))
        {
            var FormData = require('form-data');
            var data = new FormData();
            data.append('token', sessionStorage.getItem(STORAGE_KEY+'firebase-token'));

            var config = {
                method: 'post',
                url: API_REGISTER_FIREBASE_TOKEN,
                headers: {
                    Authorization: "Token ".concat(getItem("user-token")),
                },
                data : data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }

    render() {
        return (
            <Fragment>
                <ToastContainer/>
                <BrowserRouter>
                    <PageRouter/>
                </BrowserRouter>
                <Chat/>
            </Fragment>
        );
    }
}

export default App;
