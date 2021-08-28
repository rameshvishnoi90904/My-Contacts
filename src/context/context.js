import React, { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sortUsers } from '../helper';

const initialState = {
    contactList: [],
    syncEnabled: false
};

const initialContext = [{ ...initialState }, () => {}];

export const UserContext = React.createContext(initialContext);

/**
 * 
 * @constructor
 * @param {Object} state - Old State
 * @param {Object} update - object containing type and payload for updating state
 * 
 * @returns {Object} - updated state value
 */
const updater = (state, update) => {
    var toUpdate = {...state};
    switch (update.type) {
        case 'init': {
            const sortedArray = sortUsers([...state.contactList,...update.data.contactList])
            toUpdate = {
                ...state,
                contactList: sortedArray
            }
            break;
        }
            
        case 'addNewContact': {
            // check if contact already present with same recordid
            const toAdd = update.data.contactData;
            const index = state.contactList.findIndex((item) => {
                return (item.recordID == toAdd.recordID)
            });
            let updateContactList;
            if (index == -1) {
                updateContactList = [...state.contactList,toAdd]
            } else {
                updateContactList = [...state.contactList]
            }
            toUpdate = {
                ...state,
                contactList: updateContactList
            }
            break;
        }
            
        case 'updateContact': {
            const updateList = [...state.contactList];
            const toUpdateContact = update.data.toUpdate;
            const index = updateList.findIndex((item) => {
                return (item.recordID == toUpdateContact.recordID);
            });
            updateList[index] = toUpdateContact;
            toUpdate = {
                ...state,
                contactList: updateList
            }
            break;
        }
            
        case 'triggerSync': {
            AsyncStorage.setItem("@syncEnabled","true");
            toUpdate = {
                ...state,
                syncEnabled: true
            };
            break;
        }
        case 'syncResult': {
            const contactList = update.data.contactList;
            AsyncStorage.setItem("@contacts",JSON.stringify(contactList));
            toUpdate = {
                ...state,
                contactList: contactList
            } 
            break;
        }
    }
    return toUpdate;
}

export function UserController(props) {
    const [userState, updateUser] = useReducer(updater, initialState);
    const value = useMemo(() => [userState, updateUser], [userState]);
    return (<UserContext.Provider value={value}>
        {props.children}
    </UserContext.Provider>);
  }
  
  UserController.propTypes = {
      children: PropTypes.oneOfType([
          PropTypes.arrayOf(PropTypes.node),
          PropTypes.node
      ]).isRequired
  };
  