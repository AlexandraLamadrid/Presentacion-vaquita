import Service from "../services/groups.service.js";

const Controller = () => {

    const getAll = async (req, res) => {
        const service = Service(req.dbClient, req.user.id);

        const groups = await service.getAll();
        res.status(200).json(groups);
        }

    const getById = async (req, res) => {

        const service = Service(req.dbClient, req.user.id);
        const group = await service.getById(req.params.id);
        if (group) {
            res.status(200).json(group);
        } else {
            res.status(404).end();
        }
    }

    const deleteById = async (req, res) => {
        const service = Service(req.dbClient, req.user.id);
        const deleted = await service.deleteById(req.params.id);
        if (deleted) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }

    const create = async (req, res) => {
        const service = Service(req.dbClient, req.user.id);
        const group = req.body;
        const createdGroup = await service.create(group);
        res.status(201).json(createdGroup);
    }

    const addFriend = async (req, res) => {
        const service = Service(req.dbClient, req.user.id);
        const groupId = req.params.groupId;
        const friendId = req.params.friendId;
        await service.addFriend(groupId, friendId);
        res.status(204).end();
    }

    const fullUpdateById = async (req, res) => {
        const service = Service(req.dbClient, req.user.id);
        const id = req.params.id;
        const group = {
            ...req.body,
            id
        };
        const updatedGroup = await service.fullUpdateById(group);
        if (updatedGroup) {
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
        fullUpdateById,
        addFriend
    }
}

export default Controller;