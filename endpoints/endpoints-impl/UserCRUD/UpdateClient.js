const { isEmpty } = require('validator')

const endpoint = async (req, res) =>
{
    let { _id } = req.params
    let { name, price } = req.body

    const iw = { ignore_whitespaces: true }

    if (!_id || isEmpty(_id, iw))
        return res.status(400).send({ msg:'Faltan campos obligatorios.' })

    const nameForUpdate = name && !isEmpty(name, iw)
    const priceForUpdate = price !== undefined
    if(!nameForUpdate && !priceForUpdate)
        return res.status(401).send({ msg:'No se recibió información para actualizar.' })

    req.productos.map(value => {
        if (value._id == _id)
        {
            if (nameForUpdate)
                value.name = name
            if (priceForUpdate)
                value.price = price
        }
    })
    res.status(200).send({ msg:'Se actualizo correctamente' })
}

module.exports = endpoint