import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { getTimeslotsUTCService } from "../../services/timeslot.service";

export const getTimeslotsController = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
    const data: string[] = await getTimeslotsUTCService();

    return res.status(200).json(data);
}
);