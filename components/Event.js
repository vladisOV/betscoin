import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import TeamBet from "./TeamBet";

class Event extends Component {
  renderTeams() {
    var { teams } = this.props.event;
    var teamButtons = [];
    teams.forEach((team, index) => {
      team.id = index;
      teamButtons.push(
        <TeamBet team={team} eventId={this.props.event.id} key={index} />
      );
    });
    return teamButtons;
  }

  render() {
    const { event } = this.props;
    return (
      <div>
        <Grid textAlign="center">
          <Grid.Row>{event.description}</Grid.Row>
          <Grid.Row columns={event.teams.length}>{this.renderTeams()}</Grid.Row>
        </Grid>
        <hr />
      </div>
    );
  }
}
export default Event;
