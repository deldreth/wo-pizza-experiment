import gql from 'graphql-tag';

export const QUERY_PIZZA_SIZES = gql`
  {
    pizzaSizes {
      name
    }
  }
`;

export const QUERY_PIZZA_BY_NAME = gql`
  query getPizza($name: PizzaSizes!) {
    pizzaSizeByName(name: $name) {
      name
      maxToppings
      basePrice
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
    }
  }
`;
