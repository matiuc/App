import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

class Register extends React.Component {
  static navigationOptions = {
    title: 'Chatter',
  };

  state = {
    name: '',
  };

  onPress = () =>
    navigation.navigate('Register', { name: this.state.name });

  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder="Flutter God Evan Bacon"
          onChangeText={this.onChangeText}
          value={this.state.name}
        />
        <TouchableOpacity onPress={this.onPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const offset = 24;

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    marginLeft: 100,
    fontSize: 30,
  },
  nameInput: {
    height: offset * 2,

    margin: 100,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 100,
    fontSize: offset,
  },
});

export default Register;