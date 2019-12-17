import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    Button,
    TextInput, ActivityIndicator, ScrollView,  StatusBar
} from 'react-native';


import * as firebase from "firebase";
import FastImage from "react-native-fast-image"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class Pin extends React.Component {

    state = {
        title: '',
        description: '',
        categoria: '',
        errorMessage: null,
        url: "",

    };

    
    handleBack = () => {
        this.props.navigation.navigate("Mapa")
    }

    async componentDidMount() {
        const id = this.props.navigation.getParam('id', 'NO-ID');
        firebase.database().ref("Pins").child(id).once("value", async (data) => {
            json = data.toJSON()
            url = json["photoUrl"]
            title = json["nombre"]
            description = json["descripcion"]
            categoria = json["categoria"]

            this.setState({
                url: { uri: url , priority: FastImage.priority.high,},
                title: title,
                description: description,
                categoria: categoria,

            });

        
        }
        )}
    
    render() {

        return (
            <View style={styles.Pagina}>
                <View style={styles.titulo_space}>
                    
                    <TouchableOpacity style={styles.image} onPress={this.handleChooseImage}>
                        <FastImage
                            style={{ width: WIDTH, height: HEIGHT / 3.5, }}
                            source={this.state.url}
                            onLoadStart={() => { this.setState({ loading: true }) }}
                            onLoadEnd={() => { this.setState({ loading: false }) }}
                        >
                            <ActivityIndicator style={{ top: HEIGHT/10 }} size="large" animating={this.state.loading} />
                        </FastImage>
                    </TouchableOpacity>
                </View>


                <ScrollView style={styles.MainContainer}>

                <Text style={styles.inputTitle}>{this.state.title}</Text>


                <Text style={styles.inputTitle2}>{this.state.description}</Text>

                    


                </ScrollView>

                <TouchableOpacity style={styles.button}
                    onPress={() => { this.crear(latitude, longitud, this.state.title, this.state.description) }}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Crear</Text>
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
        top: HEIGHT / 20,
        backgroundColor: "white",
        marginHorizontal: HEIGHT / 50,
    },

    Pagina: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: "white",

    },
    titulo_space: {
        alignItems: "center",
        backgroundColor: 'white',
    },

    titulo: {
        color: "white",
        fontWeight: "700",
        marginTop: HEIGHT / 22,
        marginBottom: 0,
        fontSize: 25
    },
    inputTitle: {
        top: HEIGHT / 100,
        color: "#8A8F9E",
        fontSize: 20,

        
    },
    inputTitle2: {
        top: HEIGHT / 30,
        color: "#8A8F9E",
        fontSize: 16,
    },
    button: {
        bottom: HEIGHT / 30,
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
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
    image: {
        top: HEIGHT / 30,
        marginLeft: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    spin: {
        top: HEIGHT / 25,
        width: WIDTH,
        height: 200,

    }
});