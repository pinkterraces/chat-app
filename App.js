import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const Stack = createNativeStackNavigator();

// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';





// The app’s main Chat component that renders the chat UI
const App = () => {

  // ** Firebase config ** //
  // Webapp project settings
  const firebaseConfig = {
    apiKey: "AIzaSyCYX8LDAJlGzk7_HMFJEX4LbS8y9slJ0SY",
    authDomain: "chatapp-11855.firebaseapp.com",
    projectId: "chatapp-11855",
    storageBucket: "chatapp-11855.appspot.com",
    messagingSenderId: "750947407451",
    appId: "1:750947407451:web:ff0bdcb652dea9622b117e",
    measurementId: "G-VZ2FHBF2G6"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  console.log('db: ', db);

  return (

    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        /* component={Chat}    */
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */

export default App;