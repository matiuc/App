import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { createDrawerNavigator, DrawerItems, DrawerActions } from 'react-navigation-drawer';
import FastImage from "react-native-fast-image"
import * as firebase from "firebase";
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class Perfil extends Component {
    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                reject(new Error('uriToBlob failed'));
            };

            // this helps us get a blob
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);
            xhr.send(null);

        });

    }
    state = {
        name: "",
        mail: '',
        pass: '',
        errorMessage: null,
        avatarSource: null,
        newImage: null,
        loading: null,
    };
    handleBack = () => {
        this.props.navigation.navigate("Mapa")
    }
    handleChooseImage = () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: "photo" }, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    avatarSource: { uri: response.uri }
                })
                this.uriToBlob(response.uri).then(async (resolve) => {
                    userId = firebase.auth().currentUser.uid
                    const esperar = await firebase.storage().ref(userId).child("/profileImage").put(resolve)
                    firebase.storage().ref(userId).child("/profileImage").getDownloadURL().then(url =>
                        firebase.database().ref().child('users/' + userId).set({
                            username: this.state.name,
                            email: this.state.mail,
                            profileImage: url,
                        }).catch((error) => {
                            console.log(error.message)
                        })

                    )
                })
            }
        });
    };

    async componentDidMount() {
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref("users").child(userId).once("value", async (data) => {
            json = data.toJSON()
            url = json["profileImage"]
            name = json["username"]
            mail = json["email"]

            this.setState({
                avatarSource: { uri: url , priority: FastImage.priority.high,},
                name: name,
                mail: mail,

            });


        })
    }



    // onChangeMail = mail => this.setState({ mail });
    // onChangePass = pass => this.setState({ pass });
    // onChangeName = name => this.setState({ name });

    logOut = () => {
        firebase.auth().signOut();
        this.props.navigation.navigate("Login")
    }
    render() {
        return (

            <View style={styles.MainContainer}>
                <TouchableOpacity style={styles.image} onPress={this.handleChooseImage}>
                    <FastImage
                        style={{ width: 150, height: 150, borderRadius: 100 }}
                        source={this.state.avatarSource}
                        onLoadStart={() => { this.setState({ loading: true }) }}
                        onLoadEnd={() => { this.setState({ loading: false }) }}
                    >
                        <ActivityIndicator style={{top: HEIGHT/12}} size="large" animating={this.state.loading}/>
                    </FastImage>
                </TouchableOpacity>


                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Nombre</Text>
                        <TouchableOpacity style={styles.editName} onPress={() => { this.props.navigation.navigate("ChangeName", { userName: this.state.name }) }}>
                            <Image source={require('AwesomeProject/assets/edit.jpg')}

                                style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={styles.nombre}>{this.state.name}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TouchableOpacity style={styles.editEmail} onPress={() => { this.props.navigation.navigate("ChangeEmail", { email: this.state.mail }) }}>
                            <Image source={require('AwesomeProject/assets/edit.jpg')}

                                style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={styles.nombre}>{this.state.mail}</Text>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TouchableOpacity style={styles.editPassword} onPress={() => { this.props.navigation.navigate("ChangePass") }}>
                            <Image source={require('AwesomeProject/assets/edit.jpg')}

                                style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={styles.nombre}>*********</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.logOut}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Cerrar Sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.back} onPress={this.handleBack}>
                <Image source={require('AwesomeProject/assets/back.png')}

                    style={{ width: 50, height: 50 }} />
            </TouchableOpacity>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        alignItems: 'center',
        top: 0,
        // backgroundColor: "#192879"
    },
    image: {
        top: HEIGHT / 7,
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        top: 40,
        marginHorizontal: 0,
        backgroundColor: "#E9446A",
        height: 52,
        width: 140,
        alignItems: "center",
        justifyContent: "center"
    },
    inputTitle: {
        marginTop: 20,
        height: 30,
        width: 200,
        fontSize: 23
    },
    form: {
        marginLeft: 0,
        marginTop: HEIGHT / 5.5,
    },
    nombre: {
        marginLeft: 0,
        marginTop: 0,
        fontSize: 18
    },
    home: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 45,
        height: 45,
        top: HEIGHT / 25,
        left: WIDTH / 20,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'


    },
    editName: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 45,
        height: 45,
        marginTop: 14,
        marginLeft: 85,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'


    },
    editEmail: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 45,
        height: 45,
        marginTop: 14,
        marginLeft: 145,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'


    },
    editPassword: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 45,
        height: 45,
        marginTop: 14,
        marginLeft: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'


    },
    back: {
        zIndex: 9,
        position: 'absolute',
        flexDirection: 'row',
        width: 50,
        height: 50,
        top: HEIGHT / 25,
        left: WIDTH / 20,
        borderRadius: 50,
        backgroundColor: 'white',
        alignItems: 'center',
        shadowColor: 'black',
        justifyContent: 'center'
    
    
    },

});