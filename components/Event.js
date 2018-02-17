import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import TeamBet from "./TeamBet";

class Event extends Component {
  renderTeams() {
    const { teams } = this.props.event;
    var teamButtons = [];
    teams.forEach((team, index) => {
      teamButtons.push(<TeamBet team={team} key={index} />);
    });
    return teamButtons;
  }

  render() {
    const { event } = this.props;
    return (
      <div>
        <Grid textAlign="center">
          <Grid.Row>{event.description}</Grid.Row>
          <Grid.Row columns={event.teams.length}>
            <div>{this.renderTeams()}</div>
          </Grid.Row>
        </Grid>
        <hr />
      </div>
    );
  }
}
export default Event;
