import Service from "../services/friends.service.js";

const Controller = () => {

    const getAll = async (req, res) => {
        const service = Service(req.dbClient);

        const friend = await service.getAll();
        res.status(200).json(friend);
        }

    const getById = async (req, res) => {

        const service = Service(req.dbClient);
        const friend = await service.getById(req.params.id);
        if (friend) {
            res.status(200).json(friend);
        } else {
            res.status(404).end();
        }
    }

    const deleteById = async (req, res) => {
        const service = Service(req.dbClient);
        const deleted = await service.deleteById(req.params.id);
        if (deleted) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }

    const create = async (req, res) => {
        const service = Service(req.dbClient);
        const friend = req.body;
        const createdFriend = await service.create(friend);
        res.status(201).json(createdFriend);
    }

    const fullUpdateById = async (req, res) => {
        const service = Service(req.dbClient);
        const id = req.params.id;
        const friend = {
            ...req.body,
            id
        };
        const updatedFriend = await service.fullUpdateById(friend);
        if (updatedFriend) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
        
    }

    return {
        getAll,
        getById,
        deleteById,
        create,
        fullUpdateById
    }
}

export default Controller;









