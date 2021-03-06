import React, { Component } from 'react';
import { AuthRoute, ProtectedRoute } from './util/route_util.js';
import LogInFormContainer from './components/session/login_form_container';
import SignUpFormContainer from './components/session/signup_form_container';
import HomePage from './components/home/home_page';
import ServerShow from './components/home/server_show';
import MessagesShow from './components/messages/messages_show';
import FriendListShow from './components/friends/friend_list_show';
import FriendsShow from './components/friends/friends_show';
import ServerUsersShow from './components/home/server_users_show';
import Modal from './components/modal';
import './css/App.css';

class App extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return <>
        <Modal />
        <div className="home">
        <AuthRoute exact path="/login" component={LogInFormContainer} />
        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
          <ProtectedRoute path="/" component={HomePage} />
          <ProtectedRoute path="/servers/:serverId" component={ServerShow} />
          {/* <section className="channel-container"> */}
            <ProtectedRoute path="/servers/:serverId/:channelId" component={MessagesShow} />
            <ProtectedRoute path="/servers/:serverId/:channelId" component={ServerUsersShow} /> 
            <ProtectedRoute path="/channels/@me" component={FriendListShow} />
            <ProtectedRoute path="/channels/@me" component={FriendsShow} />
          {/* </section> */}
          {/* <ProtectedRoute component={ChatBox}/> */}
        </div>
      </>;
  }
}

export default App;
