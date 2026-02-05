import { Router } from "express";
import { getTimezonesController } from "../controllers/timeController/timezone.controller";
import { getTimeslotsController } from "../controllers/timeController/timeslot.controller";

const router = Router();

router
    .route('/timezones')
    .get(getTimezonesController)

router
    .route('/timeslots')
    .get(getTimeslotsController)


export default router;