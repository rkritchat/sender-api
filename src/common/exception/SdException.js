
class SdException extends Error {

    constructor(errorDesc, errorCode = 400) {
        super(errorDesc)
        this.status = errorCode
    }

}

module.exports = SdException