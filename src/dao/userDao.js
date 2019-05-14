import _ from 'underscore'

const userInfo = [{ username: 'rkrtichat', password: '1234', firstname: 'Krithcat', lastname: 'Rojaanphruk' },
{ username: 'admin', password: 'admin', firstname: 'Jonh', lastname: 'Doe' }]

export const findByUsernameAndPassword = (username, password) => {
    const result = userInfo.filter(e => {
        if (_.isEqual(e.username, username) && _.isEqual(e.password, password)) return e
    })
    console.log('resut is ', result);
    return (!_.isEmpty(result)) ? result : new Error('Invalid Username or password')
}