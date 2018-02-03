const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledBetscoin = require("../ethereum/build/Betscoin.json");

let accounts;
let betscoin;
let gas = "1000000";
let owner;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  betscoin = await new web3.eth.Contract(JSON.parse(compiledBetscoin.interface))
    .deploy({ data: compiledBetscoin.bytecode })
    .send({ from: accounts[0], gas: "1000000" });
  betscoin.setProvider(provider);
  owner = accounts[0];
});

describe("Betscoin contract", () => {
  it("deploys a contract", () => {
    assert.ok(betscoin.options.address);
  });
  it("create event", async () => {
    await betscoin.methods.createEvent("Event").send({
      from: accounts[0],
      gas: gas
    });
    const eventsCount = await betscoin.methods.getEventsCount().call();
    const event = await betscoin.methods.events(0).call();
    assert(event.description);
    assert.equal(1, eventsCount);
  });
  it("add teams", async () => {
    await betscoin.methods.createEvent("Event").send({
      from: owner,
      gas: gas
    });
    await betscoin.methods.addTeam(0, "team1").send({
      from: owner,
      gas: gas
    });
    await betscoin.methods.addTeam(0, "team2").send({
      from: owner,
      gas: gas
    });
    const event = await betscoin.methods.events(0).call();
    const team1 = await betscoin.methods.getTeam(0, 0).call();
    const team2 = await betscoin.methods.getTeam(0, 1).call();
    assert.equal(2, event.teamsCount);
    assert.equal("team1", team1[1]);
    assert.equal("team2", team2[1]);
  });
  it("place bets & complete event & getWinnerMoney", async () => {
    await betscoin.methods.createEvent("Event").send({
      from: owner,
      gas: gas
    });
    await betscoin.methods.addTeam(0, "team1").send({
      from: owner,
      gas: gas
    });
    await betscoin.methods.addTeam(0, "team2").send({
      from: owner,
      gas: gas
    });
    await betscoin.methods.startEvent(0).send({
      from: owner,
      gas: gas
    });
    await betscoin.methods.placeBet(0, 0).send({
      from: owner,
      gas: gas,
      value: web3.utils.toWei("2", "ether")
    });
    await betscoin.methods.placeBet(0, 1).send({
      from: accounts[1],
      gas: gas,
      value: web3.utils.toWei("4", "ether")
    });
    await betscoin.methods.completeEvent(0, 0).send({
      from: owner,
      gas: gas
    });
    const beforeWinBalance = await web3.eth.getBalance(owner);
    await betscoin.methods.checkWinner(0).send({
      from: owner,
      gas: gas
    });
    const afterWinBalance = await web3.eth.getBalance(owner);
    const event = await betscoin.methods.events(0).call();
    assert(parseFloat(afterWinBalance) > parseFloat(beforeWinBalance));
    assert(event.complete);
  });
  it("deposit & withdraw money", async () => {
    await betscoin.methods.deposit().send({
      from: owner,
      value: "1000"
    });
    var contractBalance = await web3.eth.getBalance(betscoin.options.address);
    assert.equal(1000, contractBalance);
    await betscoin.methods.withdraw(950).send({
      from: owner
    });
    contractBalance = await web3.eth.getBalance(betscoin.options.address);
    assert.equal(50, contractBalance);
  });
  it("check only owner can withdraw", async () => {
    try {
      await betscoin.methods.withdraw().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it("deposit & withdraw money", async () => {
    await betscoin.methods.deposit().send({
      from: owner,
      value: 100
    });
    var contractBalance = await web3.eth.getBalance(betscoin.options.address);
    assert.equal(100, contractBalance);
    await betscoin.methods.withdraw(95).send({
      from: owner
    });
    contractBalance = await web3.eth.getBalance(betscoin.options.address);
    assert.equal(5, contractBalance);
  });
});
