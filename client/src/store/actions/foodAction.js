import { getAllFoods } from '../../services/foodService'; // Import dịch vụ API
import {
  FETCH_FOODS_REQUEST,
  FETCH_FOODS_SUCCESS,
  FETCH_FOODS_FAILURE,
} from './types';
const handleError = (error) => {
    return error.response ? error.response.data.msg : error.message;
};
export const AllFood = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_FOODS_REQUEST });

    const foods = await getAllFoods();

    if (foods && foods.length > 0) {
      dispatch({
        type: FETCH_FOODS_SUCCESS,
        payload: foods,
      });
      return { type: FETCH_FOODS_SUCCESS, payload: foods };
    } else {
      const errorMessage = 'Không tìm thấy danh sách món ăn nào.';
      dispatch({ type: FETCH_FOODS_FAILURE, payload: errorMessage });
      return { type: FETCH_FOODS_FAILURE, payload: errorMessage };
    }
  } catch (error) {
    const errorMessage = handleError(error);
    dispatch({ type: FETCH_FOODS_FAILURE, payload: errorMessage });
    return { type: FETCH_FOODS_FAILURE, payload: errorMessage };
  }
};
