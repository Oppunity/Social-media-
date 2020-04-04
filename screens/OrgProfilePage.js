import React, {Component } from 'react';
import {View, Image, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';
import {Container, Button} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons';
import OrgRatingFeed from '../components/OrgRatingFeed';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
// import { getOrgEvent } from '../graphql/queries'
import { listOrgEvents, listOrgPics, listOrgInfos } from '../graphql/queries'
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import ActionButton from 'react-native-circular-action-menu';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';


var {width } = Dimensions.get('window')

var mediaimages = [
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=https://sircharlesincharge.com/wp-content/uploads/getty-images/2019/08/1155488502.jpeg&c=sc&w=3200&h=2161"},
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=http://hoopshabit.com/wp-content/uploads/getty-images/2018/08/1177700375.jpeg&c=sc&w=3200&h=2133"},
 {key: "https://ca-times.brightspotcdn.com/dims4/default/005e42c/2147483647/strip/true/crop/1881x1254+167+0/resize/2400x1600!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc4%2F4d%2F6f2af18facb11af03780ba411f27%2Fla-xpm-photo-2013-dec-07-la-sp-lakers-kobe-20131208"},
 {key: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZtmoLkn47r5W0CkDozqYmczNXdE3EPrQIMSglzMfwIh5MJQwsQ&s"},
 {key: "https://www.usnews.com/dims4/USNEWS/505905e/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2Fb9%2F2fc427b3844714ea7625b953afa909%2Fmedia%3A046dd960b1284430b40e7802080e3f76Lakers_Pacers_Basketball_09540.jpg"},
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Forlandomagicdaily.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F07%2F1188070037.jpeg&c=sc&w=736&h=485"},
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=https://lakeshowlife.com/wp-content/uploads/getty-images/2018/08/1194978120.jpeg&c=sc&w=3200&h=2133"}
]
class OrgProfilePage extends Component { 

 static navigationOptions = {
 header: null
 }
 
 constructor(props)
 {
 super(props)

 this.state = {
 numColumnss:2, 
 smash:0,
 heat :0,
 looseness :0,
 thickness :0,
 intelligence :0,
 savageness :0,
 ratchetness :0,
 diversity :0,
 Default_Rating: 0,
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
total:{},
is_updated:false,
           
backgroundColor: 'dodgerblue',
borderColor: 'dodgerblue',
CurrentIDENTITYID: '',
followingright: '1%',
            
 mediaimages: [
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=https://sircharlesincharge.com/wp-content/uploads/getty-images/2019/08/1155488502.jpeg&c=sc&w=3200&h=2161"},
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=http://hoopshabit.com/wp-content/uploads/getty-images/2018/08/1177700375.jpeg&c=sc&w=3200&h=2133"},
 {key: "https://ca-times.brightspotcdn.com/dims4/default/005e42c/2147483647/strip/true/crop/1881x1254+167+0/resize/2400x1600!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc4%2F4d%2F6f2af18facb11af03780ba411f27%2Fla-xpm-photo-2013-dec-07-la-sp-lakers-kobe-20131208"},
 {key: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZtmoLkn47r5W0CkDozqYmczNXdE3EPrQIMSglzMfwIh5MJQwsQ&s"},
 {key: "https://www.usnews.com/dims4/USNEWS/505905e/2147483647/thumbnail/640x420/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2Fb9%2F2fc427b3844714ea7625b953afa909%2Fmedia%3A046dd960b1284430b40e7802080e3f76Lakers_Pacers_Basketball_09540.jpg"},
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Forlandomagicdaily.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F07%2F1188070037.jpeg&c=sc&w=736&h=485"},
 {key: "https://imagesvc.timeincapp.com/v3/fan/image?url=https://lakeshowlife.com/wp-content/uploads/getty-images/2018/08/1194978120.jpeg&c=sc&w=3200&h=2133"}
 ], 
 
 CheckInItems: [
 {id: '1', orgname: 'NSBE @NSBE', eventname: 'Study Jam', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 {id: '2', orgname: 'NSBE @NSBE', eventname: 'Tail Gate', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 {id: '3', orgname: 'NSBE @NSBE', eventname: 'Alumni Panel', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 {id: '4', orgname: 'NSBE @NSBE', eventname: 'Group Panel', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 {id: '5', orgname: 'NSBE @NSBE', eventname: 'Dance', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 {id: '6', orgname: 'NSBE @NSBE', eventname: 'Study Jam', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 {id: '7', orgname: 'NSBE @NSBE', eventname: 'Study Jam', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 {id: '8', orgname: 'NSBE @NSBE', eventname: 'Study Jam', day: '- 45minutes ago', orgpicture: 'https://facebook.github.io/react/logo-og.png', arrow: 'https://etc.usf.edu/clipart/70300/70314/70314_258_c-2b_b_md.gif'},
 ],
 
 FlatListItems: [
 { id: '1', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '2', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '3', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '4', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '5', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '6', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '7', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '8', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '9', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '10', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '11', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'},
 { id: '12', value: 'NSBE @NSBE', day: '- 45 minutes ago', uri: 'https://facebook.github.io/react/logo-og.png', like: 'https://images.8tracks.com/cover/i/010/026/698/flat_800x800_075_t.u2-9531.jpg?rect=0,0,800,800&q=98&fm=jpg&fit=max', likenum: '999+', dislike: 'http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg', disnum: '999+', reply: 'reply', view: 'view all comments', replyingto: '...replying to @BSU Post', comment: 'This event was great. Having apple, google, and amazon at the event was amazing. Being able to increase my network was the best part of the experience. #Network=Networth',commentpic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScYBbhjPvFAYmC2dwzgqNZ7I8jzs_pmMSlcFQHOyCgWebW7UeuUw&s'}],
 activeIndex:0
 }
 }
 

 async componentWillMount(){
  
 }

 async componentDidMount() {
  this.willFocusSubscription = this.props.navigation.addListener('didFocus', async(payload) => {
    //console.log('[print action for test:]', payload);
    
    if (['Navigation/INIT', 'Navigation/NAVIGATE', 'Navigation/POP_TO_TOP'].includes(payload.action.type)) {
      //setTimeout(async function(){},5000)
        var credentials = await Auth.currentCredentials()
        var identityIds = credentials._identityId
        this.state.CurrentIDENTITYID = identityIds 
        this.setState({sUser:this.props.navigation.getParam('sUser'),followingright: '1%',smash:0,heat:0,looseness:0,thickness:0,intelligence:0,savageness:0,ratchetness:0,diversity:0}, async function(){
        console.log('sUserorg.... '+this.state.sUser.userName)
        console.log('sUserorg.... '+this.state.sUser.orgName)
        this.state.IDENTITYID =this.state.sUser.identityId
        
        
            console.log('total '+total)
            console.log('smash '+this.state.smash)
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
          var cratings = await API.graphql(graphqlOperation(queries.listProfileratingss, { filter: { ratedid: { eq: this.state.IDENTITYID }} } ))
        var total = Number(cratings.data.listProfileratingss.items.length)
        console.log(cratings)
        console.log('total '+total)
        for (var i = 0; i < cratings.data.listProfileratingss.items.length; i++) {
            this.setState({smash:Number(this.state.smash)+Number(cratings.data.listProfileratingss.items[i].smash),
                           heat:Number(this.state.heat)+Number(cratings.data.listProfileratingss.items[i].heat),
                           looseness:Number(this.state.looseness)+Number(cratings.data.listProfileratingss.items[i].looseness),
                           thickness:Number(this.state.thickness)+Number(cratings.data.listProfileratingss.items[i].thickness),
                           intelligence:Number(this.state.intelligence)+Number(cratings.data.listProfileratingss.items[i].intelligence),
                           savageness:Number(this.state.savageness)+Number(cratings.data.listProfileratingss.items[i].savageness),
                           ratchetness:Number(this.state.ratchetness)+Number(cratings.data.listProfileratingss.items[i].ratchetness),
                           diversity:Number(this.state.diversity)+Number(cratings.data.listProfileratingss.items[i].diversity)
            }, function(){
              this.setState({
                Default_Rating:(((this.state.smash/total)*25)+
                                ((this.state.heat/total)*15)+
                                ((this.state.looseness/total)*15)+
                                ((this.state.thickness/total)*15)+
                                ((this.state.intelligence/total)*10)+
                                ((this.state.savageness/total)*10)+
                                ((this.state.ratchetness/total)*5)+
                                ((this.state.diversity/total)*5))/100
                })
            })
        }
        
            console.log('def '+this.state.Default_Rating)
            console.log('total '+total)
            console.log('smash '+this.state.smash)
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
      
    
    }})


 var credentials = await Auth.currentCredentials()
 var identityIds = credentials._identityId
 this.state.CurrentIDENTITYID = identityIds 
 this.setState({sUser:this.props.navigation.getParam('sUser'),followingright: '1%',smash:0,heat:0,looseness:0,Default_Rating:0,thickness:0,intelligence:0,savageness:0,ratchetness:0,diversity:0}, async function(){
    console.log('sUserorg.... '+this.state.sUser.userName)
    console.log('sUserorg.... '+this.state.sUser.orgName)
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
      var cratings = await API.graphql(graphqlOperation(queries.listProfileratingss, { filter: { ratedid: { eq: this.state.IDENTITYID }} } ))
    var total = Number(cratings.data.listProfileratingss.items.length)
    this.setState({total:total})
    console.log(cratings)
    console.log('total '+total)
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
        Default_Rating:(((this.state.smash/total)*25)+
                        ((this.state.heat/total)*15)+
                        ((this.state.looseness/total)*15)+
                        ((this.state.thickness/total)*15)+
                        ((this.state.intelligence/total)*10)+
                        ((this.state.savageness/total)*10)+
                        ((this.state.ratchetness/total)*5)+
                        ((this.state.diversity/total)*5))/100
        })
        console.log('def '+this.state.Default_Rating)
        console.log('total '+total)
        console.log('smash '+this.state.smash)
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
    console.log(followers)
    console.log('currentUser: ',this.state.currentUser)
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
}
onNavigatorEvent(event) {
    if (event.id === 'backPress') {
        console.log('backpress')
        this.props.navigation.navigate('FollowerPage',{sUser:this.state.orginfo })
    }
}

componentWillUnmount() {
    //if(this.props.navigation.state.params.onGoBack){
    //    console.log('made it to component will unmount '+this.state.orginfo)
      this.props.navigation.state.params.onGoBack(this.state.orginfo);
      this.willFocusSubscription.remove();

   // } 
  }
 //componentWillUpdate()
 onGoBack = (someDataFromModal) => {
    this.setState({sUser:this.state.orginfo}) 
    console.log('on go back org profile page worked');
  }

updateFollow = async() => {

   if(this.state.followings) { 
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

} 
}


 FlatListItemSeparator = () => {
 return (
 //Item Separator
 <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
 );
 };

 

 segmentClicked = (index) => {
 this.setState({
 activeIndex: index
 })
 }

 renderSectionZero = () => {
 console.log('images render: ', this.state.image) 
 return(
 <View style={{flex: 1, marginBottom: 325, marginVertical: 20}}> 
 <FlatList 
 data={this.state.image}
 numColumns = {this.state.numColumnss}
 key={this.state.numColumnss}
 renderItem={ ({ item }) => (
 <TouchableOpacity style={[ {width:(width) / 2}, {height: (width) / 2}, {marginBottom: 3},
 item % 2 !==0 ? {paddingLeft:3} : {paddingLeft:0}
 
 ]}
 
 onPress={() => this.props.navigation.navigate('EventClick', { picpath: item })} >
 <Image source={{uri: item}} style={{flex: 1, width: undefined, height: undefined}} />
 </TouchableOpacity>
 )
 } 
 keyExtractor={(items, index, numColumns) => index.toString()} />
 </View>
 )
 
 }

 renderSectionOne = () => {
 return (
 <View style={{flex: 1, marginBottom: 325}}> 
 <FlatList 
 data={this.state.FlatListItems}
 ItemSeparatorComponent={this.FlatListItemSeparator}
 renderItem={({ item }) => (
 <View style={{ flex: 1 }}>
 
 <View style={{ flex: 1, flexDirection: 'row'}}> 
 <Image source={{ uri: item.uri }} style={{ width: '8.2%', height: '16%', borderRadius: 100/2, marginLeft: 10, marginTop: 15, borderWidth: 1, borderColor: 'white'}} /> 
 <Text style={{ marginBottom: 180, fontSize: 15, color: 'white', width: '100%', marginLeft: 20, marginTop: 15,}}> 
 {item.value}
 </Text> 
 <Text style={{ fontSize: 15, color: 'grey', width: '100%', marginLeft: 170, position: 'absolute', marginTop: 15}}> 
 {item.day}
 </Text>
 </View> 

 <View style={{ flex: 1, flexDirection: 'row'}}> 
 <Text style={{ fontSize: 15, color: 'grey', width: '100%', marginLeft: 65, marginTop: -175, position: 'absolute'}}> 
 {item.replyingto}
 </Text>
 </View>
 <View style={{ flex: 1, flexDirection: 'row', marginRight: 100 }}> 
 <Text style={{ fontSize: 15, color: 'white', width: '100%', marginLeft: 65, marginTop: -150, position: 'absolute'}}> 
 {item.comment}
 </Text>
 </View> 

 <View style={{ flex: 1, flexDirection: 'row'}}> 
 <Text style={{ fontSize: 15, color: 'grey', width: '100%', marginLeft: 65, marginTop: -75, position: 'absolute'}}> 
 {item.view}
 </Text>
 <Text style={{ fontSize: 15, color: 'grey', width: '100%', marginLeft: 325, marginTop: -75, position: 'absolute'}}> 
 {item.reply}
 </Text>
 </View>

 <View style={{ flex: 1, flexDirection: 'row', height: '40%', width: '100%', position: 'absolute'}}> 
 <Text style={{ fontSize: 15, color: 'grey', width: '100%', marginLeft: 10, marginTop: 175, position: 'absolute' }}> 
 {item.likenum}
 </Text>
 <Image source={{ uri: item.like }} style={{ width: '8.2%', height: '30%', borderRadius: 100/2, marginTop: 170, marginLeft: 48, position: 'absolute'}} /> 
 <Text style={{ fontSize: 15, color: 'grey', width: '100%', marginLeft: 150, marginTop: 175, position: 'absolute' }}> 
 {item.disnum}
 </Text>
 <Image source={{ uri: item.dislike }} style={{ width: '8.2%', height: '30%', borderRadius: 100/2, marginTop: 170, marginLeft: 190, position: 'absolute'}} />
 <Text style={{ fontSize: 15, color: 'grey', width: '100%', marginLeft: 325, marginTop: 175, position: 'absolute' }}> 
 {item.disnum}
 </Text>
 <Image source={{ uri: item.commentpic }} style={{ width: '6%', height: '30%', borderRadius: 100/2, marginTop: 170, marginLeft: 370, position: 'absolute'}} />
 </View>
 
 </View> 
 )}
 keyExtractor={(item, index) => index.toString()}
 />
 
 </View> 

 )
 
}

renderSectionTwo = () => {
 return (
 <View style = {{flex:1, width:100 + "%", height: 100 + "%", backgroundColor:'black', paddingBottom: 330}}>
 <OrgRatingFeed sUser={this.state.sUser} cUser={this.state.cUser}/>
 </View>
 )

}

renderSectionThree = () => {
 
 return(
 <View style={{flex: 1, marginBottom: 325, marginVertical: 20}}> 
 <FlatList 
 data={mediaimages}
 numColumns = {this.state.numColumnss}
 key={this.state.numColumnss}
 renderItem={ ({ item }) => (
 <TouchableOpacity style={[ {width:(width) / 2}, {height: (width) / 2}, {marginBottom: 3},
 item % 2 !==0 ? {paddingLeft:3} : {paddingLeft:0}
 ]}>
 <Image source={{uri: item.key}} style={{flex: 1, width: undefined, height: undefined}} />
 </TouchableOpacity>
)
} 
keyExtractor={(items, index, numColumns) => index.toString()} />
</View>
 )
}

renderSectionFourth = () => {
 return (
 <View style={{flex: 1, marginBottom: 325}}> 
 <FlatList 
 data={this.state.CheckInItems}
 ItemSeparatorComponent={this.FlatListItemSeparator}
 renderItem={({ item }) => (
 <View style={{ flex: 1, height: 100}}>
 
 <View style={{ flex: 1, flexDirection: 'row'}}> 
 <Image source={{ uri: item.orgpicture }} style={{ width: '12%', height: '100%', borderRadius: 100/2, marginLeft: 10, marginTop: 25, borderWidth: 1, borderColor: 'white'}} /> 
 <Text style={{ marginBottom: 10, fontSize: 15, color: 'grey', width: '100%', marginLeft: 10, marginTop: 15,}}> 
 {item.orgname}
 </Text> 
 </View>
 <View style={{flex: 1, flexDirection: 'row'}}>
 <Text style={{ fontSize: 30, color: 'white', width: '100%', marginLeft: 70, marginTop: -10}}> 
 {item.eventname}
 </Text>
 <Image source={{ uri: item.arrow }} style={{ width: '18%', height: '100%', borderRadius: 100/2, marginLeft: 335, marginTop: -20, borderWidth: 1, borderColor: 'white', position: 'absolute'}} />
 </View>
 
 </View> 
 )}
 keyExtractor={(item, index, numColumns) => index.toString()}
 />
 </View> 
 )

}

 renderSection = () => {
 if(this.state.activeIndex == 0) {
 return (
 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
 {this.renderSectionZero()}
 </View>
 )
 }
 if(this.state.activeIndex == 1) {
 return (
 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
 {this.renderSectionOne()}
 </View>
 )
 }
 if(this.state.activeIndex == 2) {
 return (
 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
 {this.renderSectionTwo()}
 </View>
 )
 }
 if(this.state.activeIndex == 3) {
 return (
 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
 {this.renderSectionThree()}
 </View>
 )
 }
 if(this.state.activeIndex == 4) {
 return (
 <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
 {this.renderSectionFourth()}
 </View>
 )
 }
 }
 
 render() { 

 return (
 <Container style={{flex: 1, backgroundColor: "black"}}> 
 <TouchableOpacity style={{zIndex:2,backgroundColor:'white',position:'absolute', width:'30%',height:'30%',top:'96%', right:'-12%'}} onPress={() => this.props.navigation.navigate('LogIn')}><Text style={{}}>Signout</Text></TouchableOpacity>
 <View style={{width: '100%', height: '35%', backgroundColor: "black"}}>
 <View style={{flexDirection: 'row',}}>
 <Image source={{uri: this.state.orgimage}}
 style={{width: '30%', height: '250%', borderRadius: 100/2, marginTop: 40, marginLeft: 20}} />
 </View>
 <View style={{flexDirection: 'row',}} > 
 <Text style={{marginLeft: 250, marginTop: 20, fontWeight: '900', color: '#42a5f5', fontSize: 25}}>{this.state.orginfo.orgName}</Text>
 </View>

 <TouchableOpacity style={{position:'absolute', top: '33%', right: '48%'}} onPress={() => {console.log('orgName being passed'+this.state.orginfo.orgName);this.props.navigation.navigate('FollowerPage',{sUser:this.state.orginfo,onGoBack:this.onGoBack })}}> 
 {/*
 <TouchableOpacity style={{flexDirection: 'row', marginTop: 10, marginLeft: 140, justifyContent: 'space-around'}} onPress={() => {this.props.navigation.dispatch(StackActions.push('FollowerPage',{sUser:this.state.sUser})) }}> 
*/}
 <Text style={{ fontWeight: 'bold', color: 'white'}}> {this.state.numfollowers}
 </Text>
 </TouchableOpacity>

 <TouchableOpacity style={{position:'absolute',top: '33%', right: '15%'}} onPress={() => {console.log('orgName being passed'+this.state.orginfo.orgName);this.props.navigation.navigate('FollowingPage',{sUser:this.state.orginfo,onGoBack:this.onGoBack })}}>
 <Text style={{ fontWeight: 'bold', color: 'white'}}> {this.state.numfollowing}
 </Text>
 </TouchableOpacity>

 
 <TouchableOpacity style={{flexDirection: 'row', marginLeft: 140, justifyContent: 'space-around', marginTop: 10}} > 
 <Text style={{ fontWeight: 'bold', color: 'white'}}> Followers 
 </Text>
 <Text style={{ fontWeight: 'bold', color: 'white'}}> Following 
 </Text>
 </TouchableOpacity>
 <View style={{flexDirection: 'row', marginTop: 10}} > 
 <Text style={{ fontSize: 30, color: 'white', marginLeft: 120}}> {'Rating: '+((((this.state.smash/this.state.total)*25)+
                            ((this.state.heat/this.state.total)*15)+
                            ((this.state.looseness/this.state.total)*15)+
                            ((this.state.thickness/this.state.total)*15)+
                            ((this.state.intelligence/this.state.total)*10)+
                            ((this.state.savageness/this.state.total)*10)+
                            ((this.state.ratchetness/this.state.total)*5)+
                            ((this.state.diversity/this.state.total)*5))/100)}</Text> 
 <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
 style={{width: '10%', height: '35%', borderRadius: 100/2, marginLeft: 5}} />
 <TouchableOpacity
 activeOpacity = {0.5} >
 <View style={{flexDirection: 'row', width: '125%', height: '35%', borderRadius: 100/2, marginLeft: 25, backgroundColor: 'black'}}>
 
 </View>
 </TouchableOpacity>
 </View>
 <View style={{flexDirection: 'row', marginTop: -55}}>
 {/*<Text style={{ color: '#42a5f5', fontWeight: 'bold'}}> President of NSBE </Text>*/} 
 </View>
 <View style={{flexDirection: 'row', marginTop: 20, marginTop: '5%'}}>
 <Text style={{ color: 'white'}}> {this.state.orgBio} </Text> 
 </View>
 
 <View style = {{height: '13%',
        width: '30%',
        //left: this.state.followingLeft,
        //marginBottom: '5%',
        position:'absolute',
        zIndex:999,
        right:this.state.followingright,
        top:'76%'}}>

<TouchableOpacity
 style={{

        backgroundColor:this.state.backgroundColor,
        padding:this.state.padding, 
        borderColor:this.state.borderColor,
        borderColor:'white',
        padding: 5,
        width: '100%',
        height:'100%',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
         
        }}
        onPress={this.updateFollow}
>

 <Text style = {{color: 'white', fontWeight: '500', textAlign: 'center',}}> {this.state.buttonMessage} </Text>
 
 </TouchableOpacity>
</View>




 <View> 
 <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, borderTopWidth: 1, borderTopColor: "#eae5e5" }}> 
 <Button transparent
 onPress={()=> this.segmentClicked(0)}
 active={this.state.activeIndex == 0}>
 <Icon 
 size= {25}
 name="ios-calendar"
 style={[this.state.activeIndex == 0 ? {color: "#42a5f5"} : {color: 'white'}]} />

 </Button>
 <Button transparent
 onPress={()=> this.segmentClicked(1)}
 active={this.state.activeIndex == 1}>
 <Icon 
 size= {25}
 name="ios-paper"
 style={[this.state.activeIndex == 1 ? {color: "#42a5f5"} : {color: 'white'}]} />

 </Button>
 <Button transparent
 onPress={()=> this.segmentClicked(2)}
 active={this.state.activeIndex == 2}>
 <Icon 
 size= {25}
 name="ios-star-half"
 style={[this.state.activeIndex == 2 ? {color: "#42a5f5"} : {color: 'white'}]} />

 </Button>
 <Button transparent
 onPress={()=> this.segmentClicked(3)}
 active={this.state.activeIndex == 3}>
 <Icon 
 size= {25}
 name="ios-images"
 style={[this.state.activeIndex == 3 ? {color: "#42a5f5"} : {color: 'white'}]} />

 </Button>
 <Button transparent
 onPress={()=> this.segmentClicked(4)}
 active={this.state.activeIndex == 4}>
 <Icon 
 size= {25}
 name="ios-add"
 style={[this.state.activeIndex == 4 ? {color: "#42a5f5"} : {color: 'white'}]} />

 </Button>
 
 </View>
 
 </View>
 
 </View>
 
 {this.renderSection()}
 <ActionButton
             buttonColor="rgba(231,76,60,1)" 
             radius = {120}
             style={styles.actionButton}
             bgColor = 'black'
             btnOutRange = 'black'
             >


          <ActionButton.Item buttonColor='dodgerblue' size = {50} 
            onPress={() => {if(this.state.orgoruser=='user'){this.props.navigation.navigate('UserProfile',{sUser:this.state.cUser})} else{
              //CollegeA:this.state.sUser.CollegeA,OrgSchool:this.state.sUser.OrgSchool,OrgText:this.state.sUser.OrgText,identityId:this.state.sUser.identityId,oratingp:this.state.sUser.oratingp,oratingt:this.state.sUser.oratingt,orgBioatingp:this.state.sUser.oratingp})} else
             this.props.navigation.navigate('OrgProfile',{sUser:this.state.cUser})}}}>
            <Icon name="ios-contact" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='orangered' size = {50} onPress={() => this.props.navigation.navigate('MainFeedPage')}>
            <Icon name="ios-home" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>

          <ActionButton.Item buttonColor='magenta' size = {50} onPress={() => this.props.navigation.navigate('Search')}>
            <Icon name="md-search" style={styles.actionButtonIcon}/>
          </ActionButton.Item>

          

          <ActionButton.Item buttonColor='crimson' size = {50} onPress={() => this.props.navigation.navigate('Upload')}>
            <Icon name="md-cloud-upload" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>
          
          <ActionButton.Item buttonColor='lime' size = {60} onPress={() => this.props.navigation.navigate('Message')}>
            <Icon name="ios-chatbubbles" style={styles.actionButtonIcon} size = {50} />
          </ActionButton.Item>

            </ActionButton>
 </Container>
 

 )
}
}

const styles = StyleSheet.create(
 {
 actionButtonIcon: {
 fontSize: 30,
 height: 30, 
 position: 'absolute'
 
 

 // color: 'white',
 }, 
 actionButton: {
 marginTop:15,
 paddingTop:45,
 paddingBottom:15,
 marginLeft:30,
 marginRight:30,
 position: 'absolute'
 },
 
 }
 );

export default withNavigation(OrgProfilePage); 