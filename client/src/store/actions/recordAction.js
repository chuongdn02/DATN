import { calculateBMR } from '../../services/recordService'; // Import service
import {
  CALCULATE_BMR_REQUEST,
  CALCULATE_BMR_SUCCESS,
  CALCULATE_BMR_FAILURE,
} from './types';

export const calculateBMRAction = (user_id) => async (dispatch) => {
  dispatch({ type: CALCULATE_BMR_REQUEST });

  try {
    const data = await calculateBMR(user_id);
    dispatch({
      type: CALCULATE_BMR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CALCULATE_BMR_FAILURE,
      payload: error.message || 'Có lỗi xảy ra khi tính toán BMR',
    });
  }
};
