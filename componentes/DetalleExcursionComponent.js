import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper'; 
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios
    }
}

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground 
          source={{ uri: baseUrl + excursion.imagen }}
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

    const excursion = this.props.excursiones.excursiones.find(excursion => excursion.id === +excursionId);
    const comentarios = this.props.comentarios.comentarios.filter(comentario => comentario.excursionId === +excursionId);

    return( 
        <ScrollView> 
            <RenderExcursion 
                excursion={excursion} 
                favorita={this.state.favoritos.some(el => el === excursionId)} 
                onPress={() => this.marcarFavorito(excursionId)}
            /> 

            <RenderComentario 
                comentarios={comentarios} 
            /> 
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
    justifyContent:'center',
    alignItems:'center',
  },
  imageStyle:{
    resizeMode:'cover',
  },
  tituloSuperpuesto:{
    color: 'white',
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

export default connect(mapStateToProps)(DetalleExcursion);