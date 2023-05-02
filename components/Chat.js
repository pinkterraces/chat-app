
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {

  const [messages, setMessages] = useState([]); //sets the messages state
  const { name, color } = route.params; //props sent with route

  //defines the title of the screen
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  //loads once component mounts and sets the messages state
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  //appends new message array to the array of existing messages
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
  };

  //customises the chat bubbles
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}> 
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    color: '#fff',
    fontWeight: 600,
    fontSize: 45,
    alignSelf: 'auto',
    marginBottom: 250
  }
});

export default Chat;