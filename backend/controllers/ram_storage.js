import { StatusCodes } from "http-status-codes";
import { validateErrors } from "../validators/common_validation.js";
import db from '../db/db.js'

import pgPromise from 'pg-promise';
const pgp = pgPromise({});


export const getAllRamStorageConfigs = async (req, res) => {

    const ramStorageConfigs = await db.many('SELECT id,configuration as name from ram_storage');

    res.status(StatusCodes.OK).json({
        success: true,
        data: ramStorageConfigs
    })


}