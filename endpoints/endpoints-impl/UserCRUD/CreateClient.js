const { isEmpty } = require('validator')
const mysql = require('mysql')

const endpointsImplementation = {}
endpointsImplementation.createClient = async (req, res) =>
{
    let { name, lastname, email } = req.body
    
    const iw = { ignore_whitespaces: true }
    
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
        
        mysqlConnection.query('INSERT INTO usuarios (nombre, apellido, correo) VALUES (?,?,?)', [name, lastname, email], (err, results, fields) =>
        {
            if (err) throw err
            return res.status(200).send({ msg:'Datos insertados correctamente.' })
        })
    }
    catch(ex)
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