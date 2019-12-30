import React from 'react';
import ImagePicker from 'react-native-image-picker';

import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    Button,
    TextInput, ActivityIndicator, ScrollView,
    KeyboardAvoidingView, Picker
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import * as firebase from "firebase";
import 'firebase/firestore'
import nextId, { setPrefix } from "react-id-generator";
import FastImage from "react-native-fast-image"


const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
var uuid = require('react-native-uuid');


export default class Create extends React.Component {

    state = {
        title: '',
        description: '',
        errorMessage: null,
        mail: '',
        date: new Date(),
        comuna: '',
        show: false,
        avatarSource: "",

    };

    onChangeDes = description => this.setState({ description });
    onChangeTitle = title => this.setState({ title });

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

    handleChooseImage = () => {
        ImagePicker.showImagePicker({ noData: true, mediaType: "photo", allowsEditing: true }, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                this.setState({
                    avatarSource: { uri: response.uri, priority: FastImage.priority.high, }
                })
            }
        });
    };


    crear = (latitude, longitud, nombre, descripcion, categoria, comuna) => {
        const fecha = this.state.date.toString().split(" ")
        var dia = ""
        var mes = ""
        const dia_numero = fecha[2]
        const año = fecha[3]
        const hora = fecha[4].split(":")
        const h = hora[0]
        const m = hora[1]
        if (fecha[0] === "Sun"){
            dia = "Domingo" 
        }if (fecha[0] === "Mon"){
            dia = "Lunes" 
        }if (fecha[0] === "Tue"){
            dia = "Martes" 
        }if (fecha[0] === "Wed"){
            dia = "Miércoles" 
        }if (fecha[0] === "Thu"){
            dia = "Jueves" 
        }if (fecha[0] === "Fri"){
            dia = "Viernes" 
        }if (fecha[0] === "Sat"){
            dia = "Sábado" 
        }if (fecha[1] === "Dec"){
            mes = "Diciembre" 
        }if (fecha[1] === "Jan"){
            mes = "Enero" 
        }if (fecha[1] === "Feb"){
            mes = "Febrero" 
        }if (fecha[1] === "Mar"){
            mes = "Marzo" 
        }if (fecha[1] === "Apr"){
            mes = "Abril" 
        }if (fecha[1] === "May"){
            mes = "Mayo" 
        }if (fecha[1] === "Jun"){
            mes = "Junio" 
        }if (fecha[1] === "Jul"){
            mes = "Julio" 
        }if (fecha[1] === "Aug"){
            mes = "Agosto" 
        }if (fecha[1] === "Sep"){
            mes = "Septiembre" 
        }if (fecha[1] === "Oct"){
            mes = "Octubre" 
        }if (fecha[1] === "Nov"){
            mes = "Noviembre" 
        }
        const fecha_actualizada= dia.toString()+" "+dia_numero.toString()+" de "+mes.toString()+ 
        " " + año.toString()
        const time = h.toString() + ":"+ m.toString()
        const comuna_categoria = comuna.toString()+"_"+categoria.toString()
        const comuna_fecha = comuna.toString()+"_"+fecha[1].toString()+dia_numero.toString()
        +año.toString()
        const categoria_fecha = categoria.toString()+"_"+fecha[1].toString()+dia_numero.toString()
        +año.toString()
        const comuna_categoria_fecha = comuna.toString()+"_"+categoria.toString()+
        "_"+fecha[1].toString()+dia_numero.toString()
        +año.toString()
        const fecha_filtro = fecha[1].toString()+dia_numero.toString()
        +año.toString()
        
        this.uriToBlob(this.state.avatarSource.uri).then(async (resolve) => {
            pinId = uuid.v1();
            const userId = firebase.auth().currentUser.uid;
            const esperar = await firebase.storage().ref("Pins").child(pinId + "/Image").put(resolve)
            firebase.storage().ref("Pins").child(pinId + "/Image").getDownloadURL().then(url =>
                firebase.database().ref('Pins/' + pinId).set({
                    latitude: latitude,
                    longitud: longitud,
                    nombre: nombre,
                    descripcion: descripcion,
                    categoria: categoria,
                    id: pinId,
                    photoUrl: url,
                    userId: userId,
                    likes: [],
                    comments: [],
                    date: fecha_actualizada,
                    time: time,
                    comuna: comuna,
                    comuna_categoria: comuna_categoria,
                    comuna_fecha: comuna_fecha,
                    categoria_fecha: categoria_fecha,
                    comuna_categoria_fecha: comuna_categoria_fecha,
                    fecha: fecha_filtro
                }).catch((error) => {
                    console.log(error.message)
                })

            )
        })


        this.props.navigation.navigate("Mapa")
    }
    handleBack = () => {
        this.props.navigation.navigate("PinInfo")
    }

    async componentDidMount() {
        firebase.storage().ref('Default').child('default-image.jpg').getDownloadURL().then(url => {
            this.setState({
                avatarSource: { uri: url, priority: FastImage.priority.high, },


            });
        })


    }

    render() {
        const categoria = this.props.navigation.getParam('categoria');
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
                            source={this.state.avatarSource}
                            onLoadStart={() => { this.setState({ loading: true }) }}
                            onLoadEnd={() => { this.setState({ loading: false }) }}
                        >
                            <ActivityIndicator style={{ top: HEIGHT / 10 }} size="large" animating={this.state.loading} />
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
                    ></TextInput>

                    <Text style={styles.inputTitle2}>Descripción</Text>
                    <TextInput
                        style={{ top: HEIGHT / 30, height: HEIGHT / 5, borderColor: 'gray', borderWidth: 1 }}
                        autoCapitalize="sentences"
                        multiline={true}
                        onChangeText={this.onChangeDes}
                        value={this.state.description}
                    />
                        <Text style={styles.inputTitle3}>Comuna</Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.comuna}
                            onValueChange={(itemValue, itemIndex) => this.setState({ comuna: itemValue })}
                        >
                            <Picker.Item label="Cualquiera" value="" />
                            <Picker.Item label="La Reina" value="La Reina" />
                            <Picker.Item label="Ñuñoa" value="Nunoa" />
                            <Picker.Item label="Providencia" value="Providencia" />
                        </Picker>
                        <Text style={styles.inputTitle4}>Fecha</Text>
                    <DatePicker
                        textColor="#333"
                        style={styles.spin}
                        date={this.state.date}
                        value={this.state.date}
                        onDateChange={(date) => {
                            this.setState({ date: date })
                        }}
                    />

                </ScrollView>


                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        this.crear(latitude, longitud, this.state.title,
                            this.state.description, categoria, this.state.comuna)
                    }}>
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
    inputTitle3: {
        top: HEIGHT / 11,
        color: "#8A8F9E",
        fontSize: 16,
        textTransform: "uppercase"
    },
    inputTitle4: {
        top: 0,
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
        top: 0,
        width: WIDTH,
        height: HEIGHT / 5,
        justifyContent: "center",
        alignContent: "center"

    },
    picker: {
    }
});