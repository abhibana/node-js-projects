
import { getUsers, getUser, deleteUser, createUser, updateUser } from '../models/database.js';

export async function handleGetAllUsers(req, res) {
    const users = await getUsers();
    if (users.length > 0) {
        return res.json(users);
    } else {
        return res.status(204).json({});
    }
}

export async function handleGetUserById(req, res) {
    const id = Number(req.params.id);
    const user = await getUser(id);
    return res.status((undefined === user) ? 404 : 200).json((undefined === user) ? { status: "No user found" } : user);
}

export async function createNewUser(req, res) {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
        return res.status(400).json({ msg: "All Fields are required" });
    }
    const user = await createUser(body.first_name, body.last_name, body.gender, body.email, body.job_title);
    return res.status(201).json({ status: "SUCCESS", msg: `Created user ${user}` });
}

export async function updateUserById(req, res) {
    const id = Number(req.body.id);
    const user = await getUser(id);
    if (undefined === user) {
        return res.status(404).json({ status: "Invalid user" });
    }

    if (undefined != req.body.first_name) {
        user.first_name = req.body.first_name;
    }
    if (undefined != req.body.last_name) {
        user.last_name = req.body.last_name;
    }
    if (undefined != req.body.gender) {
        user.gender = req.body.gender;
    }
    if (undefined != req.body.email) {
        user.email = req.body.email;
    }
    if (undefined != req.body.job_title) {
        user.job_title = req.body.job_title;
    }
    const affectedRows = await updateUser(id, user.first_name, user.last_name, user.gender, user.email, user.job_title);
    if (0 == affectedRows) {
        return res.status(404).json({ status: "Invalid user" });
    }
    return res.json({ status: `Successfully updated user ${id}` });
}

export async function deleteUserById(req, res) {
    const id = req.body.id;
    const affectedRows = await deleteUser(id);
    if (0 == affectedRows) {
        return res.status(404).json({ status: "Invalid user" });
    }
    res.json({ status: `Successfully deleted user ${id}` });
}