const erc20Transfer = async () => {

    console.log("token addy :" , erc20Taddy1);
    console.log("reciever addy :" , recieverAddy);
    console.log("amt to be transfered :" , typeof amt);
    const amt = "100";
    
    const amount = ethers.utils.parseUnits(amt, 18);
    amount = amount.toString();
    console.log(typeof amount)

}

async function main() {
    const result = await erc20Transfer();
}
  
main();