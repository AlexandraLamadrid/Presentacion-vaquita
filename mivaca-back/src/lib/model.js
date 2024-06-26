import pg from 'pg';
const { Pool } = pg
import "dotenv/config"; 

const pool = new Pool();

const Model = () => {

  const entities = [];

  const findUnique = (id) => {
    return entities.find((entity) => (entity.id = id));
  };

  const findMany = async () => {
    const client = await pool.connect();
    const resultadoQueryGroups = await client.query('SELECT id, ownerid, name, email, createdAt FROM groups')
    client.release();
    return resultadoQueryGroups.rows;
  };

  const create = async (group) => {
    const telefono = await pool.connect();
    const valoresParaInsert = { 
      text: 'insert into groups (ownerid, name, color, createdat) values ($1, $2, $3, NOW()) returning *',
      values: [group.ownerid, group.name, group.color]
    }
    const resultadoInsertGroups = await telefono.query(valoresParaInsert);
    telefono.release();

    return resultadoInsertGroups.rows[0];
  };

  const update = (id, newEntity) => {
    console.log(4.1, "[Database] Model update");

    const entityIndex = entities.findIndex((entity) => entity.id === id);

    if (entityIndex !== -1) {
      entities[entityIndex] = newEntity;

      return true;
    }

    return false;
  };

  const del = (id) => {
    console.log(4.1, "[Database] Model delete");

    const entityIndex = entities.findIndex((entity) => entity.id === id);

    if (entityIndex !== -1) {
      entities.splice(entityIndex, 1);

      return true;
    }

    return false;
  };

  return {
    findUnique,
    findMany,
    create,
    delete: del,
    update,
  };
};

export { Model };
