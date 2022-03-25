const { isEmpty } = require('validator')

const endpoint = async (req, res) =>
{
    //mas info https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
    //para un post se usa 'body' http://url/miEndpoint
    //let { id } = req.body
    //para un get con url params se usa 'params' http://url/miEndpoint/2
    //let { id } = req.params
    //para un get con url query se usa 'query' http://url/miEndpoint?id=2
    let { _id } = req.params

    const iw = { ignore_whitespaces: true }

    if (!_id || isEmpty(_id, iw))
        return res.status(400).send({ msg:'Faltan campos obligatorios.' })
    
    res.status(200).send(req.productos.filter((value, _, __) => value._id == _id)[0])
}

module.exports = endpoint