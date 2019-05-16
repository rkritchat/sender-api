import _ from 'underscore'
import mongoose from 'mongoose'

const schema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String
})

const UserInfo = new mongoose.model('userInfo', schema, 'userInfo')


export const findByUsernameAndPassword = (username, password) => {
    return UserInfo.find({ username, password }).limit(1)
}

export const save = (body) => {
    const { username, password, firstname, lastname, email } = body
    const userInfo = new UserInfo({ username, password, firstname, lastname, email })
    return userInfo.save()
}
