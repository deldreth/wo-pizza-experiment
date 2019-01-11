import { ADD_PIZZA, REMOVE_PIZZA, TOGGLE_TOPPING } from './actions';

export const initialState = [];

export default function pizzas(state = initialState, action) {
  switch (action.type) {
    case ADD_PIZZA:
      return [
        ...state,
        {
          ...action.payload,
          name: action.payload.name,
          toppings: action.payload.toppings.map(topping => {
            if (topping.defaultSelected) {
              return {
                ...topping,
                selected: true,
              };
            }

            return {
              ...topping,
              selected: false,
            };
          }),
        },
      ];
    case REMOVE_PIZZA:
      return state.filter((pizza, index) => index !== action.payload.index);
    case TOGGLE_TOPPING:
      return state.map((pizza, index) => {
        if (index === action.payload.index) {
          return {
            ...pizza,
            toppings: pizza.toppings.map(topping => {
              if (topping.topping.name === action.payload.name) {
                return {
                  ...topping,
                  selected: !topping.selected,
                };
              }

              return topping;
            }),
          };
        }

        return pizza;
      });
    default:
      return state;
  }
}
