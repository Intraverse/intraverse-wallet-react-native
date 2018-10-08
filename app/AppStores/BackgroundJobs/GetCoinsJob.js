export default class GetCoinsJob {
    appState = null
    jobId = null
    timeInterval = 60000
    ignoreSelectedWallet = false

    constructor(appState, timeInterval = 60000) {
        this.appState = appState
        this.timeInterval = timeInterval
    }

    getCoins() {
        if (this.appState.internetConnection === 'online') {
            this.appState.getCoins()
        }
    }

    startGetCoinsJob() { }

    doOnce() {
        this.getCoins()
    }

    start() {
        this.stop() // ensure not have running job
        this.jobId = setTimeout(() => {
            this.getCoins()
            this.start()
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
