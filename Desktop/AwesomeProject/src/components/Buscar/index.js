
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button,
  Picker, Dimensions, 
  TouchableOpacity, 
  Image
} from 'react-native';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
export default class screen1 extends Component {
  constructor() {
    super();
    this.state = {
      categoria: '',
      comuna: "",
      proximidad: "",

    }

  };
  clickme = () => {
    this.props.navigation.navigate("Mapa", { cat: this.state.categoria,
    com: this.state.comuna, prox: this.state.proximidad })

  }
  handleBack = () => {
    this.props.navigation.navigate("Mapa")
}
  render() {
    return (
      <View style={styles.Pagina}>
        <TouchableOpacity style={styles.back} onPress={this.handleBack}>
                <Image source={require('AwesomeProject/assets/back.png')}

                    style={{ width: 50, height: 50 }} />
            </TouchableOpacity>

        <View style={styles.MainContainer}>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Categoria
        </Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.categoria}
              onValueChange={(itemValue, itemIndex) => this.setState({ categoria: itemValue })}
            >
              <Picker.Item label="Cualquiera" value="" />
              <Picker.Item label="Recreacion" value="Recreacion" />
              <Picker.Item label="Fiesta" value="Fiesta" />
              <Picker.Item label="Deporte" value="Deporte" />
              <Picker.Item label="Musica" value="Musica" />
              <Picker.Item label="Arte" value="Arte" />
              <Picker.Item label="Familiar" value="Familiar" />
            </Picker>

          </View>
          <View style={styles.container2}>
            <Text style={styles.welcome}>
              Comuna
        </Text>
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

          </View>

          <View style={styles.container3}>
            <Text style={styles.welcome}>
              Proximidad
        </Text>
            <Picker

              style={styles.picker}
              selectedValue={this.state.proximidad}
              onValueChange={(itemValue, itemIndex) => this.setState({ proximidad: itemValue })}
            >

              <Picker.Item label="Cualquiera" value="" />
              <Picker.Item label="Hoy" value="Hoy" />
              <Picker.Item label="Mañana" value="Mañana" />
              <Picker.Item label="Esta Semana" value="Esta Semana" />
            </Picker>

          </View>

          <Button style={styles.boton} 
        title="Filtrar" onPress={this.clickme} />
        </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  Pagina: {
    flex: 1,
    // alignItems: 'center'
    backgroundColor: "#E9446A",
    
  },
  container: {
    alignItems: 'center',
    flexDirection: "row",
  },
  container2: {
    alignItems: 'center',
    flexDirection: "row",
  },
  container3: {
    alignItems: 'center',
    flexDirection: "row",
  },
  MainContainer: {
    flex: 1,
    marginTop: HEIGHT / 50,
    justifyContent: 'space-around',
    backgroundColor: "#E9446A",
    marginLeft: HEIGHT / 50,
    marginRight: HEIGHT / 50,
    marginBottom: HEIGHT / 30,
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: HEIGHT / 10,
    marginBottom: 0,
  },
  picker: {
    width: '80%',
    marginBottom: 0,
    marginTop: HEIGHT / 10
  },
  boton: {
    marginTop: 0
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
    justifyContent: 'center'}
});