import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react/native'
import NavigationHeader from '../../../components/elements/NavigationHeader'
import images from '../../../commons/images'
import AppStyle from '../../../commons/AppStyle'
import NavStore from '../../../AppStores/NavStore'
import LayoutUtils from '../../../commons/LayoutUtils'
import WalletReceiveStore from '../stores/WalletReceiveStore'
import BottomButton from '../../../components/elements/BottomButton'

const { width, height } = Dimensions.get('window')
const isIPX = height === 812
const marginTop = LayoutUtils.getExtraTop()

@observer
export default class WalletReceiveScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  static defaultProps = {
    navigation: {}
  }

  componentWillUnmount() {
    const { navigation } = this.props
    const { params } = navigation.state
    const { notif } = WalletReceiveStore
    if (notif && params) {
      WalletReceiveStore.setCurrentNotif(null)
    }
  }

  get selectedReceipt() {
    return WalletReceiveStore.currentReceipt
  }

  _onClose = () => NavStore.goBack()

  _onPress = () => {
    NavStore.goBack()
    // NavStore.pushToScreen('BackupSecondStepScreen')
  }

  render() {
    return (
      <View style={[styles.container, { marginTop: marginTop + 20 }]}>
        <NavigationHeader
          style={{ width }}
          headerItem={{
            title: 'Receive Wallet',
            icon: null,
            button: images.backButton
          }}
          action={this._onClose}
        />
        <View style={[styles.containerContent]}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.attention}>You've been sent a wallet by [] for $[]</Text>
        </View>
        <BottomButton
          text="Yes Please!"
          onPress={this._onPress}
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  attention: {
    color: AppStyle.mainTextColor,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    marginTop: 20,
    alignSelf: 'center'
  }
})
