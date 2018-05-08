import React, { Component } from 'react';

import ChatRoom from './components/ChatRoom';

class App extends Component{
    render(){
        return(
            <div>
                <h1>Chat Room</h1>
                <ChatRoom/>
            </div>
        )
    }
}

export default App;
