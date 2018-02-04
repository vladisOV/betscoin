import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class Event extends Component {
  render() {
    const { event } = this.props;
    return (
      <Card>
        <Card.Content>
          <Card.Header>{event.description}</Card.Header>
        </Card.Content>
        <Card.Description>{event.team}</Card.Description>
      </Card>
    );
  }
}
export default Event;
