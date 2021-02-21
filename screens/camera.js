import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Alert, Text, View, Button, ToastAndroid, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RNCamera } from 'react-native-camera';

class Camera extends Component{

  constructor(props){
    super(props);

    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: "",
      location_id: '',
      review_id: ''
    }
}

componentDidMount() {
   this._unsubscribe = this.props.navigation.addListener('focus', () => {
   
     const { locId } = this.props.route.params
     console.log("This is the params data" +locId);

     if(this.props.route.params){
       this.setState({location_id: this.props.route.params.locId})
     }

     const { revId } = this.props.route.params
     console.log("This is the params data" +revId);
     if(this.props.route.params){
       this.setState({review_id: this.props.route.params.revId})
     }
    })}



takeAPhoto = async() => {
  if(this.camera){
    const options = {quality: 0.5, base64:true};
    const data = await this.camera.takePictureAsync(options);

    console.log(data.uri);
    const value = await AsyncStorage.getItem('session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location_id+"/review/"+this.state.review_id+"/photo",
    {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": value
      },
      body: data
    })
    .then((response) =>{
      if(response.status === 200){
        Alert.alert("Picture added");
     }
     else if(response.status === 400){
       throw 'Bad Request';
     }
     else if(response.status === 401){
      throw 'Unauthorised';
    }
    else if(response.status === 404){
      throw 'Not Found';
    }
    else if(response.status === 500){
      throw 'Server Error';
    }
     
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

deleteAPhoto = async() => {
  if(this.camera){
    const options = {quality: 0.5, base64:true};
    const data = await this.camera.takePictureAsync(options);

    console.log(data.uri);
    const value = await AsyncStorage.getItem('session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location_id+"/review/"+this.state.review_id+"/photo",
    {
      method: 'delete',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": value
      },
      body: data
    })
    .then((response) =>{
      if(response.status === 200){
        Alert.alert("Picture deleted");
     }
     else if(response.status === 403){
       throw 'Forbidden';
     }
     else if(response.status === 401){
      throw 'Unauthorised';
    }
    else if(response.status === 404){
      throw 'Not Found';
    }
    else if(response.status === 500){
      throw 'Server Error';
    }
     
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

getAPhoto = async() => {
  if(this.camera){
    const options = {quality: 0.5, base64:true};
    const data = await this.camera.takePictureAsync(options);

    console.log(data.uri);
    const value = await AsyncStorage.getItem('session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location_id+"/review/"+this.state.review_id+"/photo",
    {
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": value
      },
     // body: data
    })
    .then((response) =>{
      if(response.status === 200){
        Alert.alert("Success");
     }
     else if(response.status === 404){
       throw 'Not found';
     }
     else if(response.status === 500){
      throw 'Server Error';
    }
    })
    .catch((error) => {
      console.error(error);
    });
  }
}

    render(){
        
        const navigation = this.props.navigation;

        return(
            <View style={{flex:1}}>

            <RNCamera 
            ref={ref =>
            {this.camera = ref;
            }} 
            style={{
              flex:1,
              width: '100%'
            }}/>
                     
            <Button
              title="Take a photo"
              onPress={() => {this.takeAPhoto()}}
              />      

            <Button
            title="View photo"
            onPress={() => this.props.navigation.navigate('Photo',{ locId: this.state.location_id, revId: this.state.review_id})}
            />  

            <Button
            title="Delete a photo"
            onPress={() => {this.deleteAPhoto()}}
            /> 



            </View>
        )
    }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  cameraPreview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
  },

});

export default Camera;