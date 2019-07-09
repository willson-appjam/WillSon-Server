import express from 'express';

import { getFeelingList } from './feeling/feeling.ctrl';
import { getPersonalityList } from './personality/personality.ctrl';
import { getCategoryList, postCategoryList } from './category/category.ctrl';
import { getUserQuestionList, postUserQuestion, putUserQuestion } from './question/question.ctrl';


import authCheck from '../../lib/authCheck'

const concern = express.Router();

concern.get('/category/:category_idx', authCheck, getCategoryList);
concern.post('/category', postCategoryList);

concern.get('/feeling', getFeelingList);

concern.get('/personality', getPersonalityList);

concern.post('/question', authCheck, postUserQuestion);
concern.put('/question', authCheck, putUserQuestion);

concern.get('/list', authCheck, getUserQuestionList);

export default concern;