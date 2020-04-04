import React from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, PixelRatio } from 'react-native';

// imports from Amplify library
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'

// import the GraphQL query
//import { listUserInfos } from '../graphql/queries'

// import the GraphQL mutation
import { createUserInfo, createUserPic } from '../graphql/mutations'

// create client ID
//import uuid from 'uuid/v4'
//const CLIENTID = uuid()

import { ScrollView } from 'react-native-gesture-handler';

import DropdownMenu from 'react-native-dropdown-menu';
import DatePicker from 'react-native-datepicker'
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import { SetS3Config } from '../awsS3/service';



class UserSignUpPage extends React.Component {
  static navigationOptions = {
    header: null
}


  state = {
    userName: '', anonymousUserName: '', firstname: '', lastname: '', InCollege: '', collegename: '', major: '', RaceText: 'Black', GenderText: 'Male',  date: null,  country: '', currentUser: [], IDENTITYID: '', userpic: '',  currentUserPic: []
  }

  toggleSwitch = () => {
    this.setState({ InCollege: !this.state.InCollege });
    };

    
 uploadToStorage = async () => {
  try {
    const response = await fetch('http://interreligio.unistra.fr/wp-content/uploads/2017/07/profil-vide-300x300.png')
    const blob = await response.blob()
   
    SetS3Config("keithhbn205309-keithhbn", "protected");
    Storage.put(('genericprofilepic.png'), blob, {
      contentType: 'image/jpeg',
    })
    console.log('Image Upload!!!!')
   // this.setState({ photo: null })
    {this.createUserProfilePic()}
  } catch (err) {
    console.log(err)
  }
}

createUserProfilePic = async () => {



  // const {  orgName, pfirst, CollegeA, OrgSchool, plast, OrgText  } = this.state
  // store the UserInput data in a variable
  const UserInputPic = {
   identityId: this.state.IDENTITYID, UserPicture: 'genericprofilepic.png'
  }
  // perform an optimistic response to update the UI immediately
  {/*const currentUserPic = [...this.state.currentUserPic, UserInputPic]
  this.setState({
    currentUserPic,
    orgpic: UserInputPic
    })
  console.log(this.currentUser)*/}
  try {
   
    // make the API call
    await API.graphql(graphqlOperation(createUserPic, {
      input: UserInputPic
    }))
    console.log('user image created!')
    this.props.navigation.navigate('LogIn')
    //this.props.navigation.navigate('UserMainFeed')
  } catch (err) {
    console.log('error creating UserInput2...', err)
    alert('unable to set profile photo')
  }
  
  

}



 componentDidMount = async() => {
  try {
    const credentials = await Auth.currentCredentials()
    /* eslint-disable-next-line */
    const identityIds = credentials._identityId
    this.state.IDENTITYID = identityIds
    console.log(this.state.IDENTITYID)
    return { identityIds }
  } catch (error) {
    return { error }
  } 
}

  // this method calls the API and creates the mutation
  createUserInfo = async() => {
    if (this.state.userName === '') {
      alert('You must enter a username')
      return
    }
    if (this.state.anonymousUserName === '') {
      alert('You must enter a anonymousUserName')
      return
    }
    if (this.state.firstname === '') {
      alert('You must enter first name')
      return
    }
    if (this.state.lastname === '') {
      alert('You must enter in a last name')
      return
    }
    if (this.state.date === null) {
      alert('You must enter in a date of birth')
      return
    }
    if (this.state.country.name === undefined ) {
      alert('You must pick a country of origin')
      return
    }
    if ( (this.state.InCollege === true) && ((this.state.collegename === '') || (this.state.major === ''))) {
      alert('If you are in college then you must enter in your college name and major')
      return
    }
    if (this.state.InCollege === '' || this.state.InCollege === 'false' ) {
      this.state.InCollege = false
      this.state.major = 'none'
      this.state.collegename = 'none'
    }

    const { userName, anonymousUserName, firstname, lastname, InCollege, collegename, major, RaceText, GenderText, date, country  } = this.state
    // store the UserInput data in a variable
    const UserInput = {
      userName, capitalizeuserName: this.state.userName.toUpperCase() , anonymousUserName, firstname, lastname, InCollege, collegename, major, RaceText, GenderText, date, country: country.name, identityId: this.state.IDENTITYID, UserPicture: 'genericprofilepic.png', userBio: 'CHANGE YOUR USER BIO'
    }
    // perform an optimistic response to update the UI immediately
    const currentUser = [...this.state.currentUser, UserInput]
    this.setState({
      currentUser,
      userName: '', anonymousUserName: '', firstname: '', lastname: '', InCollege: '', collegename: '', major: '', RaceText: 'Black', GenderText: 'Male',  date: null,  country: ''
      })
        
    try {
      console.log(this.state.userName)
      console.log(this.state.firstname)
      console.log(this.state.lastname)
      console.log(this.state.InCollege)
      console.log(this.state.major)
      console.log(this.state.collegename)
      console.log(this.state.RaceText)
      console.log(this.state.GenderText)
      console.log(this.state.date)
      console.log(this.state.country.name) 
      console.log(this.state.IDENTITYID)
      // make the API call
      await API.graphql(graphqlOperation(createUserInfo, {
        input: UserInput
      }))
      console.log('item created!')
      {this.uploadToStorage()}
    } catch (err) {
      console.log('error creating UserInput...', err)
    }
   
  }
  // change form state then user types into input
  onChange = (key, value) => {
    this.setState({ [key]: value })
  }
  render() {

    var Race = [[ "Black", "White", "Mongoloid/Asian", "Australoid", "Perfer not to say"]];
    var Gender = [["Male", "Female", "Perfer not to say"]];

    return (
      <ScrollView style={{backgroundColor: 'black'}}> 


       <View style={{flex: 1, backgroundColor: 'black', width: '100%', height: '100%'}}>
          
          <Text style={{marginTop: 40, fontSize: 25, textAlign: 'center', fontWeight: 'bold', color: 'white'}}> 
            Account Information Sign Up Page
            </Text>
            <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, marginTop: 1 }}/>
            
