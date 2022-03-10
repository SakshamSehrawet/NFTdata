const Web3 = require("web3");
const abiDecoder = require('abi-decoder');
require('dotenv').config();
const ethNetwork = process.env.INFURA_ENDPOINT;

const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

const erc721_1155TransferEvent = [
    {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "from",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": true,
              "name": "tokenid",
              "type": "uint256"
          }
      ],
      "name": "Transfer",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "operator",
              "type": "address"
          },
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "tokenid",
              "type": "uint256"
          },
          {
            "indexed": false,
            "name": "value",
            "type": "uint256"
          }
      ],
      "name": "TransferSingle",
      "type": "event"
  },
  {
      "anonymous": false,
      "inputs": [
          {
              "indexed": true,
              "name": "operator",
              "type": "address"
          },
          {
            "indexed": true,
            "name": "from",
            "type": "address"
          },
          {
              "indexed": true,
              "name": "to",
              "type": "address"
          },
          {
              "indexed": false,
              "name": "tokenids",
              "type": "uint256[]"
          },
          {
            "indexed": false,
            "name": "values",
            "type": "uint256[]"
          }
      ],
      "name": "TransferBatch",
      "type": "event"
  }
]

abiDecoder.addABI(erc721_1155TransferEvent)


async function checkBlocks(start, end) {
    for (let i = start; i < end; i++) {
        let block = await web3.eth.getBlock(i)
        //console.log(`[*] Searching block ${ i }`);
        if (block && block.transactions) {
            for (let tx of block.transactions) {
                try{
                    let txr = await web3.eth.getTransactionReceipt(tx);
                    const decodedLogs = abiDecoder.decodeLogs(txr.logs);
                    if (decodedLogs[0]){
                        blockNumber= txr.blockNumber;
                        txHash= txr.transactionHash;
                        for (let log of decodedLogs) {
                            let out = {
                                blockNumber: blockNumber,
                                txHash: txHash,
                                tokenAddress: log.address,
                                standard:'',
                                type: '',
                                operator: '',
                                tokenId: '',
                                from: '',
                                to: '',
                                value: ''
                            }
                            switch (log.name) {
                                case 'Transfer':
                                    //console.log('[*] 721 Transfer');
                                    type = log.name
                                    if (log.events[0].value == 0){
                                        type += '(Mint)'
                                    }
                                    out.standard = 'ERC721'
                                    out.type = type;
                                    out.tokenId = log.events[2].value;
                                    out.from = log.events[0].value;
                                    out.to = log.events[1].value;
                                    //console.log(out);
                                  break;
                                case 'TransferSingle':
                                    //console.log('[*] 1155 TransferSingle');
                                    type = log.name
                                    if (log.events[1].value == 0){
                                        type += '(Mint)'
                                    }
                                    out.standard = 'ERC1155'
                                    out.type = type;
                                    out.operator = log.events[0].value;
                                    out.tokenId = log.events[3].value;
                                    out.from = log.events[1].value;
                                    out.to = log.events[2].value;
                                    out.value = log.events[4].value;
                                    //console.log(out);
                                  break;
                                case 'TransferBatch':
                                    //console.log('[*] 1155 TransferBatch');
                                    type = log.name
                                    if (log.events[1].value == 0){
                                        type += '(Mint)'
                                    }
                                    console.log('1155 TransferBatch');
                                    type = log.name
                                    if (log.events[1].value == 0){
                                        type += '(Mint)'
                                    }
                                    out.standard = 'ERC1155'
                                    out.type = type;
                                    out.operator = log.events[0].value;
                                    out.tokenId = log.events[3].value.toString();
                                    out.from = log.events[1].value;
                                    out.to = log.events[2].value;
                                    out.value = log.events[4].value.toString();
                                    //console.log(out);
                              }
                            console.log(out);
                        }
                    }
                    //console.log(decodedLogs);
                } catch(error){}
            }
        }
    }  
}
checkBlocks(14348850,14348861)

/*
sample out

{
    blockNumber: 14359564,
    txHash: '0x422dd4d3f456c0e8b2f7cc38cd31d0397acae3588746ec694789f79cd22c557f',
    tokenAddress: '0xD386fF8b13e20a943EE0929da4228A32cE4f5261',
    standard: 'ERC1155',
    type: 'TransferBatch(Mint)',
    operator: '0x7c2d3059011fdcf42fbe70dddd0c86e326085da5',
    tokenId: '0,1,2,3,4,5,6',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x7c2d3059011fdcf42fbe70dddd0c86e326085da5',
    value: '3,3,3,3,5,3,3'
  }

*/
