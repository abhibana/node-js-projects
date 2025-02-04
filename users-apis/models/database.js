import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database : process.env.DATABASE,
}).promise()


export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

export async function getUser(userId) {
    const [rows] = await pool.query(
        `SELECT * FROM users WHERE id = ?`,
        [userId]
    )

    return rows[0];
}

export async function createUser(first_name, last_name, gender, email, job_title) {
    const [row] = await pool.query(
        `INSERT INTO users (first_name, last_name, email, gender, job_title)
            VALUES(?, ?, ?, ?, ?)`,
        [first_name, last_name, email, gender, job_title]
    );

    return row;
}

export async function updateUser(user_id, first_name, last_name, gender, email, job_title) {
    const [rows] = await pool.query(
        `UPDATE users SET first_name = ?, last_name = ?, email = ?, gender = ?, job_title = ?
            WHERE id = ?`,
        [first_name, last_name, email, gender, job_title, user_id]
    );

    return rows.affectedRows;
}

export async function deleteUser(userId) {
    const [rows] = await pool.query(
        `DELETE FROM users WHERE id = ?`,
        [userId]
    )

    return rows.affectedRows;
}