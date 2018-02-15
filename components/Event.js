import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class Event extends Component {
  renderTeams() {
    const { teams } = this.props.event;
    for (let team of teams) {
      console.log(team);
    }
    return <div>teams</div>;
  }

  render() {
    const { event } = this.props;
    return (
      <Card>
        <Card.Content>
          <Card.Header>{event.description}</Card.Header>
        </Card.Content>
        <Card.Description>{this.renderTeams()}</Card.Description>
      </Card>
    );
  }
}
export default Event;
