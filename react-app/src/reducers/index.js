// src/reducers/index.js
import { combineReducers } from 'redux';
import { dCandidateReducer } from './dCandidate'; // Fixed import

export const reducers = combineReducers({
    dCandidate: dCandidateReducer
});