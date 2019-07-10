import express from 'express';
import personalityService from './personality.service';

import { isValidCheck } from '../../../lib/isValidation';
import serviceStatusCode from '../../../lib/serviceStatusCode'
import{ respondBasic, respondOnError, CustomError } from '../../../lib/middlewares/respond';

const getPersonalityList = async (req: any, res: any) => {

  await personalityService.getPersonalityList(req, res)
  .then((result: any) => {
    respondBasic(req, res, 2000, result)
	})
	.catch((e: any) => {
    console.log('12321', e)
    if(e.own === 'CustomError') respondOnError(req, res, e, e.code)
    else respondOnError(req, res, e, 2002);
	})
}




export {
  getPersonalityList,
}