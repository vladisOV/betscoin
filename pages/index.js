import React, { Component } from "react";
import betscoin from "../ethereum/betscoin";
import { Card } from "semantic-ui-react";
import Layout from "../components/Layout";

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
    var items = [];
    for (let event of events) {
      items.push({
        header: event.description
      });
    }
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>{this.renderEvents()}</div>
      </Layout>
    );
  }
}

export default BetscoinIndex;
