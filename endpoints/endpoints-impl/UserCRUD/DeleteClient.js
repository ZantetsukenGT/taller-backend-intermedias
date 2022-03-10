const { isEmpty } = require('validator')
const mysql = require('mysql')

const endpointsImplementation = {}
endpointsImplementation.deleteClient = async (req, res) =>
{
    let { id } = req.body

    const iw = { ignore_whitespaces: true }

    if (!id || isEmpty(id, iw))
        return res.status(400).send({ msg:'Faltan campos obligatorios.' })

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

        mysqlConnection.query('DELETE FROM usuarios WHERE id = ?', id, (err, results, fields) =>
        {
            if (err) throw err
            return res.status(200).send({ msg:'Registro eliminado correctamente.' })
        })
    }
    catch (ex)
    {
        console.log(ex)
        return res.status(500).send({ msg:'Error al actualizar la información, por favor intente más tarde.' })
    }
    finally
    {
        mysqlConnection.end()
    }
}

module.exports = endpointsImplementation