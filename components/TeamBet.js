import React, { Component } from "react";
import { Button, Grid, Input } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import betscoin from "../ethereum/betscoin";

class TeamBet extends Component {
  state = {
    showBetInput: false,
    bet: "",
    errorMessage: ""
  };

  showBetInput = () => {
    this.setState({ showBetInput: !this.state.showBetInput });
  };

  placeBet = async () => {
    const { team, eventId } = this.props;
    const { bet } = this.state;
    const accounts = await web3.eth.getAccounts();
    const betWei = web3.utils.toWei(bet, "ether");
    console.log(this.props);
    console.log(this.props.eventId);
    console.log(betWei);
    await betscoin.methods
      .placeBet(eventId, team.id)
      .send({ from: accounts[0], value: betWei });
  };

  render() {
    const { team } = this.props;
    return (
      <Grid.Column>
        <Button onClick={this.showBetInput}>{team.name}</Button>
        {this.state.showBetInput && (
          <div>
            <Input
              value={this.state.bet}
              onChange={event => this.setState({ bet: event.target.value })}
            />
            <Button onClick={this.placeBet}>Place Bet!</Button>
          </div>
        )}
      </Grid.Column>
    );
  }
}

export default TeamBet;
