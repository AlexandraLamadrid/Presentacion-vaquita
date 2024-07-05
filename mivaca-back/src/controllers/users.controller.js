import UserService from '../services/users.service.js';
import StatusCodes from 'http-status-codes';

const Controller = () => {

    const getAll = async (req, res) => {
        const service = UserService(req.dbClient);

        const users = await service.getAll();
        res.status(200).json(users);
    }

    const getById = async (req, res) => {

        const service = UserService(req.dbClient);
        const users = await service.getById(req.params.id);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).end();
        }
    }

    const deleteById = async (req, res) => {
        const service = UserService(req.dbClient);
        const deleted = await service.deleteById(req.params.id);
        if (deleted) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    }

    const create = async (req, res) => {
        const service = UserService(req.dbClient);
        const users = req.body;
        const createdUsers = await service.create(users);
        res.status(201).json(createdUsers);
    }

    const login = async (req, res) => {
        const service = UserService(req.dbClient);
        const { email, password } = req.body;
        const token = await service.login(email, password);
        res.status(201).json({ token });
    }


    const fullUpdateById = async (req, res) => {
        const service = UserService(req.dbClient);
        const id = req.params.id;
        const users = {
            ...req.body,
            id
        };
        const updatedUsers = await service.fullUpdateById(users);
        if (updatedUsers) {
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
        login,
        fullUpdateById
    }
}

export default Controller;