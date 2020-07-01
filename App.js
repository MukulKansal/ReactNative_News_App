import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Dimensions ,Image, TouchableOpacity,TouchableWithoutFeedback, Linking , Share} from 'react-native';
import{Ionicons} from '@expo/vector-icons';

const {width,height} = Dimensions.get('window')
console.disableYellowBox =true
export default class App extends React.Component {

  state={
    news : [],
    loading: true
  }
// http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=67dc73e77660472697b322f4281b0dc2
  fetchNews =()=>{
    fetch(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=67dc73e77660472697b322f4281b0dc2`)
    .then((res)=>res.json())
    .then((response)=>{
      this.setState({
        news: response.articles,
        loading: false
      })
    })
  }

  componentDidMount(){
    this.fetchNews()
  }

  shareArticle = (article) =>{
    try {
      Share.share({
        message: 'Check this ' + article
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  render(){
    if (this.state.loading) {
      return(
        <View style={{flex:1 ,backgroundColor:'#333', alignItems: 'center',justifyContent:'center'}}>
         <ActivityIndicator size='large' color='#fff' />
        </View>
      )
    } else {
      return (
            <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.topFont}> Top Headlines </Text>
              </View>
              <View style={styles.news}>
                <FlatList
                data={this.state.news}
                // keyExtractor={(item, index) => { return item.id}}
                renderItem={({item})=>{
                  return(
                    <TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
                    <View style={styles.flatlistt}>
                      <Image source={{uri: item.urlToImage}} style={StyleSheet.absoluteFill} 
                      />
                      <Text style={styles.imageTitle}>{item.title}</Text>
                      
                      <TouchableOpacity style={styles.shareText} onPress={()=> this.shareArticle(item.url)}>
          <Ionicons  name='md-share' color='#EAF0F1' size={25}/>
        </TouchableOpacity>
                    </View>
                    </TouchableWithoutFeedback>
                  )
                }}
                />
              </View>
            </View>
          );
    }   
}}
// <Text style={styles.shareText} onPress={()=> this.shareArticle(item.url)}>
                      // Share
                      // </Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    top:20,
    
  },
  topFont: {
    // flex:1,
    fontSize: 40,
    color: '#fff',
    top: 0
  },
  flatlistt: {
    top: 100,
    marginBottom: 13,
    height: 250,
    width:width-45
  },
  news: {
    alignSelf: 'center',
    flex:2
    
  },
  imageTitle:{
    position: 'absolute',
    color: '#fff',
    bottom: 0,
    fontSize: 16,
    padding: 2,
  },
  shareText:{
    padding:3,
    color: '#fff',
    top:0,
    right:-340,
    // position: 'absolute',
    // fontWeight: 'bold'
  }
});

