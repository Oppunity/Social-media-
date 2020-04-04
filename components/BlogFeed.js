import React, { Component, Fragment  } from "react";
import { Text, FlatList, Dimensions,StyleSheet, View, ImageBackground, TouchableOpacity } from "react-native";
import { BlogWithPhoto } from '../screens/index';
import { BlogNoPhoto } from '../screens/index'
import BlogClickNoPhoto from '../screens/BlogClickNoPhoto';
import Icon from 'react-native-vector-icons/FontAwesome'
import { withNavigation } from 'react-navigation'
import Amplify, { Storage, Auth, API, graphqlOperation } from 'aws-amplify';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
var {width, height} = Dimensions.get('window')
//type Props = {};

class BlogFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs:[],
            liked: false, 
            disliked: false,
            screenWidth: Dimensions.get("window").width,
            likes:0,
            dislikes:0,
            comments: 0,
            identityid:' ',
            likeColor:'gray',
            dislikeColor: 'gray',
            likesText:0,
            dislikesText:0
    
         };
    }
    
    async componentDidMount() {
        var credentials = await Auth.currentCredentials()
        var identityIds = credentials._identityId
        this.setState({identityid:identityIds})
        this.state.CurrentIDENTITYID = identityIds 
        var blogquery = await API.graphql(graphqlOperation(queries.listBlogEvents ))
        console.log('BLOG FEED')
        console.log(blogquery)
        await this.setState({blogs:blogquery.data.listBlogEvents.items})
        for(let i=0;(i<this.state.blogs.length); i++){
            var likesquery = await API.graphql(graphqlOperation(queries.listBlogLikess, { filter: {blogid: { eq: this.state.blogs[i].id }, identityId:{eq:this.state.identityid} } } ))
            console.log('blogs query    ..'+this.state.blogs[i].id)
            console.log('xxxx'+likesquery.data.listBlogLikess.items)
            console.log('likesquery       ..'+likesquery.data.listBlogLikess.items[0].likes)
            if(likesquery.data.listBlogLikess.items.length>0){
                this.state.blogs[i].likes = String(likesquery.data.listBlogLikess.items[0].likes)
                if(String(likesquery.data.listBlogLikess.items[0].likes)=='1')
                {
                    this.state.blogs[i].likeColor='blue'
                    this.state.blogs[i].dislikeColor='grey'
                } else {
                    this.state.blogs[i].likeColor='grey'
                    this.state.blogs[i].dislikeColor='red'
                }
             


            } else{
                this.state.blogs[i].likes = '0'
                this.state.blogs[i].likeColor='grey'
                this.state.blogs[i].dislikeColor='grey'
            }
        }

    }

    uploadToStorage = async () => {
        
        /*try{
            var likesquery = await API.graphql(graphqlOperation(queries.listBlogLikess, { filter: {blogid: { eq: item.blogid }, identityId:{eq:this.state.identityid} } } ))
            if(likesquery.data.listBlogLikess.items.length>0){
                var cproductrowid = likesquery.data.listBlogLikess.items[0].id
                await API.graphql(graphqlOperation(mutations.deleteBlogLikes, {input: {id:cproductrowid} }))
                await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.blogid,identityId:this.state.identityid,anonymous:'NA',likes:this.state.likes} }))
            } else {
                await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.blogid,identityId:this.state.identityid,anonymous:'NA',likes:this.state.likes} }))            }
            
            
            
            
            
            
            //var likesquery =  await API.graphql(graphqlOperation(queries.listBlogLikess, {filter: {likes:this.state.likes} }))
            /*if(likesquery.data.likes.items.length <1 ){
                this.setState({likes:this.state.likes})
            } else {
                
            await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:'NA', likes:this.state.likes, identityId:this.state.identityid, anonymous:'NA'} }))
            }
        } catch (err) {
            console.log(err)
        }*/
        
      }

      updateLikes = () => {

        if(this.state.liked) { 
            this.setState((prevState, props) => {
                return {
                  likes: 0,
                  liked: false,
                  likeColor: 'gray',
                  likesText: prevState.likesText - 1
                };
            });
        
        } else if(this.state.disliked) {
      
            this.setState((prevState,props) => {
                return { 
                    likes: 1,
                    disliked: false,
                    dislikeColor: 'gray',
                    liked: true,
                    likeColor: 'cyan',
                    dislikesText: prevState.dislikesText - 1,
                    likesText: prevState.likesText + 1
            };
        });
      
      } else {
      
          this.setState((prevState,props) => {
              return { 
                    likes: 1,
                    liked: true,
                    likeColor: 'cyan',
                    likesText: prevState.likesText + 1,
          };
      });

  } 
}


  updateDislikes = () => {

      if(this.state.disliked) { 
      this.setState((prevState, props) => {
          return {
            likes: 0,
            disliked: false,
            dislikeColor: 'gray',
            dislikesText: prevState.dislikesText - 1
          };
      });
  
  } else if(this.state.liked) {

      this.setState((prevState,props) => {
          return { 
              likes: -1,
              disliked: true,
              dislikeColor: 'red',
              liked: false,
              likeColor: 'gray',
              dislikesText: prevState.dislikesText + 1,
              likesText: prevState.likesText - 1
      };
  });

} else {

    this.setState((prevState,props) => {
        return { 
            likes: -1,
              disliked: true,
              dislikeColor: 'red',
              dislikesText: prevState.dislikesText + 1,
    };
});

  } 
}
    

