import React, { useState, useContext, useEffect } from 'react';
import {TouchableOpacity} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'
import { UserController, UserContext } from './src/context/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingSpinner from './src/components/LoadingSpinner';

import HomeScreen from './src/screens/HomeScreen';
import EditContact from './src/screens/EditContact';
import PreviewContact from './src/screens/PreviewContact';

const Stack = createStackNavigator();

function MyStack({}) {
  const navigation = useNavigation();
  const [initialLoading, setInitialLoading] = useState(true);
  const [userState, updateState] = useContext(UserContext);

  useEffect(() => {
    setInitialLoading(false);

    AsyncStorage.getItem("@syncEnabled").then((syncValue) => {
      AsyncStorage.removeItem("@syncEnabled")
      if (syncValue && JSON.parse(syncValue)) {
        updateState({type: 'triggerSync'});
      }
      AsyncStorage.getItem("@contacts").then((value) => {
        if (value) {
          const contactList = JSON.parse(value);
          updateState({type: 'init', data: {contactList: contactList}})
        }
        setInitialLoading(false);
      });
    });
  },[]);


  const navigateToAddContact  = () => {
    navigation.navigate('Edit Contact')
  }

  if (initialLoading) {
    return (
        <LoadingSpinner/>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} 
       options={{
         title: "Contacts",
         headerRight: () => (
          <TouchableOpacity 
          style={{paddingHorizontal: 16, paddingVertical: 8}} 
          accessibilityRole="button"
          accessibilityLabel="Add Contact"
          accessibilityHint="Opens new screen for creating new contact entry"
          onPress={navigateToAddContact}>
            <Icon name="md-person-add" size={28}/>
          </TouchableOpacity>
        ),
      }}
      />
      <Stack.Screen name="Edit Contact" component={EditContact} />
      <Stack.Screen name="Contact Details" component={PreviewContact} />
    </Stack.Navigator>
  );
}


const App = () => {
  return (
    <NavigationContainer>
      <UserController>
        <MyStack/>
      </UserController>
    </NavigationContainer>
  )
}
export default App;
