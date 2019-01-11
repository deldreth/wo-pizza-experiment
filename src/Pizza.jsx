import React from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';

import { toggleTopping, removePizza } from './redux/actions';

function Pizza(props) {
  const max = totalSelected(props.pizza.toppings);

  return (
    <article className="nes-container">
      <Icon onClick={() => props.removePizza(props.id)} />

      <h2>{props.pizza.name}</h2>

      <h3>Toppings:</h3>
      <form>
        {props.pizza.toppings.map(({ topping, selected }) => (
          <Topping
            key={topping.name}
            disabled={max === props.pizza.maxToppings && !selected}
          >
            <input
              type="checkbox"
              className="nes-checkbox"
              onChange={() => {
                if (
                  !props.pizza.maxToppings ||
                  (max < props.pizza.maxToppings || selected)
                ) {
                  props.toggleTopping(props.id, topping.name);
                }
              }}
              checked={selected}
            />
            <span>{topping.name}</span>
          </Topping>
        ))}
      </form>

      <Total>${totalCost(props.pizza.basePrice, props.pizza.toppings)}</Total>
    </article>
  );
}

function totalSelected(toppings) {
  return toppings.reduce((acc, cur) => (cur.selected ? (acc += 1) : acc), 0, 0);
}

function totalCost(basePrice, toppings) {
  const total =
    basePrice +
    toppings.reduce(
      (acc, cur) => (cur.selected ? acc + cur.topping.price : acc),
      0
    );

  return total.toFixed(2);
}

function mapDispatch(dispatch) {
  return {
    toggleTopping: (index, name) => dispatch(toggleTopping(index, name)),
    removePizza: index => dispatch(removePizza(index)),
  };
}

export default connect(
  null,
  mapDispatch
)(Pizza);

const Topping = styled('label')`
  display: block;
  opacity: ${props => (!props.disabled ? 1 : 0.5)};
`;

const Total = styled('h3')`
  text-align: right;
`;

const Icon = styled('div').attrs({ className: 'nes-icon close is-small' })`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  color: #ffffff;
`;
