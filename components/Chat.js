
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  
  const { name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.heading}>Hello Screen2!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});

export default Chat;