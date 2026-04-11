import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <Divider style={styles.lineaCorta} />
        <ImageBackground 
          source={require('./imagenes/40Años.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.tituloSuperpuesto}>
              {excursion.nombre}
            </Text>
          </View>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>
            {excursion.descripcion}
          </Text>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES
    };
  }

  render() {
    const { excursionId } = this.props.route.params;

    return <RenderExcursion excursion={this.state.excursiones[+excursionId]} />;
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    backgroundColor:'#fff'
  },
  image: {
    marginHorizontal: 0,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  titulo: {
    textAlign: 'center',
  },
  cardTitle: {
    alignItems: 'center',
  },
  lineaCorta:{
    width: '85%',
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginTop: 15,
  },
  imageBackground:{
    width:'100%',
    height:180,
    justifyContent: 'flex-start',
    alignItems:'center',
    marginTop:15,
  },
  imageStyle:{
    resizeMode:'cover',
  },
  tituloSuperpuesto:{
    color:'chocolate',
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
  },
  textContainer:{
    padding:10,
    borderRadius:5,
  },
});

export default DetalleExcursion;