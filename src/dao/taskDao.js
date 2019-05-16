import _ from 'underscore'
import mongoose from 'mongoose'

const taskInfo = [
    {
        username: 'rkrtichat', task: [
            { taskName: 'CGP', taskDesc: 'Clean code', taskProgress: '40' },
            { taskName: 'direcApprove', taskDesc: 'Create unit test for approve serice', taskProgress: '10' },
            { taskName: 'eCustom', taskDesc: 'Create e-service', taskProgress: '100' },
        ]
    }, {
        username: 'admin', task: [
            { taskName: 'aa', taskDesc: 'Test des of task aa', taskProgress: '10' },
            { taskName: 'bb', taskDesc: 'lorem', taskProgress: '5' }
        ]
    }
]

const schema = mongoose.Schema({
    username: String,
    task: { taskName: String, taskDesc: String, taskProgress: String, taskCreateDate: { type: Date, default: Date.now } }
})

const TaskInfo = new mongoose.model('taskInfo', schema, 'taskInfo')

export const findByUsername = (username) => {
    return TaskInfo.find({ username })
}

export const findById = (id) => {
    return TaskInfo.find({ "_id": id })
}

export const save = (body) => {
    const { username, task } = body
    const taskInfo = new TaskInfo({ username, task })
    return taskInfo.save()
}