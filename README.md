# chat-app

# Stack and Tools

- React Native.
- Expo.
- Google Firestore Database.
- Google Firebase Authentication.
- React Native Gifted Chat.

# Description

A chat app built in React Native for mobile devices. Users can enter a chat room, and share images from their library, take a photo and their location - the text data and assets are stored in Google Firebase. Used as a project to understand React Native and Expo development, as well as Google Firestore and GiftChat library for React Native.

# Features
- Choose chat background colour.
- Receive and send text messages, photos and location data.
- Take a photo using device camera

# Setting up the dev environment

- Clone the repository: https://github.com/pinkterraces/chat-app.
- Run npm init.
- Install Expo CLI as a global npm package (npm install -g expo-cli).
- Install packages.
- Create an Expo account at https://expo.dev/.
- Create database https://firebase.google.com/ (ensure in the “Rules” tab the function is set to “allow read, write: if true;”).
- Update App.js with your personal firebaseConfig.
- Tests can be run on iOS emulator, Android Studio with emulator, or Expo on local device (personal experience say local device was the most reliable testing environment).

# Packages:

NOTE: EPXO need to run on Node.js Version 16.9.0. Do this as follows:
- nvm install 16.19.0
- nvm use 16.19.0
- nvm alias default 16.19.0


- npm install --save @react-navigation/native @react-navigation/native-stack
- expo install react-native-screens react-native-safe-area-context
- npm install react-native-gifted-chat --save
- npm install firebase@9.13.0 --save
- expo install @react-native-async-storage/async-storage
- expo install @react-native-community/netinfo
- expo install expo-image-picker
- expo install expo-location
- expo install react-native-maps
