import React from 'react';
import {
    Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getUserInitials } from '../helper';
import Icon from 'react-native-vector-icons/FontAwesome5'
import EIcon from 'react-native-vector-icons/Entypo'

const PreviewContact = ({navigation, route}) => {
    const contactInfo = route.params.contactInfo;
    const selectedColor = route.params.selectedColor;
    
    const pList = contactInfo.phoneNumbers.map((item) => {
        return (
            <View style={styles.phoneNumberItem} key={item.number}>
                <View style={{flex: 1}}>
                    <Text style={styles.numberText}>{item.number}</Text>
                    <Text style={styles.numberTypeLabel}>{item.label}</Text>
                </View>
                <Icon name="phone-alt" size={22} style={{marginHorizontal: 16}}/>
            </View>
        )
    });
    const eList = contactInfo.emailAddresses.map((item) => {
        return (
            <View style={styles.phoneNumberItem} key={item.email}>
                <View style={{flex:1}}>
                    <Text style={styles.emailText}>{item.email}</Text>
                    <Text style={styles.numberTypeLabel}>{item.label}</Text>
                </View>
                <EIcon name="email" size={22} style={{marginHorizontal: 16}}/>
            </View>
        )
    });

    const navigateToEdit = () => {
        navigation.navigate("Edit Contact",{
            contactInfo: contactInfo
        });
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.profilePictureContainer}>
                <View style={[styles.profilePicture, {backgroundColor: selectedColor}]}>
                    <Text style={styles.userInitials}>{getUserInitials(contactInfo)}</Text>
                </View>
            </View>
            <Text 
                accessibilityRole="header"
                testID="contact-name"
                style={styles.contactName}>{contactInfo.givenName} {contactInfo.familyName}</Text>
            <View style={styles.phoneNumberContainer}>
                {pList}
            </View>
            <View style={styles.phoneNumberContainer}>
                {eList}
            </View>
            <View style={{flex: 1}}></View>
            <View style={{marginBottom: 16, marginHorizontal: 16}}>
                <Button 
                title="Edit"
                accessibilityLabel="Edit contact"
                accessibilityHint="Opens Contact detail in new page for editing"
                onPress={navigateToEdit}/>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    profilePicture: {
        width: 120,
        height: 120, 
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    },
    profilePictureContainer: {
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16
    },
    contactName: {
        fontSize: 22,
        textAlign: 'center'
    },
    topSection: {
        paddingBottom: 32
    },
    phoneNumberItem: {
        borderBottomWidth: 1,
        paddingBottom: 12,
        paddingTop: 8,
        borderBottomColor: '#C9C9C9',
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberText: {
        fontSize: 20,
    },
    emailText: {
        fontSize: 16,
    },
    phoneNumberContainer: {
        paddingHorizontal: 16,
        marginVertical: 8
    },
    numberTypeLabel: {
        textTransform: 'capitalize',
        color: '#6D6D6D',
        fontSize: 12
    },
    userInitials: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
      },
      sectionHeader: {
          fontSize: 16
      }
  });

export default PreviewContact;