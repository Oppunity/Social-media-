import React , {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView} from 'react-native';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';


class OrgRatingFeed extends Component{
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get("window").width,
            smash:0,
            heat :0,
            looseness :0,
            thickness :0,
            intelligence :0,
            savageness :0,
            ratchetness :0,
            diversity :0,
            bc0:'black',
            bc1:'black',
            bc2:'black',
            bc3:'black',
            bc4:'black',
            bc5:'black',
            bc6:'black',
            bc7:'black',
            bc8:'black',
            ownpage:false,
            image: [], 
            followers:[],
            following:[],
            numfollowers:'',
            numfollowing:'',
            currentUser: [],
            photos: null, 
            IDENTITYID: '',
            orgpicname: [],
            eventc: '',
            orgpic: [], 
            orgimage: '',
            orgtext:'',
            rating:0,
            trating:0,
            orginfo: [], 
            sUser:[],
            cUser:[],
            cUsername:'',
            cUserpic:'',
            followingrowid:'',
            followerrowid:'',
            //loggedinuser:[],
            followings: false, 
            buttonMessage:'Follow',
            orgoruser:'',
            rand:'',



            Default_Rating: 0,
            Default_Rating1: 0,
            Default_Rating2: 0,
            Default_Rating3: 0,
            Default_Rating4: 0,
            Default_Rating5: 0,
            Default_Rating6: 0,
            Default_Rating7: 0,
            SmashRating: 'Smash or Pass',
            HeatMeterRating: 'Heat Meter',
            LossenessRating: 'Looseness',
            ThicknessRating: 'Thickness',
            IntelligenceRating: 'Intelligence',
            SavagenessRating: 'Savageness',
            RatchetnessRating: 'Ratchetness',
            DiversityRating: 'Diversity',
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
      ratingImages: [
        "https://cdn.clipart.email/d3b24debd13850a4b3a7d3e05c5fb3c7_fire-png-clipart-martrhpngmartcom-fire-fire-emoji-transparentjpg-_1899-1899.jpeg",
        "http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg"
      ], 
      selectedIndex: 0,
      selectedIndex1: 0,
      selectedIndex2: 0,
      selectedIndex3: 0,
      selectedIndex4: 0,
      selectedIndex5: 0,
      selectedIndex6: 0,
      selectedIndex7: 0,
         };
    //Filled Star. You can also give the path from local
    this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    //Empty Star. You can also give the path from local
    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }
    async componentDidMount() {
        //console.log('rating mounted')
        /*this.willFocusSubscription = this.props.navigation.addListener('willFocus', async(payload) => {
                        //console.log('[print action for test:]', payload);
                        if (['Navigation/INIT', 'Navigation/NAVIGATE', 'Navigation/POP_TO_TOP'].includes(payload.action.type)) {
                            var credentials = await Auth.currentCredentials()
                var identityIds = credentials._identityId
                this.state.CurrentIDENTITYID = identityIds 
                this.setState({sUser:this.props.navigation.getParam('sUser')}, async function(){
                    console.log('sUsernameRATING.... '+this.state.sUser.userName)
                    console.log('sUserRATING.... '+this.state.sUser.orgName)
                    this.state.IDENTITYID =this.state.sUser.identityId
                if (this.state.CurrentIDENTITYID === this.state.IDENTITYID) {
                this.setState({followingright: '3000%'})
                }
                
                // determine if person logged in is org or user
                var orgquery = await API.graphql(graphqlOperation(queries.listOrgInfos, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
                if(orgquery.data.listOrgInfos.items.length>0){
                    this.setState({orgoruser:'org',cUser:orgquery.data.listOrgInfos.items[0],cUsername:orgquery.data.listOrgInfos.items[0].orgName,cUserpic:orgquery.data.listOrgInfos.items[0].OrgPicture})
                    console.log('signed in as org')
                } else {
                    var userquery = await API.graphql(graphqlOperation(queries.listUserInfos, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
                    //console.log(AllUserData.data.listUserInfos.items[0])
                    if(userquery.data.listUserInfos.items.length>0){
                    this.setState({orgoruser:'user',cUser:userquery.data.listUserInfos.items[0],cUsername:userquery.data.listUserInfos.items[0].userName,cUserpic:userquery.data.listUserInfos.items[0].UserPicture})
                    console.log('signed in as user')
                    } else {
                    alert('Error')
                    }
                }
                //console.log('CUSER')
                //console.log('cuser ....'+this.state.cUser)
                
                    try {
                    //var loggedinuser  = await API.graphql(graphqlOperation(listOrgEvents, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
                    var AllUserData = await API.graphql(graphqlOperation(listOrgEvents, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
                    var orgpic = await API.graphql(graphqlOperation(listOrgPics, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
                    //const orginfo = await API.graphql(graphqlOperation(listOrgInfos, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
                    var followers = await API.graphql(graphqlOperation(queries.listFollowers, { filter: { Followingid: { eq: this.state.IDENTITYID } } } ))
                    var following = await API.graphql(graphqlOperation(queries.listFollowings, { filter: { Followerid: { eq: this.state.IDENTITYID } } } ))
                    var cUserfollows = await API.graphql(graphqlOperation(queries.listFollowers, { filter: { Followingid: { eq: this.state.IDENTITYID },Followerid:{eq:this.state.CurrentIDENTITYID} } } ))
                    var cUserfollowing = await API.graphql(graphqlOperation(queries.listFollowings, { filter: { Followerid: { eq: this.state.CurrentIDENTITYID},Followingid:{eq:this.state.IDENTITYID} } } ))
                    //console.log(cUserfollowing)
                    if(cUserfollows.data.listFollowers.items.length>0){this.setState({followings:true,backgroundColor: 'black', borderColor: 'grey',buttonMessage: 'Following',followerrowid:cUserfollows.data.listFollowers.items[0].id,followingrowid:cUserfollowing.data.listFollowings.items[0].id})}
                    //console.log('AllUserData:', AllUserData)
                    //console.log(followers)
                //console.log(orginfo)
                    this.setState({
                    followers:followers,
                    following:following,
                    //loggedinuser: loggedinuser.data.listOrgEvents.items,
                    currentUser: AllUserData.data.listOrgEvents.items,
                    orgpic: orgpic.data.listOrgPics.items[0],
                    orginfo: this.state.sUser,
                    numfollowers:followers.data.listFollowers.items.length,
                    numfollowing:following.data.listFollowings.items.length,
                    rating:this.state.sUser.oratingt,
                    trating:this.state.sUser.oratingp,
                    orgBio:this.state.sUser.orgBio,
                    })
                    //console.log(followers)
                    //console.log('currentUser: ',this.state.currentUser)
                    for(let i=0; i<this.state.currentUser.length; i++) {
                    this.setState({orgpicname: [...this.state.orgpicname, this.state.currentUser[i].picpath.split('/').slice(-1)[0]]})
                    } 
                    
                    //console.log('orgpicname: ', this.state.orgpicname)
                    } catch (err) {
                    console.log(err)
                    }
                
                    //console.log('orgpic.OrgPicture:', this.state.orgpic.OrgPicture)
                    await Storage.get(this.state.orgpic.OrgPicture, {level: 'protected'})
                    .then(data => {
                    this.setState({
                    orgimage: data
                    })
                    })
                    .catch(err => {
                    console.log("error fetching image", err)
                    })
                
                    
                    for(let i=0; i<this.state.orgpicname.length; i++) {
                    await Storage.get(this.state.orgpicname[i], {level: 'protected'})
                    .then(data => {
                    // console.log("data: ", data)
                    this.setState({
                    image: [...this.state.image, data]
                    })
                    // console.log('image: ', this.state.image)
                    })
                    .catch(err => {
                    console.log("error fetching image", err)
                    })
                    }
                })
                        }})*/
    
    
    
     var credentials = await Auth.currentCredentials()
     var identityIds = credentials._identityId
     this.state.CurrentIDENTITYID = identityIds
     this.setState({sUser:this.props.sUser}, async function(){
        console.log('sUsernameRATING.... '+this.state.sUser.userName)
        console.log('sUserRATING.... '+this.state.sUser.orgName)
        console.log('sUserRATINGidentityid.... '+this.state.sUser.identityId)
        console.log('sUserRATINGcuseridentityid.... '+this.state.CurrentIDENTITYID)
        this.state.IDENTITYID =this.state.sUser.identityId
    if(this.state.CurrentIDENTITYID!=this.state.IDENTITYID){
        var cratings = await API.graphql(graphqlOperation(queries.listProfileratingss, { filter: { ratedid: { eq: this.state.IDENTITYID },raterid:{eq:this.state.CurrentIDENTITYID} } } ))
        //console.log(cratings)
        this.setState({Default_Rating:cratings.data.listProfileratingss.items[0].smash ,
            Default_Rating1: cratings.data.listProfileratingss.items[0].heat,
            Default_Rating2: cratings.data.listProfileratingss.items[0].looseness,
            Default_Rating3: cratings.data.listProfileratingss.items[0].thickness,
            Default_Rating4: cratings.data.listProfileratingss.items[0].intelligence,
            Default_Rating5: cratings.data.listProfileratingss.items[0].savageness,
            Default_Rating6: cratings.data.listProfileratingss.items[0].ratchetness,
            Default_Rating7: cratings.data.listProfileratingss.items[0].diversity,
            bc0:'rgba(50,50,50,1)',
            bc1:'rgba(50,50,50,1)',
            bc2:'rgba(50,50,50,1)',
            bc3:'rgba(50,50,50,1)',
            bc4:'rgba(50,50,50,1)',
            bc5:'rgba(50,50,50,1)',
            bc6:'rgba(50,50,50,1)',
            bc7:'rgba(50,50,50,1)',
            bc8:'rgba(50,50,50,1)',})
    } else {
        this.setState({ownpage:true})
        var cratings = await API.graphql(graphqlOperation(queries.listProfileratingss, { filter: { ratedid: { eq: this.state.IDENTITYID }} } ))
        var total = Number(cratings.data.listProfileratingss.items.length)
        for (var i = 0; i < cratings.data.listProfileratingss.items.length; i++) {
            this.setState({smash:Number(this.state.smash)+Number(cratings.data.listProfileratingss.items[i].smash),
                           heat:Number(this.state.heat)+Number(cratings.data.listProfileratingss.items[i].heat),
                           looseness:Number(this.state.looseness)+Number(cratings.data.listProfileratingss.items[i].looseness),
                           thickness:Number(this.state.thickness)+Number(cratings.data.listProfileratingss.items[i].thickness),
                           intelligence:Number(this.state.intelligence)+Number(cratings.data.listProfileratingss.items[i].intelligence),
                           savageness:Number(this.state.savageness)+Number(cratings.data.listProfileratingss.items[i].savageness),
                           ratchetness:Number(this.state.ratchetness)+Number(cratings.data.listProfileratingss.items[i].ratchetness),
                           diversity:Number(this.state.diversity)+Number(cratings.data.listProfileratingss.items[i].diversity)
            })
        }
        this.setState({
            Default_Rating:this.state.smash/total,
            Default_Rating1:this.state.heat/total ,
            Default_Rating2: this.state.looseness/total,
            Default_Rating3:this.state.thickness/total,
            Default_Rating4:this.state.intelligence/total,
            Default_Rating5:this.state.savageness/total,
            Default_Rating6:this.state.ratchetness/total,
            Default_Rating7:this.state.diversity/total,
            bc0:'rgba(50,50,50,1)',
            bc1:'rgba(50,50,50,1)',
            bc2:'rgba(50,50,50,1)',
            bc3:'rgba(50,50,50,1)',
            bc4:'rgba(50,50,50,1)',
            bc5:'rgba(50,50,50,1)',
            bc6:'rgba(50,50,50,1)',
            bc7:'rgba(50,50,50,1)',
            bc8:'rgba(50,50,50,1)',})
            
            console.log(this.state.smash)
            console.log(total)
            console.log(Default_Rating)
        if(this.state.Default_rating<=3){
            this.setState({selectedIndex:1})
        }
        if(this.state.Default_Rating1<=3){
            this.setState({selectedIndex1:1})
        }
        if(this.state.Default_rating2<=3){
            this.setState({selectedIndex2:1})
        }
        if(this.state.Default_Rating3<=3){
            this.setState({selectedIndex3:1})
        }
        if(this.state.Default_Rating4<=3){
            this.setState({selectedIndex4:1})
        }
        if(this.state.Default_rating5<=3){
            this.setState({selectedIndex5:1})
        }
        if(this.state.Default_rating6<=3){
            this.setState({selectedIndex6:1})
        }
        if(this.state.Default_rating7<=3){
            this.setState({selectedIndex7:1})
        }
    }
        //var cratings = await API.graphql(graphqlOperation(queries.listProfileratingss, { filter: { ratedid: { eq: this.state.IDENTITYID },raterid:{eq:this.state.CurrentIDENTITYID} } } ))



// prevent signed in user from changing their stars






    /*var orgquery = await API.graphql(graphqlOperation(queries.listProfileratings, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
    if (this.state.CurrentIDENTITYID === this.state.IDENTITYID) {
       this.setState({followingright: '3000%'})
    }
    
    // determine if person logged in is org or user
    var orgquery = await API.graphql(graphqlOperation(queries.listOrgInfos, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
    if(orgquery.data.listOrgInfos.items.length>0){
        this.setState({orgoruser:'org',cUser:orgquery.data.listOrgInfos.items[0],cUsername:orgquery.data.listOrgInfos.items[0].orgName,cUserpic:orgquery.data.listOrgInfos.items[0].OrgPicture})
        console.log('signed in as org')
    } else {
        var userquery = await API.graphql(graphqlOperation(queries.listUserInfos, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
        //console.log(AllUserData.data.listUserInfos.items[0])
        if(userquery.data.listUserInfos.items.length>0){
        this.setState({orgoruser:'user',cUser:userquery.data.listUserInfos.items[0],cUsername:userquery.data.listUserInfos.items[0].userName,cUserpic:userquery.data.listUserInfos.items[0].UserPicture})
        console.log('signed in as user')
        } else {
        alert('Error')
        }
    }
    //console.log('CUSER')
    //console.log('cuser ....'+this.state.cUser)
       
        try {
        //var loggedinuser  = await API.graphql(graphqlOperation(listOrgEvents, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
        var AllUserData = await API.graphql(graphqlOperation(listOrgEvents, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
        var orgpic = await API.graphql(graphqlOperation(listOrgPics, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
        //const orginfo = await API.graphql(graphqlOperation(listOrgInfos, { filter: { identityId: { eq: this.state.IDENTITYID } } } ))
                //console.log(cUserfollowing)
             //console.log('AllUserData:', AllUserData)
        //console.log(followers)
       //console.log(orginfo)
        this.setState({

        //loggedinuser: loggedinuser.data.listOrgEvents.items,
        currentUser: AllUserData.data.listOrgEvents.items,
        orgpic: orgpic.data.listOrgPics.items[0],
        orginfo: this.state.sUser,
        numfollowers:followers.data.listFollowers.items.length,
        numfollowing:following.data.listFollowings.items.length,
        rating:this.state.sUser.oratingt,
        trating:this.state.sUser.oratingp,
        orgBio:this.state.sUser.orgBio,
        })


        
        //console.log('orgpicname: ', this.state.orgpicname)
        } catch (err) {
        console.log(err)
        }*/
      
     })
    }















    UpdateRating(key) {
      if(this.state.ownpage){

      } else {

      
        //console.log(key) 
      //console.log(this.state.selectedIndex) 
      //console.log(this.item)
      this.setState({ Default_Rating: key,bc0:'black',bc8:'black' }, function (){
          if ((this.state.Default_Rating == 0) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 0) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
        });
        //Keeping the Rating Selected in state
        }
      }
    
      UpdateRating1(key) {
        if(this.state.ownpage){

        } else {
        this.setState({ Default_Rating1: key,bc1:'black',bc8:'black' }, function (){
            if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
          });
          //Keeping the Rating Selected in state
        }
        }
    
        UpdateRating2(key) {
            if(this.state.ownpage){

            } else {
          //console.log(key) 
          //console.log(this.state.selectedIndex) 
          //console.log(this.item)
          this.setState({ Default_Rating2: key,bc2:'black',bc8:'black' }, function (){
              if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2  
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2  
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 - 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 - 1 
                }));      
             }
            });
            //Keeping the Rating Selected in state
            }
          }
    
          UpdateRating3(key) {
            if(this.state.ownpage){

            } else {
            this.setState({ Default_Rating3: key,bc3:'black',bc8:'black' }, function (){
                if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 1) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 - 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 - 1 
                  }));      
               }
              });
              //Keeping the Rating Selected in state
            }
            }
    
            UpdateRating4(key) {
                if(this.state.ownpage){

                } else {
              this.setState({ Default_Rating4: key,bc4:'black',bc8:'black' }, function (){
                  if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex1: prevState.selectedIndex1  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                });
                //Keeping the Rating Selected in state
             }
              }
    
              UpdateRating5(key) {
                if(this.state.ownpage){

                } else {
                this.setState({ Default_Rating5: key,bc5:'black',bc8:'black' }, function (){
                    if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex1: prevState.selectedIndex1  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                  });
                  //Keeping the Rating Selected in state
                }
                }
    
                UpdateRating6(key) {
                    if(this.state.ownpage){

                    } else {
                  this.setState({ Default_Rating6: key,bc6:'black',bc8:'black' }, function (){
                      if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex5 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex5
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                    });
                    //Keeping the Rating Selected in state
                }
                  }
          
    
                UpdateRating7(key) {
                    if(this.state.ownpage){

                    } else {
                    this.setState({ Default_Rating7: key,bc7:'black',bc8:'black' }, function (){
                      if ((this.state.Default_Rating7 == 0) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 
                      == 0) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 2) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                    });
                    //Keeping the Rating Selected in state
                }
                  }
    
      Load_New_Image=()=>{
        if(this.state.ownpage){

        } else {
        if ((this.state.Default_Rating == 0) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 0) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
        }
        } 
    
        Load_New_Image1=()=>{
            if(this.state.ownpage){

            } else {
          if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
        }
          } 
    
          Load_New_Image2=()=>{
            if(this.state.ownpage){

            } else {
            if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex1 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1  
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1  
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 - 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1  
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 - 1 
                }));      
             }
            } 
        }
    
            Load_New_Image3=()=>{
                if(this.state.ownpage){

                } else {
              if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating3 == 1) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 1) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1  
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1 - 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1  
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1 - 1 
                  }));      
               }
              } }
    
              Load_New_Image4=()=>{
                if(this.state.ownpage){

                } else {
                if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                } }
    
                Load_New_Image5=()=>{
                    if(this.state.ownpage){

                    } else {
                  if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex1: prevState.selectedIndex1  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                  } }
    
                  Load_New_Image6=()=>{
                    if(this.state.ownpage){

                    } else {
                    if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                    } }
            
    
                  Load_New_Image7=()=>{
                    if(this.state.ownpage){

                    } else {
                    if ((this.state.Default_Rating7 == 0) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 0) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 2) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 2) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                    } }
            
                    updateratingtable = async() => {
                        if(this.state.ownpage){

                        } else {
                            if((this.state.bc0=='rgba(50,50,50,1)')&(this.state.bc1=='rgba(50,50,50,1)')&(this.state.bc2=='rgba(50,50,50,1)')&(this.state.bc3=='rgba(50,50,50,1)')&(this.state.bc4=='rgba(50,50,50,1)')&(this.state.bc5=='rgba(50,50,50,1)')&(this.state.bc6=='rgba(50,50,50,1)')&(this.state.bc7=='rgba(50,50,50,1)')){
                                alert('Rating could not be updated. Please make changes to the rating you have previously created. You also may not rate your own profile.')
                            } else {
                                var currentratings = await API.graphql(graphqlOperation(queries.listProfileratingss, { filter: { raterid: { eq: this.state.CurrentIDENTITYID },ratedid:{eq:this.state.IDENTITYID} } } ))
                                console.log(currentratings)
                                if(currentratings.data.listProfileratingss.items.length>0){
                                    var cratingrowid = currentratings.data.listProfileratingss.items[0].id
                                    await API.graphql(graphqlOperation(mutations.deleteProfileratings, {input: {id:cratingrowid} }))
                                    await API.graphql(graphqlOperation(mutations.createProfileratings, {input: {raterid:this.state.CurrentIDENTITYID, ratedid:this.state.IDENTITYID,smash:this.state.Default_Rating, heat:this.state.Default_Rating1,looseness:this.state.Default_Rating2,thickness:this.state.Default_Rating3,intelligence:this.state.Default_Rating4,savageness:this.state.Default_Rating5,ratchetness:this.state.Default_Rating6,diversity:this.state.Default_Rating7} }))
                                } else {
                                    await API.graphql(graphqlOperation(mutations.createProfileratings, {input: {raterid:this.state.CurrentIDENTITYID, ratedid:this.state.IDENTITYID,smash:this.state.Default_Rating, heat:this.state.Default_Rating1,looseness:this.state.Default_Rating2,thickness:this.state.Default_Rating3,intelligence:this.state.Default_Rating4,savageness:this.state.Default_Rating5,ratchetness:this.state.Default_Rating6,diversity:this.state.Default_Rating7} }))
                                }
                                this.setState({bc0:'rgba(50,50,50,1)',
                                bc1:'rgba(50,50,50,1)',
                                bc2:'rgba(50,50,50,1)',
                                bc3:'rgba(50,50,50,1)',
                                bc4:'rgba(50,50,50,1)',
                                bc5:'rgba(50,50,50,1)',
                                bc6:'rgba(50,50,50,1)',
                                bc7:'rgba(50,50,50,1)',
                                bc8:'rgba(50,50,50,1)',})
                            }
                            
                            /*var currentratings = await API.graphql(graphqlOperation(queries.listProfileratingss, { filter: { Followingid: { eq: this.state.IDENTITYID },Followerid:{eq:this.state.CurrentIDENTITYID} } } ))

                                     if(this.state.Default_Rating!=) { 
                            var cUserfollows = await API.graphql(graphqlOperation(queries.listFollowers, { filter: { Followingid: { eq: this.state.IDENTITYID },Followerid:{eq:this.state.CurrentIDENTITYID} } } ))
                            var cUserfollowing = await API.graphql(graphqlOperation(queries.listFollowings, { filter: { Followerid: { eq: this.state.CurrentIDENTITYID},Followingid:{eq:this.state.IDENTITYID} } } ))
                            this.setState({followings:true,backgroundColor: 'black', borderColor: 'grey',buttonMessage: 'Following',followerrowid:cUserfollows.data.listFollowers.items[0].id,followingrowid:cUserfollowing.data.listFollowings.items[0].id})
                            await API.graphql(graphqlOperation(mutations.deleteFollowing, {input: {id:this.state.followingrowid} }))
                            await API.graphql(graphqlOperation(mutations.deleteFollower, {input: {id:this.state.followerrowid} }))
                            var followers = await API.graphql(graphqlOperation(queries.listFollowers, { filter: { Followingid: { eq: this.state.IDENTITYID } } } ))
                            var following = await API.graphql(graphqlOperation(queries.listFollowings, { filter: { Followerid: { eq: this.state.IDENTITYID } } } ))
                            
                            this.setState({
                            followers:followers,
                            following:following})
                            
                            
                        
                            this.setState((prevState, props) => {
                                return {
                                backgroundColor: 'dodgerblue',
                                borderColor: 'dodgerblue',
                                numfollowers:followers.data.listFollowers.items.length,
                                numfollowing:following.data.listFollowings.items.length,
                                followings: false,
                                buttonMessage: 'Follow',
                                    
                                        
                                };
                            });
                        
                        } else {
                            await API.graphql(graphqlOperation(mutations.createFollowing, {input: {Followerid:this.state.CurrentIDENTITYID, Followingid:this.state.orginfo.identityId,Followingname:this.state.orginfo.orgName,Followingppic:this.state.orginfo.OrgPicture} }))
                            await API.graphql(graphqlOperation(mutations.createFollower, {input: {Followingid:this.state.orginfo.identityId, Followerid:this.state.CurrentIDENTITYID,Followername:this.state.cUsername,Followerppic:this.state.cUserpic} }))
                            var followers = await API.graphql(graphqlOperation(queries.listFollowers, { filter: { Followingid: { eq: this.state.IDENTITYID } } } ))
                            var following = await API.graphql(graphqlOperation(queries.listFollowings, { filter: { Followerid: { eq: this.state.IDENTITYID } } } ))
                            
                            this.setState({
                            followers:followers,
                            following:following})
                            this.setState((prevState,props) => {
                                return { 
                                    
                                backgroundColor: 'black',
                                borderColor: 'gray',
                                numfollowers:followers.data.listFollowers.items.length,
                                numfollowing:following.data.listFollowings.items.length,
                        
                                followings: true,
                                buttonMessage: 'Following',
                                        
                            };
                        });
                        
                        }*/ 
                     }}
          
        
      render() {
        const{ selectedIndex, ratingImages} = this.state
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex1} = this.state
        let React_Native_Rating_Bar1 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar1.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating1.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating1
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex2} = this.state
        let React_Native_Rating_Bar2 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar2.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating2.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating2
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex3} = this.state
        let React_Native_Rating_Bar3 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar3.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating3.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating3
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex4} = this.state
        let React_Native_Rating_Bar4 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar4.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating4.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating4
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex5 } = this.state
        let React_Native_Rating_Bar5 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar5.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating5.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating5
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
     
        const{ selectedIndex6} = this.state
        let React_Native_Rating_Bar6 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar6.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating6.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating6
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex7 } = this.state
        let React_Native_Rating_Bar7 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar7.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating7.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating7
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
        return (
    <ScrollView style = {{ width: 100 + "%", backgroundColor:'black'}}> 
                        
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc0,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",
          zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.SmashRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>

    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc0}}></View>
    </View>
    
    
    
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc1,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.HeatMeterRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating1} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar1}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex1]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image1}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc1}}></View>
    </View>
    
    
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc2,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.LossenessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating2} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar2}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex2]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image2}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc2}}></View>
    </View>
    
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc3,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.ThicknessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating3} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar3}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex3]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image3}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc3}}></View>
    </View>
    
    
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc4,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.IntelligenceRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating4} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar4}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex4]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image4}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc4}}></View>
    </View>
    
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc5,
          flexDirection: "row",
          justifyContent: "center",
          borderColor:"white",zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.SavagenessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating5} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar5}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex5]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image5}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc5}}></View>
    </View>
    
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc6,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.RatchetnessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating6} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar6}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex6]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image6}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc6}}></View>
    </View>
    
    <View style = {{width: 100 + "%",
          height: 80,
          backgroundColor: this.state.bc7,
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",zIndex:1}}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.DiversityRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating7} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar7}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex7]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image7}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
        <View style={{height:'100%',width:'100%',backgroundColor:this.state.bc7}}></View>
    </View>

    <View style = {{width: 100 + "%",zIndex:1,height: 80,backgroundColor: this.state.bc8,flexDirection: "row",justifyContent: "center",borderColor: "gray",  }}> 
         <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',}}>
   
               
                   <TouchableOpacity
                    //activeOpacity={0.7}
                    style={{justifyContent:'center',alignItems:'center',borderColor:'white',borderWidth:1, position:'absolute',height:'100%',width:'100%',right:'0%',top:'0%'}}
                    onPress={this.updateratingtable}>
                    <Text style={{color:'white',fontSize:40}}>Rate</Text>
                    </TouchableOpacity>
   </View>            
    </View>
    <View style = {{height: 20,width: 100 + "%",flexDirection: 'row',alignItems: 'flex-start',borderBottomWidth: 0,borderColor: "gray"}}>
    </View>
    
    
    </ScrollView>
    
        )
        }
    }
    
    const styles = StyleSheet.create({
      MainContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: Platform.OS === 'ios' ? 20 : 0,
        },
        childView: {
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: -500,
          marginLeft: 10
        },
        button: {
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: -60,
          marginLeft: 225,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0)',
        },
        StarImage: {
          width: 25,
          height: 25,
          resizeMode: 'cover',
        },
      iconBar: {
          height: 40,
          width: 100 + "%",
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderBottomWidth: 1,
          borderColor: "white"
      },
      userBar: {
          width: 100 + "%",
          height: 80,
          backgroundColor: 'black',
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "white",  
      }, 
    }); 

export default OrgRatingFeed;