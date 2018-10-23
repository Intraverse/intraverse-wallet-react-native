import { observable, action } from 'mobx'
import API from '../../../api'
import MainStore from '../../../AppStores/MainStore'
import NavStore from '../../../AppStores/NavStore'
import branch from 'react-native-branch'

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

  async getLink() {

    buo = await branch.createBranchUniversalObject("walletSend", {
      locallyIndex: true
    })

    let linkProperties = {
      feature: 'share',
      channel: 'Wallet',
      campaign: 'SendWallet'
    }

    let controlParams = {
      $desktop_url: 'https://synchroniciti.com'
    }

    let { url } = await buo.generateShortUrl(linkProperties, controlParams)

    buo.release()

    return `${url}?snd=${this.transferId}`
  }

  @action async processSend(token, amount) {
    if (this.isProcessing) return

    this.isProcessing = true

    try {
      res = await API.createWalletTransfer(token, amount, 'MyNewWallet')

      if (res.status !== 201) {
        this.isProcessing = false
        this.step = STEP_FAILED
        return
      }
      this.transferId = res.data.TransferId
      this.sendURL = await this.getLink()
      this.isProcessing = false
      this.step = STEP_SEND
      this.startCheckingResponse()
    }
    catch (error) {
      this.isProcessing = false
      this.step = STEP_FAILED
    }
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
