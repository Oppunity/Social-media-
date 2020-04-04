import React, {Component} from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text, Switch } from 'react-native';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import ActionButton from 'react-native-circular-action-menu';
import { SetS3Config } from '../awsS3/service';
import { Kaede } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import SelectUploadPage from './SelectUploadPage';

import { createOrgEvent } from '../graphql/mutations'


class UploadPage extends Component {
  static navigationOptions = {
    header: null
  } 

  state = {
    EventName: '', EventTime: '', EventLocation: '', EventDetails: '',
    height: 0, photo: null, IDENTITYID: '', currentUsers: [], anonymous: false  }


  toggleSwitch = () => {
    this.setState({ anonymous: !this.state.anonymous });
    };

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

  handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      this.setState({ photo: image })
      console.log(image);
      //Auth.currentCredentials().then(data => console.log(data)).catch(err => console.log(err));
  
    });

  }

  createEventInfo = async() => {
    if (this.state.anonymous === '' || this.state.anonymous === 'false' ) {
      this.state.anonymous = false
    }

    //const { anonymous } = this.state
    // store the UserInput data in a variable
    const UserInputs = {
      anonymous: this.state.anonymous, CaptilizeEventName: this.state.EventName.toUpperCase(), EventName: this.state.EventName, EventTime: this.state.EventTime, EventLocation: this.state.EventLocation, EventDetails: this.state.EventDetails, identityId: this.state.IDENTITYID, picpath: this.state.photo.path.split('/').slice(-1)[0]
    }
    // perform an optimistic response to update the UI immediately
  
    const currentUsers = [...this.state.currentUsers, UserInputs]
    this.setState({
      currentUsers,
      anonymous: '', EventName: '', EventTime: '', EventLocation: '', EventDetails: '',
      })
  
    try {
      /*}
      console.log(this.state.EventName)
      console.log(this.state.EventTime)
      console.log(this.state.EventLocation)
      console.log(this.state.EventDetails)
      console.log(this.state.IDENTITYID)
      console.log(this.state.photo.filename)
    {*/
      console.log(this.state.currentUsers)
      // make the API call
      await API.graphql(graphqlOperation(createOrgEvent, {
        input: UserInputs
      }))
      console.log('item created!')
      this.props.navigation.navigate('MainFeedPage')
    } catch (err) {
      console.log('error creating UserInputs...', err)
    }
   
  }
  
  uploadToStorage = async () => {
    try {
      const response = await fetch(this.state.photo.path)
      const blob = await response.blob()
     
      SetS3Config("keithhbn205309-keithhbn", "protected");
      Storage.put((this.state.photo.path).split('/').slice(-1)[0], blob, {
        contentType: 'image/jpeg',
      })
      console.log('Image Upload!!!!')
     // this.setState({ photo: null })
      {this.createEventInfo()}
    } catch (err) {
      console.log(err)
    }
  }


  onChange = (key, value) => {
    this.setState({ [key]: value })
  }

  
    render() {
      const { photo } = this.state
      return (
        <View style={{top: 0 ,flex: 1, backgroundColor: 'black'}}>  
           <TouchableOpacity
       activeOpacity= {0.5}
       onPress={() => this.props.navigation.navigate('SelectUploadPage')}
       >
       <Icon 
       size ={50}
       color='white' 
       name='ios-return-left'
       style={{marginTop: 30, marginLeft: 20, position: 'absolute'}}
    > 
    </Icon>
      </TouchableOpacity>
      <Text style={{color: 'white', fontSize: 20, textAlign: 'center', marginTop: 150, marginBottom: 10 }}>
  Do you want to make an anonymous post? 
   </Text>
   <View style={{marginLeft: 175}}>
   <Switch
        value={this.state.anonymous}
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
          <Kaede
          style={{marginTop: 20}}
          label={'Event Name'}
          inputPadding={16}  
          onChangeText={v => this.onChange('EventName', v)}
          />
     <Kaede
          style={{marginTop: 10}}
          label={'Time of Event'}
          inputPadding={16}  
          onChangeText={v => this.onChange('EventTime', v)}
          />
   <Kaede
          style={{marginTop: 10}}
          label={'Event Location'}
          inputPadding={16}  
          onChangeText={v => this.onChange('EventLocation', v)}
          />



<TextInput
        multiline={true}
        onChangeText={(EventDetails) => {
            this.setState({ EventDetails })
        }}
        onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height })
        }}
        placeholder='Description of your Event'
        placeholderTextColor='white'
        style={[styles.default, {height: Math.max(150, this.state.height)}]}
        value={this.state.EventDetails}
      />

<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
        {photo && (
          <Image
            source={{ uri: photo.path }}
            style={{ width: 350, height: 300 }}
          />
        )}
      
      </View>

       
      <ActionButton
             buttonColor="rgba(231,76,60,1)" 
             radius = {120}
             style={styles.actionButton}
             bgColor = 'black'
             btnOutRange = 'black'
             >

          
          <ActionButton.Item buttonColor='orangered' size = {50} onPress={() => this.props.navigation.navigate('MainFeed')}>
            <Icon name="ios-home" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>


          <ActionButton.Item buttonColor='orangered' size = {50} onPress={this.handleChoosePhoto}>
            <Icon name="ios-add-circle-outline" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='magenta' size = {50} onPress={this.uploadToStorage}>
            <Icon name="ios-return-right" style={styles.actionButtonIcon}/>
          </ActionButton.Item>

            </ActionButton>
  
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    default: {
                   width: 350,
                    height: 150,
                    backgroundColor: '#a9a9a9',
                    marginLeft: 30,
                    padding: 8,
                    color: 'white',
                    borderRadius: 14,
                    marginTop: 30
    },
      actionButtonIcon: {
        fontSize: 30,
        height: 30, 
      },  
    actionButton: {
      marginTop:-5,
        paddingTop:25,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
    },
  

  });
export default UploadPage; 