renderBlog({item}) {
    
        return <BlogNoPhoto item = {item}/>

        
    
}


_returnKey(item){
    return item.toString();
}
    render() {
        var likeColor='grey'
        return (
            
    
        <View style = {{width:'100%',height:'100%', borderWidth: 1, borderColor: 'red'}}> 
        
       {/* <FlatList
            data = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
            keyExtractor={this._returnKey}
            renderItem={this.renderBlog}
       /> */}

 <FlatList 
                    style={{height: '50%',width:'100%',position:'absolute',top:'30%'}}
                    data={this.state.blogs}
                    scrollEnabled={true}
                    //numColumns = {this.state.numColumnss}
                    //key={this.state.numColumnss}
                    renderItem={ ({ item }) => (
                       
                    <View style = {{flex:1, width: 100 + "%", backgroundColor:'black'}}> 
             
           
            <View style = {styles.blogContainer}> 
                

               
               <View style = {styles.textContainer}> 
                


                    <View style = {styles.trendingContainer}> 
                    <Text style = {styles.trending} >Trending on campus </Text> 
                    <Text style = {styles.activity}> {item.BlogTime} </Text>
                    </View>


                    
                        <View style = {styles.nameContainer}>
                        
                        <Text style = {styles.blogTitle}> {item.BlogName} </Text>
                
                        </View>
                   

                        <TouchableOpacity style={{top:40, height: 135,borderColor:'transparent',borderWidth:1}} 
                        onPress = {() => this.props.navigation.navigate('BlogClickNoPhoto')}>
                        <View style={{ borderWidth:1,borderColor:'transparent', 
                        height:105,width:400, top:25, left:14}}>
                          
                        <Text numberOfLines={6}
                        style={{color:'white'}}>
                        {item.BlogCaption}
                        </Text>
                        
                        </View>
                     </TouchableOpacity>
                        

                        </View>

               <View style = {{ height: 220, width: 100+'%', top: 80, marginBottom: 10, borderColor: 'transparent', borderWidth:1}}> 
              
                </View>

                </View>

              <View style = {styles.iconBar}>
                  
                   <TouchableOpacity onPress ={async()=>{
                      //await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.id, likes:'1', identityId:this.state.identityid, anonymous:'NA'} }))

                       try{
                            var likesquery = await API.graphql(graphqlOperation(queries.listBlogLikess, { filter: {blogid: { eq: item.blogid }, identityId:{eq:this.state.identityid} } } ))
                            if(likesquery.data.listBlogLikess.items.length>0){
                                var cproductrowid = likesquery.data.listBlogLikess.items[0].id
                                await API.graphql(graphqlOperation(mutations.deleteBlogLikes, {input: {id:cproductrowid} }))
                                await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.id, likes:'1', identityId:this.state.identityid, anonymous:'NA'} }))
                            } else {

                                await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.id, likes:'1', identityId:this.state.identityid, anonymous:'NA'} }))
                            }
                        } catch (err) {
                            console.log(err)
                        }
                   }} 
                   onPressIn = {this.updateLikes}>
                        
                    <Icon style = {{marginLeft: 20,
                     color: item.likeColor,
                     top: 23,
                     left: 12}} name = "thumbs-o-up" size={20} />

                    </TouchableOpacity>

                   
                    <Text style = {{color: 'gray', top:24, left:14}}> {item.likes}  </Text>
                  
                    <TouchableOpacity onPress = {async()=>{
                      //await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.id, likes:'1', identityId:this.state.identityid, anonymous:'NA'} }))

                       try{
                            var likesquery = await API.graphql(graphqlOperation(queries.listBlogLikess, { filter: {blogid: { eq: item.blogid }, identityId:{eq:this.state.identityid} } } ))
                            if(likesquery.data.listBlogLikess.items.length>0){
                                var cproductrowid = likesquery.data.listBlogLikess.items[0].id
                                await API.graphql(graphqlOperation(mutations.deleteBlogLikes, {input: {id:cproductrowid} }))
                                await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.id, likes:'-1', identityId:this.state.identityid, anonymous:'NA'} }))
                            } else {

                                await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:item.id, likes:'-1', identityId:this.state.identityid, anonymous:'NA'} }))
                            }
                        } catch (err) {
                            console.log(err)
                        }
                   }} 
                    onPressIn = {this.updateDislikes}>

                    <Icon style = {{marginLeft: 100,
                    color: item.dislikeColor,
                    top: 22,
                    left: -50}} name = "thumbs-o-down" size={20} />

                    </TouchableOpacity>

                    

                    <Text style = {{color: 'gray', left: -48, top: 24}}> {item.likes}  </Text>
                   
                    <Icon style = {styles.commentIcon} name = "comment-o" size={20} />

                    <TouchableOpacity>
                    <TouchableOpacity>
                    <Icon style = {{top: 23, left: 8, color:'gray'}} name = "share-square-o" size={20} />
                    </TouchableOpacity>
                    </TouchableOpacity>

                    <Text style = {{top: 24, left:13, color:'gray'}}>
                        Share
                        </Text>

                    <Text style = {{color: 'gray', top: 24, left: -110}}> {this.state.comments}  </Text>

            </View>

        </View>    
                    )
                    } 
                keyExtractor={(items, index, numColumns) => index.toString()} /> 

             
        </View>
      

        );        
    }
}


