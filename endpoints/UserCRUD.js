const endpoints_impl = './endpoints-impl/UserCRUD/'

const createClientImpl = require(endpoints_impl + 'CreateClient')
const deleteClientImpl = require(endpoints_impl + 'DeleteClient')
const getClientImpl = require(endpoints_impl + 'GetClient')
const getClientsImpl = require(endpoints_impl + 'GetClients')
const updateClientImpl = require(endpoints_impl + 'UpdateClient')

const router = require('express').Router()
router.post('/createClient', createClientImpl.createClient)
router.post('/deleteClient', deleteClientImpl.deleteClient)
router.get('/getClient', getClientImpl.getClient)
router.get('/getClients', getClientsImpl.getClients)
router.post('/updateClient', updateClientImpl.updateClient)

module.exports = router