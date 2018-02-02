pragma solidity ^0.4.18;

contract Betscoin {
  struct Event{
    string description;
    mapping(uint => string) teams;
    uint teamsCount;
    bool complete;
    uint prizePool;
    int winnerId;
    bool start;
    mapping(address => Bet) players;
  }

  struct Bet {
    uint amount;
    int teamId;
    bool paid;
  }

  address public owner;
  Event[] public  events;
  uint public eventsCount;


  function Betscoin() public {
    owner = msg.sender;
  }

  modifier restricted() {
    require(msg.sender == owner);
    _;
  }

  function placeBet(uint eventId, int teamId) public payable {
    Event storage eventInfo = events[eventId];
    require(eventInfo.start);
    Bet memory newBet = Bet({
        amount: msg.value,
        teamId: teamId,
        paid: false
    });
    eventInfo.players[msg.sender] = newBet;
    eventInfo.prizePool += msg.value;
  }

  function checkWinner(uint eventId) public {
    Event storage eventInfo = events[eventId];
    require(eventInfo.complete);
    Bet storage betInfo = eventInfo.players[msg.sender];
    require(!betInfo.paid);
    if (eventInfo.winnerId == betInfo.teamId) {
      msg.sender.transfer(betInfo.amount);//just cap
      betInfo.paid = true;
    }
  }

  function startEvent(uint eventId) public {
    Event storage eventInfo = events[eventId];
    eventInfo.start = true;
  }

  function completeEvent(uint eventId, int teamId) public restricted {
    Event storage eventInfo = events[eventId];
    eventInfo.complete = true;
    eventInfo.winnerId = teamId;
  }

  function addTeam(uint eventId, string team) public restricted {
    Event storage eventInfo = events[eventId];
    eventInfo.teams[eventInfo.teamsCount] = team;
    eventInfo.teamsCount++;
  }

  function createEvent(string description) public restricted {
    Event memory newEvent = Event({
            description: description,
            complete: false,
            winnerId: -1,
            prizePool: 0,
            start: false,
            teamsCount: 0
          });
    events.push(newEvent);
    eventsCount++;
  }

  function getTeam(uint eventId, uint teamId) public view returns(string) {
    Event storage eventInfo = events[eventId];
    return eventInfo.teams[teamId];
  }
}
