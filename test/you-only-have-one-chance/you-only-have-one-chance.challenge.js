const {ethers} = require('hardhat');
const {expect} = require('chai');

describe('[Challenge] You Only Have One Chance', function() {
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

    this.safe = await (await ethers.getContractFactory(
                           'YouOnlyHaveOneChance',
                           deployer,
                           ))
                    .deploy();

    expect(await this.safe.isSolved()).to.be.false;
  });

  it('Exploit', async function() {
    /** CODE YOUR EXPLOIT HERE */
    await (await ethers.getContractFactory(
      'HackYouOnlyHaveOneChance',
      attacker,
      ))
    .deploy(this.safe.address);
    
  });

  after(async function() {
    /** SUCCESS CONDITIONS */

    expect(await this.safe.isSolved()).to.be.true;
  });
});
