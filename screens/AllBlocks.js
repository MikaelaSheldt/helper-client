import React, { Component } from 'react';
import { FlatList, Text, StyleSheet, Button, TouchableHighlight, View } from 'react-native';
import axios from 'axios'
import { connect } from 'react-redux'

import EditBlock from './EditBlock'
import AddBlock from './AddBlock'
import Home from './Home'

import {getBlocks, setBlockSelection, resetStatus} from '../redux/reducer'


const extractKey = ({id}) => `${id}`

class AllBlocks extends Component {

  componentDidMount() {
    this.props.loadBlocks()
  }

  handleOnPress = async (block) => {
    await this.props.setBlock(block)
    this.props.navigation.navigate('EditBlock')
  }

  handleReset = async () => {
    await this.props.reset()
    await this.props.loadBlocks()
  }

  renderItem = ({item}) => {
    const selection = item
    return (
      <TouchableHighlight style={styles.row} onPress={() => this.handleOnPress(selection)}>
        <Text style={styles.rowText}>{item.description}</ Text>
      </TouchableHighlight>
    )
  }

  renderHeader = () => {
    return (
      <View style={styles.bottomButtons}>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title='BACK'
          style={styles.boxed}
          color= '#5E35B1'
        />
        <Button
          onPress={() => this.handleReset()}
          title='RESET BLOCKS'
          style={styles.boxed}
          color= '#5E35B1'
        />
        <Button
          onPress={() => this.props.navigation.navigate('AddBlock')}
          title='ADD BLOCK'
          style={styles.boxed}
          color= '#5E35B1'
        />
      </View>
    )
  }

  static navigationOptions = { header: null, };

  render() {
    return (
      <FlatList
      style={styles.container}
      data={this.props.blocks}
      renderItem={this.renderItem}
      keyExtractor={extractKey}
      ListHeaderComponent={this.renderHeader}
       />
      )
  }
}

const mapStateToProps = (state) => ({
  blocks: state.blocks,
  selectedBlock: state.selectedBlock
})

const mapDispatchToProps = (dispatch) => ({
  loadBlocks: () => dispatch(getBlocks()),
  setBlock: (block) => dispatch(setBlockSelection(block)),
  reset: () => dispatch(resetStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBlocks)

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
  row: {
    padding: 15,
  },
  rowText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 30,
  },
  boxed: {
    borderWidth: 1,
    color: '#0033FF',
    fontSize: 15,
    height: 20,
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

  numbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomButtons: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

})
