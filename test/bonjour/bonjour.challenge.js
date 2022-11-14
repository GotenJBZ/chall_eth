const {ethers} = require('hardhat');
const {expect} = require('chai');

describe('[Challenge] Bonjour', function() {
  let deployer, attacker;

  const ATTACKER_ETH = ethers.utils.parseEther('100');

  before(async function() {
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    await ethers.provider.send("hardhat_setBalance", [
      attacker.address, "0x56bc75e2d63100000" // 100 eth
    ]);

    expect(await ethers.provider.getBalance(attacker.address))
        .to.equal(ATTACKER_ETH);

    this.bonjour =
        await (await ethers.getContractFactory('Bonjour', deployer)).deploy();

    expect(await this.bonjour.isSolved()).to.be.false;
  });

  it('Exploit', async function() {
    /** CODE YOUR EXPLOIT HERE */
    await this.bonjour.setWelcomeMessage("Welcome to SEETF");
  });

  after(async function() {
    /** SUCCESS CONDITIONS */

    expect(await this.bonjour.isSolved()).to.be.true;
  });
});
