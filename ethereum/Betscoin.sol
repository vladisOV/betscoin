pragma solidity ^0.4.17;

contract Betscoin {
  struct Event{
    string description;
    string[] teams;
    bool complete;
    uint prizePool;
    int winnerId;
    mapping(address => Bet) players;
  }

  struct Bet {
    uint amount;
    uint teamId;
  }

  address public owner;
  mapping(string => Event) events;
  string[] eventDescriptions;


  function Betscoin() public {
    owner = msg.sender;
  }

  modifier restricted() {
    require(msg.sender == owner);
    _;
  }

  function placeBet(string description, uint teamId) public payable {
    Event storage eventInfo = events[description];
    Bet memory newBet = Bet({
        amount: msg.value,
        teamId: teamId
    });
    eventInfo.players[msg.sender] = newBet;
    eventInfo.prizePool += msg.value;
  }

  function checkWinner(string description) {
    Event storage eventInfo = events[description];
    /* eventInfo.players[msg.sender] = */
    //how to get bets ?
  }

  function completeEvent(string description, int teamId) public restricted {
    Event storage eventInfo = events[description];
    eventInfo.complete = true;
    eventInfo.winnerId = teamId;
  }

  function createEvent(string description, string[] teams) public restricted {
    Event memory newEvent = Event({
            description: description,
            teams: teams,
            complete: false,
            winnerId: -1,
            prizePool: 0
          });
    events[description] = newEvent;
    eventDescriptions.push(description);
  }
}
