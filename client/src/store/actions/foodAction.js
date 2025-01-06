import { getAllFoods ,suggestFoods} from '../../services/foodService'; // Import dịch vụ API
import {
  FETCH_FOODS_REQUEST,
  FETCH_FOODS_SUCCESS,
  FETCH_FOODS_FAILURE,
  SUGGEST_FOODS_REQUEST,
  SUGGEST_FOODS_SUCCESS,
  SUGGEST_FOODS_FAILURE,
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

export const suggestFoodAction = (criteria) => async (dispatch) => {
  try {
    dispatch({ type: SUGGEST_FOODS_REQUEST });

    const meals = await suggestFoods(criteria);  // Lấy meals từ API

    if (meals && (meals.breakfast.length > 0 || meals.lunch.length > 0 || meals.dinner.length > 0 || meals.snack.length > 0)) {
      // Kiểm tra xem có món ăn trong các bữa ăn không
      dispatch({
        type: SUGGEST_FOODS_SUCCESS,
        payload: meals,
      });
      return { type: SUGGEST_FOODS_SUCCESS, payload: meals };
    } else {
      const errorMessage = 'Không có món ăn nào được gợi ý.';
      dispatch({ type: SUGGEST_FOODS_FAILURE, payload: errorMessage });
      return { type: SUGGEST_FOODS_FAILURE, payload: errorMessage };
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.msg : error.message;
    dispatch({ type: SUGGEST_FOODS_FAILURE, payload: errorMessage });
    return { type: SUGGEST_FOODS_FAILURE, payload: errorMessage };
  }
};
