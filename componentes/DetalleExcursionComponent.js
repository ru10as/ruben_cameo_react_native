import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper'; 
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

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
          <View style={styles.iconoContainer}> 
            <IconButton 
              icon={props.favorita ? 'heart' : 'heart-outline'} 
              size={28} 
              onPress={() => 
                props.favorita 
                  ? console.log('La excursión ya se encuentra entre las favoritas') 
                  : props.onPress()} 
            /> 
          </View>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}


function RenderComentario(props) { 

  const comentarios = props.comentarios; 

  const renderComentarioItem = ({ item }) => {

      const fechaLimpia = item.dia.replace(/\s/g, '');
      const opciones_fecha = { 
          weekday: 'long',
          day: 'numeric', 
          month: 'long', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit',
      };

      const fechaYHora = new Date(fechaLimpia).toLocaleString('es-ES', opciones_fecha);

      return (
        <View style={{padding:10}}>
          <Text style={{fontSize: 14, margin:2}}>{item.comentario}</Text>
          <Text style={{fontSize: 12, margin:2}}>{item.valoracion} estrellas</Text>
          <Text style={{fontSize: 12, margin:2}}>
            {`-- ${item.autor}, ${fechaYHora}`}
          </Text>
          <Divider style={{ marginTop: 10 }}/>
        </View> 
      )
    }

  return ( 
    <Card style={styles.card}> 
          <Card.Title title="Comentarios" titleStyle={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}></Card.Title> 
          <Card.Content>
            <FlatList
            data={comentarios}
            renderItem={renderComentarioItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            />
          </Card.Content> 
      </Card>
  ); 
} 


class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS, 
      favoritos: [], 
    };
  }

  marcarFavorito(excursionId) { 
      this.setState({
        favoritos: this.state.favoritos.concat(excursionId)
      }); 
  }

  render() {
    const { excursionId } = this.props.route.params;

    return( 
        <ScrollView> 
            <RenderExcursion 
                excursion={this.state.excursiones[+excursionId]} 
                favorita={this.state.favoritos.some(el => el === excursionId)} 
                onPress={() => this.marcarFavorito(excursionId)} 
            /> 

            <RenderComentario 
                comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)} 
            /> 
        </ScrollView> 
    ); 
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    backgroundColor: '#ffffff',
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
  iconoContainer: {
    alignItems: 'center', 
    marginBottom: 8,
  }
});

export default DetalleExcursion;