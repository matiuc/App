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
    TextInput, ActivityIndicator, ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

import Map from '../../Map'
import * as firebase from "firebase";
import nextId from "react-id-generator";
import FastImage from "react-native-fast-image"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class Create extends React.Component {

    state = {
        title: '',
        description: '',
        errorMessage: null,
        mail: '',
        date: new Date(),
        mode: 'date',
        show: false,

    };

    onChangeDes = description => this.setState({ description });
    onChangeTitle = title => this.setState({ title });

    crear = (latitude, longitud, nombre, descripcion) => {
        // Alert.alert(this.state.latitude);
        pinId = nextId();
        firebase.database().ref('Pins/' + pinId).set({
            latitude: latitude,
            longitud: longitud,
            nombre: nombre,
            descripcion: descripcion,
            categoria: "Recreacion"

        });
        this.props.navigation.navigate("App")
    }
    handleBack = () => {
        this.props.navigation.navigate("PinInfo")
    }

    render() {
        const categoria = this.props.navigation.getParam('categoria')
        const latitude = this.props.navigation.getParam('latitude');
        const longitud = this.props.navigation.getParam('longitud');
        return (
            <View style={styles.Pagina}>

                <View style={styles.titulo_space}>
                    <Text style={styles.titulo}>
                        {categoria}
                    </Text>
                    <TouchableOpacity style={styles.image} onPress={this.handleChooseImage}>
                        <FastImage
                            style={{ width: WIDTH, height: HEIGHT / 3.5, }}
                            source={require('AwesomeProject/assets/p.png')}
                            onLoadStart={() => { this.setState({ loading: true }) }}
                            onLoadEnd={() => { this.setState({ loading: false }) }}
                        >
                            <ActivityIndicator style={{ top: 0 }} size="large" animating={this.state.loading} />
                        </FastImage>
                    </TouchableOpacity>
                </View>


                <ScrollView style={styles.MainContainer}>

                    <Text style={styles.inputTitle}>Nombre del Evento</Text>
                    <TextInput
                        style={{ top: HEIGHT / 100, height: 40, borderColor: 'gray', borderWidth: 1 }}
                        autoCapitalize="words"
                        onChangeText={this.onChangeTitle}
                        value={this.state.title}
                        maxLength={30}
                    ></TextInput>


                    <Text style={styles.inputTitle2}>Descripción</Text>
                    <TextInput
                        style={{ top: HEIGHT / 30, height: HEIGHT / 5, borderColor: 'gray', borderWidth: 1 }}
                        autoCapitalize="sentences"
                        multiline={true}
                        maxLength={100}
                        onChangeText={this.onChangeDes}
                        value={this.state.description}
                    />
                    <DatePicker
                        style={styles.spin}
                        date={this.state.date}
                        onDateChange={date => this.setState({ date })}

                    />


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
        marginBottom: HEIGHT / 10,
    },

    Pagina: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: "white",

    },
    titulo_space: {
        alignItems: "center",
        backgroundColor: 'black',
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
        fontSize: 16,
        textTransform: "uppercase"
    },
    inputTitle2: {
        top: HEIGHT / 30,
        color: "#8A8F9E",
        fontSize: 16,
        textTransform: "uppercase"
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