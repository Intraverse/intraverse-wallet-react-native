import { observable, action } from 'mobx'
import API from '../../../api'
import MainStore from '../../../AppStores/MainStore'
import NavStore from '../../../AppStores/NavStore'

export const STEP_FAILED = -1
export const STEP_CREATE = 0
export const STEP_SEND = 1
export const STEP_TRANSFER = 2

export default class SendWalletConfirmStore {
  jobId = null
  timeInterval = 2000
  transferId = null
  @observable isProcessing = false
  @observable sendURL = null
  @observable step = STEP_CREATE
  @observable toAddress = null

  @action processSend(token, amount) {
    if (this.isProcessing) return

    this.isProcessing = true
    API.createWalletTransfer(token, amount, 'MyNewWallet')
      .then((res) => {
        if (res.status !== 201) {
          this.isProcessing = false
          this.step = STEP_FAILED
          return
        }
        this.transferId = res.data.TransferId
        this.sendURL = `https://synchroniciti.app.link/bbT9EXtw6Q?snd=${this.transferId}`
        this.isProcessing = false
        this.step = STEP_SEND
        this.startCheckingResponse()
      })
      .catch(() => {
        this.isProcessing = false
        this.step = STEP_FAILED
      })
  }

  setAddress(address) {
    const { addressInputStore } = MainStore.sendTransaction
    if (address) {
      addressInputStore.setAddress(address)
      addressInputStore.validateAddress()
    }
  }

  checkResponse() {
    API.getWalletTransferReceiver(this.transferId)
      .then((res) => {
        this.stop()
        if (res.status === 200 && res.data && res.data.toAddress) {
          this.toAddress = res.data.toAddress
          this.setAddress(this.toAddress)
          this.step = STEP_TRANSFER
          NavStore.pushToScreen('ConfirmScreen')
          return
        }
        this.startCheckingResponse()
      })
      .catch(() => {
        this.stop()
        this.isProcessing = false
        this.step = STEP_FAILED
      })
  }

  @action startCheckingResponse() {
    if (this.isRunning()) return;
    this.jobId = setTimeout(() => {
      this.checkResponse()
    }, this.timeInterval)
  }

  stop() {
    if (this.jobId) clearTimeout(this.jobId)
    this.jobId = null
  }

  isRunning() {
    return this.jobId !== null
  }
}
