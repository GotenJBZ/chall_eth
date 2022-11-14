# chall_eth

Aggregation of challs based on ethereum from different CTFs.

## How to play

1. Clone the repository
2. Install dependencies with `yarn install`
3. Code your solutions in the provided `*.challenge.js` files (inside each challenge's folder in the test folder)
4. Run your exploit for a challenge with `yarn run challenge-name`. If the challenge is executed successfully, you've passed!

## Tips and tricks

1. In all challenges you must use the account called attacker. In Ethers, that should translate to using `.connect(attacker)`.
2. To code the solutions, you may need to refer to [Ethers](https://docs.ethers.io/v5/single-page/) and [Hardhat](https://hardhat.org/getting-started) docs.
3. In some cases, you may need to code and deploy custom smart contracts (you should put them in `contracts/attacker-contracts`).

## Challs

### [SEETF 2022](https://ctftime.org/event/1543)

1. Bonjour [:heavy_check_mark]
2. You Only Have One Chance [:heavy_check_mark]
3. Duper Super Safe Safe [:heavy_check_mark]
4. Rolls Royce [:heavy_check_mark]
