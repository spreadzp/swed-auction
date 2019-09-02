const wvs = 10 ** 8;
require('dotenv').config();

describe('GAME test suite', async function () {

    this.timeout(600000);
    let dappTx;
    let freezeScript;
    let companyScript;
    let companyTx;
    let seedInv1 = "create genesis wallet devnet-0";
    let seedDev2 = "tooth great gown say drill repair fluid unveil mosquito column design pyramid dust wreck safe";
    let seedGamer1 = "yard antique adult age neglect distance patch reopen pulp scrub clean muffin helmet robot trap";
    let seedGamer2 = "weather conduct sentence below fix love crucial rabbit setup hair seed ridge mammal crush nest";
    let seedGamer3 = "tooth great gown say drill repair fluid unveil mosquito column design pyramid dust wreck safe";
    let assetId;
    let paymentAmount = 1 * wvs;
    // let preSellScript;
    const countTokens = "100000000000";
 
    
    const accounts = {};
    before(async function () {
      /* await setupAccounts(
            {
                company: 5 * wvs,
                investor1: 5.5 * wvs,
                investor2: 5.05 * wvs,
                investor3: 5.05 * wvs
            }
            );
        seedDev2 = await accounts.company;
        seedGamer1 = await accounts.investor1;
        seedGamer2 = await accounts.investor2;
        seedGamer3 = await accounts.investor3;


        console.log('seedDev2 :', seedDev2);
        console.log('seedGamer3 :', seedGamer3);
        console.log('seedGamer2 :', seedGamer2);
        console.log('seedGamer1 :', seedGamer1);  */
      /*   const sendTokens =  await transfer({recipient: "3Fi9ZECmkJMBZwjVeeoPCxx8yVBU7yC4Uuk",
                amount: 1000 * wvs, fee: 0.05 * wvs}, "claw spin suffer trick notable cool spirit glance chaos bachelor pen stereo cube nominee section");
       await broadcast(sendTokens);
        await waitForTx(sendTokens.id)   */
        console.log('address(account.company) :', address(seedDev2));
        companyScript = file('game.ride'); 
        const compiledCompany = compile(companyScript);
        companyTx = setScript({ script: compiledCompany, fee: 1400000 }, seedDev2);
        await broadcast(companyTx);
        await waitForTx(companyTx.id)
        console.log('Script has been set')
    });

    it('1 can success issue tokens', async function () {
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
  
    it('2 truly balance of the tokens', async function () {
        await assetBalance(assetId, address(seedDev2))
        .then((assetBal) => {
            expect(assetBal).to.equal(Number(countTokens));
        });
    });
  /*  it('3 start the game', async function () {
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
        // console.dir(iTxSet);

        const state = await stateChanges(iTxSet.id)
        // console.dir(state);
        // console.log('data[0] :', data[0]); 
    }) 

    it('4 Should be the game started', async function () {
        const startState = await accountDataByKey("startGame", address(seedDev2));
        expect(startState.value).to.equal(true);
    })
   
    it('5 make Bet More', async function () {
        const numberRoundState = await accountDataByKey("numberRound", address(seedDev2));
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.04 * wvs,
            call: {
                function: "makeBetMore", 
                args: []
            }, 
            payment:[{amount: paymentAmount}]
        }, seedGamer2);

        await broadcast(iTxSet);
        await waitForTx(iTxSet.id);
        const key = numberRoundState.value + "_more_" + address(seedGamer2);
        console.log('key :', key);
        const state = await stateChanges(iTxSet.id);
        console.log('stateChanges[0]makeBetMore :', state.data[0].key);
        const checkState = await accountDataByKey(key, address(seedDev2));

        console.log('$$$ @@@@ !!!checkState :', checkState);
        expect(state.data[0].key).to.equal(key);
        const stateMoreBet = await accountDataByKey(key, address(seedDev2))
        expect(stateMoreBet.value).to.equal(paymentAmount);
        
    })
    it('6 Should rejected forwardRound if have not opposite bet when', async function () {
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.09 * wvs,
            call: {
                function: "forwardRound", 
                args: []
            }, 
            payment:[]
        }, seedDev2); 
        expect(broadcast(iTxSet)).rejectedWith(); 
    })

    it('7 make Bet Less', async function () {
        const numberRoundState = await accountDataByKey("numberRound", address(seedDev2));
        console.log('###########numberRoundState :', numberRoundState);
       
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.09 * wvs,
            call: {
                function: "makeBetLess", 
                args: []
            }, 
            payment:[{amount: paymentAmount}]
        }, seedGamer1);

        await broadcast(iTxSet);
        await waitForTx(iTxSet.id);
        // console.dir(iTxSet);
        const key = numberRoundState.value + "_less_" + address(seedGamer1);
        console.log('key :', key);
        const state = await stateChanges(iTxSet.id);
        console.log('statemakeBetLess :', state.data[0].key);
        
        expect(state.data[0].key).to.equal(key);
        const stateLessBet = await accountDataByKey(key, address(seedDev2))
        expect(stateLessBet.value).to.equal(paymentAmount);
    })

    it('8 should rejected when payment less than round bet ', async function () {
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.09 * wvs,
            call: {
                function: "makeBetLess", 
                args: []
            }, 
            payment:[{amount: paymentAmount/2}]
        }, seedGamer1);

        expect(broadcast(iTxSet)).rejectedWith(); 
        
    })

    it('9 Should rejected restart when the game not finish', async function () {
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.09 * wvs,
            call: {
                function: "startRound", 
                args: []
            }, 
            payment:[]
        }, seedDev2); 
        expect(broadcast(iTxSet)).rejectedWith(); 
    }) */
    /* it('10 Should rejected restart when try call from not owner', async function () {
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.09 * wvs,
            call: {
                function: "startRound", 
                args: []
            }, 
            payment:[]
        }, seedGamer1); 
        expect(broadcast(iTxSet)).rejectedWith(); 
    }) */

    /* it('11 Should rejected forwardRound when try to call from not owner address', async function () {
        const iTxSet = invokeScript({
            dApp: address(seedDev2),
            fee: 0.09 * wvs,
            call: {
                function: "forwardRound", 
                args: []
            }, 
            payment:[]
        }, seedGamer1); 
        expect(broadcast(iTxSet)).rejectedWith(); 
    }) */
 /*    it('12 Should be count gamers up more 0', async function () {
        const numberRoundState = await accountDataByKey("numberRound", address(seedDev2));
        const countGamersState = await accountDataByKey(numberRoundState.value + "_countGamersUp", address(seedDev2));
        expect(countGamersState.value).to.be.at.least(0);
    })

    it('13 Should be count gamers down more 0', async function () {
        const numberRoundState = await accountDataByKey("numberRound", address(seedDev2));
        const countGamersState = await accountDataByKey(numberRoundState.value + "_countGamersDown", address(seedDev2));
        expect(countGamersState.value).to.be.at.least(0);
    }) */
     
})      