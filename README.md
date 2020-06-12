<div align="center">
  <br/>
  <img src="./nitrogen.png" width="200" />
  <br/>
  <br/>
  <p>
    Open Source CLI Ethereum Smart Contract event listener and exporter. 
  </p>
  <p>
    version 1.0.2
  </p>
  <br/>
  <p>
    <a href="#status"><strong>Status</strong></a> ·
    <a href="#description"><strong>Description</strong></a> ·
    <a href="#install"><strong>Install</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a> ·
    <a href="#contributing"><strong>Contributing</strong></a>
  </p>
</div>

---

## Status

**Nitrogen** is currently in **beta** version.

---

## Description

**Nitrogen** is an Open Source CLI Ethereum Smart Contract event listener and exporter made with NodeJS.

Basically it just listens on events (from the past - if you want - and future) and exports them into an `export.json` file containing an array of events.

In the next future releases we want to add the following features:
- [ ] Allow users to save the configuration 
- [ ] Multiple Smart Contracts listening
- [ ] Customizable filename export
- [ ] Customizable export format (i.e. .xlsx, .csv)

---

## Install

In order to install Nitrogen you need to run the following command:

```bash
npm install -g @cidaro/nitrogen
```

---

## Usage

Nitrogen is really easy to use: just run the `nitrogen` command in the terminal and respond to the questions!

### Event

The Ethereum Smart Contract Event json is structured as follows: 

```json
{
  "address":"0x11FA7f0C8B90bA7137cDaE6261e82e0cAbDE9632", // Contract address
  "blockHash":"0x4242bfb4ce768298185089fa21400e7161772c1d7782b96e1d8da53a37462816", // Block hash
  "blockNumber":6443009, // Block number
  "logIndex":1, // Index of the log - this is the first one
  "removed":false, // Whether has been removed or not
  "transactionHash":"0x50265d2269ee726a058930fdc4816c2c25dce607c0865eb2e694a3d09f97c1db", // Transaction hash
  "transactionIndex":1, // Index of the transaction
  "id":"log_b8bfab2d", // Log id
  "returnValues":{ // Contains both the indexed and non-indexed params of the event
    "0":"0x0000000000000000000000000000000000000000",
    "1":"0xdfc13B88477329A154Bd9624AFa2a45274dC16E3",
    "2":"1",
    "from":"0x0000000000000000000000000000000000000000",
    "to":"0xdfc13B88477329A154Bd9624AFa2a45274dC16E3",
    "tokenId":"1"
  },
  "event":"Transfer", // Event name
  "signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", // Signature
  "raw":{ // Raw data
    "data":"0x",
    "topics": [
      "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      "0x000000000000000000000000dfc13b88477329a154bd9624afa2a45274dc16e3",
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ]
  }
}
```

---

## Contributing

We welcome community contributions!

Please check out our <a href="https://github.com/CIDARO/nitrogen/issues">open issues</a> to get started.

If you discover something that could potentially impact security, please notify us immediately by sending an e-mail at <a href="mailto:support@cidaro.com">support@cidaro.com</a>. We'll get in touch with you as fast as we can!
