import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as firebase from "firebase"

class Register extends React.Component {

  state = {
    name: '',
    mail:'',
    pass: "",
    errorMessage: null
  };

  handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.pass).then(userCredentials => {
      return userId = firebase.auth().currentUser.uid,
      firebase.database().ref('users/' + userId).set({
        username: this.state.name,
        email: this.state.mail,
      });
    })
    .catch(error => this.setState({errorMessage: error.message}))
  };

  onChangeText = name => this.setState({ name });
  onChangeMail = mail => this.setState({ mail });
  onChangePass = pass => this.setState({ pass });

  render() {
    return (
      <View style={styles.container}>
                <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={this.onChangeText}
                            value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={this.onChangeMail}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={this.onChangePass}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32, top:10,justifyContent:"center", height:50}}
                onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        ¿Ya estás registrado? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Iniciar Sesión</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
      top:30,
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
      top:30,
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
      top:30,
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
      top:30,
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
      top:30,
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
      top:30,
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Register;