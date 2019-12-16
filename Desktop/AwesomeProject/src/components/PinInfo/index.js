import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import * as firebase from "firebase";

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height


export default class PinInfo extends Component {


  handleBack = () => {
    this.props.navigation.navigate("Mapa")
}

  crear_evento = (categoria, latitude, longitud) => {
    console.log(latitude);
    this.props.navigation.navigate("Create", {latitude: latitude, 
      longitud: longitud, categoria: categoria });
  }
  render() {
    const latitude = this.props.navigation.getParam('latitude');
    const longitud = this.props.navigation.getParam('longitud');
    return (

      <View style={styles.Pagina}>
        <TouchableOpacity style={styles.back} onPress={this.handleBack}>
                <Image source={require('AwesomeProject/assets/back.png')}

                    style={{ width: 50, height: 50 }} />
            </TouchableOpacity>

        <View style={styles.titulo_space}>
          <Text style={styles.titulo}>
            ¿Quieres crear un evento?
        </Text>
        </View>

        <View style={styles.MainContainer}>

          <View style={styles.row12}>

            <View style={styles.row1}>


              <TouchableOpacity
                style={styles.evento1}
                onPress={() => { this.crear_evento("Recreacion", latitude, longitud) }}>

                <Image
                  style={styles.evento1}
                  source={require('AwesomeProject/assets/add.png')}
                />
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.evento2}
                onPress={() => { this.crear_evento("Fiesta", latitude, longitud) }}>

                <Image
                  style={styles.evento2}
                  source={require('AwesomeProject/assets/add.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row2}>
              <TouchableOpacity
                style={styles.n_evento1}
                onPress={() => { this.crear_evento("Recreacion") }}>
                <Text> Recreación </Text>
                <Image

                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.n_evento2}
                onPress={() => { this.crear_evento("Fiesta") }}>
                <Text>     Fiesta </Text>
                <Image

                />
              </TouchableOpacity>


            </View>
          </View>

          {/* ##########################################
##########################################
########################################## */}

          <View style={styles.row34}>

            <View style={styles.row3}>


              <TouchableOpacity
                style={styles.evento3}
                onPress={() => { this.crear_evento("Deporte", latitude, longitud) }}>

                <Image
                  style={styles.evento3}
                  source={require('AwesomeProject/assets/add.png')}
                />
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.evento4}
                onPress={() => { this.crear_evento("Musica", latitude, longitud) }}>

                <Image
                  style={styles.evento4}
                  source={require('AwesomeProject/assets/add.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row4}>
              <TouchableOpacity
                style={styles.n_evento3}
                onPress={() => { this.crear_evento("Deporte") }}>
                <Text>    Deporte </Text>
                <Image

                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.n_evento4}
                onPress={() => { this.crear_evento("Musica") }}>
                <Text>     Música </Text>
                <Image

                />
              </TouchableOpacity>


            </View>
          </View>
          {/* ##########################################
##########################################
########################################## */}

          <View style={styles.row56}>

            <View style={styles.row5}>


              <TouchableOpacity
                style={styles.evento5}
                onPress={() => { this.crear_evento("Arte", latitude, longitud)}}>

                <Image
                  style={styles.evento5}
                  source={require('AwesomeProject/assets/add.png')}
                />
              </TouchableOpacity>


              <TouchableOpacity
                style={styles.evento6}
                onPress={() => {this.crear_evento("Familiar", latitude, longitud)}}>

                <Image
                  style={styles.evento6}
                  source={require('AwesomeProject/assets/add.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.row6}>
              <TouchableOpacity
                style={styles.n_evento5}
                onPress={() => { this.crear_evento("Arte") }}>
                <Text>        Arte </Text>
                <Image

                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.n_evento6}
                onPress={() => { this.crear_evento("Familiar") }}>
                <Text>    Familiar </Text>
                <Image

                />
              </TouchableOpacity>


            </View>
          </View>

        </View >

      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    marginTop: HEIGHT / 50,
    justifyContent: 'space-around',
    backgroundColor: "#E9446A",
    marginLeft: HEIGHT / 50,
    marginRight: HEIGHT / 50,
    marginBottom: HEIGHT / 50,
  },

  Pagina: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: "#E9446A",
    
  },

  evento1: {
    width: HEIGHT / 15,
    height: HEIGHT / 15,
    flexDirection: 'row',
  },
  n_evento1: {
    width: HEIGHT / 10,
    height: HEIGHT / 40,
    flexDirection: 'row',
    backgroundColor: "#E9446A",
  },

  evento2: {
    width: HEIGHT / 15,
    height: HEIGHT / 15,
    flexDirection: 'row',
  },
  n_evento2: {
    width: HEIGHT / 10,
    height: HEIGHT / 40,
    flexDirection: 'row',
    backgroundColor: "#E9446A",
  },
  row1: {
    justifyContent: "space-around",
    backgroundColor: "#E9446A",
    flexDirection: 'row',
  },
  row2: {
    justifyContent: "space-around",
    backgroundColor: "#E9446A",
    flexDirection: 'row',
  },

  evento3: {
    width: HEIGHT / 15,
    height: HEIGHT / 15,
    flexDirection: 'row',
  },
  n_evento3: {
    width: HEIGHT / 10,
    height: HEIGHT / 40,
    flexDirection: 'row',
    backgroundColor: "#E9446A",
  },

  evento4: {
    width: HEIGHT / 15,
    height: HEIGHT / 15,
    flexDirection: 'row',
  },
  n_evento4: {
    width: HEIGHT / 10,
    height: HEIGHT / 40,
    flexDirection: 'row',
    backgroundColor: "#E9446A",
  },

  row3: {
    justifyContent: "space-around",
    backgroundColor: "#E9446A",
    flexDirection: 'row',
  },
  row4: {
    justifyContent: "space-around",
    backgroundColor: "#E9446A",
    flexDirection: 'row',
  },

  evento5: {
    width: HEIGHT / 15,
    height: HEIGHT / 15,
    flexDirection: 'row',
  },
  n_evento5: {
    width: HEIGHT / 10,
    height: HEIGHT / 40,
    flexDirection: 'row',
    backgroundColor: "#E9446A",
  },

  evento6: {
    width: HEIGHT / 15,
    height: HEIGHT / 15,
    flexDirection: 'row',
  },
  n_evento6: {
    width: HEIGHT / 10,
    height: HEIGHT / 40,
    flexDirection: 'row',
    backgroundColor: "#E9446A",
  },

  row5: {
    justifyContent: "space-around",
    backgroundColor: "#E9446A",
    flexDirection: 'row',
  },
  row6: {
    justifyContent: "space-around",
    backgroundColor: "#E9446A",
    flexDirection: 'row',
  },

  titulo: {
    color: "black",
    marginTop: HEIGHT / 10,
    marginBottom: 0,
    fontSize: 16
  },

  titulo_space: {
    alignItems: "center"
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