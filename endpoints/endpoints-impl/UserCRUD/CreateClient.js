const { isEmpty } = require('validator')
const { v4 } = require('uuid')

const endpoint = async (req, res) =>
{
    let { name, price } = req.body
    const iw = { ignore_whitespaces: true }
    
    const namePresent = name && !isEmpty(name, iw)
    const pricePresent = price !== undefined
    if(!namePresent || !pricePresent)
        return res.status(400).send({ msg:'Faltan campos obligatorios.' })
        
    req.productos.push({_id: v4(), name, price})
    res.status(200).send({ msg:'Se inserto correctamente' })
}

module.exports = endpoint