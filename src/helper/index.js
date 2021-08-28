/**
 * Compute User Initials.
 * @constructor
 * @param {Object} userItem - User Object from contacts api.
 * @returns {string} user name initials for creating thumbnail
 */
 export const getUserInitials = (userItem) => {
    if (userItem.givenName && userItem.familyName) {
      return (userItem.givenName[0].toUpperCase() + userItem.familyName[0].toUpperCase());
    }
    if (userItem.givenName) {
      return (userItem.givenName[0].toUpperCase());
    }
    if (userItem.familyName) {
      return (userItem.familyName[0].toUpperCase());
    }

    return 'AB';
  }

/**
 * Sort Contacts.
 * @constructor
 * @param {Array} list - user list from contacts.
 * @returns {Array} sorted contacts based on first name
 */
export const sortUsers = (list) => {
  const sortedUsers = [...list].sort((a, b) => {
    if (a.givenName && b.givenName) {
      return (a.givenName.toLowerCase() > b.givenName.toLowerCase() ? 1 : -1);
    } else if (a.givenName) {
      return -1;
    } else if (b.givenName) {
      return 1;
    } else {
        return 0;
    }
  });
  return sortedUsers;
} 


