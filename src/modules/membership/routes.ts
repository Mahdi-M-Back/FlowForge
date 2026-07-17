import { Router } from "express";
import * as controller from "./controller.js"

const router = Router()

router
  .route("/:id")
  .patch(controller.updateMembership);