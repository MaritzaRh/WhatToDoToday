import * as React from 'react';
import { Text, View, StyleSheet, Picker, Image } from 'react-native';
import { Input, Button} from 'react-native-elements';


export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Inicio',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
    <View style={styles.viewBig}> 
    <Image source={require('./logopng.png')} style={{width: 350, height: 100}}/>
      <View style={styles.view}>
      <Button buttonStyle={styles.button}
        title="Registrar lugar"
        onPress={() => navigate('Lugar')}
        
      />
      </View>
      <View style={styles.view}>
      <Button buttonStyle={styles.button}
        title="Mostrar reseña"
        onPress={() => navigate('Resena')}
        
      />
      </View>
      <View style={styles.view}>
      <Button buttonStyle={styles.button}
        title="Mostrar lugares"
        onPress={() => navigate('VerLugar')}
        
      />
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBig:{
    paddingTop:20,
    paddingLeft:20,
    paddingRight: 20,
    height:800,
    backgroundColor: "#E91E63",


  },
  view:{
    paddingTop:20,
    paddingBottom:20,
    paddingLeft:20,
    paddingRight: 20,
    backgroundColor: "#E91E63",


  },
  button:{
    backgroundColor: "#E91E63",
  }

});
