import ApiCaller from './api-caller'
import URL from './url'

export const getWalletTransfer = (id) => {
  return ApiCaller.get(`${URL.Synchroniciti.transferApiURL()}/${id}`, {})
}

export const putWalletTransferReceiver = (id, address) => {
  const data = {
    "ToAddress": address
  }
  return ApiCaller.put(`${URL.Synchroniciti.transferApiURL()}/${id}/rec`, data, true)
}

export const createWalletTransfer = (token, amount) => {
  return ApiCaller.post(`${URL.Synchroniciti.transferApiURL()}`, {
    'Token': token,
    'Amount': amount
  }, true)
}
