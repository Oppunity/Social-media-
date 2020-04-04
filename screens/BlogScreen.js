import React, { Component} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { BlogFeed, BlogNoPhoto} from './index';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
var radio_props = [
    {label: 'organizations', value: 0 },
    {label: 'users', value: 1 },
    {label:'both', value: 2}
  ];

  
    
class BlogScreen extends Component{

    constructor(props) {
        super(props);
        this.state = {
  
        //FilterHeader
        anonymous: false, 
        button1Message:'non-anonymous',
        button1BackgroundColor: 'cyan',
        button1TextColor: 'black',
        button1BorderColor: 'cyan',
        button1Image: [
           "https://cdn.shopify.com/s/files/1/1061/1924/products/Angel_Halo_Emoji_Icon_0ff75c27-5416-4ac6-bf1a-2a2d44b0a32b_large.png?v=1571606089",
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Devil_Emoji_grande.png?v=1571606036"
          
        ], 
        button1SelectedIndex: 0,
  
          //states for dynamic 'local' button
          button2BackgroundColor: 'cyan',
          button2BorderColor: 'cyan',
          button2TextColor:'black',
          button2Message: 'local',
          global: false,
          button2Image: [
           "https://cdn.shopify.com/s/files/1/1061/1924/products/House_Emoji_With_Tree_large.png?v=1571606064",
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Earth_Globe_Europe_Africa_large.png?v=1571606068"
                                  ], 
          button2SelectedIndex: 0,

          isModalVisible: false, //hides modal when load app
  
          radioButton1Pressed: true,
          radioButton2Pressed: false,
          radioButton3Pressed: false,
    
         };
    }

    async componentDidMount() {
        var credentials = await Auth.currentCredentials()
        var identityIds = credentials._identityId
        this.state.CurrentIDENTITYID = identityIds 
        var blogquery = await API.graphql(graphqlOperation(queries.listBlogEvents ))
        console.log('BLOG SCREEN')
        console.log(blogquery.data.listBlogEvents.items)
    }

    updateAnon = () => {
        if (this.state.button1SelectedIndex != 1) {
          this.setState(prevState => ({
              button1SelectedIndex: 1 
          }));      
       } else{
           this.setState(prevState => ({
               button1SelectedIndex:0
           }))
       }
    
    if(!this.state.anonymous) { 
    this.setState((prevState, props) => {
        return {
              
            button1BackgroundColor: 'black',
              button1BorderColor: 'gray',
              button1TextColor: 'white',
              
              anonymous: true,
              button1Message: 'anonymous',
                  
        };
    });
    
    } else {
    
    this.setState((prevState,props) => {
        return { 
              
            button1BackgroundColor: 'cyan',
              button1BorderColor: 'cyan',
              button1TextColor:'black',
              button1Message: 'non-anonymous',
              anonymous: false     
    };
    });
    } 
    }
    
    updateGlobal = () => {
        if (this.state.button2SelectedIndex != 1) {
          this.setState(prevState => ({
              button2SelectedIndex: 1 
          }));      
       } else{
           this.setState(prevState => ({
               button2SelectedIndex:0
           }))
       }
    
    
    
    if(!this.state.global) { 
    this.setState((prevState, props) => {
        return {
              
            button2BackgroundColor: 'black',
              button2BorderColor: 'gray',
              button2TextColor: 'white',
              
              global: true,
              button2Message: 'global',
                  
        };
    });
    
    } else {
    
    this.setState((prevState,props) => {
        return { 
              
            button2BackgroundColor: 'cyan',
              button2BorderColor: 'cyan',
              button2TextColor:'black',
              button2Message: 'local',
              global: false    
    };
    });
    
    } 
    }

    
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        };
        
        onePressed = () =>{
          this.setState({radioButton1Pressed: true, radioButton2Pressed: false, radioButton3Pressed: false})
        }
        
        twoPressed = () =>{
          this.setState({radioButton2Pressed: true, radioButton1Pressed: false, radioButton3Pressed: false})
        }
        
        threePressed = () =>{
          this.setState({radioButton3Pressed: true, radioButton1Pressed: false, radioButton2Pressed: false})
        }

    render(){
        return(
        <View>
    
            <View>
                <BlogFeed/>
                <ActionButton
             buttonColor="rgba(231,76,60,1)" 
             radius = {120}
             style={styles.actionButton}
             bgColor = 'black'
             btnOutRange = 'black'
             >


          <ActionButton.Item buttonColor='dodgerblue' size = {50} 
            onPress={() => {if(this.state.orgoruser=='user'){this.props.navigation.navigate('UserProfile',{sUser:this.state.sUser})} else{
              //CollegeA:this.state.sUser.CollegeA,OrgSchool:this.state.sUser.OrgSchool,OrgText:this.state.sUser.OrgText,identityId:this.state.sUser.identityId,oratingp:this.state.sUser.oratingp,oratingt:this.state.sUser.oratingt,orgBioatingp:this.state.sUser.oratingp})} else
             this.props.navigation.navigate('OrgProfile',{sUser:this.state.sUser})}}}>
            <Icon name="ios-contact" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='orangered' size = {50} onPress={() => this.props.navigation.navigate('MainFeedPage')}>
            <Icon name="ios-home" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='magenta' size = {50} onPress={() => this.props.navigation.navigate('Search')}>
            <Icon name="md-search" style={styles.actionButtonIcon}/>
          </ActionButton.Item>

          

          <ActionButton.Item buttonColor='crimson' size = {50} onPress={() => this.props.navigation.navigate('SelectUploadPage')}>
            <Icon name="md-cloud-upload" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>
          
          <ActionButton.Item buttonColor='lime' size = {60} onPress={() => this.props.navigation.navigate('Message')}>
            <Icon name="ios-chatbubbles" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>

            </ActionButton>
            
            </View>
            </View>
        )
    }
}

export default BlogScreen;

const styles = StyleSheet.create(
    {
      actionButtonIcon: {
        fontSize: 30,
        height: 30, 
        
    
  
      //  color: 'white',
      },  
      actionButton: {
        marginTop:15,
          paddingTop:45,
          paddingBottom:15,
          marginLeft:30,
          marginRight:30,
      },
    }
);