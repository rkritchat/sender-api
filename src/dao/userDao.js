import _ from 'underscore'

const userInfo = [{ username: 'rkrtichat', password: '1234', firstname: 'Krithcat', lastname: 'Rojaanphruk' },
{ username: 'admin', password: 'admin', firstname: 'Jonh', lastname: 'Doe' }]

export const findByUsernameAndPassword = (username, password) => {
    return new Promise((reslove, reject) => {
        const result = userInfo.filter(e => {
            if (_.isEqual(e.username, username) && _.isEqual(e.password, password)) return e
        })
        return (!_.isEmpty(result)) ? reslove(result) : reject('Invalid username or password')
    })
}