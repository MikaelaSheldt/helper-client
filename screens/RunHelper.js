import React, { Component } from 'react';
import { TextInput, Picker, View, StyleSheet, Button, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'

import {pauseBlock} from '../redux/reducer'

import Home from './Home'

class RunHelper extends Component {

  constructor() {
    super()
    this.state = {
      list: [],
      view: {},
      error: false
    }
    this.handleOnPress = this.handleOnPress.bind(this)
  }

  rotate = (array) => {
    if(array.length) {
      let suggestions = array
      let firstSuggestion = suggestions.shift()
      suggestions.push(firstSuggestion)
      this.setState({
        list: suggestions,
        view: firstSuggestion
      })
    } else {
      this.setState({error: true})
    }
  }

  componentDidMount() {
    const sortedList = this.sort(this.props.blockMatches)
    this.rotate(sortedList)

  }

  sort = (array) => {
    let high = []
    let medium = []
    let low = []
    if (array.length <= 1 ) {
      return array
    } else {
      array.forEach(object => {
        object.priority === 'low' ? low.push(object) : (object.priority === 'medium' ? medium.push(object) : high.push(object))
      })
    }
    const sorted = [...high , ...medium , ...low]
    return sorted
  }

  handleOnPress = (array) => {
    this.rotate(array)
  }

  handleStart = (block) => {
    this.props.pause(block)
  }

  static navigationOptions = { header: null, };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.answer}>{this.state.error ? "Now might be a good time for a rest" : this.state.view.description}</ Text>
        <View style={styles.startSkipButtons}>
          <Button
            onPress={() => this.handleOnPress(this.state.list)}
            title='SKIP'
            style={styles.boxed}
            color= '#5E35B1'
          />
          <Button
            onPress={() => this.handleStart(this.state.view)}
            title='START'
            style={styles.boxed}
            color= '#5E35B1'
          />
        </View>
        <View style={styles.finish}>
          <Button
            onPress={() => this.props.navigation.navigate('Home')}
            title='FINISH'
            style={styles.boxed}
            color= '#5E35B1'
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  blockMatches: state.blockMatches
})

const mapDispatchToProps = (dispatch) => ({
  pause: (block) => dispatch(pauseBlock({status: 'paused'}, block.id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RunHelper)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: '#FFEB3B',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  answer: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 40,
  },
  startSkipButtons: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finish: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

})
