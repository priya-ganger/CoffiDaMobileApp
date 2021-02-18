import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Alert, Text, View, Button, ToastAndroid, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

class UpdateReview extends Component{

  constructor(props){
    super(props);

    this.state = {
     // isLoading: true,
      locData: [],
     
      
      review_overallrating: '',
      review_pricerating: '',
      review_qualityrating: '',
      review_clenlinessrating: '',
      review_body: '',

      location_id: '',
      review_id: '',
     
    }
}

componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
     
       const { location_id } = this.props.route.params
       const { locData } = this.props.route.params
       console.log("This is the params data" +location_id);

       if(this.props.route.params){
         this.setState({location_id: this.props.route.params.location_id})
       }

       console.log("This is the params data" +locData.review_id);

       if(this.props.route.params){
        this.setState({review_id: this.props.route.params.locData.review_id})

        if(this.props.route.params){
            this.setState({locData: this.props.route.params.locData})
          }
      }
  }
  
  UNSAFE_componentWillMount() {
    //this._unsubscribe
   }

updateReview = async () => {

    let sendReviewData = {};
  
    if(this.state.review_overallrating != ''){
      sendReviewData['review_overallrating'] = this.state.review_overallrating;
    }
  
    if(this.state.review_pricerating != ''){
      sendReviewData['review_pricerating'] = this.state.review_pricerating;
    }
  
    if(this.state.review_qualityrating != ''){
      sendReviewData['review_qualityrating'] = this.state.review_qualityrating;
    }
  
    if(this.state.review_clenlinessrating != ''){
      sendReviewData['review_clenlinessrating'] = this.state.review_clenlinessrating;
    }
  
    if(this.state.review_body != ''){
      sendReviewData['review_body'] = this.state.review_body;
    }
  
    console.log(sendReviewData);
  
    const value = await AsyncStorage.getItem('session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location_id+"/review/"+this.state.review_id, {
      method: 'patch',
      headers: {
          'Content-Type': 'application/json',
          'X-Authorization': value
      },
      body: JSON.stringify(sendReviewData)
  })
  
  .then((response) => {
      if(response.status === 200){
         Alert.alert("Review info updated" + "locationID: " + this.state.location_id +"reviewID: "+ this.state.review_id);
         return response.JSON;
      }
      else if(response.status === 400){
        Alert.alert("Testing" + "locationID: " + this.state.location_id +"reviewID: "+ this.state.review_id + "token" + value);
          throw 'Bad Request';
      }
      else if(response.status === 401){
        throw 'Unauthorised';
      }
      else if(response.status === 403){
        throw 'Forbidden';
      }
      else if(response.status === 404){
        throw 'Not Found';
      }
      else if(response.status === 500){
        throw 'Server Error';
      }
      else{
          throw 'Something went wrong';
      }
  })
  .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
  })
  }

  render(){
        
    const navigation = this.props.navigation;
    if(this.state.isLoading){
        return(
        <View>
        <ActivityIndicator/>
        </View>
    );
    }else{
    return(
        <View style={{flex:1}}>

          <Text>Update a review</Text>
          <Button title="Go back"
            onPress={() => navigation.goBack()} />  
              
              <TextInput
            placeholder="Enter your overall_rating"
            onChangeText={(review_overallrating)=>this.setState({review_overallrating})}
            value={this.state.review_overallrating}
         />

         <TextInput
            placeholder="Enter your price_rating"
            onChangeText={(review_pricerating)=>this.setState({review_pricerating})}
            value={this.state.review_pricerating}
           
          />
        
        <TextInput 
            placeholder="Enter your quality_rating"
            onChangeText={(review_qualityrating)=>this.setState({review_qualityrating})}
            value={this.state.review_qualityrating}
         />

         <TextInput 
            placeholder="Enter your clenliness_rating"
            onChangeText={(review_clenlinessrating) => this.setState({review_clenlinessrating})}
            value={this.state.review_clenlinessrating}
         />

          <TextInput 
            placeholder="Enter your review_body"
            onChangeText={(review_body) => this.setState({review_body})}
            value={this.state.review_body}
         /> 

             <Button 
            title="Update review"
            onPress={() => this.updateReview()}
            ></Button>

                  

        </View>
    )
}
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

export default UpdateReview;