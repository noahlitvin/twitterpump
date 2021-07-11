const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FundsManager contract", function() {
  it("FundsManager should be able to accept LINK", async function() {
    const FundsManager = await ethers.getContractFactory("FundsManager");
    const hardhatToken = await FundsManager.deploy();
    /* TODO */
  });
});

