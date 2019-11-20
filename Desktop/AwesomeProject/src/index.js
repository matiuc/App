import React from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';


const App = () => <View style={{flex: 1}}>
     <MapView 
     style={{flex:1}}
     provider= {'google'}
     region={{
         latitude: -22.903539,
         longitude: -43.209587,
         latitudeDelta: 0.0035,
         longitudeDelta: 0.0035,
     }}/>
</View>;

export default App;
 