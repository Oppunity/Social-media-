import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Switch, Image, Dimensions, FlatList} from 'react-native';
import  PostFeed from '../components/PostFeed';

import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';

import { CheckBox, CardItem, Content} from 'native-base'

import Modal from "react-native-modal";
//import ActionButton from 'react-native-circular-action-menu';

import  FilterHeader from '../components/FilterHeader' 
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import * as queries from '../graphql/queries'


var radio_props = [
  {label: 'organizations', value: 0 },
  {label: 'users', value: 1 },
  {label:'both', value: 2}
];

class MainFeedPage extends Component {
    static navigationOptions = {
        header: null
    }



    constructor(props) {
        super(props);
        this.state = {
        
        currentFollowers: [],
        FollowersPictureData: [],
        FollowerInfomationData: [],
      
        isModalVisible: false,
        toggle1Clicked:'',
        toggle2Clicked:'',

        MainFeedimage: [], 
        MainFeedcurrentUser: [],
        IDENTITYID: '',
        MainFeedorgpicname: [],
        orgoruser:'',
        sUser:{},

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

          //Post
          liked: false, 
          disliked: false,
          screenWidth: Dimensions.get("window").width,
          likes:0,
          dislikes:0,
          comments: 0
        
         };
    }

    async componentDidMount() {
      const credentials = await Auth.currentCredentials()
      const identityIds = credentials._identityId
      this.state.IDENTITYID = identityIds
      //console.log(this.state.IDENTITYID)
      
      var AllUserData = await API.graphql(graphqlOperation(queries.listOrgInfos, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
      //console.log(AllUserData.data.listOrgInfos.items[0])
      if(AllUserData.data.listOrgInfos.items.length>0){
        this.setState({orgoruser:'org',sUser:AllUserData.data.listOrgInfos.items[0]})
        console.log('org')
      } else {
        var AllUserData = await API.graphql(graphqlOperation(queries.listUserInfos, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
        //console.log(AllUserData.data.listUserInfos.items[0])
        if(AllUserData.data.listUserInfos.items.length>0){
          this.setState({orgoruser:'user',sUser:AllUserData.data.listUserInfos.items[0]})
          console.log('user')
        } else {
          alert('Error')
        }
      }
      console.log('sUser:......'+this.state.sUser)
      //console.log(AllUserData.data.listUserInfos.items[0])
/*

      var AllFollowingData = await API.graphql(graphqlOperation(queries.listFollowings, { filter: { Followerid: { eq: this.state.IDENTITYID } } } ))
      this.setState({
        currentFollowers: AllFollowingData.data.listFollowings.items
        })

        for(let i=0;(i<this.state.currentFollowers.length); i++){
          this.setState({srids:[...this.state.srids, this.state.currentFollowers[i].Followingid]})
          var FollowerEvent = await API.graphql(graphqlOperation(queries.listOrgPics, { filter: { identityId: { eq: this.state.srids[i] }}}))
          this.setState({
            FollowerPictureData: [...this.state.FollowersPictureData, FollowerEvent.data.listOrgPics.items]
            })
        }
        for(let i=0;(i<this.state.FollowersPictureData.length); i++) {
          this.setState({srids:[...this.state.srids, this.state.FollowersPictureData[i].identityId]})
          var FollowerInfo = await API.graphql(graphqlOperation(queries.listOrgInfo, { filter: { identityId: { eq: this.state.srids[i] }}}))
          this.setState({
            FollowerInfomationData: [...this.state.FollowerInfomationData, FollowerInfo.data.listOrgInfo.items]
            })
        }
      
        */
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






updateLikes = () => {

  if(!this.state.liked) { 
  this.setState((prevState, props) => {
      return {
          likes: prevState.likes + 1,
          liked: true,             
      };
  });

} else {

  this.setState((prevState,props) => {
      return { 
          likes: prevState.likes - 1,
          liked: false,
          iconColour: "white"
          
  };
});

} 
}


updateDislikes = () => {

  if(!this.state.disliked) { 
  this.setState((prevState, props) => {
      return {
          dislikes: prevState.likes + 1,
          disliked: true,
          iconColour:"red"
      };
  });

} else {

  this.setState((prevState,props) => {
      return { 
          dislikes: prevState.dislikes - 1,
          disliked: false,
          iconColour:"white"
  };
});

} 
}

  





    render(){
      const { navigation } = this.props;


      const imageHeight = Math.floor(this.state.screenWidth * 1.1);
        const imageSelection = 
            this.props.item % 2 == 0  
             ? "https://www.nsbe.org/getattachment/28832cde-2300-42ed-8121-e41f9f9d7c2d/nsbe46-save-the-date.aspx"
             : "https://image.slidesharecdn.com/nsbegeneralbody1-20-16-160121134003/95/usf-nsbe-gbm-1202016-1-638.jpg?cb=1453383709";
       
        const imageUri = imageSelection +  "=s" + imageHeight + "-c";

        const likeIcon = this.state.liked ? 'rgb(252,61,57)': null;
        const dislikeIcon = this.state.disliked ? 'rgb(252,61,57)': null;

        return(
          
            <View style = {{flex:1, width:100 + "%", height: 100 + "%", backgroundColor:'black', paddingBottom: 10 }}>
         
            <View style = {{borderBottomWidth: 0.2, borderColor: 'cyan', width: '100%', height: 90, flexDirection: 'row'}}> 
              
            <TouchableOpacity 
            onPress={this.toggleModal}
            style = {{left: '46.8%', bottom: 4, position: 'absolute'}}      
        >
    <Icon name={'ios-eye'}  color='white'  size={35}  />  

        </TouchableOpacity>

        <View style={{top: 10, marginLeft: 10}}>
    <TouchableOpacity style={{backgroundColor:this.state.button1BackgroundColor,  borderColor:this.state.button1BorderColor, padding: 5, width: 140, justifyContent: 'center', borderRadius: 5, borderWidth: 1, left: 5,}}
                            onPress={this.updateAnon}>
          
                           <Text style = {{color: this.state.button1TextColor, fontWeight: '500', textAlign: 'center'}}> {this.state.button1Message} </Text>

               </TouchableOpacity>
               <Image source={{ uri: this.state.button1Image[this.state.button1SelectedIndex]}} style={{height: 30, width: 30, left: 55 , marginTop: 10, backgroundColor: 'black'}} />
</View>



<View style={{top: 10, right: 10, position: 'absolute'}}>
    <TouchableOpacity style={{backgroundColor:this.state.button2BackgroundColor,  borderColor:this.state.button2BorderColor, padding: 5, width: 140, justifyContent: 'center', borderRadius: 5, borderWidth: 1, right: 5,}}
                            onPress={this.updateGlobal}>
          
                           <Text style = {{color: this.state.button2TextColor, fontWeight: '500', textAlign: 'center'}}> {this.state.button2Message} </Text>

               </TouchableOpacity>
               <Image source={{ uri: this.state.button2Image[this.state.button2SelectedIndex]}} style={{height: 30, width: 30, left: 55 , marginTop: 10, backgroundColor: 'black'}} />
</View>

      
             

             <Modal isVisible={this.state.isModalVisible}>
{/* what you see when you click on the eye icon */}

          <View style={{ backgroundColor: 'black', height: 230, width: 400, top: -40, left:-30}}>
            
                 <View style = {{top: 20, width: '100%', height: 240, left: 10, borderColor: 'white', backgroundColor: 'black'}}> 
                 <Content style = {{backgroundColor: 'black'}}> 

                 <CardItem header style = {{backgroundColor: 'black'}}>
                 <Text style = {{color: 'white'}}> Select mainfeed filter options</Text>
                 </CardItem>
                 <CardItem body style = {{backgroundColor: 'black'}}>
                 <CheckBox checked = {this.state.radioButton1Pressed}
                 onPress = {this.onePressed}
                 style = {{marginRight:20}}
                 />
                 <Text style = {{color: 'white'}} > See posts from users and organizations </Text>
                 </CardItem>
             
                <CardItem body style = {{backgroundColor: 'black'}}>
                 <CheckBox checked = {this.state.radioButton2Pressed}
                 onPress = {this.twoPressed}
                 style = {{marginRight:20}}
                 />
                 <Text style = {{color: 'white'}}> Only see posts from users </Text>
                 </CardItem>

                 <CardItem body style = {{backgroundColor: 'black'}}>
                 <CheckBox checked = {this.state.radioButton3Pressed}
                 onPress = {this.threePressed}
                 style = {{marginRight:20}}
                 />
                 <Text style = {{color: 'white'}}> Only see posts from organizations </Text>
                 </CardItem>

                <CardItem right
                 style = {{backgroundColor: 'black'}}>
                <Button style = {{ bottom: 10, left: -40 }} title="Save" onPress={this.toggleModal} />
                </CardItem>
           
            </Content> 
                     </View>
        </View>
              
        </Modal>
        </View>
             
             {this.state.anonymous == false && this.state.global == false ?

<FlatList 
 data={this.state. button1Image}
 numColumns = {this.state.numColumnss}
 key={this.state.numColumnss}
 renderItem={ ({ item }) => (
<View style = {{flex:1, width: 100 + "%", backgroundColor:'black'}}> 
                    
<View style = {styles.userBar}> 
       
   
        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrgProfile') }>  
        <Image style = {styles.organizationPic} 
        source = {{uri: "https://www.nsbe.org/NSBE/media/Images/About%20NSBE/Torch%20Symbol/PNG/NSBELogo_Black_withName.png"}}/>
        </TouchableOpacity>

        
        <View style = {styles.organizationBar}> 

        <TouchableOpacity>
        <Text style = {styles.organizationName}>NSBE  </Text>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style = {styles.organizationHandle}>@nsbe  </Text>
        </TouchableOpacity>

        <Text style = {styles.activity}> · 45 minutes ago </Text>
        </View>

        <View style = {styles.eventDescription}>
        <TouchableOpacity   onPress={() => this.props.navigation.navigate('EventClick')} >
        <Text 

        style = {{marginLeft: 10, fontWeight: '200', color: "white", fontSize: 15,  position: "absolute", top: 0}}>
        NSBE Networking Event in UC 103 @ 12:30 pm
        </Text>
        </TouchableOpacity>
        </View>
                   
</View>

<View style = {styles.eventPicture}>

<TouchableOpacity onPress={() => this.props.navigation.navigate('EventClick')}> 
<Image source = {{uri: 'https://photos.smugmug.com/Events/2016/2016-NSBE-Professional/NSBE-PDC-Welcome-EPIC/i-6nswDpV/0/b92072ac/L/NSBE%20-%20PDC%20Welcome%20%26%20EPIC%20Networking%20Event%20%40%20Mimosa%20Grill%209-30-16%20by%20Jon%20Strayhorn%20020-L.jpg'}}
style = {{ height: 100 + '%',
width: 100+ '%'}}/>
</TouchableOpacity>

</View>

<View style = {styles.iconBar}>
  

    

   <TouchableOpacity onPress = {this.updateLikes}>
        
    <Icon style = {styles.likeIcon} name = "thumbs-o-up" size={20} />

    </TouchableOpacity>

   
    <Text style = {{color: 'gray'}}> {this.state.likes}  </Text>
  



    
    

    <TouchableOpacity onPress = {this.updateDislikes}>

    <Icon style = {styles.dislikeIcon} name = "thumbs-o-down" size={20} />

    </TouchableOpacity>

    

    <Text style = {{color: 'gray'}}> {this.state.dislikes}  </Text>

 


    
    
    <TouchableOpacity>
   
    <Icon style = {styles.commentIcon} name = "comment-o" size={20} />

    </TouchableOpacity>

    <TouchableOpacity>

    <Text style = {{color: 'gray'}}> {this.state.comments}  </Text>

    </TouchableOpacity>




        <Text style = {styles.rating}> Rating: 8.5 </Text>

       <Image style = {styles.ratingIcon} /> 
     


</View>


</View>
)
} 
keyExtractor={(items, index, numColumns) => index.toString()} />
:  <PostFeed 
style = {{ top: 100,}}
navigation={navigation}/>
             }
             
            
           


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
            );
    }

  


}

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
    




      activity: {
        color: "gray",
        fontSize: 13
    },

    commentBar: {
        width: 100 + "%",
        height: 50,
        borderColor: 'rgb(233,233,233)',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        
    },

    commentIcon: {
       marginLeft: 50,
       color: "gray"
    },


    dislikeIcon:{
        marginLeft: 50,
        color:"gray"
    },


    eventName: {
        marginLeft: 10,
        color: 'white',
        fontSize: 18,
        fontWeight:'300'
    },

    eventDescription: {
        height: 40,
        width: 280,
        position: "absolute",
        bottom: 15,
        right: 12,
        
    },
    
    eventPicture: {
        height: 180,
        top: 20,
        width: 200 + '%',
        marginRight: 1,
        bottom: 20
    },
    

    headerText: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        marginTop: 10
    },


    iconBar: {
        height: 60,
        width: 100 + "%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "gray",
        top: 30
        
    },

    likeIcon:{
        marginLeft: 15,
        color: "gray"
    },

     organizationBar: {
        height: 30,
        width: 280,
        flexDirection: 'row',
        alignItems: 'flex-start',
        top:10
        
    },


    organizationHandle: {
       
        color: 'cyan',
        fontSize: 16,
        
               
    },

    
    organizationName: {
        marginLeft: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        
    },

    
    organizationPic: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
        top: 10
        
        
       
    },


    rating: {
        position: "absolute",
        right: 40,
        color: "gray",
        fontSize: 14
            },
    
    ratingIcon: {
        position: "absolute",
        right: 10,
        height: 30,
        width: 30,
    },
   
     tempNav: {
        width: 100 + "%",
        height: 56,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101011',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

   
    userBar: {
        width: 100 + "%",
        height: 90,
        backgroundColor: 'black',
        flexDirection: "row",
              justifyContent: "center",
        borderColor: "gray",
        top: 20
       
        
    },

    }
      );


export default MainFeedPage; 

MainFeedPage.navigationOptions={  
tabBarIcon:({tintColor, focused})=>(  
            <Icon  
                name={'ios-calendar'}  
                color={tintColor}  
                size={25}  
            />  

            ),
};