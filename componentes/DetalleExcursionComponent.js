import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, FlatList, Modal } from 'react-native';
import { Card, Text, Divider, IconButton, TextInput, Button} from 'react-native-paper'; 
import { baseUrl, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        excursiones: state.excursiones,
        comentarios: state.comentarios,
        favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => 
        dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

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
            <IconButton 
              icon='pencil' 
              color={colorGaztaroaOscuro}
              size={28} 
              onPress={() => props.onPressComentario()} 
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
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    resetForm() {
        this.setState({
            valoracion: 5,
            autor: '',
            comentario: '',
            showModal: false
        });
    }

    gestionarComentario(excursionId) {
        this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
        this.resetForm();
    }


  marcarFavorito(excursionId) { 
      this.props.postFavorito(excursionId); 
  }

  render() {
    const { excursionId } = this.props.route.params;
    const excursion = this.props.excursiones.excursiones.find(excursion => excursion.id === +excursionId);
    const comentarios = this.props.comentarios.comentarios.filter(comentario => comentario.excursionId === +excursionId);

    return( 
        <ScrollView> 
            <RenderExcursion 
                excursion={excursion} 
                favorita={this.props.favoritos.favoritos.some(el => el === excursionId)} 
                onPress={() => this.marcarFavorito(excursionId)}
                onPressComentario={() => this.toggleModal()}
            /> 

            <RenderComentario 
                comentarios={comentarios} 
            /> 

            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={() => this.toggleModal()}
                onRequestClose={() => this.toggleModal()}
            >
                <View style={styles.modal}>

                    <Text style={{ 
                        fontSize: 24, 
                        fontWeight: 'bold', 
                        textAlign: 'center', 
                        marginBottom: 20 
                    }}>
                        Añadir comentario
                    </Text>

                    <View style={styles.estrellasContainer}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <IconButton
                                key={i}
                                icon={i <= this.state.valoracion ? "star" : "star-outline"}
                                color={colorGaztaroaOscuro}
                                size={35}
                                onPress={() => this.setState({ valoracion: i })}
                            />
                        ))}
                    </View>

                    <TextInput
                        label="Autor"
                        style={styles.input}
                        mode="outlined"
                        left={<TextInput.Icon icon="account" />}
                        onChangeText={(value) => this.setState({ autor: value })}
                        value={this.state.autor}
                    />
                    <TextInput
                        label="Comentario"
                        style={styles.input}
                        mode="outlined"
                        left={<TextInput.Icon icon="pencil" />}
                        onChangeText={(value) => this.setState({ comentario: value })}
                        value={this.state.comentario}
                    />

                    <View style={{marginTop: 20}}>
                        <Button 
                            mode="contained" 
                            color={colorGaztaroaOscuro}
                            onPress={() => this.gestionarComentario(excursionId)}
                            style={styles.button}
                        >
                            ENVIAR
                        </Button>
                        <Button 
                            onPress={() => this.resetForm()}
                            style={styles.button}
                        >
                            CANCELAR
                        </Button>
                    </View>
                </View>
            </Modal>

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
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: 8,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
    marginTop: 100
  },
  estrellasContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white'
  },
  button: {
      marginVertical: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);