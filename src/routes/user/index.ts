import {
  createUser,
  signIn,
  // deleteUser,
  getUsers,
  // getUserById,
  updateUser,
} from "../../controllers/user";
import { UserModel } from "../../database/schema/user";

const express = require("express");

const router = express?.Router();

    router.get("/api/users", (req: any, res: any) =>
      getUsers(UserModel, req, res)
    );

    // router.get("/api/user", (req: any, res: any) =>
    //   getUserById(UserModel, req, res)
    // );

    router.put("/api/user/update", updateUser);
router.post("/api/user/sign-up", createUser);
router.post("/api/user/sign-in", signIn);
// router.delete("/api/user/:id", deleteUser);

const userRoutes = router;
export { userRoutes };