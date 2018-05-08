import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class ChatRoom extends Component{

    constructor(){
        super();

        this.state = {
            message: '',
            messages: []
        }
    }

    updateMessages(e){
        this.setState({ message: e.target.value })
    }

    componentDidMount(){
        window.firebase.database().ref('messages/').on('value', snapshot =>{
            const currentmessages = snapshot.val();
            if( currentmessages !== null){
                this.setState({
                    messages: currentmessages
                });
            }
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const list = this.state.messages;
        const newMessage = {
            id:this.state.messages.length,
            text : this.state.message
        };
        window.firebase.database().ref(`messages/${newMessage.id}`)
            .set(newMessage);
        this.setState({message: ''});
    }

    render(){

        const { messages } = this.state;
        const messagesList = messages.map( message => {
            return <li key={message.id}>{ message.text }</li>
        })

        return(
            <div>
                <ul>
                    { messagesList }
                </ul>
                <form onSubmit={ this.handleSubmit.bind(this) }>
                    <input type="text" value={ this.state.message } onChange={ this.updateMessages.bind(this) }/>
                    <button type="submit">
                        Send
                    </button>
                </form>
            </div>
        )
    }
}
export default ChatRoom;