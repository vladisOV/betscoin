import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

class Event extends Component {
  renderTeams() {
    const { teams } = this.props.event;
    var teamButtons = [];
    teams.forEach((team, index) => {
      teamButtons.push(<Button key={index}>{team.name}</Button>);
    });
    return teamButtons;
  }

  render() {
    const { event } = this.props;
    return (
      <Card>
        <Card.Content>
          <Card.Header>{event.description}</Card.Header>
        </Card.Content>
        <Card.Description>
          <div>{this.renderTeams()}</div>
        </Card.Description>
      </Card>
    );
  }
}
export default Event;
