import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class Lugares extends React.Component {
  static navigationOptions = {
    title: 'Lugares',
  };
  constructor(props) {
    super(props);
    this.state = {
      lugares:[]
    }
  }

  componentDidMount(){
    let lugares;
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    axios.get(`http://10.25.87.5:8000/lugares`, config)
    .then((response) => {
      lugares = response.data.lugares;

      this.setState({
        lugares: lugares,
      });
    })
    .catch((error) => {
        // alert("Not here")
    });
  }  

  render() {
    const { navigate } = this.props.navigation;
    const items = this.state.lugares.map(function(item){
      return  <Card onPress = {() => navigate("DetalleLugar", {
                  key: item.nombre, 
                  nombre: item.nombre,
                  direccion: item.direccion,
                  latitud: item.latitud,
                  longitud: item.longitud,
                  categoria: item.categoria,
                  precio: item.precio
                  })} 
                  style={styles.card}>
                <Text>
                  {item.nombre}
                </Text>
                
              </Card>
              ;
    });
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Selecciona un lugar a modificar
        </Text>
        <View style={styles.view}>
          {items}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  view:{
    paddingBottom: 30
  },
  card:{
    padding:10,
    margin: 4
  },
  button:{
    backgroundColor: "#ff5c5c",
    marginLeft: "70%" ,
    width: 100,
    height: 35
  }
});

function compare(a, b) {
  let comparison = 0;
  if (a.distance > b.distance) {
    comparison = 1;
  } else if (a.distance < b.distance) {
    comparison = -1;
  }
  return comparison;
}