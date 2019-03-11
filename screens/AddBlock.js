import React, { Component } from 'react';
import { TextInput, Picker, View, StyleSheet, Button, TouchableHighlight, Text } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'

import {addBlock, getBlocks} from '../redux/reducer'
import AllBlocks from './AllBlocks'

class AddBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ' ',
      priority: '',
      expectedDuration: '',
      morning: false,
      day: false,
      night: false
    }
    this.handleOnPress = this.handleOnPress.bind(this)
  }


  handleOnPress = async () => {
    const formData = this.state
    try{
      await this.props.add(formData)
      await this.props.loadBlocks()
    } catch(err) {
      console.log(err);
    }finally {
      this.props.navigation.navigate('AllBlocks')
    }
  }

  static navigationOptions = { header: null, };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.firstTitle}>Describe the new block below. </Text>
          <View>
            <TextInput
              style={styles.boxed}
              onChangeText={(text) => this.setState({...this.state, description: text })}
              value={this.state.description}
              placeholder='description'
            />
          </View>
          <Text style={styles.answer}>{this.state.description}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}> What is the block's priority?</Text>
          <View style={styles.inLine}>
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, priority: 'low'})}
              title='low'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, priority: 'medium'})}
              title='medium'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, priority: 'high'})}
              title='high'
            />
          </View>
          <Text style={styles.answer}>{this.state.priority}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}> How long does the block last?</Text>
          <View style={styles.inLine}>
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, expectedDuration: '15'})}
              title='15'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, expectedDuration: '30'})}
              title='30'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, expectedDuration: '45'})}
              title='45'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, expectedDuration: '60'})}
              title='60'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, expectedDuration: '90'})}
              title='90'
            />
          </View>
          <Text style={styles.answer}>{this.state.expectedDuration}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}> Where does the block fit?</Text>
          <View style={styles.inLine}>
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, morning: true})}
              title='morning'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, day: true})}
              title='day'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, night: true})}
              title='night'
            />
          </View>
          <Text style={styles.answer}>{this.state.morning ? 'morning' : (this.state.day ? 'day' :(this.state.night ? 'night' : ""))}</Text>
        </View>
        <Button
          onPress={() => this.handleOnPress()}
          title='ADD BLOCK'
          style={styles.boxed}
          color= '#5E35B1'
        />
        <Button
          onPress={() => this.props.navigation.navigate('AllBlocks')}
          title='BACK'
          style={styles.boxed}
          color= '#5E35B1'
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  blocks: state.blocks
})

const mapDispatchToProps = (dispatch) => ({
  loadBlocks: () => dispatch(getBlocks()),
  add: (block) => dispatch(addBlock(block))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddBlock)


const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: '#FFEB3B',
    flex: 1,
    // justifyContent: "center",
    // alignItems: 'center'
  },
  section: {
    flex: 1
  },
  firstTitle: {
    marginTop: 50,
    color: '#666666',
    fontSize: 15,
  },
  title: {
    color: '#666666',
    fontSize: 15,
  },
  answer: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 40,
  },
  input: {
    color: '#0033FF',
    fontSize: 15,
  },
  boxed: {
    borderWidth: 1,
    color: '#0033FF',
    fontSize: 15,
    height: 20,
  },
  inLine: {
    flexDirection: 'row'
  }
})
