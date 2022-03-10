const { isEmpty } = require('validator')
const mysql = require('mysql')

const endpointsImplementation = {}
endpointsImplementation.updateClient = async (req, res) =>
{
    let { id, name, lastname, email } = req.body

    const iw = { ignore_whitespaces: true }

    if (!id || isEmpty(id, iw))
        return res.status(400).send({ msg:'Faltan campos obligatorios.' })

    if((!name || isEmpty(name, iw)) && (!lastname || isEmpty(lastname, iw)) && (!email || isEmpty(email, iw)))
        return res.status(401).send({ msg:'No se recibió información para actualizar.' })

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

        mysqlConnection.query('UPDATE usuarios SET nombre = ?, apellido = ?, correo = ? WHERE id = ?', [name, lastname, email, id], (err, results, fields) =>
        {
            if (err) throw err
            return res.status(200).send({ msg:'Datos actualizados correctamente.' })
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