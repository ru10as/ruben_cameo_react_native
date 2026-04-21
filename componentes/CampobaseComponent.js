import { Component } from 'react';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';
import Constants from 'expo-constants';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomeComponent';
import Contacto from './ContactoComponent';
import QuienesSomos from './QuienesSomosComponent';
import { View, Platform, StyleSheet, Image, Text, Pressable } from 'react-native';
import { createDrawerNavigator,   DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { colorGaztaroaClaro, colorGaztaroaOscuro } from '../comun/comun';
import { connect } from 'react-redux'; 
import { fetchExcursiones, fetchComentarios, fetchCabeceras, fetchActividades } from '../redux/ActionCreators';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const mapDispatchToProps = (dispatch) => ({ 
  fetchExcursiones: () => dispatch(fetchExcursiones()), 
  fetchComentarios: () => dispatch(fetchComentarios()), 
  fetchCabeceras: () => dispatch(fetchCabeceras()), 
  fetchActividades: () => dispatch(fetchActividades()), 
})

function BotonMenu(props) { 
  return ( 
    <Pressable 
      onPress={props.onPress} 
      hitSlop={8} 
    > 
      <MaterialCommunityIcons 
        name="menu" 
        size={40} 
        color={Platform.OS === 'ios' ? colorGaztaroaOscuro : 'white'} 
      /> 
    </Pressable> 
  ); 
} 


function CustomDrawerContent(props) { 
  return ( 
    <DrawerContentScrollView {...props}> 
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}> 
        <View style={styles.drawerHeader}> 
          <View style={styles.drawerHeaderImageContainer}> 
            <Image 
              source={require('./imagenes/logo.png')} 
              style={styles.drawerImage} 
            /> 
          </View> 
 
          <View style={styles.drawerHeaderTextContainer}> 
            <Text style={styles.drawerHeaderText}>Gaztaroa</Text> 
          </View> 
        </View> 
 
        <DrawerItemList {...props} /> 
      </SafeAreaView> 
    </DrawerContentScrollView> 
  ); 
}


class Campobase extends Component {
  componentDidMount() { 
    this.props.fetchExcursiones(); 
    this.props.fetchComentarios(); 
    this.props.fetchCabeceras(); 
    this.props.fetchActividades(); 
  }

