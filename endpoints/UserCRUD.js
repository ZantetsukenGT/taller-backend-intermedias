const endpoints_impl = './endpoints-impl/UserCRUD/'

const router = require('express').Router()
router.post('/api', require(endpoints_impl + 'CreateClient'))
router.delete('/api/:_id', require(endpoints_impl + 'DeleteClient'))
router.get('/api/:_id', require(endpoints_impl + 'GetClient'))
router.get('/api', require(endpoints_impl + 'GetClients'))
router.put('/api/:_id', require(endpoints_impl + 'UpdateClient'))

module.exports = router