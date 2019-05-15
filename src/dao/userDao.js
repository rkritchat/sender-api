import _ from 'underscore'

const userInfo = [
    { username: 'rkrtichat', password: '1234', firstname: 'Krithcat', lastname: 'Rojaanphruk' },
    { username: 'admin', password: 'admin', firstname: 'Jonh', lastname: 'Doe' }
]

const isUsernamePasswordMath = (e, username, password) => {
    return (_.isEqual(e.username, username) && _.isEqual(e.password, password))
}

export const findByUsernameAndPassword = (username, password) => {
    return new Promise((reslove, reject) => {
        const result = userInfo.filter(e => {
            if (isUsernamePasswordMath(e, username, password)) return e
        })
        return (!_.isEmpty(result)) ? reslove(result.pop()) : reject('Invalid username or password')
    })
}
