import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { Component, Fragment } from 'react';
import {  Keyboard,TouchableWithoutFeedback, StyleSheet, Text, View, TextInput, Button, Image, KeyboardAvoidingView,TouchableOpacity, TouchableHighlight } from 'react-native';
//import { Auth } from 'aws-amplify'
import normalize from 'react-native-normalize'
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries'
//import { listOrgEvents, listOrgPics, listOrgInfos } from '../graphql/queries'
const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(View)

const initialState = {
  username: '', password: '', user: {}, authenticationCode: '', showConfirmationForm: false
}



class LogInPage extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      AllUserData:[]
    
     };
  } 
  async componentDidMount() {
    
    //console.log(this.state.IDENTITYID)
}
  state = initialState
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  signIn = async () => {
    const { username, password } = this.state
    if ( this.state.username === undefined || this.state.password === undefined) {
      alert('Please input your username and password.');
return
}
    try {
       const user = await Auth.signIn(username, password)
       const credentials = await Auth.currentCredentials()
       const identityIds = credentials._identityId
       this.state.IDENTITYID = identityIds
       //console.log(this.state.IDENTITYID)
       
      var AllUserData = await API.graphql(graphqlOperation(queries.listOrgInfos, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
      console.log(AllUserData)
      if(AllUserData.data.listOrgInfos.items.length>0){
        this.props.navigation.push('MainFeedPage')
      } else {
        var AllUserData = await API.graphql(graphqlOperation(queries.listUserInfos, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
        if(AllUserData.data.listUserInfos.items.length>0){
          this.props.navigation.push('MainFeedPage')
        } else {
          alert('No registered organization or user with these credentials. Please register at the following page.')
          this.props.navigation.push('AccountSelect')
        }
      }
       //console.log(AllUserData)
       //console.log(AllUserData.data.listOrgInfos.items.length)
       //console.log('user successfully signed in!', user)
       //alert('Successfully signed in.');
       //this.props.navigation.push('MainFeed')
    } catch (err) {
      console.log('error:', err)
      alert('Incorrect username or password')
    }
  }
  /*
  confirmSignIn = async () => {
    const { user, authenticationCode } = this.state
    try {
       await Auth.confirmSignIn(user, authenticationCode)
       console.log('user successfully signed in!', user)
       goHome()
    } catch (err) {
      console.log('error:', err)
    }
  }
  */ 
    render()
    {
  return (

    <KeyboardAvoidingView
     style={styles.container}
     behavior="padding"
     >
       <DismissKeyboardView>
       <View style={styles.container}>
       <TouchableOpacity
       activeOpacity= {0.5}
       onPress={() => this.props.navigation.push('HomeScreen')}
       >
       <Ionicons 
       size ={50}
       color='white' 
       name='ios-return-left'
       style={{marginTop: -110, marginLeft: -175, position: 'absolute'}}
    > 
    </Ionicons>
      </TouchableOpacity>
       {
         !this.state.showConfirmationForm && (
          <Fragment>

      
      
      <Image 
         style = {{marginBottom: 20, width: 250, height: 250}}
         source = {{uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/University_of_San_Diego_seal.svg/1200px-University_of_San_Diego_seal.svg.png'}}
      />
       
     
         
       <TextInput
          style={styles.input1}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('username', val)}
          
        />
        <TextInput
          style={styles.input2}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => this.onChangeText('password', val)}
        />

        
        
      {/*<TouchableOpacity style = {styles.button}
      onPress={this.signIn}
      >
       <Text style = {styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = {styles.button}
      onPress={() => this.props.navigation.navigate('SignUp') }
      >
        <Text style = {styles.buttonText}>Signup</Text>
         </TouchableOpacity>*/}

      
        <TouchableOpacity 
                        onPress={this.signIn}
                        style ={{height: normalize(50),
                          width: normalize(200),
                          borderRadius: normalize(25),
                          borderWidth: normalize(2.5),
                          borderColor: '#fff',
                            backgroundColor: '#0043cf',
                            borderRadius: 25,
                            marginVertical: 10,
                            paddingVertical: 15, 
                            marginTop: 40 }}> 
               
            <Text style = {{ fontSize: 16,fontWeight: '500', color: '#ffffff', textAlign: 'center', marginTop: -1}}> Login</Text>
       </TouchableOpacity>




      <TouchableOpacity 
                        onPress={() => this.props.navigation.navigate('SignUp') }
                        style ={{height: normalize(50),
                          width: normalize(200),
                          borderRadius: normalize(25),
                          borderWidth: normalize(2.5),
                          borderColor: '#fff',
                            backgroundColor: 'grey',
                            borderRadius: 25,
                            marginVertical: 10,
                            paddingVertical: 15, 
                            marginTop: 10 }}> 
               
            <Text style = {{ fontSize: 16,fontWeight: '500', color: '#ffffff', textAlign: 'center', marginTop: -1}}> Sign Up</Text>
       </TouchableOpacity>







      
    
         

      <TouchableOpacity>

        <Text style = {styles.forgotMyPassword}>Forgot Password? </Text>

      </TouchableOpacity>
       
      </Fragment>
        
         )   
    }
    {/*}
    { 
          this.state.showConfirmationForm && (
            <Fragment>
              <TextInput
                style={styles.input}
                placeholder='Authentication Code'
                autoCapitalize="none"
                placeholderTextColor='white'
                onChangeText={val => this.onChangeText('authenticationCode', val)}
              />
              <Button
                title='Confirm Sign In'
                onPress={this.confirmSignIn}
              />
            </Fragment>
          )
        } 
      {*/}       
</View>
</DismissKeyboardView>
    </KeyboardAvoidingView>
    
  );
}
}

const styles = StyleSheet.create({
  input1: {
    width: 350,
    height: 55,
    backgroundColor: '#a9a9a9',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    marginTop: 30
  },
  input2: {
    width: 350,
    height: 55,
    backgroundColor: '#a9a9a9',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    marginTop: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },

titleText: {
  fontSize:30,
  color: "white"
},

  inputBox: {
    width:300,
    height: 60,
    fontSize: 15,
    backgroundColor: '#a9a9a9',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 20,
    color: '#f8f8ff'
    
  },

  button:{
    width:300,
    height: 60,
    backgroundColor: '#0043cf',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 16
    
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  },

  forgotMyPassword: {
  fontSize: 14,
  color: 'white',
},

backButon: {
  flex: 1,
  width: 500,
  height: 500,
  position: 'absolute',
  left: 10,
  top: 10,
  bottom: 50
}

  

});
export default LogInPage;