import { getAllExercises} from '../../services/exerciseService'; // Import dịch vụ API
import {
    GET_EXERCISES_SUCCESS,
  GET_EXERCISES_FAILURE
} from './types';
const handleError = (error) => {
    return error.response ? error.response.data.msg : error.message;
};
export const AllExercise = () => async (dispatch) => {
    try {
        const exercises = await getAllExercises();
        dispatch({ type: GET_EXERCISES_SUCCESS, payload: exercises });
    } catch (error) {
        const errorMessage = handleError(error);
        dispatch({ type: GET_EXERCISES_FAILURE, payload: errorMessage });
    }
};
