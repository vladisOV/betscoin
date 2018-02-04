import React, { Component } from "react";
import betscoin from "../ethereum/betscoin";
import { Card } from "semantic-ui-react";
import Layout from "../components/Layout";
import Event from "../components/Event";

class BetscoinIndex extends Component {
  static async getInitialProps() {
    const eventsCount = await betscoin.methods.getEventsCount().call();
    console.log(eventsCount);
    const events = await Promise.all(
      Array(parseInt(eventsCount))
        .fill()
        .map((element, index) => {
          return betscoin.methods.events(index).call();
        })
    );
    return { eventsCount, events };
  }

  renderEvents() {
    const { events } = this.props;
    var cards = [];
    events.forEach(function(event, index) {
      console.log(event);
      cards.push(<Event event={event} key={index} />);
    });
    return cards;
  }

  render() {
    return (
      <Layout>
        <Card.Group>{this.renderEvents()}</Card.Group>
      </Layout>
    );
  }
}

export default BetscoinIndex;
