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

import MultiItemList, { MyListItem } from './lib/flat-list'
import TopAppBar from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

import getNotifications from './lib/data'

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
    this.viewedNotifications = []
    this.state = {
      newNotifications: [],
      dismissedNotifications: []
    }
  }

  doTheData() {
    getNotifications().then((res) => {
      // alert(JSON.stringify(res))
      const theItems = [...res]
      let newAlerts = res.filter((item) => {
        return !item.dismissed
      })

      let dismissedAlerts = res.filter((item) => {
        return item.dismissed
      })
      // alert(JSON.stringify(theItems))
      newAlerts.map((item) => {
        var found = false
        
        this.viewedNotifications.map((oItem) => {
          if (oItem.id === item.id) {
            found = true
          } else {
            
          }
        })

        if (found) {

        } else {
            this.notify.localNotif(item)
            // NOTIFY HERE
            this.viewedNotifications.push(item)
        }
      })

      this.setState({
        newNotifications: newAlerts,
        dismissedNotifications: dismissedAlerts
      })
    }).catch(err => {
      // alert(err)
    })
  }

  componentDidMount() {
    setInterval(() => {
      this.doTheData()
    }, 1500)
    this.doTheData()
  }

  render() {
    return (
      
      <View style={styles.container}>
        <ToolbarAndroid
        title="Woooooo" 
        navIcon={require('./icons/menu.png')}
        actions={[{title: 'Settings', show: 'always'}]}
        style={styles.toolbar}
        />

        <View style={styles.body}>
          {/* <MyListItem
            data={{}}
            id={'empty'}
            onPressItem={() => {}}
            selected={false}
            title={''}
            style={styles.item}
          /> */}
          <MultiItemList data={this.state.newNotifications} />
        </View>

      </View>
    );
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
  }
}

const styles = StyleSheet.create({
  toolbar: {
    height: 56,
    backgroundColor: '#f4df42'
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
  item: {

  },
  body: {
    flex: 1
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