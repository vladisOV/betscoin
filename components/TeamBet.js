import React, { Component } from "react";
import { Button, Grid, Input } from "semantic-ui-react";

class TeamBet extends Component {
  state = {
    showBetInput: false
  };

  showBetInput = () => {
    this.setState({ showBetInput: !this.state.showBetInput });
  };

  render() {
    const { team } = this.props;
    return (
      <div>
        <Grid.Column>
          <Button onClick={this.showBetInput}>{team.name}</Button>
          {this.state.showBetInput && <Input />}
        </Grid.Column>
      </div>
    );
  }
}

export default TeamBet;
