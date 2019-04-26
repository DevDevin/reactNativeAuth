import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "firebase";
import { Header, Button, Spinner } from "./components/common/index";
import LoginForm from "./components/LoginForm";

class App extends Component {
  state = {
    loggedIn: null
  };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBMook3mhqhTzEXzY1E_o6liE8fi1R-QaM",
      authDomain: "authentication-b38f6.firebaseapp.com",
      databaseURL: "https://authentication-b38f6.firebaseio.com",
      projectId: "authentication-b38f6",
      storageBucket: "authentication-b38f6.appspot.com",
      messagingSenderId: "392554481902"
    });

    // this event is called any time the auth state is changed
    // so any time a user is logged in or out
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  // dynamically change the button that is displayed
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button> onPress={() => firebase.auth().signOut()}Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
