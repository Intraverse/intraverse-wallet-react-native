import { observable, action } from 'mobx'
import { Alert } from 'react-native'

class WalletReceiveStore {
  isInitFromNotification = false
  @observable currentReceipt = null

  @action setCurrentReceipt = (rec) => {
    this.currentReceipt = rec

    Alert.alert(
      'Alert',
      'You have received a message: ' + rec,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }

}

export default new WalletReceiveStore()