export default BlogFeed;

const styles =  StyleSheet.create({
   
    flatList: {
        
        borderColor: 'white',
        backgroundColor:'black'
        },
    
    

    header:{
        
        borderColor: 'gray',
        height: 35,
        width: 100 + '%',
        borderBottomWidth: 0.4
               
    },
    activity:
    {   
        color: 'white',
        fontSize: 14,
        fontWeight:'300'
    },

 
     blogContainer: {
        width: 100 + "%",
        height: 175,
        top:15 ,
        backgroundColor: 'black',
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderColor: 'transparent',
        top: 17
        
        },

        blogTitle:
    {
        color: 'white',
        fontSize: 16,
        fontWeight:'bold',
        left: 10,
        borderColor:'transparent',
        borderWidth:1
        
    },



    commentIcon: {
        marginLeft: 100,
        color: "gray",
        top: 21,
        left: -55
    },

     date:{
      position: 'absolute',
        left: 75,
        top: 70,
        color: 'white',
        fontSize: 14,
        fontWeight:'200'  
    },
     

         dislikeIcon:{
            marginLeft: 100,
            color: 'gray',
            top: 22,
            left: -50
    },



     iconBar: {
        height: 50,
        width: 100 + "%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "gray",
        top:0
        
    },

    
    interactionContainer: {
        position: 'absolute',
        top: 75,
        height: 40,
        width: 350,
        left: 10,
        flexDirection:'row',
        
        },

        interactions: {
            fontSize: 16,
            color: 'cyan',
            fontWeight: 'bold',
            
        },

        
    likeIcon:{
        marginLeft: 20,
        color: 'gray',
        top: 23,
        left: 12
    },


    nameContainer: {
        position: 'absolute',
        top: 40,
        height: 25,
        width: 300,
        flexDirection:'row',
        borderColor:'transparent',
        borderWidth:1
        
    },


   
    textContainer:{
      
        position: 'absolute',
        height: 95 + '%',
        width: 100 + '%',
        marginTop: 5,
        borderWidth:1,
        borderColor:'transparent'
        
              
    },
     
    trending: {
        
        color: 'white',
        fontSize: 14,
        fontWeight:'300'
    },

     trendingContainer: {
        position: 'absolute',
        top: 20,
        height: 30,
        width: 250,
        flexDirection:'row',
        left: 10
        
        },

    

})