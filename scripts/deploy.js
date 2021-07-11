async function main() {
  const TwitterPump = await ethers.getContractFactory("TwitterPump");
  const twitterpump = await TwitterPump.deploy();

  console.log("TwitterPump deployed to:", twitterpump.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });