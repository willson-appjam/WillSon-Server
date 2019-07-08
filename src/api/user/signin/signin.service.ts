import express from 'express'
import dbconnection from '../../../lib/connection';
import {selectUserInformation, selectUserPassword } from '../../../models/signin';
import {cryptoPassword} from '../../../modules/cryptoPassword'
import token from '../../../lib/middlewares/token'
import {key} from '../../../../secret/aesKey'
import serviceStatusCode from '../../../lib/serviceStatusCode'


const postSigninService = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {body} = req
      let userToken = null
      if(!body.email || !body.password) {
        reject({ code: serviceStatusCode['SIGN_IN_VALIDATION_ERROR'] })
        return
      }

      const connection = await dbconnection()
      const [userInfo] : any = await selectUserInformation(connection, body)
      if(!userInfo){
        reject({
          code: 401,
          message: '아이디 or 비밀번호 값이 일치하지 않습니다.'
        })
      } else if(userInfo.email) {
        body.password = await cryptoPassword.hashedPassword(userInfo.salt, body.password)
        const [userInfoPassword] : any = await selectUserPassword(connection, body)
        if(!userInfoPassword){
          reject({ code: serviceStatusCode['SIGN_IN_AUTHENTICATION_ERROR'] })
        }
        userToken = await token.encode(key , userInfo)
      }

      resolve({
        Token: userToken});

    } catch(e){
      console.log(e)
      reject(e)
    } 
  })
}

export default{
  postSigninService,
}