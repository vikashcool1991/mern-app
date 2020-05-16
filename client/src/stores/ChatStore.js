import io from 'socket.io-client';
import { observable, computed, action, runInAction } from 'mobx'

socketURL = 'http://localhost:3001/chat';

class ChatStore {
    constructor(){
        this.socket = io(socketURL);
        this.socket.on('connect', () => {
            console.log('Socket connected.');
        });
    }
}

export default new ChatStore();
export { ChatStore };
