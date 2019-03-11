import axios from 'axios'


// action types
const GOT_BLOCKS = 'GOT_BLOCKS'
const GOT_BLOCK = 'GOT_BLOCK'
const ADDED_BLOCK = 'ADDED_BLOCK'
const UPDATED_BLOCK = 'UPDATED_BLOCK'
const DELETED_BLOCK = 'DELETED_BLOCK'
const SET_BLOCK_SELECTION = 'SET_BLOCK_SELECTION'
const RAN_HELPER ='RAN_HELPER'
const SET_MOOD = 'SET_MOOD'
const RESET_STAUTS = 'RESET_STAUTS'


// action creators
export const gotBlocks = (blocks) => ({
  type: GOT_BLOCKS,
  blocks
})
export const gotBlock = (block) => ({
  type: GOT_BLOCK,
  block
})
export const addedBlock = (block) => ({
  type: ADDED_BLOCK,
  block
})
export const updatedBlock = (updatedBlock, blockId) => ({
  type: UPDATED_BLOCK,
  updatedBlock,
  blockId
})
export const deletedBlock = (blockId) => ({
  type: DELETED_BLOCK,
  blockId
})
export const setBlockSelection = (block) => ({
  type: SET_BLOCK_SELECTION,
  block
})
export const ranHelper = (matches) => ({
  type: RAN_HELPER,
  matches
})
export const setMood = (mood) => ({
  type: SET_MOOD,
  mood
})


// thunk creators
export const getBlocks = () => async (dispatch) => {
  const response = await axios.get('http://172.20.10.2:3000/api/blocks')
  const blocks = response.data
  dispatch(gotBlocks(blocks))
}
export const getBlock = (id) => async (dispatch) => {
  const response = await axios.get(`http://172.20.10.2:3000/api/blocks/${id}`)
  const block = response.data
  dispatch(gotBlock(block))
}
export const addBlock = (input) => async (dispatch) => {
  const response = await axios.post('http://172.20.10.2:3000/api/blocks', input)
  const block = response.data
  dispatch(addedBlock(block))
}
export const updateBlock = (newBlock, blockId) => async (dispatch) => {
  const response = await axios.put(`http://172.20.10.2:3000/api/blocks/${blockId}`, newBlock)
  const brandNew = response.data
  dispatch(updatedBlock(brandNew, blockId))
}
export const runHelper = (time) => async (dispatch) => {
  const response = await axios.get(`http://172.20.10.2:3000/api/blocks/run/${time}`)
  const matches = response.data
  dispatch(ranHelper(matches))
}
export const deleteBlock = (blockId) => async (dispatch) => {
  await axios.delete(`http://172.20.10.2:3000/api/blocks/${blockId}`)
  dispatch(deletedBlock(blockId))
}
export const pauseBlock = (update, blockId) => async (dispatch) => {
  await axios.put(`http://172.20.10.2:3000/api/blocks/pause/${blockId}`, update)
}
export const resetStatus = () => async (dispatch) => {
  await axios.put('http://172.20.10.2:3000/api/blocks/reset/status', {status: 'paused'})
}

const initialState = {
  blocks: [],
  selectedBlock: {},
  blockMatches: [],
  mood: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_BLOCKS:
      return {...state, blocks: action.blocks}
    case GOT_BLOCK:
      return {...state, selectedBlock: action.block}
    case ADDED_BLOCK:
      return {...state, blocks: [...state.blocks, action.block]}
    case UPDATED_BLOCK:
      return {...state, selectedBlock: action.updatedBlock}
    case DELETED_BLOCK:
      const remainingBlocks = state.blocks.filter( block => { return block.id !== Number(action.blockId)})
      return {...state, blocks: remainingBlocks}
    case SET_BLOCK_SELECTION:
      return {...state, selectedBlock: action.block}
    case RAN_HELPER:
      return {...state, blockMatches: action.matches}
    case SET_MOOD:
      return {...state, mood: action.mood}
    default:
      return state
  }
}

export default reducer
