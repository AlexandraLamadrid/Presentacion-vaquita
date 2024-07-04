
const CREATE = `
    INSERT INTO groups_users (group_id, user_id) 
    VALUES ($1,$2)
    RETURNING group_id, user_id
`; 

const Repository = (dbClient) => {

    const create = async (groupId, userId) => { 
        const result = await dbClient.query(CREATE, [groupId, userId]);
        return result.rows[0];
    }  

    return {
        create
    }
}

export default Repository;