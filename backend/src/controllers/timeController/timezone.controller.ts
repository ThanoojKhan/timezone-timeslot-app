import { Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import { getTimezonesService } from "../../services/timezone.service";
import { Timezone } from "../../types/timezone";

export const getTimezonesController = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
    const data: Timezone[] = await getTimezonesService();

    return res.status(200).json(data);
}
);