import Repository from "../repositories/friends.repository.js";
import AppError from "../lib/application.error.js";

const Service = (dbClient) => {

    const repository = Repository(dbClient);

    const getAll = async () => {
        return await repository.getAll();
    }

    const getById = async (id) => {
        return await repository.getById(id);
    }

    const deleteById = async (id) => {
        return await repository.deleteById(id);
    }

    const create = async (friends) => {

        // validaciones de campos primero
        const name = validaName(friends.name);

        // validaciones con la base de datos
        const friendsCount = await repository.countByName(name);
        if (friendsCount > 0) {
            throw AppError('Ya existe un grupo con ese nombre', 409);
        }

        return await repository.create(friends);
    }

    const fullUpdateById = async (friends) => {

        // validaciones de campos primero
        const name = validaName(friends.name);

        // validaciones con la base de datos
        const existingFriends = await repository.getById(friends.id);
        if (!existingFriends) {
            throw AppError('El grupo a modificar no existe', 404);
        }
        
        // validaciones con la base de datos
        const friendsCount = await repository.countByNameNotId(name, friends.id);
        if (friendsCount > 0) {
            throw AppError('Ya existe otro grupo con ese nombre', 409);
        }

        return await repository.fullUpdateById({
            ...friends,
            name
        });
    }

    const validaName = (newName) => {
        //Limpiar los datos
        const name = (newName || '').trim();
        //Validar los campos individuales
        if (name.length === 0) {
            throw AppError('El nombre es requerido', 400);
        }
        if (name.length > 30) {
            throw AppError('El nombre debe ser menor de 30 caracteres', 400);
        }

        return name;
    }

    return {
        getAll,
        getById,
        deleteById,
        create,
        fullUpdateById
    }
}

export default Service;