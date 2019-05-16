import _ from 'underscore'

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

export const findByUsername = (username) => {
    return new Promise(reslove => {
        const result = taskInfo.filter(e => {
            if (e.username === username) return e
        })
        reslove(result[0])
    })
}