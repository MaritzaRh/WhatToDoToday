import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


// You can import from local files
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';


export default class DetalleLugares extends React.Component {
  static navigationOptions = {
    title: 'Editar lugar',
  };
  constructor(props) {
    super(props);
    const { navigation } = this.props;

    this.state = {
      key: navigation.getParam('nombre', 'NO-ID'),
      nombre: navigation.getParam('nombre', 'NO-ID'),
      direccion: navigation.getParam('direccion', 'NO-ID'),
      latitud: navigation.getParam('latitud', 'NO-ID'),
      longitud: navigation.getParam('longitud', 'NO-ID'),
      categoria: 'Social',
      precio: 'Caro'
    }
  }



  handleSubmit = () =>{
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    // const info = {}
    const { navigate } = this.props.navigation;

    var datos = new FormData();
    datos.append('key', this.state.nombre);
    datos.append('nombre', this.state.nombre);
    datos.append('direccion', this.state.direccion);
    datos.append('latitud', this.state.longitud);
    datos.append('longitud', this.state.latitud);
    datos.append('precio', this.state.precio);
    datos.append('categoria', this.state.categoria);
    datos.append('action', 'modificar');

    
    axios.post('http://10.25.87.5:8000/lugares/', datos, config)
    .then(response => { 
        alert("Lugar modificado exitosamente")
        navigate("HomeScreen")
    })
    .catch(error => {
        console.log(error.response)
    });
    navigate("Home")
    
  }

    handleSubmitDelete = () =>{
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    // const info = {}
    const { navigate } = this.props.navigation;

    var datos = new FormData();
    datos.append('key', this.state.nombre);
    datos.append('nombre', this.state.nombre);
    datos.append('direccion', this.state.direccion);
    datos.append('latitud', this.state.longitud);
    datos.append('longitud', this.state.latitud);
    datos.append('precio', this.state.precio);
    datos.append('categoria', this.state.categoria);
    datos.append('action', 'eliminar');

    
    axios.post('http://10.25.87.5:8000/lugares/', datos, config)
    .then(response => { 
        alert("Lugar eliminado exitosamente")
        navigate("HomeScreen")
    })
    .catch(error => {
        console.log(error.response)
    });
    navigate("Home")
    
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {JSON.stringify(navigation.getParam('nombre', 'NO-ID'))}
        </Text>
        <View style={styles.view}>
          <Card style={styles.card}>
           
            <Input
              placeholder={navigation.getParam('direccion', 'NO-ID')}
              onChangeText = {(text) => {this.setState({direccion: text })}}/>
            <Input
              placeholder={navigation.getParam('latitud', 'NO-ID')}
              onChangeText = {(text) => {this.setState({latitud: text })}}/>
            <Input
              placeholder={navigation.getParam('longitud', 'NO-ID')}
              onChangeText = {(text) => {this.setState({longitud: text })}}/>

          </Card>
        </View>
        <View style={styles.view}>        
        <Button
          buttonStyle={styles.button}
          title="Guardar"
          onPress={this.handleSubmit}
        /></View>
        <View>
        <Button 
          onPress={this.handleSubmitDelete}
          title="Eliminar" 
          buttonStyle={styles.buttonDelete}>
        </Button>
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
    paddingBottom: 20
  },
  card:{
    padding:10,
    margin: 4
  },
  buttonDelete:{
    padding:10,
    backgroundColor: "#DC143C",
  },
  button:{
    padding:10,
    backgroundColor: "#E91E63",
  }
});