import React, { Component } from 'react'
import {  TextInput, SafeAreaView, View, TouchableOpacity, Text, Alert } from 'react-native'
import Filter from 'bad-words';

class Settings extends Component {

  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }
  }

  test(){
    const filter = new Filter(); 
    filter.addWords('cake', 'pastries', 'tea');

    console.log(filter.clean(this.state.inputValue));
    Alert.alert(filter.clean(this.state.inputValue));
  }

  render() {
    // <View style={styles.center}>
    //   <Text>This is the Settings screen</Text>
    //   <Button
    //     title='Go back'
    //     onPress={() => navigation.goBack()}
    //   />
    // </View>

  return (
    <SafeAreaView style={{flex: 1}}>
    <View >
      <Text >
        Profinity Filter Test
      </Text>
      <TextInput
          placeholder='Enter your first name'
          onChangeText={(inputValue) => this.setState({ inputValue })}
          value={this.state.inputValue}
        />
     <TouchableOpacity onPress={() => this.test()}>
      <Text> Submit </Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  )}
}
  
export default Settings
