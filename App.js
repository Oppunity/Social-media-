import React, { Component } from 'react';
import { Navigator } from 'react-native'
import {createAppContainer} from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import awsmobile from './aws-exports';

import HomeScreenPage from './src/screens/HomeScreenPage';
import EventClickPage from './src/screens/EventClickPage';
import UserInterestPage from './src/screens/UserInterestPage';
import LogInPage from './src/screens/LogInPage';
import MainFeedPage from './src/screens/MainFeedPage';
import OrgProfilePage from './src/screens/OrgProfilePage';
import OrgRecommendationPage from './src/screens/OrgRecommendationPage';
import OrgSignUpPage from './src/screens/OrgSignUpPage';
import SettingPage from './src/screens/SettingPage';
import SignUpPage from './src/screens/SignUpPage';
import UploadPage from './src/screens/UploadPage';
import UserProfilePage from './src/screens/UserProfilePage';
import AccountSelectPage  from './src/screens/AccountSelectPage';
import UserSignUpPage from './src/screens/UserSignUpPage';
import FollowerPage from './src/screens/FollowerPage';
import FollowingPage from './src/screens/FollowingPage';
import SearchPage from './src/screens/SearchPage';
import BlogScreen from './src/screens/BlogScreen';
import BlogClickPhoto from './src/screens/BlogClickPhoto';
import BlogClickNoPhoto from './src/screens/BlogClickNoPhoto';
import BlogWithPhoto from './src/screens/BlogWithPhoto';
import BlogNoPhoto from './src/screens/BlogNoPhoto';
import SelectUploadPage from './src/screens/SelectUploadPage';
import BlogUploadPage from './src/screens/BlogUploadPage';

Amplify.configure(awsmobile)

const MainFeedTabs = createMaterialTopTabNavigator(  
  {  

      Events: {
          screen: MainFeedPage,
          navigationOptions: 
          {
              title: 'Events'}
           },


      

      Blog: {
          screen:BlogScreen,
          navigationOptions: 
          {
              title: 'Blogs'}
           },
     
      
  },

  { 
      tabBarOptions: {  
          activeTintColor: 'cyan',  
          showIcon: true,  
          showLabel:true,  
          style: {  
              backgroundColor:'black'  
          },

          indicatorStyle: {
          backgroundColor: 'cyan',
      },
      },  
  }) 

const FollowerTab = createMaterialTopTabNavigator(  
  {  
      Followers: {
          screen: FollowerPage,
          navigationOptions: 
          {
              title: 'Followers',
              }
           },

      Following: {
          screen: FollowingPage,
          navigationOptions: 
          {
              title: 'Following',
              
              }
           },        
  },
  

  { 
      tabBarOptions: {  
          
          activeTintColor: 'white',  
          showIcon: true,  
          showLabel:true,  
          style: {  
              backgroundColor:'black'  
          },

          indicatorStyle: {
          backgroundColor: 'white',
        },
         headerTintColor: 'white'
                       },
                       tabStyle: {
  height: 50,
},
});
const RootStack = createStackNavigator ( { 
 
  HomeScreen: HomeScreenPage,
  EventClick: EventClickPage,
  UserInterest: UserInterestPage,
  LogIn: LogInPage,
  // MainFeed: MainFeedTabs,
  OrgProfile: OrgProfilePage,
  OrgRecommendation: OrgRecommendationPage,
  Setting: SettingPage,
  SignUp: SignUpPage,
  Upload: UploadPage,
  UserProfile: UserProfilePage,
  AccountSelect: AccountSelectPage,
  OrgSignUp: OrgSignUpPage,
  UserSignUp: UserSignUpPage,
  FollowerPage: FollowerPage,
  Search: SearchPage,
  FollowingPage: FollowingPage,
  BlogClickNoPhoto: BlogClickNoPhoto,
  BlogClickPhoto: BlogClickPhoto,
  BlogWithPhoto: BlogWithPhoto,
  BlogNoPhoto: BlogNoPhoto,
  SelectUploadPage: SelectUploadPage,
  BlogUploadPage: BlogUploadPage,
  MainFeedPage:{
    screen: MainFeedTabs,
          navigationOptions: ({navigation}) => {  //destructure the navigation property here 
              return {
                  headerShown: true,
                  headerLeft: null,
                  headerStyle: { backgroundColor: 'black'},
  
                  headerTitleStyle: { color: 'white' },
  
                  title: 'HBN',
  
                  
                       
              }
          }
    },
  //redirect:redirect

},
{
  initialRoute: 'HomeScreen',
  defaultNavigationOptions: {
      headerStyle: {
      backgroundColor: '#fff',
      //headerTintColor: '#2E36FF'
  },
  gesturesEnabled:false,
  swipeEnabled:false
  //navigationOptions:{
  //  swipeEnabled:false
  //},
  
}
}
)

const AppContainer = createAppContainer(RootStack)

class App extends Component {


  constructor(props)
  {
  super(props)
 
  this.state = {
   CurrentIDENTITYID: ''
  }
  } 

  async componentDidMount() {


  var credentials = await Auth.currentCredentials()
 var identityIds = credentials._identityId
 this.state.CurrentIDENTITYID = identityIds
  }
  render() {


      return (
          <AppContainer/> 
      )
  };
}

export default App; 
