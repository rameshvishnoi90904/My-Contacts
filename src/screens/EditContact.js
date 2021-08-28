import React, {useState, useContext} from 'react';
import {
  Button,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  View,
  Text,
  ScrollView
} from 'react-native';
import Contacts from 'react-native-contacts';
import Icon from 'react-native-vector-icons/Ionicons';

import LoadingSpinner from '../components/LoadingSpinner';
import { UserContext } from '../context/context';

const EditContact = ({navigation, route}) => {
    const [userState, updateState] = useContext(UserContext);
    const toEditUser = route.params?.contactInfo;

    const [firstName, setFirstName] = useState(toEditUser ? toEditUser.givenName: "Mark")
    const [lastName, setLastName] = useState(toEditUser ? toEditUser.familyName: "Zuck")
    const [email, setEmail] = useState(toEditUser && toEditUser.emailAddresses.length > 0 ? toEditUser.emailAddresses[0].email: "rv@rv.com")
    const [phoneNumber, setPhoneNumber] = useState(toEditUser && toEditUser.phoneNumbers.length > 0 ? toEditUser.phoneNumbers[0].number: "8989898989")
    const [isLoading, setIsLoading] = useState(false);

    const saveContact = () => {
        if (toEditUser) {
            setIsLoading(true);
            const udpatedContact = {
                ...toEditUser,
                familyName: lastName,
                givenName: firstName,
                emailAddresses: [{
                    label: "work",
                    email: email,
                }],
                phoneNumbers: [{
                    label: 'mobile',
                    number: phoneNumber,
                }],
            }
            Contacts.updateContact(udpatedContact)
            updateState({type: 'updateContact',data: {toUpdate: udpatedContact}})
            setIsLoading(false);
            navigation.navigate('Home');
        } else {
            var newPerson = {
                emailAddresses: [{
                    label: "work",
                    email: email,
                }],
                familyName: lastName,
                givenName: firstName,
                phoneNumbers: [{
                    label: 'mobile',
                    number: phoneNumber,
                }],
            }
            setIsLoading(true);
            Contacts.addContact(newPerson).then((response) => {
                updateState({type: 'addNewContact',data: {contactData: response}})
                setIsLoading(false);
                navigation.goBack();
            });
        }
    }

    return (
        <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{flex: 1}}>
            <ScrollView style={styles.container}>
                <View style={{alignItems: 'center', marginBottom: 32}}>
                    <View>
                        <Icon name="camera" size={58} style={{backgroundColor: '#8D8D8D', padding: 20, borderRadius: 100}} color={"white"}/>
                    </View>
                </View>
                <Text style={styles.labelText}>First name</Text>
                <TextInput 
                    style={styles.inputField} 
                    onChangeText={setFirstName}
                    value={firstName}
                    placeholder="First name"></TextInput>

                <Text style={styles.labelText}>Last name</Text>
                <TextInput 
                    style={styles.inputField} 
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last name"></TextInput>

                <Text style={styles.labelText}>Phone number</Text>
                <TextInput 
                    style={styles.inputField} 
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                    keyboardType={'number-pad'}
                    placeholder="Phone"></TextInput>

                <Text style={styles.labelText}>Email</Text>
                <TextInput 
                    style={styles.inputField} 
                    onChangeText={setEmail}
                    value={email}
                    keyboardType={'email-address'}
                    placeholder="Email"></TextInput>
                <Button 
                    title="Save" 
                    onPress={saveContact}
                    accessibilityLabel="Save contact"
                    accessibilityHint="Save Contact detail and navigate back to home screen"
                />
            </ScrollView>
            {isLoading && <LoadingSpinner/>}
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      paddingHorizontal: 32,
      paddingTop: 16,
      backgroundColor: 'white'
    },
    inputField: {
        borderWidth: 1,
        height: 58,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 16,
        borderColor: '#8D8D8D',
        fontSize: 16
    },
    profilePicture: {
        width: 158,
        height: 158,
        padding: 20,
    },
    labelText: {
        marginBottom: 8
    }
  });


export default EditContact;