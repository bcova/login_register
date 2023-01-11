const client = require('./client')
const bcrypt = require('bcrypt')

async function createUser({
        username,
        password,
        email,
        first_name,
        last_name,
}){
    const SALT_COUNT = 10;
    const hashed_password = await bcrypt.hash(password,SALT_COUNT);
    try {
        const {
            rows: [user]
        } = await client.query(`
        INSERT INTO users(username,password,email,first_name,last_name)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *;     
        `,
        [username,hashed_password,email,first_name,last_name]);
        delete user.password;
        console.log('user',user);
        return user;
    } catch (error) {
        console.error('Error creating user',error);
        throw error;
    }
}

module.exports = {createUser}
