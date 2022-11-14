const {ethers} = require('hardhat');
const {expect} = require('chai');

describe('[Challenge] Rolls Royce', function() {
  let deployer, attacker;

  const GAME_INITIAL_BALANCE = ethers.utils.parseEther('5');
  const ATTACKER_ETH = ethers.utils.parseEther('100');

  before(async function() {
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    await ethers.provider.send("hardhat_setBalance", [
      attacker.address, "0x56bc75e2d63100000" // 100 eth
    ]);

    expect(await ethers.provider.getBalance(attacker.address))
        .to.equal(ATTACKER_ETH);

    this.game = await (await ethers.getContractFactory(
                           'RollsRoyce',
                           deployer,
                           ))
                    .deploy({value : GAME_INITIAL_BALANCE});

    expect(await ethers.provider.getBalance(this.game.address))
        .to.equal(GAME_INITIAL_BALANCE);

    expect(await this.game.isSolved()).to.be.false;
  });

  it('Exploit', async function() {
    /** CODE YOUR EXPLOIT HERE */
    this.exploit = await (await ethers.getContractFactory(
      'HackRollsRoyce',
      deployer,
      ))
    .deploy(this.game.address);

    await this.exploit.connect(attacker).get3win({value: ethers.utils.parseEther('3')});

  });

  after(async function() {
    /** SUCCESS CONDITIONS */

    expect(await this.game.isSolved()).to.be.true;
  });
});
