import React, { Component } from "react";
import betscoin from "../ethereum/betscoin";
import { Card, Grid } from "semantic-ui-react";
import Layout from "../components/Layout";
import Event from "../components/Event";

class BetscoinIndex extends Component {
  static async getInitialProps() {
    const eventsCount = await betscoin.methods.getEventsCount().call();
    var events = [];
    for (var eventIndex = 0; eventIndex < parseInt(eventsCount); eventIndex++) {
      var event = await betscoin.methods.events(eventIndex).call();
      var teams = [];
      for (
        var teamIndex = 0;
        teamIndex < parseInt(event.teamsCount);
        teamIndex++
      ) {
        const team = await betscoin.methods
          .getTeam(eventIndex, teamIndex)
          .call();
        teams.push({
          moneyBet: team[0],
          name: team[1],
          bettersCount: team[2]
        });
      }
      event.teams = teams;
      events.push(event);
    }
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
    return <Layout>{this.renderEvents()}</Layout>;
  }
}

export default BetscoinIndex;
