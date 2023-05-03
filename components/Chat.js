import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, getDocs, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {

  const [messages, setMessages] = useState([]); //sets the messages state
  const { name, color, userID } = route.params; //props sent with route

  
  useEffect(() => {
    navigation.setOptions({ title: name }); //defines the title of the screen

    const messagesDatalake = collection(db, "messages");
    const q = query(messagesDatalake, /* where("user._id", "==", userID), */ orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        const data = doc.data();
        const createdAt = new Date(doc.data().createdAt.toMillis()); // Converting firebase timestamp to date
        newMessages.push({ id: doc.id, ...data, createdAt })
      });
      //console.log('messages: ', messages);
      console.log('newMessages: ', newMessages);
      setMessages(newMessages)
      console.log('messages: ', messages);
    })

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };

  }, []);

  //loads once component mounts and sets the messages state
  /*   useEffect(() => {
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
    }, []); */

  //appends new message array to the array of existing messages
  const onSend = (newMessage) => {
    addDoc(collection(db, "messages"), newMessage[0]);
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
          _id: userID,
          name: name
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  )

}

export default Chat;

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

