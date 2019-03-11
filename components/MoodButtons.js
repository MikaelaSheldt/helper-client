import React, { Component } from 'react';
import { TextInput, Picker, View, StyleSheet, Button, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import {FontAwesome } from '@expo/vector-icons'

import {setMood} from '../redux/reducer'

class MoodButtons extends Component {

  render() {
    return (
      <View style={styles.time}>
        <View style={styles.numbers}>
          <TouchableHighlight style={styles.padding} onPress={()=>{this.props.set(0)}}>
               <View>
                   <FontAwesome name="circle" size={30} color="#3949AB" />
               </View>
           </TouchableHighlight>
           <TouchableHighlight style={styles.padding} onPress={()=>{this.props.set(-2)}}>
               <View>
                   <FontAwesome name="circle" size={30} color="#E53935"  />
               </View>
           </TouchableHighlight>
           <TouchableHighlight style={styles.padding} onPress={()=>{this.props.set(-1)}}>
               <View>
                   <FontAwesome name="circle" size={30} color="#FB8C00"  />
               </View>
           </TouchableHighlight>
           <TouchableHighlight style={styles.padding} onPress={()=>{this.props.set(1)}}>
               <View>
                   <FontAwesome name="circle" size={30} color="#43A047"  />
               </View>
           </TouchableHighlight>
         </View>
         <View>
           <Text style={styles.answer}>{`${this.props.mood}`}</Text>
         </View>
       </View>
    );
  }
}

const mapStateToProps = (state) => ({
  mood: state.mood
})

const mapDispatchToProps = (dispatch) => ({
  set: (num) => dispatch(setMood(num)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MoodButtons)

const styles = StyleSheet.create({
  numbers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  time: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  answer: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 40,
  },
  padding: {
    padding: 20
  }
})
