const { isEmpty } = require('validator')
const mysql = require('mysql')

const endpointsImplementation = {}
endpointsImplementation.getClient = async (req, res) =>
{
    //mas info https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
    //para un post se usa 'body' http://url/miEndpoint
    //let { id } = req.body
    //para un get con url params se usa 'params' http://url/miEndpoint/2
    //let { id } = req.params
    //para un get con url query se usa 'query' http://url/miEndpoint?id=2
    let { id } = req.query

    const mysqlConnection = mysql.createConnection(req.mysqlOptions)
    try
    {
        mysqlConnection.connect((err) =>
        {
            if (err)
            {
                console.error('Error al conectar a mysql:')
                throw err
            }
            console.log('Éxito al conectar a mysql.')
        })

        mysqlConnection.query('SELECT * FROM usuarios WHERE id = ?', id, (err, results, fields) =>
        {
            if (err) throw err
            return res.status(200).send({ msg:'Datos consultados correctamente.', data: results })
        })
    }
    catch (ex)
    {
        console.log(ex)
        return res.status(500).send({ msg:'Error al obtener la información, por favor intente más tarde.' })
    }
    finally
    {
        mysqlConnection.end()
    }
}

module.exports = endpointsImplementation