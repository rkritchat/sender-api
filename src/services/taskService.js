import { save } from '../dao/taskDao'
import { findByUsername, findById } from '../dao/taskDao'


module.exports = {
    add: async (req, res, next) => {
        const tmp = await save(req.body)
        const result = await findById(tmp.id)
        res.send(result)
    },

    find: async (req, res, next) => {
        const result = await findByUsername(req.body.username)
        res.send(result)
    }
}