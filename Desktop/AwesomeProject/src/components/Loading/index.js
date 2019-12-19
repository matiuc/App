import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View, ActivityIndicator
} from 'react-native';
import * as firebase from 'firebase'

class Loading extends React.Component {
  componentDidMount(){
      firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? "App" : "Login")
      })
  }

  render() {
    return (
      <View style={styles.container}>
          <Text>Loading...</Text>
          <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
}

const offset = 24;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center"
  },
})


export default Loading;