import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as firebase from "firebase"

class Login extends React.Component {
  state = {
    mail: '',
    pass: '',
    errorMessage: null
  };

  handleLogin = () => {
    const {mail, pass} = this.state
    firebase.auth().signInWithEmailAndPassword(mail, pass).catch(error=>this.setState({errorMessage: error.message}))
  }


  onChangeText = mail => this.setState({ mail });
  onChangePass = pass => this.setState({ pass });

  render() {
    return (
      <View style={styles.container}>
                <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={this.onChangeText}
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

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 3,top:50, justifyContent:"center", height:40}}
                    onPress={() => this.props.navigation.navigate("Register")}
                >
                    <Text style={{ color: "#414959", fontSize: 13}}>
                        ¿Primera vez con nosotros? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Registrarse</Text>
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 0,top:50, justifyContent:"center", height:40}}
                    onPress={() => this.props.navigation.navigate("ResetPass", {"mail" : this.state.mail})}
                >
                    <Text style={{ color: "#414959", fontSize: 13}}>
                        ¿Olvidaste tu contraseña? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Recuperar</Text>
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
      top:40,
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
      top:40,
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
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
      top:40,
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
      top: 40,
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
      top:40,
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    }
});
export default Login;