const { isEmpty } = require('validator')
const mysql = require('mysql')

const endpointsImplementation = {}
endpointsImplementation.getClients = async (req, res) =>
{
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

        mysqlConnection.query('SELECT * FROM usuarios', (err, results, fields) =>
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