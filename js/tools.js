class Tools {
    constructor(arg) {
        if(!Tools.instance) {
            this.name = null
            Tools.instance = this
        }
        return Tools.instance
    }
    static getInstance() {
        if (!this.instance) {
            return this.instance = new Tools()
        }
        return this.instance
    }
}