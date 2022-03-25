const { isEmpty } = require('validator')

const endpoint = async (req, res) =>
{
    let { _id } = req.params

    const iw = { ignore_whitespaces: true }

    if (!_id || isEmpty(_id, iw))
        return res.status(400).send({ msg:'Faltan campos obligatorios.' })
    
    req.productos.map((value, index, array) => {
        if (value._id == _id)
            array.splice(index, 1)
    })
    res.status(200).send({ msg:'Se elimino correctamente' })
}

module.exports = endpoint