import React, { Component } from "react";
import betscoin from "../ethereum/betscoin";
import { Card } from "semantic-ui-react";
import Layout from "../components/Layout";
import Event from "../components/Event";

class BetscoinIndex extends Component {
  static async getInitialProps() {
    const eventsCount = await betscoin.methods.getEventsCount().call();
    var events = await Promise.all(
      Array(parseInt(eventsCount))
        .fill()
        .map((element, index) => {
          var event = betscoin.methods.events(index).call();
          event.index = index;
          console.log(event);
          return event;
        })
    );
    for (var event of events) {
      console.log(event.index);
      // const teams = await Promise.all(
      //   Array(parseInt(event.teamsCount))
      //     .fill()
      //     .map((element, teamIndex) => {
      //       return betscoin.methods.getTeam(index, teamIndex).call();
      //     })
      // );
      // event.teams = teams;
      console.log("first");
    }

    console.log("second");
    return { events };
  }

  renderEvents() {
    const { events } = this.props;
    var cards = [];
    events.forEach(function(event, index) {
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
