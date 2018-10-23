import { observable, action, computed } from 'mobx'
import NavStore from '../NavStore'
import MainStore from '../MainStore'
// import NotificationStore from '../stores/Notification'
import API from '../../api'
import Wallet from '../stores/Wallet'
import AppStyle from '../../commons/AppStyle'

class TransferStore {
  isReceiving = false
  wallet = null
  @observable isProcessing = false
  @observable currentReceipt = null
  @observable token = null
  @observable amount = null
  @observable walletName = null
  @observable isRefresh = false
  @observable statusMessage = "processing..."

  @action setCurrentReceipt = (rec) => {
    this.currentReceipt = rec
    this.isReceiving = true
  }

  @action clearCurrentReceipt() {
    this.currentReceipt = null
    this.isReceiving = false
  }

  @action gotoReceive() {
    if (!this.currentReceipt) return
    this.isProcessing = false
    this.isRefresh = false
    NavStore.pushToScreen('WalletReceiveScreen')
    this._getTransfer()
  }

  @computed get titleMap() {
    const { wallets } = MainStore.appState
    return wallets.reduce((rs, w) => {
      const result = rs
      result[w.title] = 1
      return result
    }, {})
  }

  @action processReceive() {
    this.isProcessing = true
    this.isRefresh = true
    this.statusMessage = 'creating wallet...'

    const ds = MainStore.secureStorage
    const index = MainStore.appState.currentWalletIndex
    let title = this.walletName
    var num = 0

    while (this.titleMap[title]) {
      num = num + 1
      title = `${this.walletName}${num}`
    }

    Wallet.generateNew(ds, title, index).then(async (w) => {
      this.finished = true
      //NotificationStore.addWallet(title, w.address)
      MainStore.appState.appWalletsStore.addOne(w)
      MainStore.appState.autoSetSelectedWallet()
      MainStore.appState.setCurrentWalletIndex(index + 1)
      MainStore.appState.save()
      MainStore.appState.selectedWallet.fetchingBalance()
      this.wallet = w
      this.statusMessage = 'address: ' + this.wallet.address

      API.putWalletTransferReceiver(this.currentReceipt, this.wallet.address).then((res) => {
        this.clearCurrentReceipt()
        NavStore.goBack()
        NavStore.showToastTop(`Wallet "${title}" created, awaiting transfer!`, {}, { color: AppStyle.colorUp })
      })
    }, ds)
  }

  _getTransfer() {
    if (!this.currentReceipt) {
      return null
    }

    this.isRefresh = true

    return API.getWalletTransfer(this.currentReceipt).then((res) => {
      const { data, status } = res
      if (status == 200) {
        // CONSIDER SAVING TO STORE HERE TO RECOVER

        this.token = data.token
        this.amount = data.amount
        this.walletName = data.walletName
      }
      this.isRefresh = false
      return res.data
    }, () => {
      this.isRefresh = false
    })
  }
}

export default new TransferStore()
