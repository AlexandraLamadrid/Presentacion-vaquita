const GET_ALL = `SELECT id, name, email FROM users`;
const GET_BY_ID = `SELECT id, name, email FROM users WHERE id = $1`;
const LOGIN = `SELECT id, name, email FROM users WHERE email = $1 AND PASSWORD = $2`;
const DELETE_BY_ID = `DELETE FROM users WHERE id = $1`;
const CREATE = `
    INSERT INTO users (name, email, password) 
    VALUES ($1,$2,$3)
    RETURNING id, name, email
`;
const COUNT_BY_NAME = `SELECT COUNT(*) as count FROM users WHERE name = $1`;
const FULL_UPDATE_BY_ID = `
    UPDATE users
    SET name = $1, 
    WHERE id = $3
`;

const COUNT_BY_NAME_NOT_ID = `
    SELECT COUNT(*) FROM users WHERE name = $1 AND id <> $2
`;

const USERS_NOT_IN_GROUP = `
    SELECT id, name, email FROM users
    where id not in (select user_id from groups_users where group_id = $1)
    ORDER BY id ASC 
`;

const Repository = (dbClient) => {

    const getAll = async () => {
        const result = await dbClient.query(GET_ALL);
        return result.rows;
    };

    const getById = async (id) => {
        console.log('CONEXIÓN BD', dbClient);
        const result = await dbClient.query(GET_BY_ID, [id]);
        console.log("retorno de la consulta", result)
        return result.rows[0];
    }

    const deleteById = async (id) => {
        const result = await dbClient.query(DELETE_BY_ID, [id]);
        return result.rowCount > 0;
    }

    const create = async ({ password, name, email }) => {
        const result = await dbClient.query(CREATE, [name, email, password]);
        return result.rows[0];
    }

    const getByEmailPassword = async ( email, password ) => {
        const result = await dbClient.query(LOGIN, [email, password]);
        return result.rows[0];
    }

    const countByName = async (name) => {
        const result = await dbClient.query(COUNT_BY_NAME, [name]);
        const count = parseInt(result.rows[0].count);
        if (isNaN(count)) {
            throw 'Invalid countByName result, is NaN!';
        }
        return count;
    }

    const fullUpdateById = async ({ id, name, email }) => {
        const result = await dbClient.query(
            FULL_UPDATE_BY_ID,
            [id, name, email]
        );
        return result.rowCount > 0;
    }

    const countByNameNotId = async (id, name, email) => {
        const result = await dbClient.query(COUNT_BY_NAME_NOT_ID, [id, name, email]);
        const count = parseInt(result.rows[0].count);
        if (isNaN(count)) {
            throw 'Invalid countByName result, is NaN!';
        }
        return count;
    }

    const getUsersNotInGroup = async (groupId) => {
        const result = await dbClient.query(USERS_NOT_IN_GROUP, [groupId]);
        return result.rows;
    }

    return {
        getAll,
        getById,
        deleteById,
        create,
        countByName,
        fullUpdateById,
        getByEmailPassword,
        countByNameNotId,
        getUsersNotInGroup
    }
}

export default Repository;