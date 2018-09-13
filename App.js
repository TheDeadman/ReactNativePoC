/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ToolbarAndroid} from 'react-native';
// import { Button } from 'react-native-material-design';


import NotificationService from './lib/notifications';

import MultiItemList from './lib/flat-list'
import TopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  
  constructor(props) {
    super(props);
    this.notify = new NotificationService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  render() {
    return (
      
      <View style={styles.container}>
      <ToolbarAndroid
      title="AwesomeApp" 
      navIcon={require('./icons/x.png')}
      actions={[{title: 'Settings', show: 'always'}]}
      style={styles.toolbar}
      />
      <MultiItemList data={[{id: 'a1', title: "test", handler: () => {alert("YO")}}, {id: 'a2', title: "Toast", handler: () => {this.notify.localNotif()}}]}
      />
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 40,
    backgroundColor: '#cf0'
  },
  container: {
    // height: 10,
    flex: 1,
    // overflow: 'hidden',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#000',
    color: '#333333'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});



// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, { Component } from 'react';
// import { TextInput, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import NotifService from './lib/notifications';
// import appConfig from './app.json';

// type Props = {};
// export default class App extends Component<Props> {

//   constructor(props) {
//     super(props);
//     this.state = {
//       senderId: appConfig.senderID
//     };

//     this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Example app react-native-push-notification</Text>
//         <View style={styles.spacer}></View>
//         <TextInput style={styles.textField} value={this.state.registerToken} placeholder="Register token" />
//         <View style={styles.spacer}></View>

//         <TouchableOpacity style={styles.button} onPress={() => { this.notif.localNotif() }}><Text>Local Notification (now)</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => { this.notif.scheduleNotif() }}><Text>Schedule Notification in 30s</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelNotif() }}><Text>Cancel last notification (if any)</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => { this.notif.cancelAll() }}><Text>Cancel all notifications</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => { this.notif.checkPermission(this.handlePerm.bind(this)) }}><Text>Check Permission</Text></TouchableOpacity>

//         <View style={styles.spacer}></View>
//         <TextInput style={styles.textField} value={this.state.senderId} onChangeText={(e) => {this.setState({ senderId: e })}} placeholder="GCM ID" />
//         <TouchableOpacity style={styles.button} onPress={() => { this.notif.configure(this.onRegister.bind(this), this.onNotif.bind(this), this.state.senderId) }}><Text>Configure Sender ID</Text></TouchableOpacity>
//         {this.state.gcmRegistered && <Text>GCM Configured !</Text>}

//         <View style={styles.spacer}></View>
//       </View>
//     );
//   }

//   onRegister(token) {
//     Alert.alert("Registered !", JSON.stringify(token));
//     console.log(token);
//     this.setState({ registerToken: token.token, gcmRegistered: true });
//   }

//   onNotif(notif) {
//     console.log(notif);
//     Alert.alert(notif.title, notif.message);
//   }

//   handlePerm(perms) {
//     Alert.alert("Permissions", JSON.stringify(perms));
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   button: {
//     borderWidth: 1,
//     borderColor: "#000000",
//     margin: 5,
//     padding: 5,
//     width: "70%",
//     backgroundColor: "#DDDDDD",
//     borderRadius: 5,
//   },
//   textField: {
//     borderWidth: 1,
//     borderColor: "#AAAAAA",
//     margin: 5,
//     padding: 5,
//     width: "70%"
//   },
//   spacer: {
//     height: 10,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 20,
//     textAlign: "center",
//   }
// });