  menuHeaderOptions = (title, navigation) => ({ 
    title, 
    headerLeft: () => ( 
      <BotonMenu 
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} 
      /> 
    ), 
  });

  HomeNavegador = () => { 
    return ( 
      <Stack.Navigator 
        initialRouteName="Home" 
        screenOptions={{ 
          headerTitleAlign: 'center',
          headerTintColor: '#fff', 
          headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
          headerTitleStyle: { color: '#fff' }, 
        }} 
      > 
        <Stack.Screen 
          name="Home"
          component={Home} 
          options={({ navigation }) => 
            this.menuHeaderOptions('Campo Base', navigation) 
          } 
        /> 
      </Stack.Navigator> 
    ); 
  };
 
  CalendarioNavegador = () => { 
    return ( 
      <Stack.Navigator 
        initialRouteName="Calendario" 
        screenOptions={{ 
          headerTitleAlign: 'center',
          headerTintColor: '#fff', 
          headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
          headerTitleStyle: { color: '#fff' }, 
        }} 
      > 
        
        <Stack.Screen 
          name="Calendario" 
          component={Calendario}
          options={({ navigation }) => 
            this.menuHeaderOptions('Calendario Gaztaroa', navigation) 
          }
        />
        {/* <Stack.Screen 
          name="Calendario" 
          //component={Calendario}
          options={({ navigation }) => 
            this.menuHeaderOptions('Calendario Gaztaroa', navigation) 
          }
        > 
          {(props) => ( 
            <Calendario 
              {...props} 
              //excursiones={this.state.excursiones} 
              excursiones={this.props.excursiones.excursiones}
            /> 
          )} 
        </Stack.Screen> */} 
 
        <Stack.Screen 
          name="DetalleExcursion" 
          component={DetalleExcursion}
          options={{ 
            title: 'Detalle Excursión', 
            headerBackTitle: 'Calendario',
          }} 
        />

        {/* <Stack.Screen 
          name="DetalleExcursion" 
          //component={DetalleExcursion}
          options={{ 
            title: 'Detalle Excursión', 
            headerBackTitle: 'Calendario',
          }} 
        > 
          {(props) => ( 
            <DetalleExcursion 
              {...props} 
              //excursiones={this.state.excursiones} 
              excursiones={this.props.excursiones.excursiones}
            /> 
          )} 
        </Stack.Screen>  */}


      </Stack.Navigator> 
    ); 
  }; 

  QuienesSomosNavegador = () => {
    return(
      <Stack.Navigator
        initialRouteName="QuienesSomos"
        screenOptions={{ 
          headerTitleAlign: 'center',
          headerTintColor: '#fff', 
          headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
          headerTitleStyle: { color: '#fff' }, 
        }}>
      <Stack.Screen 
      name="QuienesSomos"
      component={QuienesSomos}
      options={({ navigation }) => this.menuHeaderOptions('Quiénes somos', navigation)}
      />
      </Stack.Navigator>
    )
  }
 
  ContactoNavegador = () => {
    return(
    <Stack.Navigator 
      initialRouteName="Contacto"
      screenOptions={{ 
        headerTitleAlign: 'center',
        headerTintColor: '#fff', 
        headerStyle: { backgroundColor: colorGaztaroaOscuro }, 
        headerTitleStyle: { color: '#fff' }, 
      }}>
      <Stack.Screen 
        name="Contacto"
        component={Contacto}
        options={({ navigation }) => this.menuHeaderOptions('Contacto Gaztaroa', navigation)}
      />
    </Stack.Navigator>
    )
  }

  DrawerNavegador = () => { 
    return ( 
      <Drawer.Navigator 
        initialRouteName="Campo base" 
        drawerContent={(props) => <CustomDrawerContent {...props} />} 
        screenOptions={{ 
          headerShown: false, 
          drawerStyle: { 
            backgroundColor: colorGaztaroaClaro, 
          }, 
        }} 
      > 
        <Drawer.Screen 
          name="Campo base" 
          component={this.HomeNavegador} 
          options={{ 
            drawerIcon: ({ color, size }) => ( 
              <MaterialCommunityIcons 
                name="home" 
                color={color} 
                size={size} 
              /> 
            ), 
          }} 
        />

        <Drawer.Screen
          name="Quienes Somos"
          component={this.QuienesSomosNavegador}
          options={{
            drawerIcon: ({ color, size }) => ( 
            <MaterialCommunityIcons name="information" color={color} size={size} /> 
          ),
          }}
        />

        <Drawer.Screen 
          name="Calendario"
          component={this.CalendarioNavegador}
          options={{
            drawerIcon: ({ color, size }) => ( 
            <MaterialCommunityIcons name="calendar" color={color} size={size} /> 
          ),
          }}
        />

        <Drawer.Screen
          name="Contacto"
          component={this.ContactoNavegador}
          options={{
            drawerIcon: ({ color, size }) => ( 
              <MaterialCommunityIcons name="card-account-phone" color={color} size={size} /> 
            ),
          }}
        />
      </Drawer.Navigator> 
    ); 
  }; 

  render() { 
    return ( 
      <NavigationContainer> 
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 
Constants.statusBarHeight }}> 
          <this.DrawerNavegador /> 
        </View> 
      </NavigationContainer> 
    ); 
  } 
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
  }, 
  drawerHeader: { 
    backgroundColor: colorGaztaroaOscuro, 
    height: 100, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8, 
  }, 
  drawerHeaderImageContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  drawerHeaderTextContainer: { 
    flex: 2, 
    justifyContent: 'center', 
  }, 
  drawerHeaderText: { 
    color: 'white', 
    fontSize: 24, 
    fontWeight: 'bold', 
  }, 
  drawerImage: { 
    width: 80, 
    height: 60, 
    resizeMode: 'contain', 
  }, 
});

export default connect(null,mapDispatchToProps)(Campobase);