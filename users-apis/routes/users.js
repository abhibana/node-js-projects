import expres from 'express';
import { handleGetAllUsers, handleGetUserById, createNewUser, updateUserById, deleteUserById } from '../controllers/users.js';

export const router = expres.Router();

router.route("/").get(handleGetAllUsers).post(createNewUser);

router.route("/:id")
    .get(handleGetUserById)
    .patch(updateUserById)
    .delete(deleteUserById);; 