import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground } from 'react-native';

const Start = ({ navigation }) => {

  const [name, setName] = useState('');

  return (
    <ImageBackground source={require("../assets/BackgroundImage.png")} style={styles.imageBackground} >
      <View style={styles.container}>
       
          <Text style={styles.h1}>Chat App</Text>
        


       
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <Button
            title="Start Chatting"
            onPress={() => navigation.navigate('Chat', { name: name })}
          />
        

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
  h1: {
    color: '#000',
    fontWeight: 600,
    fontSize: 50,
    alignSelf: 'auto',
    marginBottom: 300
  },
  textDefault: {

  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
});

export default Start;