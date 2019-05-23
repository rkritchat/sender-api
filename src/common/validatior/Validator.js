const SdException = require('../exception/SdException')

class Validator {
    constructor() {

    }

    thowExceptionIfErr(error) {
        if (error) {
            const { details } = error
            throw new SdException(details[0].message)
        }
    }
}

module.exports = Validator