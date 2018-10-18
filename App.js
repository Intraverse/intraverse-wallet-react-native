/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StatusBar,
  View,
  AppState,
  Keyboard,
  NetInfo,
  Alert
} from 'react-native'
import crashlytics from 'react-native-fabric-crashlytics'
import Router from './app/Router'
import currencyStore from './app/AppStores/CurrencyStore'
import NavStore from './app/AppStores/NavStore'
import BlindScreen from './app/components/screens/BlindScreen'
import Spinner from './app/components/elements/Spinner'
import MainStore from './app/AppStores/MainStore'
import NotificationStore from './app/AppStores/stores/Notification'
import PushNotificationHelper from './app/commons/PushNotificationHelper'
import AppStyle from './app/commons/AppStyle'
import './ReactotronConfig'
import branch from 'react-native-branch'

console.ignoredYellowBox = ['Warning: isMounted']

export default class App extends Component {
  _unsubscribeFromBranch = null

  async componentWillMount() {
    await MainStore.startApp()
    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    )
  }

  async componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
    crashlytics.init()
    try {
      // SplashScreen.hide()
      await currencyStore.getCurrencyAPI()
    } catch (e) {
      NavStore.popupCustom.show(e.message)
      // SplashScreen.hide()
    }

    _unsubscribeFromBranch = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }

      // params will never be null if error is null

      if (params['+non_branch_link']) {
        const nonBranchUrl = params['+non_branch_link']
        // Route non-Branch URL if appropriate.
        return
      }

      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        return
      }

      // A Branch link was opened.
      // Route link based on data in params.

      if (!params['snd']) {
        // link wasn't a valid send
        return
      }

      const snd = params.snd

      Alert.alert(
        'Alert',
        'You have received a message: ' + snd,
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)

    if (_unsubscribeFromBranch) {
      _unsubscribeFromBranch()
      _unsubscribeFromBranch = null
    }
  }

  handleFirstConnectivityChange = (connection) => {
    const connectionType = connection.type === 'none' ? 'offline' : 'online'
    if (connection.type === 'none') {
      NavStore.showToastTop('No internet connection', { backgroundColor: AppStyle.errorColor }, { color: 'white' })
    }
    MainStore.appState.setInternetConnection(connectionType)
  }

  switchEnableNotification(isEnable) {
    if (MainStore.appState.internetConnection === 'offline') {
      NavStore.popupCustom.show('Network Error.')
      return
    }
    if (isEnable) {
      NotificationStore.onNotif().then(res => console.log(res))
    } else {
      NotificationStore.offNotif().then(res => console.log(res))
    }
  }

  appState = 'active'

  _handleAppStateChange = (nextAppState) => {
    if (this.appState === 'active' && nextAppState === 'inactive') {
      if (NavStore.currentRouteName !== 'UnlockScreen') {
        this.blind.showBlind()
      }
    }
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      Keyboard.dismiss()
    }
    if (nextAppState === 'background') {
      NotificationStore.appState = nextAppState
    }
    if (nextAppState === 'active') {
      setTimeout(() => { NotificationStore.appState = nextAppState }, 2000)
      // MainStore.appState.BgJobs.CheckBalance.doOnce(false, false)
      MainStore.appState.BgJobs.CheckBalance.start()
      this.blind.hideBlind()
    }
    if (this.appState === 'background' && nextAppState === 'active') {
      PushNotificationHelper.resetBadgeNumber()
      NavStore.lockScreen({
        onUnlock: () => {
          if (NotificationStore.isOpenFromTray) {
            NotificationStore.isOpenFromTray = false
            NotificationStore.gotoTransaction()
          }
        }
      })
    }
    this.appState = nextAppState
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <Router />
        <BlindScreen
          ref={(ref) => { this.blind = ref }}
        />
        <Spinner
          visible={false}
          ref={(ref) => { NavStore.loading = ref }}
        />
      </View>
    )
  }
}
