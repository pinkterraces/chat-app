import { useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  // ** User authentication ** //
  // Returns the authentication handle of Firebase
  const auth = getAuth();
  console.log('auth: ', auth);
  // Signs in user
  const signInUser = () => {
    signInAnonymously(auth) //allows the user to sign in anonymously
      .then(result => {
        navigation.navigate("Chat", {userID: result.user.uid, name: name, color: color || '#B9C6AE' });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }


  return (
    <ImageBackground source={require("../assets/BackgroundImage.png")} style={styles.imageBackground} >
      <View style={styles.container}>

        <Text style={styles.heading}>Chat App</Text>

        <View style={styles.chatOptions}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <Text style={[styles.textDefault, styles.textOpacity]}>Choose background color:</Text>
          <View style={styles.colorSelector}>
            <TouchableOpacity
              style={[styles.colorOptions, styles.colorOption1]}
              onPress={() => setColor('#090C08')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorOptions, styles.colorOption2]}
              onPress={() => setColor('#474056')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorOptions, styles.colorOption3]}
              onPress={() => setColor('#8A95A5')}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.colorOptions, styles.colorOption4]}
              onPress={() => setColor('#B9C6AE')}
            ></TouchableOpacity>
          </View>
          {/* <Button
            title="Start Chatting"
            onPress={() => navigation.navigate('Chat', { name: name })}
          /> */}
          <TouchableOpacity
            onPress={signInUser}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null} 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 45,
    alignSelf: 'auto',
    marginVertical: 20
  },
  chatOptions: {
    backgroundColor: '#fff',
    minHeight: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 20
  },
  textDefault: {
    fontSize: 16,
    fontWeight: 300,
    color: '#757083',
    opacity: 0.5
  },
  textOpacity: {
    opacity: 1
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 0
  },
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  colorOptions: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginHorizontal: 10
  },
  colorOption1: {
    backgroundColor: '#090C08'
  },
  colorOption2: {
    backgroundColor: '#474056'
  },
  colorOption3: {
    backgroundColor: '#8A95A5'
  },
  colorOption4: {
    backgroundColor: '#B9C6AE'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#757083',
    width: '88%',
    height: 50
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#fff'
  }
});

export default Start;