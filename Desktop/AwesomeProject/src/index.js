import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator, DrawerItems, DrawerActions} from 'react-navigation-drawer';

import React, {Component} from 'react';
import Map from './components/Map/index';
import Register from './components/Loggin-Register/Register'
import Login from './components/Loggin-Register/Login'
import Loading from './components/Loading/index'
import Perfil from './components/Perfil/index'
import PinInfo from './components/PinInfo/index'
import ChangeName  from './components/Perfil/ChangeName'
import ChangeEmail  from './components/Perfil/ChangeEmail'
import ChangePass  from './components/Perfil/ChangePass'
import ResetPass from './components/Loggin-Register/ResetPass'
import Create from './components/PinInfo/Categorias/Crear'
import Buscar from './components/Buscar/index'
import Pin from './components/Map/pin'

import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBG9uPUwI-Xmy4DmRMFhkF1eIOhukY41A4",
    authDomain: "comunity-d0077.firebaseapp.com",
    databaseURL: "https://comunity-d0077.firebaseio.com",
    projectId: "comunity-d0077",
    storageBucket: "comunity-d0077.appspot.com",
    messagingSenderId: "797208201021",
    appId: "1:797208201021:web:e44dc979839092b3f22754",
    measurementId: "G-ZCNKVCD2YD"
  };
  // Initialize Firebase
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
const AppDrawer = createDrawerNavigator(
    {
        Inicio:{screen: Map},
        Perfil: {screen: Perfil},
    }
)
const AppSwitch = createSwitchNavigator(
    {
        App: AppDrawer,
        Mapa: Map,
        Login: Login,
        Loading: Loading,
        Register: Register,
        Perfil: Perfil,
        PinInfo: PinInfo,
        ChangeName: ChangeName,
        ChangeEmail: ChangeEmail,
        ChangePass: ChangePass,
        ResetPass: ResetPass,
        Create: Create,
        Buscar: Buscar,
        Pin: Pin

    },
    {
        initialRouteName: "Loading"
    }
)

export default createAppContainer(AppSwitch)
// class App extends Component {
//     render() {
//         return (
//             <Map />
//         );
//     }
// }
// export default App;