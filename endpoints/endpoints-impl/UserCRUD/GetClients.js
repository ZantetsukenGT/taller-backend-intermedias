const endpoint = async (req, res) =>
{
    return res.status(200).send(req.productos)
}

module.exports = endpoint