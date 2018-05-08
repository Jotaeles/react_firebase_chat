import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class ChatRoom extends Component{

    constructor(){
        super();

        this.state = {
            message: '',
            messages: [
                // {id: 0, text:'text1'}
            ]
        }
    }

    updateMessages(e){
        this.setState({ message: e.target.value })
        console.log(this.state.message);
    }

    componentDidMount(){
        window.firebase.database().ref('messages/').on('value', snapshot =>{
            const currentmessages = snapshot.val();
            if( currentmessages !== null){
                this.state({
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
        list.push(newMessage);
        this.setState({messages : list});
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