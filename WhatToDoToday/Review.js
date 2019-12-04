import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class Review extends React.Component {
  static navigationOptions = {
    title: 'Reseñas',
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

    axios.get(`http://10.25.87.5:8000/resenas`, config)
    .then((response) => {
      lugares = response.data;

      this.setState({
        lugares: lugares
      });
    })
    .catch((error) => {
        // alert("Not here")
    });
  }  

  render() {
    const items = this.state.lugares.map(function(item){
      return  <Card style={styles.card}>
                <Text style={styles.titleText}>
                  {item.lugar}
                </Text>
                <Text>
                  {item.texto}
                </Text>
              </Card>;
    });
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Reseñas
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
  titleText:{
    fontSize: 15,
    fontWeight: 'bold',
  }
});