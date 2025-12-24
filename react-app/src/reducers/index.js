// src/reducers/index.js
import { combineReducers } from 'redux';
import { dCandidateReducer } from './dCandidateReducer'; // Fixed import

export const reducers = combineReducers({
    dCandidate: dCandidateReducer
});