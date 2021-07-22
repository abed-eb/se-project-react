import ReconnectingWebSocket from 'reconnecting-websocket';
import {message} from 'antd';


const key = 'updatable';

export const connect = async (url, showMessage) => {
    if (showMessage)
        message.loading({content: 'Connecting...', key});
    const options = {
        // WebSocket: WS, // custom WebSocket constructor
        connectionTimeout: 1000,
        // maxRetries: 10,
    };
    let rws = new ReconnectingWebSocket(url, [], options);
    return rws
    if (showMessage)
        message.success({content: 'Connected', key, duration: 2});
}
export const listen = async (rws, evtName, func) => {
    if (rws)
        rws.addEventListener(evtName, evt => func(JSON.parse(evt.data)));
}

export const send = async (rws, obj) => {
    if (rws)
        rws.send(JSON.stringify(obj));
}

export const disConnect = async (rws) => {
    if (rws)
        rws.close()
}