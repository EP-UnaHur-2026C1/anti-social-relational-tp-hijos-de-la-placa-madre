const { User } = require('../db/models')

const validateFollow = async (req, res, next) => {
    try {
        const idFollower = parseInt(req.params.idFollower);
        const idFollowing = parseInt(req.params.idFollowing);

        if (isNaN(idFollower) || isNaN(idFollowing) || idFollower <= 0 || idFollowing <= 0) {
            return res.status(400).json({ error: 'Los IDs deben ser números enteros válidos y mayores a 0' });
        }   

        if (idFollower === idFollowing) {
            return res.status(400).json({ error: 'Un usuario no puede seguirse a sí mismo' });
        }

        const follower = await User.findByPk(idFollower);
        const following = await User.findByPk(idFollowing);

        if (!follower || !following) {
            return res.status(404).json({ error: 'Uno o ambos usuarios no existen' });
        }

        req.followerInstance = follower; // Guardamos las instancias de los usuarios en el objeto req para usarlas luego en el controlador
        req.followingInstance = following;

        next();
    } catch (error) {
        console.error('Error en validateFollow:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
}

const validateUnfollow = async (req, res, next) => {
    try {
        const idFollower = parseInt(req.params.idFollower);
        const idFollowing = parseInt(req.params.idFollowing);

        if (isNaN(idFollower) || isNaN(idFollowing) || idFollower <= 0 || idFollowing <= 0) {
            return res.status(400).json({ error: 'Los IDs deben ser números enteros válidos y mayores a 0' });
        }

        const follower = await User.findByPk(idFollower);
        const following = await User.findByPk(idFollowing);
        if (!follower || !following) {
            return res.status(404).json({ error: 'Uno o ambos usuarios no existen' });
        }

        req.followerInstance = follower;
        req.followingInstance = following;

        next();
    } catch (error) {
        console.error('Error en validateUnfollow:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
}


module.exports = { validateFollow, validateUnfollow }