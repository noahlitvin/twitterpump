const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FundsManager contract", function() {
  it("FundsManager should be able to accept LINK and issue TPT", async function() {
    const FundsManager = await ethers.getContractFactory("FundsManager");
    const hardhatToken = await FundsManager.deploy();

    //hardhatToken.onTokenTransfer()
  });
});

