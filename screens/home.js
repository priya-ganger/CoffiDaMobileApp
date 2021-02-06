import React, { Component } from "react";
import { View, Button, Text, StyleSheet, navigation } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


class Home extends Component {

  componentDidMount() {
    // this.unsubscribe = this.props.navigation.addListener('focus', () => {
    //   this.checkLoggedIn();

    this.props.navigation.addListener('focus', () => {
        this.checkLoggedIn();


    });
  }
  
  // componentWillMount() {
  //   this.unsubscribe();
  // }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem('@session_token');
    if(value == null) {
      this.props.navigation.navigate('Login');
    }
  };

render(){
  const navigation = this.props.navigation;
  return (
    <View style={styles.center}>
      <Text>This is the home screen</Text>
      <Button
        title="Go to Profile Screen"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;