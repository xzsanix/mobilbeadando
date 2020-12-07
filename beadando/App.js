import React from 'react';
import { StyleSheet,  Image,  Text,  View,  ScrollView,  TouchableOpacity,  Button, SafeAreaView} from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer,NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import Foetelek from './foetelek.json';
import Desszertek from './desszertek.json';



const RecipeCardF = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Recept', { text: props.recept, hv : props.hozzavalok})
      }>
      <Card>
        <Card.Title> {props.title} </Card.Title>
        <Card.Divider />
        <Image
          style={{ width: 280, height: 280 }}
          resizeMode="cover"
          source={props.image}
        />
      </Card>
    </TouchableOpacity>
  );
};

function FoetelScreen({ navigation }) {
const foetelek = Foetelek;
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.h1}>Főételek</Text>
        {foetelek.map((foetel, key) => {
          return (
            <RecipeCardF
              key={key}
              navigation={navigation}
              title={foetel.title}
              image={foetel.image}
              url={foetel.url}
              recept={foetel.recept}
              hozzavalok ={foetel.hozzavalok}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

function ReceptfScreen({ props, route,navigation}) {
const {text} = route.params;
const {hv} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Button
          title="Vissza"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Hozzávalók:</Text>
          <ul>
            {hv.map(item => {
              return <li>{item}</li>;
            })}
          </ul>
        <Text style={styles.text}>Elkészítés:</Text>
          <Text style={styles.text}>{JSON.stringify(text)}</Text>
      </ScrollView>
    </View>
  );
}

const RecipeCardD = (props) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Recept ', { text: props.recept, hv : props.hozzavalok })
      }>
      <Card>
        <Card.Title> {props.title} </Card.Title>
        <Card.Divider />
        <Image
          style={{ width: 280, height: 280 }}
          resizeMode="cover"
          source={props.image}
        />
      </Card>
    </TouchableOpacity>
  );
};

function DesszertScreen({navigation}) {
  const desszertek = Desszertek;
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.h1}>Desszertek</Text>
        {desszertek.map((desszert, key) => {
          return (
            <RecipeCardD
              key={key}
              navigation={navigation}
              title={desszert.title}
              image={desszert.image}
              url={desszert.url}
              recept={desszert.recept}
              hozzavalok = {desszert.hozzavalok}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

function ReceptdScreen({props,route,navigation}) {
  const {text} = route.params;
  const {hv} = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <Button
          title="Vissza"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.text}>Hozzávalók:</Text>
          <ul>
            {hv.map(item => {
              return <li>{item}</li>;
            })}
          </ul>
        <Text style={styles.text}>Elkészítés:</Text>
          <Text style={styles.text}>{JSON.stringify(text)}</Text>
      </ScrollView>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Főételek') {
              iconName = focused ? 'md-pizza' : 'md-pizza';
            }
            if (route.name === 'Recept') {
              iconName = focused ? 'md-clipboard' : 'md-clipboard';
            }
            if (route.name === 'Desszertek') {
              iconName = focused ? 'md-ice-cream' : 'md-ice-cream';
            } else if (route.name === 'Recept ') {
              iconName = focused ? 'md-clipboard' : 'md-clipboard';
            }
            return (
              <Ionicons name={iconName} size={(size = 32)} color={color} />
            );
          },
        })}
        tabBarOptions={{
          style: {
            height: 55,
            backgroundColor: 'white',
          },
          activeTintColor: '#F1607C',
          inactiveTintColor: 'grey',
          labelStyle: {
            fontSize: 13,
          },
        }}>
        <Tab.Screen name="Főételek" component={FoetelScreen} />
        <Tab.Screen name="Recept" component={ReceptfScreen} />
        <Tab.Screen name="Desszertek" component={DesszertScreen} />
        <Tab.Screen name="Recept " component={ReceptdScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEEAE6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
  },
  h1 :{
    margin : 10,
    marginLeft: 22,
    fontSize : 22,
    justifyContent: 'center',
    alignItems: 'center',
    fontStyle : "bold",
  }
});
