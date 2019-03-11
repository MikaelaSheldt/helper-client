import React, { Component } from 'react';
import { TextInput, Picker, View, StyleSheet, Button, TouchableHighlight, Text } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'

import {updateBlock, getBlocks} from '../redux/reducer'
import AllBlocks from './AllBlocks'

class EditBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      priority: '',
      expectedDuration: '',
      status: '',
      id: null
    }
    this.handleOnPress = this.handleOnPress.bind(this)
  }

  componentDidMount() {
    this.setState({
      description: this.props.selectedBlock.description,
      priority: this.props.selectedBlock.priority,
      expectedDuration: this.props.selectedBlock.expectedDuration,
      status: this.props.selectedBlock.status,
      id: this.props.selectedBlock.id
    })
  }

  handleOnPress = async () => {
    try {
      const formData = this.state
      const blockId = this.state.id
      await this.props.edit(formData, blockId)
      await this.props.loadBlocks()
    } catch (err) {
      console.log(err);
    } finally {
      this.props.navigation.navigate('AllBlocks')
    }
  }

  static navigationOptions = { header: null, };

  render() {

    return (
      <View style={styles.container}>
        <View >
          <Text style={styles.firstTitle}>Type in box to edit block description</Text>
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
          <Text style={styles.title}> Select a priority below.</Text>
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
          <Text style={styles.title}> Expected Duration</Text>
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
          <Text style={styles.title}> Choose the block status.</Text>
          <View style={styles.inLine}>
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, status: 'active'})}
              title='active'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, status: 'paused'})}
              title='paused'
            />
            <Button
              color= '#5E35B1'
              onPress={() => this.setState({...this.state, status: 'retired'})}
              title='retired'
            />
          </View>
          <Text style={styles.answer}>{this.state.status}</Text>
        </View>
        <Button
          onPress={() => this.handleOnPress()}
          title='COMMIT CHANGES'
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
  blocks: state.blocks,
  selectedBlock: state.selectedBlock
})

const mapDispatchToProps = (dispatch) => ({
  loadBlocks: () => dispatch(getBlocks()),
  edit: (block, id) => dispatch(updateBlock(block, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBlock)


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
