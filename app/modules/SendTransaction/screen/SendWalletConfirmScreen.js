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
    this.confirmStore = MainStore.sendTransaction.sendWalletConfirmStore
  }

  componentDidMount() {
    this.confirmStore.processSend()
  }

  _onClose = () => {
    NavStore.navigator.dispatch(NavigationActions.back())
    NavStore.navigator.dispatch(NavigationActions.back())
    NavStore.navigator.dispatch(NavigationActions.back())
  }

  renderOKBtn() {
    return (
      <TouchableOpacity
        style={styles.sendTo}
        disabled={this.confirmStore.isRefresh}
        onPress={this._onClose}
      >
        <Text
          allowFontScaling={false}
          style={[styles.sendText, { color: !this.confirmStore.isRefresh ? AppStyle.backgroundColor : AppStyle.greyTextInput }]}>
          OK
        </Text>
      </TouchableOpacity>
    )
  }

  renderButtons() {
    return (
      !this.confirmStore.isRefresh &&
      <View>
        {this.renderOKBtn()}
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
            style={styles.attention}>Send wallet</Text>
        </View>
        <View style={[styles.containerContent]}>
          <Text
            numberOfLines={3}
            adjustsFontSizeToFit
            style={styles.attention}>{this.confirmStore.sendURL}</Text>
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
