import { observable, action } from 'mobx'
import { Alert } from 'react-native'

class WalletReceiveStore {
  isInitFromMessage = false
  @observable currentReceipt = null

  @action setCurrentReceipt = (rec) => {
    this.currentReceipt = rec
  }

  @action gotoReceive() {
    if (!this.currentReceipt) return
    // NavStore.pushToScreen('TransactionDetailScreen', { fromNotif: true })
    Alert.alert(
      'Alert',
      'You have received a message: ' + this.currentReceipt,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }

}

export default new WalletReceiveStore()
