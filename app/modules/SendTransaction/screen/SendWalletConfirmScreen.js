import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react/native'
import AppStyle from '../../../commons/AppStyle'
import NavStore from '../../../AppStores/NavStore'
import LayoutUtils from '../../../commons/LayoutUtils'
import MainStore from '../../../AppStores/MainStore'
import { NavigationActions } from 'react-navigation'
import { Share } from 'react-native';
import LittleSpinner from '../../../components/elements/LittleSpinner'
import commonStyle from '../../../commons/commonStyles'
import NavigationHeader from '../../../components/elements/NavigationHeader'
import constant from '../../../commons/constant'
import images from '../../../commons/images'
import { STEP_FAILED, STEP_SEND, STEP_TRANSFER } from '../stores/SendWalletConfirmStore'

const marginTop = LayoutUtils.getExtraTop()

@observer
export default class SendWalletConfirmScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static defaultProps = {
    navigation: {}
  }

  constructor(props) {
    super(props)
    this.sendStore = MainStore.sendTransaction
    this.confirmStore = this.sendStore.sendWalletConfirmStore
    this.amountStore = this.sendStore.amountStore
  }

  _doSend() {
    const token = this.sendStore.isToken ? MainStore.appState.selectedToken.symbol : 'ETH'
    const amount = this.amountStore.amountTextString
    this.confirmStore.processSend(token, amount)
  }

  componentDidMount() {
    this._doSend()
  }

  _onClose = () => {
    NavStore.navigator.dispatch(NavigationActions.back())
    NavStore.navigator.dispatch(NavigationActions.back())
    NavStore.navigator.dispatch(NavigationActions.back())
  }

  _onShare = () => {
    Share.share({
      message: this.confirmStore.sendURL,
      url: this.confirmStore.sendURL,
      title: "I'm sending you a wallet"
    }, {
        // Android only:
        dialogTitle: "I'm sending you a wallet",
        // iOS only:
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      })
  }

  _onRetry = () => {
    this._doSend()
  }

  goBack = () => {
    NavStore.goBack()
  }

  renderShareBtn() {
    return (
      <TouchableOpacity
        style={styles.sendTo}
        disabled={this.confirmStore.isProcessing}
        onPress={this._onShare}
      >
        <Text
          allowFontScaling={false}
          style={[styles.sendText, { color: !this.confirmStore.isProcessing ? AppStyle.backgroundColor : AppStyle.greyTextInput }]}>
          Share
        </Text>
      </TouchableOpacity>
    )
  }

  renderCloseBtn() {
    return (
      <TouchableOpacity
        style={styles.sendTo}
        disabled={this.confirmStore.isProcessing}
        onPress={this._onClose}
      >
        <Text
          allowFontScaling={false}
          style={[styles.sendText, { color: !this.confirmStore.isProcessing ? AppStyle.backgroundColor : AppStyle.greyTextInput }]}>
          Cancel
        </Text>
      </TouchableOpacity>
    )
  }

  renderRetryBtn() {
    return (
      <TouchableOpacity
        style={styles.sendTo}
        disabled={this.confirmStore.isProcessing}
        onPress={this._onRetry}
      >
        <Text
          allowFontScaling={false}
          style={[styles.sendText, { color: !this.confirmStore.isProcessing ? AppStyle.backgroundColor : AppStyle.greyTextInput }]}>
          Retry
        </Text>
      </TouchableOpacity>
    )
  }

  renderShare() {
    return (
      this.confirmStore.step == STEP_SEND &&
      <View>
        <View style={[styles.containerContent]}>
          <Text
            style={styles.waiting}>Send the following link to the recipient and ask them to click on it. Once done the tokens can be transferred.</Text>
          <Text
            numberOfLines={3}
            adjustsFontSizeToFit
            selectable={true}
            style={[styles.link, commonStyle.fontAddress]}>{this.confirmStore.sendURL}</Text>
          <LittleSpinner />
          <Text style={[styles.waiting, { marginTop: 20, marginBottom: 20 }]}>Waiting for recipient...</Text>
        </View>
        <View>
          {this.renderShareBtn()}
        </View>
      </View >
    )
  }

  renderTransfer() {
    return (
      this.confirmStore.step == STEP_TRANSFER &&
      <View>
        <View style={[styles.containerContent]}>
          <Text
            style={styles.waiting}>Recipient's address received.</Text>
          <Text
            numberOfLines={3}
            adjustsFontSizeToFit
            selectable={true}
            style={[styles.link, commonStyle.fontAddress]}>{this.confirmStore.toAddress}</Text>
          <LittleSpinner />
          <Text style={[styles.waiting, { marginTop: 20, marginBottom: 20 }]}>Starting transfer...</Text>
        </View>
        <View>
          {this.renderShareBtn()}
        </View>
      </View >
    )
  }

  renderRetry() {
    return (
      this.confirmStore.step == STEP_FAILED &&
      <View>
        <View style={[styles.containerContent]}>
          <Text
            style={[styles.attention, { marginBottom: 40 }]}>Processing failed</Text>
        </View>
        <View>
          {this.renderRetryBtn()}
        </View>
      </View >
    )
  }

  renderProcessing() {
    return (
      this.confirmStore.isProcessing &&
      <View style={[styles.containerContent]}>
        <LittleSpinner />
      </View>
    )
  }

  renderClose() {
    return (
      !this.confirmStore.isProcessing &&
      <View>
        {this.renderCloseBtn()}
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container]}>
        <NavigationHeader
          style={{ marginTop: marginTop + 20 }}
          headerItem={{
            title: constant.RECIPIENT_WALLET,
            icon: null,
            button: images.backButton
          }}
          action={this.goBack}
        />
        <View style={[styles.containerContent]}>
          <Text
            numberOfLines={3}
            adjustsFontSizeToFit
            style={styles.attention}>Send Wallet</Text>
        </View>
        {this.renderShare()}
        {this.renderRetry()}
        {this.renderTransfer()}
        {this.renderProcessing()}
        {this.renderClose()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyle.backgroundColor
  },
  containerContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 40
  },
  attention: {
    color: AppStyle.mainTextColor,
    fontSize: 30,
    fontFamily: 'OpenSans-Bold',
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center'
  },
  link: {
    color: AppStyle.secondaryTextColor,
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    textAlign: 'center'
  },
  waiting: {
    color: AppStyle.mainTextColor,
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    marginTop: 30,
    alignSelf: 'center',
    textAlign: 'center'
  },
  sendText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Semibold'
  },
  sendTo: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    backgroundColor: AppStyle.backgroundDarkBlue
  },
})
