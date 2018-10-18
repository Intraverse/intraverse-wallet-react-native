import {
  Alert
} from 'react-native'
import branch from 'react-native-branch'

class BranchListener {
  _unsubscribeFromBranch = null

  init() {
    _unsubscribeFromBranch = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error('Error from Branch: ' + error)
        return
      }

      // params will never be null if error is null

      if (params['+non_branch_link']) {
        const nonBranchUrl = params['+non_branch_link']
        // Route non-Branch URL if appropriate.
        return
      }

      if (!params['+clicked_branch_link']) {
        // Indicates initialization success and some other conditions.
        // No link was opened.
        return
      }

      // A Branch link was opened.
      // Route link based on data in params.

      if (!params['snd']) {
        // link wasn't a valid send
        return
      }

      const snd = params.snd

      Alert.alert(
        'Alert',
        'You have received a message: ' + snd,
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    })
  }

  stop() {
    if (_unsubscribeFromBranch) {
      _unsubscribeFromBranch()
      _unsubscribeFromBranch = null
    }
  }
}

export default new BranchListener()
