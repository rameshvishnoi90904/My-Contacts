# My-Contacts
A Prototype app using react native app to sync contacts from phone, edit contact details and add new contacts

<table border="0">
  <tr>
    <th>Features</th>
    <th>Demo</th>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Sync contacts from device</li>
        <li>List all contacts</li>
        <li>Edit/View contact details</li>
        <li>Create new contact</li>
      </ul>
    </td>
    <td>
      <video src="https://user-images.githubusercontent.com/13585002/131219294-b7854c02-3fd5-4571-875f-993ff7a102ac.mp4" width="800" />
    </td>
  <tr>
</table>
  
  
### Pre-requisites
- Android Studio
- Visual Code Editor

### Setup
- `git clone git@github.com:rameshvishnoi90904/My-Contacts.git`
- `cd My-Contacts`
- `npm install`
- `react-native run-android`

### Folder Structure
Project follows very simple folder structure
- `src` : This folder is the main container of all the code inside your application
  - `helper`: Folder to store any common generic functions that can be reused 
  - `components`: Folder to store any common component that you use through your app (such as a generic LoadingSpinner)
  - `context`: Folder that contains all your React Context Api files.
  - `mockdata`: Folder to store any mockData for testing purpose .
  - `screens`: Folder that contains all your application screens/features.
      - `HomeScreen.js` : A Functional component using hooks, context apis for maintaining logic for syncing contacts from phone + previewing contacts in list format using FlatList
      - `PreviewContact.js` : (Functional component with hooks) Preview contact details such as email id, phone number, first name and last name
      - `EditContact.js`: (Functional component with hooks) This contains logic for creating new/edit contact and save changes into phone
- `App.js` : This contains navigation logic, syncing contacts from async storage 
- `__test__`: This folder contains all jest testcases
  - `index.test.js`: This contains function test case for helper functions
  - `HomeScreen.test.js`: Test case for contact list preview using mockdata
  - `PreviewContact.test.js`: Test case for matching user name, email and phonenumber 
  - `EditContact.test.js`: Snapshot test case
    

### Global Store
Global store is maintained using React inbuild context api and hooks. I have used reducer like `update` function to compute new state. 

### Offline usage
AsyncStore is used for retaining user actions, results such as contact list from contacts api.

### Code/Commit readability
[JSDocs](https://www.inkoop.io/blog/a-guide-to-js-docs-for-react-js/) is used to maintain comments across codebase, main reason for using JSDocs formatting standards is scope for creating and deploying documentation

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) approach is used to maintain human and machine readable commit messages, this can be futher enhanced to create changelogs, trigger CI/CD pipeline, semantic version bump 

### Libraries used
- [react-native-contacts](https://www.npmjs.com/package/react-native-contacts)
- [react-native-permissions](https://www.npmjs.com/package/react-native-permissions)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/docs/install/)
- [react-navigation](https://reactnavigation.org/)