            <Text style={{marginTop: 20, fontSize: 20, textAlign: 'center', fontStyle: 'italic', color: 'white'}}> 
            Input your Anonymous UserName
          </Text>
        <TextInput
                  style={{  width: 350,
                    height: 55,
                    backgroundColor: '#a9a9a9',
                    marginLeft: 30,
                    padding: 8,
                    color: 'white',
                    borderRadius: 14,
                    marginTop: 10}}
                  placeholder='Anonymous UserName'
                  autoCapitalize="none"
                  placeholderTextColor='white'
                  onChangeText={v => this.onChange('anonymousUserName', v)}
                  value={this.state.anonymousUserName}
                />
                <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.5,
                  marginTop: 10
                }}
              />
              
            <Text style={{marginTop: 20, fontSize: 20, textAlign: 'center', fontStyle: 'italic', color: 'white'}}> 
            Input your Username
          </Text>
        <TextInput
                  style={{  width: 350,
                    height: 55,
                    backgroundColor: '#a9a9a9',
                    marginLeft: 30,
                    padding: 8,
                    color: 'white',
                    borderRadius: 14,
                    marginTop: 10}}
                  placeholder='username'
                  autoCapitalize="none"
                  placeholderTextColor='white'
                  onChangeText={v => this.onChange('userName', v)}
                  value={this.state.userName}
                />
                <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.5,
                  marginTop: 10
                }}
              />

<Text style={{marginTop: 20, fontSize: 20, textAlign: 'center', fontStyle: 'italic', color: 'white'}}> 
            Input your First Name
          </Text>
        <TextInput
                  style={{  width: 350,
                    height: 55,
                    backgroundColor: '#a9a9a9',
                    marginLeft: 30,
                    padding: 8,
                    color: 'white',
                    borderRadius: 14,
                    marginTop: 10}}
                  placeholder='first name'
                  autoCapitalize="none"
                  placeholderTextColor='white'
                  onChangeText={v => this.onChange('firstname', v)}
                  value={this.state.firstname}
                />
                <View
                style={{
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.5,
                  marginTop: 10
                }}
              />


<Text style={{marginTop: 5, fontSize: 20, textAlign: 'center', fontStyle: 'italic', color: 'white'}}> 
            Input your Last Name
            </Text>
            <TextInput
                      style={{  width: 350,
                        height: 55,
                        backgroundColor: '#a9a9a9',
                        marginLeft: 30,
                        padding: 8,
                        color: 'white',
                        borderRadius: 14,
                        marginTop: 10}}
                      placeholder='last name'
                      autoCapitalize="none"
                      placeholderTextColor='white'
                      onChangeText={v => this.onChange('lastname', v)}
                      value={this.state.lastname}
                    />

            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
                marginTop: 10
              }}
            />
            <Text style={{color: 'white', fontSize: 20, textAlign: 'center', marginTop: 10, marginBottom: 10 }}>
  Are you in college? 
   </Text>
   <View style={{marginLeft: 175}}>
   <Switch
        value={this.state.InCollege}
        onValueChange={this.toggleSwitch}
        changeValueImmediately={true}
        renderInsideCircle={() =>  <Text style={{ color: 'red', fontWeight: 'bold'}}> Yes</Text> }
        activeText={'Yes'}
        inActiveText={'Off'}
        backgroundActive={'green'}
        backgroundInactive={'red'}
        circleActiveColor={'green'}
        circleInActiveColor={'red'}
        renderActiveText={false}
        renderInActiveText={false}
      />
</View>

   <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 10
  }}
/>


