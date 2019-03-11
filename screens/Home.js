import React, { Component } from 'react';
import { TextInput, Picker, View, StyleSheet, Button, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios'
import {AntDesign } from '@expo/vector-icons'

// rocket1

import AddBlock from './AddBlock'
import AllBlocks from './AllBlocks'
import RunHelper from './RunHelper'
import MoodButtons from '../components/MoodButtons'

import {runHelper} from '../redux/reducer'

class Home extends Component {
  constructor () {
    super()
    this.state = {
      time: ''
    }
    this.handleOnPress = this.handleOnPress.bind(this)
  }

  handleOnPress = async () => {
    const availableTime = this.state.time
    await this.props.run(availableTime)
    this.setState({time: ''})
    this.props.navigation.navigate('RunHelper')
  }
  static navigationOptions = { header: null, };
  // <View>
  // </View>

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.hello}>Hello.</Text>
          <Text style={styles.question}> How much time do you have?</Text>
        </View>
        <View style={styles.time}>
          <View style={styles.numbers}>
            <Button
              onPress={() => this.setState({...this.state, time: '15'})}
              title='15'
              color= '#5E35B1'
            />
            <Button
              onPress={() => this.setState({...this.state, time: '30'})}
              title='30'
              color= '#5E35B1'
            />
            <Button
              onPress={() => this.setState({...this.state, time: '45'})}
              title='45'
              color= '#5E35B1'
            />
            <Button
              onPress={() => this.setState({...this.state, time: '60'})}
              title='60'
              color= '#5E35B1'
            />
            <Button
              onPress={() => this.setState({...this.state, time: '90'})}
              title='90'
              color= '#5E35B1'
            />
          </View>
          <View>
            <Text style={styles.answer}>{`${this.state.time} minutes`}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.question}> How are you feeling?</Text>
        </View>
        <MoodButtons />
        <View style={styles.bottomButtons}>
          <Button
            onPress={() => this.props.navigation.navigate('AllBlocks')}
            title='ALL BLOCKS'
            color= '#5E35B1'
          />
          <Button
            onPress={this.handleOnPress}
            title='RUN HELPER'
            color= '#5E35B1'
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  blockMatches: state.blockMatches,
  mood: state.mood
})

const mapDispatchToProps = (dispatch) => ({
  run: (time) => dispatch(runHelper(time)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: '#FFEB3B',
    flex: 1,
    // justifyContent: "center",
    // alignItems: 'center'
  },
  section: {
    flex: 1,
  },
  hello: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 60,
    letterSpacing: 2
  },
  question: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#666666',
    fontSize: 28,
    fontStyle: 'italic'
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
  numbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButtons: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

})
