const Web3 = require("web3");
const abiDecoder = require("abi-decoder");
const abi = require("./data");
const _ = require("lodash");
require("dotenv").config();
const { create, knexRaw } = require("./knex/index");

const ethNetwork = process.env.INFURA_ENDPOINT;
const startBlock = process.env.INPUT_PARAM_startBlock;
const endBlock = process.env.INPUT_PARAM_endBlock;
const contractAddress = process.env.INPUT_PARAM_contractAddress;
const web3 = new Web3(new Web3.providers.HttpProvider(ethNetwork));

abiDecoder.addABI(abi.erc721_1155TransferEvent);

async function checkBlocks(start, end) {
  const promises = [];
  _.forEach(_.range(parseInt(start), _.parseInt(end)), (i) => {
    promises.push(getTransaction(i));
  });
  await Promise.all(promises);
  return;
}

const getTransaction = async (i) => {
  const block = await web3.eth.getBlock(i);
  console.log(`[*] Searching block ${i}`);
  let promises = [];
  if (block && block.transactions) {
    _.forEach(block.transactions, (tx) => {
      promises.push(getReceipt(tx));
    });
  }
  const resolvedProises = await Promise.all(promises);
  promises = [];
  _.forEach(resolvedProises, (arrayObj) => {
    _.forEach(arrayObj, (obj) => {
      if (!_.isNull(obj) && !_.isEmpty(obj)) {
        promises.push(create(obj));
      }
    });
  });
  await Promise.all(promises);
};

const getReceipt = async (tx) => {
  const output = [];
  try {
    let txr = await web3.eth.getTransactionReceipt(tx);
    const decodedLogs = abiDecoder.decodeLogs(txr.logs);
    if (decodedLogs[0]) {
      blockNumber = txr.blockNumber;
      txHash = txr.transactionHash;
      _.forEach(decodedLogs, (log) => {
        const toSend = {
          blockNumber: blockNumber,
          txHash: txHash,
          tokenAddress: log.address,
          standard: "",
          type: "",
          operator: "",
          tokenId: "",
          from: "",
          to: "",
          value: "",
        };
        if (log.name === "Transfer") {
          type = log.name;
          if (log.events[0].value == 0) {
            type += "(Mint)";
          }
          toSend.standard = "ERC721";
          toSend.type = type;
          toSend.tokenId = log.events[2].value;
          toSend.from = log.events[0].value;
          toSend.to = log.events[1].value;
        } else if (log.name === "TransferSingle") {
          type = log.name;
          if (log.events[1].value == 0) {
            type += "(Mint)";
          }
          toSend.standard = "ERC1155";
          toSend.type = type;
          toSend.operator = log.events[0].value;
          toSend.tokenId = log.events[3].value;
          toSend.from = log.events[1].value;
          toSend.to = log.events[2].value;
          toSend.value = log.events[4].value;
        } else if (log.name === "TransferBatch") {
          type = log.name;
          if (log.events[1].value == 0) {
            type += "(Mint)";
          }
          console.log("1155 TransferBatch");
          type = log.name;
          if (log.events[1].value == 0) {
            type += "(Mint)";
          }
          toSend.standard = "ERC1155";
          toSend.type = type;
          toSend.operator = log.events[0].value;
          toSend.tokenId = log.events[3].value.toString();
          toSend.from = log.events[1].value;
          toSend.to = log.events[2].value;
          toSend.value = log.events[4].value.toString();
        }
        output.push(toSend);
      });
    }
    return output;
  } catch (error) {
    return output;
  }
};

async function doStuff() {
  await checkBlocks(startBlock, endBlock);
  console.log(
    "[*] Stored all Mint/Transfer event details of ERC721/ERC1155 NFT standards contracts on Ethereum Mainnet in blocks [" + startBlock +", "+ endBlock+")");
  let dbData = await knexRaw(
    `select distinct tokenId from test.StoreTransaction where tokenAddress = ?`,
    [contractAddress]
  );
  console.log("[*] Fetched all NFTs of " + contractAddress +" within blocks [" + startBlock +", "+ endBlock+") from DB :" );
  dbData = _.map(dbData, (data) => {
    console.log(contractAddress+"/"+data.tokenId);
  })
  return;
}

module.exports = {
  doStuff,
};
