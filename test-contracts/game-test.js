const wvs = 10 ** 8;
require('dotenv').config();

describe('GAME test suite', async function () {

    this.timeout(500000);
    let dappTx;
    let freezeScript;
    let companyScript;
    let companyTx;

    let seedDev2 = "weather conduct sentence below fix love crucial rabbit setup hair seed ridge mammal crush nest";
    let assetId;
    // let preSellScript;
    const countTokens = "100000000000";
 /*    const countFreeze4Years = "19100882400000000"; // Math.floor(countTokens * 17/100)/wvs;
    const countFreeze5Years = "19100882400000000"; // Math.floor(countTokens * 17/100)/wvs;
    const countFreeze6Years = "19100882400000000"; // Math.floor(countTokens * 17/100)/wvs;
    const countCompany = Number(countTokens) - Number(countFreeze4Years) - Number(countFreeze5Years) - Number(countFreeze6Years);
    const endTimePresell = new Date(process.env.END_TIME_PRESELL).getTime();
    const timeIssue = new Date(process.env.TIME_ISSUE);
    const dayInMs = 86400000;
    const unfreeze4Date = timeIssue.setFullYear(timeIssue.getFullYear() + 3) + dayInMs;
    const unfreeze5Date = timeIssue.setFullYear(timeIssue.getFullYear() + 1) + dayInMs;
    const unfreeze6Date = timeIssue.setFullYear(timeIssue.getFullYear() + 1) + dayInMs;
    console.log('unfreeze4Date :', unfreeze4Date, unfreeze5Date, unfreeze6Date); */
    
    const accounts = {};
    before(async function () {
      /*   await setupAccounts(
            {
                company: 20 * wvs,
                investor1: 10.5 * wvs,
                investor2: 10.05 * wvs
            }
            ); */
        console.log('address(account.company) :', address(seedDev2));
        companyScript = file('game.ride');
        const compiledCompany = compile(companyScript);
        companyTx = setScript({ script: compiledCompany, fee: 1400000 }, seedDev2);
        await broadcast(companyTx);
        await waitForTx(companyTx.id)
        console.log('Script has been set')
    });

    it('can success issue tokens', async function () {
        // const ozoAddress = address(accounts.company)
       /*  const scriptToken = file('tokenOzotop.ride')
            .replace(`base58'3MvHSFKcaY71wp62waNAqj2NPikV8fK5nh1'`, `base58'${ozoAddress}'`)
            let compiledScript = compile(scriptToken); */
            const issueParam = {
            name: 'GMTK', // process.env.NAME_TOKEN, // + Math.random().toString(36).substring(2, 8).toUpperCase(), // process.env.NAME_TOKEN,
            description: `Game token free exchange on DEX and free transfer it someone`,
            quantity: countTokens,
            decimals: 0,
            reissuable: true,
            fee: 1.005 * wvs 
        }
        const txIssue = issue(issueParam, seedDev2);
        await broadcast(txIssue);
        assetId = txIssue.id; 
        await waitForTx(txIssue.id);        
    })
  
    it('truly balance of the tokens', async function () {
        await assetBalance(assetId, address(seedDev2))
        .then((assetBal) => {
            expect(assetBal).to.equal(Number(countTokens));
        });
    });
    it('start the game', async function () {
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.09 * wvs,
            call: {
                function: "startRound", 
                args: []
            }, 
            payment:[]
        }, seedDev2);

        await broadcast(iTxSet);
        await waitForTx(iTxSet.id);
        console.dir(iTxSet);
        // expect(iTxSet.call.args[0].value).to.equal(5);
    })
  /*   it('can set tokenId as owner of contract', async function () {
        const iTxSet = invokeScript({
            dApp: address(accounts.company),
            fee: 0.09 * wvs,
            call: {
                function: "setTokenId",
                args: [{ type: 'string', value: 0 }],
                payment: null
            },
        }, accounts.company);

        await broadcast(iTxSet);
        await waitForTx(iTxSet.id);
        console.dir(iTxSet.call.args[0].value);
        expect(iTxSet.call.args[0].value).to.equal(0);
    })
    it('should be rejected when non owner try set endPresellDate ', async function () {
        const iTxSet = invokeScript({
            dApp: address(accounts.company),
            fee: 0.01 * wvs,
            call: {
                function: "setEndPresellTime",
                args: [{ type: 'integer', value: 5 }],
                payment: null
            },
        }, accounts.account17_4);

        expect(broadcast(iTxSet)).rejectedWith();
    }) */
    

  
 
})      