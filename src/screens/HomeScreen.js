import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  PermissionsAndroid,
  FlatList,
  Touchable,
  TouchableOpacity
} from 'react-native';

import Contacts from 'react-native-contacts';
import {checkMultiple, PERMISSIONS, requestMultiple, request} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { UserContext } from '../context/context';
import { getUserInitials } from '../helper';
const colorList = [
  '#4a5568',
  '#c53030',
  '#c05621',
  '#b7791f',
  '#2f855a',
  '#2c7a7b',
  '#2b6cb0',
  '#4c51bf',
  '#6b46c1',
  '#b83280',
]

const HomeScreen = ({navigation}) => {
    const [userState, updateState] = useContext(UserContext);
    const sync = () => {
        try {
          checkMultiple([PERMISSIONS.ANDROID.WRITE_CONTACTS, PERMISSIONS.ANDROID.READ_CONTACTS]).then((result) => {
            requestMultiple([PERMISSIONS.ANDROID.WRITE_CONTACTS, PERMISSIONS.ANDROID.READ_CONTACTS]).then((res) => {
              getContacts();
            });
          });
        } catch (error) {
            console.log("Error :: ",error)
        }
    }

    const getContacts = () => {
      Contacts.getAll().then(contacts => {
        const stringifiedValue = JSON.stringify(contacts);
        AsyncStorage.setItem("@contacts",stringifiedValue)
        updateState({type: "triggerSync"})
        updateState({type: "init", data: {contactList: contacts}})
      })
    }

    const navigateToContactDetail = (data, selectedColor) => {
      navigation.navigate("Contact Details",{
        contactInfo: data,
        selectedColor: selectedColor
      })
    }
    const navigateToEdit = (data) => {
      navigation.navigate("Edit Contact",{
        contactInfo: data,
      })
    }
    const renderContactItem = ({item, index}) => {
      let contactNumber;
      if (item.phoneNumbers && item.phoneNumbers[0]) {
        contactNumber = item.phoneNumbers[0].number;
      }
      let userInitials = getUserInitials(item);
      const selectedColor = colorList[index%10];
      return (
        <TouchableOpacity
        accessibilityRole="link"
        accessibilityHint={`${item.givenName} ${item.familyName} Contact Item`}
        style={styles.contactItem} 
        onPress={() => navigateToContactDetail(item, selectedColor)}>
          <View style={[styles.profilePicture, {backgroundColor: selectedColor}]}>
            <Text style={styles.userInitials}>{userInitials}</Text>
          </View>
          <View style={styles.contactInfo}>
            <View style={{flex: 1}}>
              <Text style={styles.contactName}>{`${item.givenName} ${item.familyName}`}</Text>
              <Text style={styles.contactNumber}>{contactNumber}</Text>
            </View>
              <TouchableOpacity onPress={() => navigateToEdit(item)}>
                <Icon name="account-edit" size={32}/>
              </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    }

    let syncInfo;
    if (userState.contactList.length == 0) {
      syncInfo = (
        <View style={styles.syncContainer}>
          <Icon name="database-sync" size={52}/>
          <Text 
            accessibilityRole="header"
            accessibilityAutoFocus
            style={styles.syncText}>Sync now to import contact from your phone</Text>
        </View>
      )
    }

    let syncButton;
    if (!userState.syncEnabled || userState.contactList.length == 0) {
        syncButton = (
            <Button 
                testID="sync-btn"
                title="Sync" 
                accessible={true}
                accessibilityLabel="Sync contacts"
                accessibilityHint="Syncs contacts from device"
                onPress={sync}/>
        )
    }

    let contactList;
    if (userState.contactList.length > 0) {
        contactList = (
            <FlatList
                  testID="flatlist"
                  data={userState.contactList}
                  renderItem={renderContactItem}
                  keyExtractor={(item) => item.recordID}
                ></FlatList>
        )
    }

    return (
        <View style={styles.container} testID="root">
            {contactList}
            {syncInfo}
            {syncButton}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: 'white'
    },
    contactItem: {
      marginBottom: 12,
      flexDirection: 'row',
    },
    profilePicture: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
      backgroundColor: '#8D8D8D',
      alignItems: 'center',
      justifyContent: 'center'
    },
    contactInfo: {
      borderBottomWidth: 1,
      flex: 1,
      borderBottomColor: '#C9C9C9',
      flexDirection: 'row',
      alignItems: 'center'
    },
    contactName: {
      fontSize: 16,
      color: '#333333'
    },
    contactNumber: {
      color: '#8D8D8D'
    },
    userInitials: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold'
    },
    syncText: {
      fontSize: 18
    },
    syncContainer: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    }
  });

export default HomeScreen;