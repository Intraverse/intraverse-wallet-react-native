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
import TransferStore from '../../../AppStores/stores/TransferStore'
import LittleSpinner from '../../../components/elements/LittleSpinner'
import constant from '../../../commons/constant'

const marginTop = LayoutUtils.getExtraTop()

@observer
export default class WalletReceiveScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static defaultProps = {
    navigation: {}
  }

  constructor(props) {
    super(props)
    this.transferStore = TransferStore
  }

  get selectedReceipt() {
    return this.transferStore.currentReceipt
  }

  _onClose = () => {

    NavStore.popupCustom.show(
      'Are you sure you want to decline ? You cannot undo this action',
      [
        {
          text: 'No',
          onClick: () => {
            NavStore.popupCustom.hide()
          }
        },
        {
          text: 'Yes',
          onClick: async () => {
            NavStore.popupCustom.hide()
            this.transferStore.clearCurrentReceipt()
            NavStore.goBack()
          }
        }
      ]
    )
  }
  _onPress = () => {
    this.transferStore.processReceive()
  }

  renderOKBtn() {
    return (
      <TouchableOpacity
        style={styles.sendTo}
        disabled={this.transferStore.isRefresh}
        onPress={this._onPress}
      >
        <Text
          allowFontScaling={false}
          style={[styles.sendText, { color: !this.transferStore.isRefresh ? AppStyle.backgroundColor : AppStyle.greyTextInput }]}>
          {constant.RECEIVE_WALLET_GO}
        </Text>
      </TouchableOpacity>
    )
  }

  renderCancelBtn() {
    return (
      <TouchableOpacity
        style={styles.sendTo}
        onPress={this._onClose}
      >
        <Text
          allowFontScaling={false}
          style={[styles.sendText, { color: AppStyle.backgroundColor }]}>
          {constant.RECEIVE_WALLET_CANCEL}
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtons() {
    return (
      !this.transferStore.isRefresh && !this.transferStore.isProcessing &&
      <View>
        {this.renderOKBtn()}
        {this.renderCancelBtn()}
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container, { marginTop: marginTop + 20 }]}>
        <View style={[styles.containerContent]}>
          <Text
            numberOfLines={3}
            adjustsFontSizeToFit
            style={styles.attention}>You've been sent a wallet</Text>
        </View>
        <View style={[styles.containerContent, { paddingBottom: 40 }]}>
          {!this.transferStore.isRefresh &&
            <Text
              numberOfLines={3}
              adjustsFontSizeToFit
              style={styles.attention}>{this.transferStore.amount} {this.transferStore.token}</Text>
          }
          {this.transferStore.isRefresh &&
            <View style={[styles.containerContent]}>
              <Text style={styles.loadingText}>{this.transferStore.statusMessage}</Text>
              <LittleSpinner />
            </View>
          }
        </View>
        {this.renderButtons()}
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
  loadingText: {
    color: AppStyle.mainTextColor,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginTop: 20,
    marginBottom: 20,
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
