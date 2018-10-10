import BigNumber from 'bignumber.js'
import caller from './api-caller'
import appState from '../AppStores/AppState'
import NetworkConfig from '../AppStores/stores/Config'
import URL from './url'

/**
 *
 * @param {String} address
 */
export const fetchWalletInfo = (address) => {
  if (!address) return Promise.reject()
  const urlTest = URL.EtherScan.apiURL(appState.networkName)
  const apikey = 'SVUJNQSR2APDFX89JJ1VKQU4TKMB6W756M'
  const data = {
    module: 'account',
    action: 'balance',
    address,
    tag: 'latest',
    apikey
  }
  const urlToken = URL.EthExplorer.apiURL(address)
  const apiKeyToken = 'freekey'
  const dataToken = {
    apiKey: apiKeyToken
  }
  return new Promise.all([caller.get(urlTest, data, true), caller.get(urlToken, dataToken, true)]).then(res => {
    if (res[0].status != 200 || res[1].status !== 200) {
      throw ('at least one data source failed to return OK response')
    }
    const balance = res[0] && res[0].data && res[0].data.result ? new BigNumber(`${res[0].data.result}e-18`) : new BigNumber('0')
    const tokens = res[1] && res[1].data && res[1].data.tokens ? res[1].data.tokens : []
    const result = {
      data: {
        data: {
          ETH: { balance: balance.toString(10) },
          address,
          tokens: tokens
        }
      }
    }
    return result
  }).catch(e => reject(e))
}

/**
 *
 * @param {String} addressStr
 * @param {Object} data
 */
export const fetchTransactions = (addressStr, data, page = 1) => {
  const url = URL.EtherScan.apiURL(appState.networkName)
  const params = data
  params.page = page

  if (!addressStr) return Promise.reject()
  return caller.get(url, params, true)
}

/**
 *
 * @param {String} txHash
 */
export const checkStatusTransaction = (txHash) => {
  const url = URL.EtherScan.apiURL(appState.networkName)
  const apikey = 'SVUJNQSR2APDFX89JJ1VKQU4TKMB6W756M'
  const params = {
    module: 'transaction',
    action: 'gettxreceiptstatus',
    txHash,
    apikey
  }
  return caller.get(url, params, true)
}

/**
 *
 * @param {String} address
 */
export const fetchToken = (address) => {
  if (!address) return Promise.reject()
  // const url = `${URL.Skylab.apiURL()}/balance/${address}`
  // return caller.get(url, {}, true)
  return Promise.resolve({})
}

export const fetchRateETHDollar = () => {
  const data = {
    fsyms: 'ETH',
    tsyms: 'BTC,USD,EUR,GBP,AUD,CAD,CNY,JPY,RUB'
  }
  return caller.get(`${URL.CryptoCompare.apiURL()}/data/pricemultifull`, data, true)
}

export const fetchGasPrice = () => {
  return caller.get(`${URL.EthGasStation.apiURL()}/json/ethgasAPI.json`)
}

export const checkTxHasBeenDroppedOrFailed = (txHash) => {
  const url = `${URL.EtherScan.webURL(appState.networkName)}/tx/${txHash}`

  return caller.get(url)
    .then((res) => {
      if (res.data && typeof res.data === 'string') {
        const htmlString = res.data

        const removed = htmlString.includes('Dropped&Replaced') ||
          htmlString.includes('Dropped') ||
          htmlString.includes('Replaced') ||
          htmlString.includes('<font color="red">Fail</font>')

        const notBroadCast = htmlString.includes('we are unable to locate this Transaction Hash')
        if (notBroadCast) {
          return 'notBroadCast'
        }

        return removed
      }
      return true
    })
}

export const fetchTokenDetail = (address, contract) => {
  // const url = `${URL.Skylab.apiURL()}/balance/${address}/${contract}`
  // return caller.get(url, {}, true)
  return Promise.resolve({})
}

export const changelogsLatest = () => {
  // const url = `${URL.Skylab.apiURL()}/changelogs/latest`
  // return caller.get(url, {}, true)
  return Promise.resolve({
    "data": {
      "data": [
        {
          "version_number": "0.2",
          "is_release": true,
          "change_logs": "Branding update",
          "created_at": "2018-10-01T13:48:43.878Z"
        }
      ],
      "success": true
    }
  })
}

export const changelogsList = () => {
  // const url = `${URL.Skylab.apiURL()}/changelogs`
  // return caller.get(url, {}, true)
  return Promise.resolve({
    "data": {
      "data": [
        {
          "version_number": "0.4",
          "is_release": true,
          "change_logs": "Support iOS dynamic fonts\r\nFix: send by $ value",
          "created_at": "2018-10-09T13:48:43.878Z"
        },
        {
          "version_number": "0.3",
          "is_release": true,
          "change_logs": "Nominal value for supported coins\r\nUsability improvements",
          "created_at": "2018-10-08T13:48:43.878Z"
        },
        {
          "version_number": "0.2",
          "is_release": true,
          "change_logs": "Branding update",
          "created_at": "2018-10-01T13:48:43.878Z"
        },
        {
          "version_number": "0.1",
          "is_release": true,
          "change_logs": "Initial release",
          "created_at": "2018-09-25T13:48:43.878Z"
        }
      ],
      "success": true
    }
  })
}

export const fetchCollectibles = (address) => {
  const url = `${URL.OpenSea.apiURL()}/assets`
  const data = {
    limit: 100,
    order_by: 'auction_created_date',
    order_direction: 'desc',
    owner: address
  }
  return caller.get(url, data, true)
}

export const fetchCoins = () => {
  const url = `${URL.Synchroniciti.coinsURL()}?timestamp=${new Date().getTime()}`
  return caller.get(url, {}, true)
}
