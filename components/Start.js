import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

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
            onPress={() => navigation.navigate('Chat', { name: name, color: color })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 45,
    alignSelf: 'auto',
    marginBottom: 250
  },
  chatOptions: {
    backgroundColor: '#fff',
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-around'
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