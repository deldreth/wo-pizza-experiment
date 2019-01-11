import React, { Component } from "react";

import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import {
  QUERY_PIZZA_SIZES,
} from "./graphql/queries";
import { asyncAddPizza } from './redux/actions';


class PizzaList extends Component {
  render() {
    return (
      <Query query={QUERY_PIZZA_SIZES}>
        {({ data, loading, error }) => {
          if (loading) {
            return "...";
          }

          if (error || !data) {
            return "...";
          }

          return (
            <Container>
              <h2 className="title">Select a size</h2>
              <div>
                {data.pizzaSizes.map(pizza => (
                  <Button
                    key={pizza.name}
                    onClick={() => this.props.addPizza(pizza.name)}
                  >
                    {pizza.name}
                  </Button>
                ))}
              </div>
            </Container>
          );
        }}
      </Query>
    );
  }
}

function mapState(state) {
  return {};
}

function mapDispatch(dispatch) {
  return {
    addPizza: (name) => dispatch(asyncAddPizza(name))
  }
}

export default connect(mapState, mapDispatch)(PizzaList);

export const Container = styled('section').attrs({
  className: 'nes-container with-title'
})``;

export const Button = styled('button').attrs({
  className: 'nes-btn'
})`
  margin: 0px 5px;
`;