import io from 'socket.io-client';
const sockets = io('https://umdom.by:4434', { autoConnect: true, forceNew: true });
//const sockets = io('https://servicerobot.pro:4434', { autoConnect: true, forceNew: true });
//const sockets = io('/');
export default sockets;
