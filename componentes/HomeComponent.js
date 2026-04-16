import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { CABECERAS } from '../comun/cabeceras';
import { ACTIVIDADES } from '../comun/actividades';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      
      {/*<Divider style={styles.lineaCorta} />*/}
      <ImageBackground 
        //source={require('./imagenes/40Años.png')}
        source={{ uri: baseUrl + item.imagen }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.textContainer}>
          <Text style={styles.tituloSuperpuesto}>
            {item.nombre}
          </Text>
        </View>
      </ImageBackground>
      <Card.Content>
        <Text style={styles.descripcion}>
          {item.descripcion}
        </Text>
      </Card.Content>
    </Card>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      cabeceras: CABECERAS,
      actividades: ACTIVIDADES,
    };
  }

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.state.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.excursiones.filter((item) => item.destacado)[0]} />
        <RenderItem item={this.state.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
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
  imageStyle:{
    resizeMode:'cover',
  },
  imageBackground:{
    width:'100%',
    height:180,
    justifyContent: 'center',
    alignItems:'center',
  },
  lineaCorta:{
    width: '85%',
    height: 1,
    alignSelf: 'center',
    marginTop: 15,
  }
});

export default Home;