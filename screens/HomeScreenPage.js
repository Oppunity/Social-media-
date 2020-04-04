import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
import { Auth } from 'aws-amplify'

class HomeScreenPage extends Component {
    static navigationOptions = {
        header: null
    }
    async componentDidMount() {
      try {
        const user = await Auth.currentAuthenticatedUser()
        console.log('user: ', user)
        console.log('User worked')
        if (user) {
          console.log('User worked')
          this.props.navigation.push('UserMainFeed')  
        }
      } catch (err) {
        console.log('error: ', err)
      }
    }

    render()
    {
        return (
            
           
       <View style={styles.BackGround}>
            <Text style={styles.CompanyLogo}> Oppunity </Text>  
         
            <TouchableOpacity
          style={styles.SubmitButtonLogIn}
          activeOpacity = { .5 }
          onPress={() => this.props.navigation.navigate('LogIn') }
          >
            <Text style={styles.TextStyle}> LOGIN </Text>
      </TouchableOpacity> 
  
      
      
      <TouchableOpacity
      style={styles. SubmitButtonSignUp}
      activeOpacity = { .5 }
      onPress={() => this.props.navigation.navigate('SignUp') }
      >
    <Text style={styles.TextStyle}> Sign Up </Text>
    </TouchableOpacity> 

   <Text style={styles.FounderText}> Created by Devin Devlin, Daniel Dayto, Arrion Archie, William Trevena </Text> 
   
        
   </View>

    


        );
     }
}


const styles = StyleSheet.create(
    {
      BackGround: {
        flex: 1, 
        backgroundColor: 'black'
      },

      CompanyLogo: {
        flex: 1, 
        color: 'white', 
        fontSize: normalize(50), 
        paddingTop: normalize(250), 
        textAlign: 'center'
      },
      FounderText: { 
        color: 'white', 
        fontSize: normalize(8), 
        bottom: normalize(50),
        left: normalize(50),
        textAlign: 'center',
        position: 'absolute',
        
      },
      SubmitButtonLogIn: {
        height: normalize(100),
        width: normalize(100),
        borderRadius: normalize(50),
        left: normalize(50),
        bottom: normalize(140),
        borderWidth: normalize(2.5),
        paddingTop: normalize(40),
        borderColor: '#fff',
        backgroundColor:'#0043cf', 
        position: 'absolute'
        
    },

    SubmitButtonSignUp: {
      height: normalize(100),
      width: normalize(100),
      borderRadius: normalize(50),
      left: normalize(225),
      bottom: normalize(140),
      borderWidth: normalize(2.5),
      paddingTop: normalize(40),
      borderColor: '#fff',
      backgroundColor:'#0043cf',  
      position: 'absolute'  
  },

    TextStyle: {
      color:'white',
      textAlign:'center',
  },
    }
    );

export default HomeScreenPage;