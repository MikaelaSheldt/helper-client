import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import EditBlock from './screens/EditBlock'
import AddBlock from './screens/AddBlock'
import AllBlocks from './screens/AllBlocks'
import Home from './screens/Home'
import RunHelper from './screens/RunHelper'

const RootStack = createStackNavigator(
  {
    Home: Home,
    AllBlocks: AllBlocks,
    EditBlock: EditBlock,
    AddBlock: AddBlock,
    RunHelper: RunHelper
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen'
  }
);

export const AppContainer = createAppContainer(RootStack);
