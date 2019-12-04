import * as React from 'react';
import { Text, View, StyleSheet, Picker } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';
import { Input, Button} from 'react-native-elements';
import axios from 'axios';


// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class RegistroLugar extends React.Component {
  static navigationOptions = {
    title: 'Registrar lugar',
  };

  componentDidMount(){
    axios.get('http://10.25.87.5:8000/categorias/')
     .then((response) => {
        var cat = response.data
        //alert(cat)
        this.setState({categorias:cat})
         

    })
    .catch((error) => {
      //alert("Algo salió mal.")
    });

    axios.get('http://10.25.87.5:8000/precios/')
     .then((response) => {
        var p = response.data
        //alert(cat)
        this.setState({precios:p})
         

    })
    .catch((error) => {
      //alert("Algo salió mal.")
    });
  }

  state = {
    nombre : '',
    direccion: '',
    categoria: 1,
    precio: 2,
    latitud: 100,
    longitud: 50,
    categorias: [],
    precios: []
  }

  handleSubmit = () =>{
    const { navigate } = this.props.navigation;

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    // const info = {}

    var datos = new FormData();
    datos.append('nombre', this.state.nombre);
    datos.append('direccion', this.state.direccion);
    datos.append('latitud', this.state.longitud);
    datos.append('longitud', this.state.latitud);
    datos.append('precio', this.state.precio);
    datos.append('categoria', this.state.categoria);
    datos.append('action', 'registrar');



    
    axios.post('http://10.25.87.5:8000/lugares/', datos, config)
    .then(response => { 
        alert("Lugar registrado exitosamente")
    })
    .catch(error => {
        console.log(error.response)
    });

    navigate("Home")

    
    
  }

  render() {
    const items = this.state.categorias.map(function(item){
      return <Picker.Item label={item.nombre} value={item.nombre} />;
    });

    const itemsp = this.state.precios.map(function(item){
      return <Picker.Item label={item.nombre} value={item.nombre} />;
    });
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Registra un lugar
        </Text>
        <View style={styles.view}>
          <Card style={styles.card}>
            
            <Input
              placeholder='Nombre'
              onChangeText = {(text) => {this.setState({nombre: text })}}
            />
            <Input
              placeholder='Direccion'
              onChangeText = {(text) => {this.setState({direccion: text })}}

            />
            <Input
              placeholder='Latitud'
              onChangeText = {(text) => {this.setState({latitud: text })}}
            />
            <Input
              placeholder='Longitud'
              onChangeText = {(text) => {this.setState({longitud: text })}}

            />
            
            <Picker
              placeholder='Categoria'
              selectedValue={this.state.categoria}
              style={{height: 50, width: 350}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({categoria: itemValue})
              }>
              <Picker.Item label="Categoria" value="Social" />
              {items}

            </Picker>

            <Picker
              placeholder = 'Precio'
              selectedValue={this.state.precio}
              style={{height: 50, width: 350}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({precio: itemValue})
              }>
              <Picker.Item  label="Precio" value="Caro" />
              {itemsp}
            </Picker>

          </Card>
        </View>
        <Button buttonStyle={styles.button}
            title="Registrar"
            onPress={this.handleSubmit}

          />
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
    padding:15
  },
  button:{
    backgroundColor: "#E91E63",
  }
});

