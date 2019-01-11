import client from '../graphql/client';

import { QUERY_PIZZA_BY_NAME } from '../graphql/queries';

export const ADD_PIZZA = 'ADD_PIZZA';
export function asyncAddPizza(name) {
  return async dispatch => {
    const response = await client.query({
      query: QUERY_PIZZA_BY_NAME,
      variables: { name: name.toUpperCase() },
    });

    if (!response.networkStatus > 7 || !response.data.pizzaSizeByName) {
    }

    dispatch({
      type: ADD_PIZZA,
      payload: response.data.pizzaSizeByName,
    });
  };
}

export const REMOVE_PIZZA = 'REMOVE_PIZZA';
export function removePizza(index) {
  return {
    type: REMOVE_PIZZA,
    payload: {
      index,
    },
  };
}

export const TOGGLE_TOPPING = 'TOGGLE_TOPPING';
export function toggleTopping(index, name) {
  return {
    type: TOGGLE_TOPPING,
    payload: {
      index,
      name,
    },
  };
}
