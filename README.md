# NFT Data challenge

This technical challenge tests your understanding of ERC721/ERC1155 NFT standards, NodeJS, Database fundamentals and Docker.

These instructions do not specify every single detail you should take into consideration. This is done on purpose to test your ability to analyze a problem and come up with a reasonable and safe approach.Keep in mind that your code will determine addresses of NFT contracts, track ownership of an NFT and NFT token ID minted per NFT contract. Thoroughness is one of the most important qualities for this role.

**Goal** : Process transactions and filter them for Mint/Transfer event of the NFT.

### Requirements

Build a dockerized NodeJS application to process all transactions starting from block `14348850` to `14348860` of Ethereum blockchain.

The command `docker compose up` **MUST**
1. Read all transactions from each block and store all Mint/Transfer event details of NFT contracts only in the database of your choice. (Preferably timescale DB)
2. Retrieve all NFTs of `0x5930DB0F73b9bCF40F42d72DABbFdd16249EC5Be` (Tri3es) from the database and print on `stdout`.

### Submitting your results
Compress your source code as zip archive and email us a link where we can download it. Sharing via Dropbox or Google Drive has worked well in the past. Make sure the `Dockerfile` is on the top level.