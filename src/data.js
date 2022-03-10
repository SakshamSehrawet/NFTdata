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