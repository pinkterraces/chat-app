import { useState, useEffect } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import MapView from 'react-native-maps';
import { collection, getDocs, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected, storage }) => {

  const [messages, setMessages] = useState([]); //sets the messages state
  const { name, color, userID } = route.params; //props sent with route

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name }); //defines the title of the screen

    if (isConnected === true) {

      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const messagesDatalake = collection(db, "messages");
      const q = query(messagesDatalake, /* where("user._id", "==", userID), */ orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach(doc => {
          const data = doc.data();
          const createdAt = new Date(doc.data().createdAt.toMillis()); // Converting firebase timestamp to date
          newMessages.push({ id: doc.id, ...data, createdAt })
        });
        cacheMessages(newMessages);
        setMessages(newMessages)
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };

  }, [isConnected]);

  // Handles locally cached data
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }
  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  // Appends new message array to the array of existing messages
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

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  const renderCustomActions = (props) => {
    return <CustomActions userID={userID} storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3
          }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }


  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
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

