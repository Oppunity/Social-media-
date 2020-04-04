import React, { Component, Fragment  } from "react";
import { Text, FlatList, StyleSheet, View, ImageBackground, } from "react-native";
import { BlogComments } from '../screens/index';


class BlogCommentFeed extends Component {
    _renderBlogCommentFeed({ item }) {
       return <BlogComments item = {item}/>;
    }

_returnKey(item){
    return item.toString();
}
    render() {
        return (

    
        <View style = {styles.flatList}> 
        
        <FlatList
            data = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}
            keyExtractor={this._returnKey}
            renderItem={this._renderBlogCommentFeed}
             />
             
        </View>
      

        );        
    }
}




export default BlogCommentFeed;

const styles =  StyleSheet.create({
   
    flatList: {
        
        borderColor: 'white',
        height:1000,
        top: -0,
        
        
        },
    
    

    header:{
        
        borderColor: 'gray',
        height: 35,
        width: 100 + '%',
        borderBottomWidth: 0.4
               
    },

    

})