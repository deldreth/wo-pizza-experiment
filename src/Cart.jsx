import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';

import Pizza from './Pizza';

function Cart(props) {
  return (
    <Fragment>
      <section className="nes-container with-title">
        <p className="title">Pizzas</p>

        <Container>
          {props.pizzas.length === 0 && (
            'Pick a size'
          )}

          {props.pizzas.map((pizza, index) => (
            <Pizza key={index} pizza={pizza} id={index} />
          ))}
        </Container>
      </section>

      <Total>${total(props.pizzas)}</Total>
    </Fragment>
  );
}

function total(pizzas) {
  let totalCost = 0;
  pizzas.forEach(pizza => {
    totalCost += pizza.basePrice;
    totalCost += pizza.toppings.reduce(
      (acc, cur) => (cur.selected ? (acc += cur.topping.price) : acc),
      0
    );
  });

  return totalCost.toFixed(2);
}

function mapState(state) {
  return {
    pizzas: state,
  };
}

export default connect(mapState)(Cart);

const Container = styled('section')`
  display: grid;
  grid-template-columns: repeat(1, 1fr);

  @media only screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (min-width: 1399px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Total = styled('h1')`
  text-align: right;
`;
