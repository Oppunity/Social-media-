import React, {Component} from 'react';  
import {View,Text, StyleSheet,  FlatList,Fragment,Dimensions,Image,TouchableOpacity} from 'react-native';  
import {Button} from 'native-base'
import { Header, SearchBar } from 'react-native-elements'; 
//import Icon from 'react-native-vector-icons/FontAwesome5';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries'
var {width, height} = Dimensions.get('window')

class SearchPage extends Component{  
    static navigationOptions = {
  // Hide the header from AppNavigator stack
  title: 'Title',
};
      
  state = {
    search: '',
    activeIndex: 0,
    t0c:'#42a5f5',
    t1c:'white',
    t2c:'white',
    t3c:'white',
    IDENTITYID:'',
    srnames:[],
    srids:[],
    SearchUserPic: [],
    orgimage: [],
    orgpicname: '',
    flatlistheight: '82%',
    flatlisttop: '12%',
    sUser:{},
    orgoruser:'',
    cUser:[],
    cUsername:'',
    cUserpic:'',
    CurrentIDENTITYID:''
  };

  async componentDidMount() {
        const credentials = await Auth.currentCredentials()
        const identityIds = credentials._identityId
        this.state.IDENTITYID = identityIds
        this.state.CurrentIDENTITYID = identityIds
        //console.log(this.state.IDENTITYID)
        var orgquery = await API.graphql(graphqlOperation(queries.listOrgInfos, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
        if(orgquery.data.listOrgInfos.items.length>0){
            this.setState({orgoruser:'org',cUser:orgquery.data.listOrgInfos.items[0],cUsername:orgquery.data.listOrgInfos.items[0].orgName,cUserpic:orgquery.data.listOrgInfos.items[0].OrgPicture})
            console.log('org')
        } else {
            var userquery = await API.graphql(graphqlOperation(queries.listUserInfos, { filter: { identityId: { eq: this.state.CurrentIDENTITYID } } } ))
            //console.log(AllUserData.data.listUserInfos.items[0])
            if(userquery.data.listUserInfos.items.length>0){
            this.setState({orgoruser:'user',cUser:userquery.data.listUserInfos.items[0],cUsername:userquery.data.listUserInfos.items[0].userName,cUserpic:userquery.data.listUserInfos.items[0].UserPicture})
            console.log('user')
            } else {
            alert('Error')
            }
        }
  }

  updateSearch = async(search) => {
    
    this.setState({ search }, async function() {
    //this.setState({search:String(this.state.search)})
    if(this.state.activeIndex==0) {
      //console.log(this.state.search)
      console.log(search)
      console.log(search.length)
    if (search.length===0){this.setState({currentUser:[],srnames:[],srids:[],SearchUserPic:[],orgimage:[],orgpicname:'',flatlistheight:'0%', flatlisttop: '-50%'})}
        else {
            this.setState({flatlistheight:'82%', flatlisttop: '12%'})
            try  {
                const AllUserData = await API.graphql(graphqlOperation(queries.listOrgInfos, { filter: { capitalizeorgName: {beginsWith:String(search)}  }} ))

                console.log('AllUserData:', AllUserData)
                //console.log(this.state.search)
                await this.setState({
                currentUser: AllUserData.data.listOrgInfos.items,
                srnames:[],srids:[],orgimage:[],orgpicname:''
                })
                console.log('currentUser: ',this.state.currentUser)
            //  console.log('currentUser0: ',this.state.currentUser[0].orgName)
            //  console.log('srnames1: ', this.state.srnames) 
                for(let i=0;(i<this.state.currentUser.length & (i<8)); i++){
                    this.setState({srnames: [...this.state.srnames, this.state.currentUser[i].orgName], srids:[...this.state.srids, this.state.currentUser[i].identityId]})
                    const OrgUserPic = await API.graphql(graphqlOperation(queries.listOrgPics, { filter: { identityId: { eq: this.state.srids[i] }}}))
                    this.setState({
                        SearchUserPic:  OrgUserPic.data.listOrgPics.items, 
                        })
                    console.log('this.state.SearchUserPic: ', this.state.SearchUserPic)
                    console.log('sridsStorage:', this.state.srids[i])
                    console.log('this.state.SearchUserPic.OrgPicture: ', this.state.SearchUserPic.slice(0)[0].OrgPicture)
                    this.state.orgpicname = this.state.SearchUserPic.slice(0)[0].OrgPicture
                    console.log(' this.state.orgpicname: ', this.state.orgpicname)
                    await Storage.get(this.state.orgpicname, {level: 'protected', identityId: this.state.srids[i]})
                        .then(data => {
                        this.setState({
                            orgimage: [...this.state.orgimage, data],
                        })
                        if (this.state.orgimage.length > this.state.currentUser.length) {
                            this.state.orgimage.pop()
                        }
                        console.log('gotImage!', this.state.orgimage)
                        })
                        if ( this.state.currentUser.length == []) {
                            this.state.orgimage = []
                        }
                    }
                } catch (err) {
                console.log('error fetching currentUser...', err)
                }
      
            }
                console.log('srnames', this.state.srnames)
                console.log('srids', this.state.srids)
    }else if(this.state.activeIndex==1){
  //console.log(this.state.search)
  console.log(search)
  console.log(search.length)
if (search.length===0){this.setState({currentUser:[],srnames:[],srids:[],SearchUserPic:[],orgimage:[],orgpicname:'',flatlistheight:'0%', flatlisttop: '-50%'})}
    else {
        this.setState({flatlistheight:'82%', flatlisttop: '12%'})
        try  {
            const AllUserData = await API.graphql(graphqlOperation(queries.listUserInfos, { filter: { capitalizeuserName: {beginsWith:String(search)}  }} ))

            console.log('AllUserData:', AllUserData)
            //console.log(this.state.search)
            await this.setState({
            currentUser: AllUserData.data.listUserInfos.items,
            srnames:[],srids:[],orgimage:[],orgpicname:''
            })
            console.log('currentUser: ',this.state.currentUser)
        //  console.log('currentUser0: ',this.state.currentUser[0].orgName)
        //  console.log('srnames1: ', this.state.srnames) 
            for(let i=0;(i<this.state.currentUser.length & (i<8)); i++){
                this.setState({srnames: [...this.state.srnames, this.state.currentUser[i].userName], srids:[...this.state.srids, this.state.currentUser[i].identityId]})
                const UserPic = await API.graphql(graphqlOperation(queries.listUserPics, { filter: { identityId: { eq: this.state.srids[i] }}}))
                this.setState({
                    SearchUserPic:  UserPic.data.listUserPics.items, 
                    })
                console.log('this.state.SearchUserPic: ', this.state.SearchUserPic)
                console.log('sridsStorage:', this.state.srids[i])
                console.log('this.state.SearchUserPic.OrgPicture: ', this.state.SearchUserPic.slice(0)[0].UserPicture)
                this.state.orgpicname = this.state.SearchUserPic.slice(0)[0].UserPicture
                console.log(' this.state.orgpicname: ', this.state.orgpicname)
                await Storage.get(this.state.orgpicname, {level: 'protected', identityId: this.state.srids[i]})
                    .then(data => {
                    this.setState({
                        orgimage: [...this.state.orgimage, data],
                    })
                    if (this.state.orgimage.length > this.state.currentUser.length) {
                        this.state.orgimage.pop()
                    }
                    console.log('gotImage!', this.state.orgimage)
                    })
                    if ( this.state.currentUser.length == []) {
                        this.state.orgimage = []
                    }
                }
            } catch (err) {
            console.log('error fetching currentUser...', err)
            }
  
        }
            console.log('srnames', this.state.srnames)
            console.log('srids', this.state.srids)
    }else if(this.state.activeIndex==2){

    }})
  };



  segmentClicked = (index) => {
    this.setState({
    activeIndex: index
    },function(){
    {this.updateSearch(this.state.search)}
    if(this.state.activeIndex==0){this.setState({t0c:'#42a5f5',t1c:'white',t2c:'white'})
    }else if(this.state.activeIndex==1){this.setState({t0c:'white',t1c:'#42a5f5',t2c:'white'})
    }else if(this.state.activeIndex==2){this.setState({t0c:'white',t1c:'white',t2c:'#42a5f5',t3c:'white',})
    }else if(this.state.activeIndex==3){this.setState({t0c:'white',t1c:'white',t2c:'white',t3c:'#42a5f5'})}})
  }
  renderSectionZero = () => {
        //console.log('images render: ', this.state.image) 
        return(
        <View style={{ marginBottom: 0, position:'absolute',top:'0%',width:'100%',left:'1%',marginVertical: 0,height:'100%'}}> 
        <View style={{position:'absolute',height:'18%',width:'100%',top:'0%',backgroundColor:'black',zIndex:2}}></View>
        <FlatList 
            style={{height: this.state.flatlistheight,top: this.state.flatlisttop}}
            data={this.state.orgimage}
            scrollEnabled={false}
            renderItem={ ({ item }) => (
                
            <View style={[ {top:'59%'},{borderColor:'white'},{borderWidth:1},{width:'98%'}, {height: (width/6)}, 
            
            ]}
            onPress={() => this.props.navigation.navigate('OrgProfile', {sUser:this.state.orgimage})} >

            <Image style={{ borderRadius: 50/2, height: '60%', width: '20%', position:'absolute',top:'20%',left:'0%', paddingTop: '10%' }} source = {{uri: item }} />
            {/*<Image source={{uri: item}} style={{flex: 1, width: undefined, height: undefined}} />*/}
            </View>
            )
            } 
            keyExtractor={(items, index, numColumns) => index.toString()} />

  <FlatList 
            style={{height:'82%',top:'-37%', marginLeft: '0%'}}
            data={this.state.currentUser}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            renderItem={ ({ item }) => (
            <TouchableOpacity style={[ {top:'59%'}, {borderColor:'black'},{borderWidth:0},{width:'110%'}, {height: (width/6)}, 
            
            ]}
            onPress={() => this.props.navigation.navigate('OrgProfile', {sUser:item})} >
            <Text style={{color:'white',position:'absolute',top:'10%',left:'30%',fontSize:20,color:'#42a5f5'}}>{item.orgName}</Text>
            </TouchableOpacity>
            )
            } 
            keyExtractor={(items, index, numColumns) => index.toString()} />
        
        </View>
        ) 
   }
   renderSectionOne = () => {
         //console.log('images render: ', this.state.image) 
         return(
            <View style={{ marginBottom: 0, position:'absolute',top:'0%',width:'100%',left:'1%',marginVertical: 0,height:'100%'}}> 
            <View style={{position:'absolute',height:'18%',width:'100%',top:'0%',backgroundColor:'black',zIndex:2}}></View>
            <FlatList 
                style={{height: this.state.flatlistheight,top: this.state.flatlisttop}}
                data={this.state.orgimage}
                scrollEnabled={false}
                //numColumns = {this.state.numColumnss}
                //key={this.state.numColumnss}
                renderItem={ ({ item }) => (
                    
                <View style={[ {top:'59%'},{borderColor:'white'},{borderWidth:1},{width:'98%'}, {height: (width/6)}, 
                
                ]}
                onPress={() => this.props.navigation.navigate('OrgProfile', {sUser:this.state.orgimage})} >
    
                <Image style={{ borderRadius: 50/2, height: '60%', width: '20%', position:'absolute',top:'20%',left:'0%', paddingTop: '10%' }} source = {{uri: item }} />
                {/*<Image source={{uri: item}} style={{flex: 1, width: undefined, height: undefined}} />*/}
                </View>
                )
                } 
                keyExtractor={(items, index, numColumns) => index.toString()} />
    
      <FlatList 
                style={{height:'82%',top:'-37%', marginLeft: '0%'}}
                data={this.state.currentUser}
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                renderItem={ ({ item }) => (
                <TouchableOpacity style={[ {top:'59%'}, {borderColor:'black'},{borderWidth:0},{width:'110%'}, {height: (width/6)}, 
                
                ]}
                onPress={() => this.props.navigation.navigate('UserProfile', {sUser:item})} >
                <Text style={{color:'white',position:'absolute',top:'10%',left:'30%',fontSize:20,color:'#42a5f5'}}>{item.userName}</Text>
                </TouchableOpacity>
                )
                } 
                keyExtractor={(items, index, numColumns) => index.toString()} />
            
            </View>
            ) 
       }
    renderSectionTwo = () => {
        //console.log('images render: ', this.state.image) 
        return(
        <View style={{flex: 1, marginBottom: 325, marginVertical: 20}}> 
       
        </View>
        ) 
    }
    renderSectionThree = () => {
        //console.log('images render: ', this.state.image) 
        return(
        <View style={{flex: 1, marginBottom: 325, marginVertical: 20}}> 
       
        </View>
        ) 
    }


   renderSection = () => {
        if(this.state.activeIndex == 0) {
            
        return (
        <View style={{ height:'100%',top:'0%',zIndex:1 }}>
        {this.renderSectionZero()}
        </View>
        )
        }
        if(this.state.activeIndex == 1) {
           
        return (
            <View style={{ height:'100%',top:'0%',zIndex:1 }}>
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
    }

  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    
        return(  
           
          <View style={{width:'100%',height:'100%'}}>
            <View style = {{width:100 + "%", height: 100 + "%", backgroundColor:'black'}}>
                   

                {this.renderSection()}
              <View style={{width:100 + "%", height: 50 + "%", top:'0%',backgroundColor:'black',zIndex:2}}></View>
                <View style = {styles.searchBar}>
                    <SearchBar 
                        placeholder="Search campus..."
                        round
                        fontColor="white"
                        autoCapitalize="characters"
                        containerStyle={{backgroundColor: 'black', borderWidth: 1, borderRadius: 10}}
                        
                        onChangeText={this.updateSearch}
                        value={search} /> 
                </View>
                <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0)',borderRadius: 5,borderColor:'white',borderWidth:1,width: '20%',right:'1%',top: '2.25%',height: '4.5%',position:'absolute',justifyContent:'center',alignItems:'center',zIndex:3}}>
                    <Text style={{color:'white',fontSize:16}}>Cancel</Text>
                </TouchableOpacity>

                



                  <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 0, borderWidth: 1, borderColor: "#eae5e5",position:'absolute',top:'9%',width:'98%',right:'1%',zIndex:3 }}> 
                        <Button transparent
                        style={{alignItems:'center'}}
                        onPress={()=> this.segmentClicked(0)}
                        active={this.state.activeIndex == 0}>
                        <Text style={{marginRight:'1%',color:this.state.t0c,fontSize:16}}>Org</Text>
                        <Icon 
                        size= {25}
                        name="ios-calendar"
                        style={[this.state.activeIndex == 0 ? {color: "#42a5f5"} : {color: 'white'}]} />
                        
                        </Button>

                        <Button transparent
                        style={{alignItems:'center'}}
                        onPress={()=> this.segmentClicked(1)}
                        active={this.state.activeIndex == 1}>
                        <Text style={{marginRight:'1%',color:this.state.t1c,fontSize:16}}>User</Text>
                        <Icon 
                        size= {25}
                        name="ios-calendar"
                        style={[this.state.activeIndex == 1 ? {color: "#42a5f5"} : {color: 'white'}]} />
                        
                        </Button>

                        <Button transparent
                        style={{alignItems:'center'}}
                        onPress={()=> this.segmentClicked(2)}
                        active={this.state.activeIndex == 2}>
                        <Text style={{marginRight:'1%',color:this.state.t2c,fontSize:16}}>Event</Text>
                        <Icon 
                        size= {25}
                        name="ios-paper"
                        style={[this.state.activeIndex == 2 ? {color: "#42a5f5"} : {color: 'white'}]} />
                        
                        </Button>
                        <Button transparent
                        style={{alignItems:'center'}}
                        onPress={()=> this.segmentClicked(3)}
                        active={this.state.activeIndex == 3}>
                        <Text style={{marginRight:'1%',color:this.state.t3c,fontSize:16}}>Blog</Text>
                        <Icon 
                        size= {25}
                        name="ios-star-half"
                        style={[this.state.activeIndex == 3 ? {color: "#42a5f5"} : {color: 'white'}]} />
                        </Button>
                        
                    </View>
                    


                  
            </View>  
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

          
          <ActionButton.Item buttonColor='orangered' size = {50} onPress={() => this.props.navigation.navigate('MainFeed')}>
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
        </View>
        );  
    }  
}  


    
     




      
 

  



export default SearchPage;
const styles = StyleSheet.create({  
    
    headerText: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        marginTop: 10,
    },
    
   
    searchBar: {
      
     borderRadius: 0,
     alignContent: 'center',
     width: '80%',
     left:'-2%',
     top: '1%',
     height: 15,
     position:'absolute',
     zIndex:3
    
        
    },

    tabBar: {
      top: 40,
      height: 100 + '%'  
    },
    
    
    top:
    {
     width: 300,
     height: 30,
     flexDirection: 'row',
     justifyContent: 'center',
     left: 32,
    
    },
    
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
        position: 'absolute',
        zIndex:999
        },
        
        

     
});