<Text style={{marginTop: 5, fontSize: 20, textAlign: 'center', fontStyle: 'italic', color: 'white'}}> 
            If your in college input your full college name
          </Text>
        <TextInput
                  style={{  width: 350,
                    height: 55,
                    backgroundColor: '#a9a9a9',
                    marginLeft: 30,
                    padding: 8,
                    color: 'white',
                    borderRadius: 14,
                    marginTop: 10}}
                  placeholder='college name'
                  autoCapitalize="none"
                  placeholderTextColor='white'
                  onChangeText={v => this.onChange('collegename', v)}
                  value={this.state.collegename}
                />

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 10
  }}
/>


<Text style={{marginTop: 5, fontSize: 20, textAlign: 'center', fontStyle: 'italic', color: 'white'}}> 
            What is your major?
          </Text>
        <TextInput
                  style={{  width: 350,
                    height: 55,
                    backgroundColor: '#a9a9a9',
                    marginLeft: 30,
                    padding: 8,
                    color: 'white',
                    borderRadius: 14,
                    marginTop: 10}}
                  placeholder='major'
                  autoCapitalize="none"
                  placeholderTextColor='white'
                  onChangeText={v => this.onChange('major', v)}
                  value={this.state.major}
                />

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 10
  }}
/>

<Text style={{textAlign: 'center', fontSize: 20, fontStyle: 'italic', color: 'white', marginTop: 5}}> 
              Select your race
          </Text>

<View style={{height: 20 }} />
        <DropdownMenu
        
          style={{flex: 1}}
          bgColor={'#a9a9a9'}
          tintColor={'black'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          //optionTextStyle={{color: 'black'}}
          titleStyle={{color: 'black'}} 
          // maxHeight={300} 
          handler={(selection, row) => this.setState({RaceText: Race[selection][row]})}
          data={Race}
        >
           </DropdownMenu>
           <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 230
  }}
/>


<Text style={{textAlign: 'center', fontSize: 20, fontStyle: 'italic', color: 'white', marginTop: 5}}> 
              Select your Gender
          </Text>

<View style={{height: 10, marginTop: 5 }} />
        <DropdownMenu
          style={{flex: 1}}
          bgColor={'#a9a9a9'}
          tintColor={'black'}
          activityTintColor={'green'}
          // arrowImg={}      
          // checkImage={}   
          //optionTextStyle={{color: 'black'}}
          titleStyle={{color: 'black'}} 
          // maxHeight={300} 
          handler={(selection, row) => this.setState({GenderText: Gender[selection][row]})}
          data={Gender}
        >
           </DropdownMenu>
           <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 180
  }}
/>


<Text style={{ marginBottom: 10,textAlign: 'center', fontSize: 20, fontStyle: 'italic', color: 'white', marginTop: 10}}> 
              Select your date of birth
          </Text>
         
  
      <DatePicker
        style={{width: 200, marginBottom: 10, marginLeft: 100, backgroundColor: 'white', marginTop: 10 }}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="1800-01-01"
     //   maxDate="2020-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
      //  showIcon={false}
       // customStyles={{
         // dateIcon: {
         //   position: 'absolute',
         //   left: 0,
         //   top: 4,
         //   marginLeft: 0
        //  },
         // dateInput: {
          //  marginLeft: 36
         // }
          // ... You can check the source to find the other keys.
    //    }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
       
      <View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 10
  }}
/>
<Text style={{ marginBottom: 10,textAlign: 'center', fontSize: 20, fontStyle: 'italic', color: 'white', marginTop: 10}}> 
              Which country are you from?
          </Text>

          <CountryPicker
          
          onSelect={(value)=> this.setState({country: value})}
          translation='eng'
          withAlphaFilter={true}
          withEmoji={true}
          containerButtonStyle={{marginLeft: 150}}

       theme={DARK_THEME}

        />
         
        {this.state.country.name &&
          <Text style={{ width: '50%',
            padding: 10,
            marginTop: 7,
            fontSize: 20,
            marginLeft: 100,
            textAlign: 'center',
            backgroundColor: 'black',
            borderColor: 'red',
            borderWidth: 1 / PixelRatio.get(),
            fontWeight: 'bold',
            color: 'white'}}>
            {JSON.stringify(this.state.country.name, null, 2)}
          </Text>
  }

<View
  style={{
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginTop: 10
  }}
/>

<TouchableOpacity 
                        onPress={this.createUserInfo}
                        style ={{   height: 50,
                          width: 200,
                          borderRadius: 25,
                          borderWidth: 2.5,
                          borderColor: '#fff',
                            backgroundColor: '#0043cf',
                            borderRadius: 25,
                            marginVertical: 10,
                            paddingTop: 15, 
                            marginTop: 40,
                            marginLeft: 100 }}> 
               
            <Text style = {{ fontSize: 16,fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginTop: -1}}> Sign Up</Text>
       </TouchableOpacity>


        </View>
      </ScrollView> 
    )
  }
}

export default UserSignUpPage;
