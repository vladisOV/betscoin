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
  Event[] events;
  mapping(string => Event) eventDescriptions;


  function Betscoin() public {
    owner = msg.sender;
  }

  modifier restricted() {
    require(msg.sender == owner);
    _;
  }

  function getEventsCount() public view returns (uint) {
    return events.length;
  }

  function placeBet() {

  }

  function checkWinner() {

  }

  function setWinner() {

  }

  function  completeEvent() {

  }

  function createEvent(string description, string[] teams) public restricted {
    Event memory newEvent = Event({
            description: description,
            teams: teams,
            complete: false,
            winnerId: -1,
            prizePool: 0
          });
    events.push(newEvent);
  }
}
