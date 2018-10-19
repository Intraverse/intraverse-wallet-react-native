import { observable, action } from 'mobx'
import NavStore from '../../../AppStores/NavStore'

class WalletReceiveStore {
  isInitFromMessage = false
  @observable currentReceipt = null

  @action setCurrentReceipt = (rec) => {
    this.currentReceipt = rec
  }

  @action gotoReceive() {
    if (!this.currentReceipt) return
    NavStore.pushToScreen('WalletReceiveScreen')
  }
}

export default new WalletReceiveStore()
