import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator, DrawerItems, DrawerActions} from 'react-navigation-drawer';

import React, {Component} from 'react';
import Map from './components/Map';
import Register from './components/Loggin-Register/Register'
import Login from './components/Loggin-Register/Login'
import Loading from './components/Loading/index'
import Perfil from './components/Perfil/index'
import PinInfo from './components/PinInfo/index'
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
        PinInfo:{screen: PinInfo}
    }
)
const AppSwitch = createSwitchNavigator(
    {
        App: AppDrawer,
        Login: Login,
        Loading: Loading,
        Register: Register,
        Perfil: Perfil,
        PinInfo: PinInfo
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