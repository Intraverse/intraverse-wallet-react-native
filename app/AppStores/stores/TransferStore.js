import { observable, action } from 'mobx'
import NavStore from '../NavStore'
import API from '../../api'

class TransferStore {
  isReceiving = false
  @observable currentReceipt = null
  @observable token = null
  @observable amount = null
  @observable isRefresh = false

  @action setCurrentReceipt = (rec) => {
    this.currentReceipt = rec
    this.isReceiving = true
  }

  @action gotoReceive() {
    if (!this.currentReceipt) return
    NavStore.pushToScreen('WalletReceiveScreen')
    this._getTransfer()
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
      }
      this.isRefresh = false
      return res.data
    }, () => {
      this.isRefresh = false
    })
  }

}

export default new TransferStore()
