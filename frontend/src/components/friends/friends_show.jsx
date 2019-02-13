import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { fetchFriends, sendFriendRequest, acceptFriendRequest, deleteFriend } from '../../actions/friend_actions';


const msp = (state) => {
  let users;
  if (state.entities.users) {
    users = Object.values(state.entities.users);
  }
  return {
    users: users,
    friends: Object.values(state.entities.friends),
  };
};

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFriends: () => dispatch(fetchFriends()),
    sendFriendRequest: data => dispatch(sendFriendRequest(data)),
    acceptFriendRequest: data => dispatch(acceptFriendRequest(data)),
    deleteFriend: data => dispatch(deleteFriend(data))
  };
};

class FriendsShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {id: "", username: "", accepted: false, add: true, type: "Incoming", friends: null};
    this.sendFriendRequest = this.sendFriendRequest.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.showPending = this.showPending.bind(this);
    this.showAllFriends = this.showAllFriends.bind(this);
  }
  

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchFriends();
  }

  sendFriendRequest(e, friend) {
    e.stopPropagation();
    this.setState({ id: friend.id, username: friend.username, accepted: false, add: true, type: "Incomng"}, () => 
    this.props.sendFriendRequest(this.state));
  }

  acceptFriendRequest(e, friend) {
    e.stopPropagation();
    this.setState({ id: friend.id, username: friend.username, add: true, accepted: true }, () => 
    this.props.acceptFriendRequest(this.state));
  }

  deleteFriend(e, friend) {
    e.stopPropagation();
    this.setState({ id: friend.id, username: "", add: false }, () => 
    this.props.deleteFriend(this.state));
  }

  showPending() {
    this.setState({ friends: this.props.friends.map((friend, idx) => {
      let pending = "pending";
      if (friend.type === "Incoming" && friend.accepted === false) {
        pending = <button 
                    onClick={(e) => this.acceptFriendRequest(e, {id: friend._id, username: friend.username})}>
                    accept
                  </button>
      }
      return (
        <li key={idx}>
          {friend.username} {pending}
          <button onClick={(e) => this.deleteFriend(e, { id: friend._id })}>delete</button>
        </li>
      )
    }) }); 
  }

  showAllFriends() {
    this.setState({ friends: this.props.friends.map((friend, idx) => {
      if (friend.accepted === true) {
        return (
          <li key={idx}>
            {friend.username}
            <button onClick={(e) => this.deleteFriend(e, { id: friend._id })}>delete</button>
          </li>
        )
      }
    })});
  }

  render() {
    let users2;
    if (this.props.users) {
      users2 = this.props.users.map(user => {
        return (

          <li>
            email: {user.email}, username: {user.username}
            <button onClick={(e) => this.sendFriendRequest(e, {id: user.id, username: user.username})}>send request</button>
          </li>
        )
      })
    }

    return (
      <div className="friends-show-container">
        <div className="friends-status-bar">
          <div className="add-friend">Add friend</div>
          <div onClick={() => this.showAllFriends()}>All</div>
          <div>Online</div>
          <div onClick={() => this.showPending()}>Pending</div>
          {/* <div>{this.state.pending}</div> */}
        </div>
        <div className="name-status-bar">
          <div>Name </div><div className="line"></div> 
          <div>Status </div><div className="line"></div>
        </div>
          <div className="friends">
            <ul className="friends-list">
              {this.state.friends}
            </ul>
          </div>
        <div>users test {users2}</div>
        </div>
    )
  }

};

export default connect(msp, mdp)(FriendsShow);