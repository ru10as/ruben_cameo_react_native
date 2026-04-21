import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text, Divider } from 'react-native-paper';
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        cabeceras: state.cabeceras,
        actividades: state.actividades
    }
}

function RenderItem({ item }) {
  if (!item) {
    return <View />;
  }

  return (
    <Card style={styles.card}>
      
      <ImageBackground 
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

  render() {

    const cabecera = this.props.cabeceras.cabeceras?.find(item => item.destacado);
    const excursion = this.props.excursiones.excursiones?.find(item => item.destacado);
    const actividad = this.props.actividades.actividades?.find(item => item.destacado);

    return (
      <ScrollView>
          <RenderItem item={cabecera} />
          <RenderItem item={excursion} />
          <RenderItem item={actividad} />
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

export default connect(mapStateToProps)(Home);