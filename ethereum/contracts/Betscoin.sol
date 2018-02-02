pragma solidity ^0.4.18;

contract Betscoin {
  struct Event{
    string description;
    bool complete;
    uint prizePool;
    int winnerId;
    bool start;
    int teamsCount;
    uint playersCount;
    mapping(int => Team) teams;
    mapping(address => Bet) players;
  }

  struct Bet {
    uint amount;
    int teamId;
    bool paid;
  }

  struct Team {
    string name;
    uint bettersCount;
    uint moneyBet;
  }

  address public owner;
  Event[] public  events;

  function Betscoin() public {
    owner = msg.sender;
  }

  modifier restricted() {
    require(msg.sender == owner);
    _;
  }

  function deposit() public payable {}

  function withdraw(uint amount) public restricted {
    require(amount < this.balance);
    owner.transfer(amount);
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
    eventInfo.playersCount++;
    eventInfo.prizePool += msg.value;
    eventInfo.teams[teamId].bettersCount++;
    eventInfo.teams[teamId].moneyBet += msg.value;
  }

  function checkWinner(uint eventId) public {
    Event storage eventInfo = events[eventId];
    require(eventInfo.complete);
    Bet storage betInfo = eventInfo.players[msg.sender];
    require(!betInfo.paid);
    if (eventInfo.winnerId == betInfo.teamId) {
      msg.sender.transfer(eventInfo.prizePool / eventInfo.teams[betInfo.teamId].moneyBet * betInfo.amount);
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
    eventInfo.teams[eventInfo.teamsCount] = Team({
      name: team,
      moneyBet: 0,
      bettersCount: 0
    });
    eventInfo.teamsCount++;
  }

  function createEvent(string description) public restricted {
    Event memory newEvent = Event({
            description: description,
            complete: false,
            winnerId: -1,
            prizePool: 0,
            start: false,
            teamsCount: 0,
            playersCount: 0
          });
    events.push(newEvent);
  }

  function getTeam(uint eventId, int teamId) public view returns(uint, string, uint) {
    Event storage eventInfo = events[eventId];
    Team storage team = eventInfo.teams[teamId];
    return ( team.moneyBet, team.name, team.bettersCount);
  }

  function getEventsCount() public view returns(uint) {
    return events.length;
  }
}
