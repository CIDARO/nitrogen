#!/usr/bin/env node

/**
 * Nitrogen - CLI Smart Contract Event listener and exporter.
 * Made by Paolo Rollo, @CIDARO
 * ©2020 MIT License
 */
const CLI = require('clui');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const inquirer = require('./lib/inquirer');
const Spinner = CLI.Spinner;
const Web3 = require('web3');

const run = async () => {
    // Log the figlet logo
    console.log(
        chalk.green(
            figlet.textSync('Nitrogen', { horizontalLayout: 'full' })
        )
    );
    // Clear the terminal
    clear();
    // Get whether Infura must be used, if past events must be logged
    // and if the export is enabled
    const defaultsResult = await inquirer.askDefaults();
    const { infura, pastEvents, exportEnabled } = defaultsResult;
    // Create the starting data object
    const data = {
        infura, // Checks if Infura must be used
        pastEvents, // Checks if past events must be logged and exported
        connectionString: '', // Web3 connection string
        smartContractAddress: '', // Smart Contract Address
        smartContractABI: null, // Smart Contract ABI .json file
        exportEnabled, // Checks if the export is enabled
        exportFilename: './export.json' // Default export filename is this
    };
    // If export is enabled, create the empty export.json file
    if (data.exportEnabled) {
        files.createEmptyFile(data.exportFilename);
    }
    // If Infura is enabled we must ask for Infura connection data
    if (data.infura) {
        // Retrieve Infura network and project key
        const infuraDataResult = await inquirer.askInfuraConnectData();
        const { infuraNetwork, infuraProjectKey } = infuraDataResult;
        // Build the connection string
        data.connectionString = `wss://${infuraNetwork.toLowerCase()}.infura.io/ws/v3/${infuraProjectKey}`;
    // Else we must use a non-Infura node
    } else {
        // Retrieve the Ethereum node URL 
        const ethereumNodeResult = await inquirer.askEthereumHostData();
        const { ethereumHost } = ethereumNodeResult;
        // And use it as the connection string
        data.connectionString = ethereumHost;
    }
    // Retrieve the Smart Contract info (address + ABI filepath)
    const smartContractResult = await inquirer.askSmartContractData();
    const { smartContractAddress, smartContractABI } = smartContractResult;
    data.smartContractAddress = smartContractAddress;
    data.smartContractABI = require(smartContractABI);
    // Create the web3 connection using the previously created connection string
    const web3 = new Web3(data.connectionString);
    // Get the Contract object
    const contract = new web3.eth.Contract(data.smartContractABI, data.smartContractAddress);
    // If past events are enabled, retrieve them
    if (data.pastEvents) {   
        // Create and start the spinner
        const pastSpinner = new Spinner('>> Recovering past events..');
        pastSpinner.start();
        contract
            .getPastEvents(
                "allEvents", 
                {fromBlock: 0, toBlock: 'latest'}, // TODO allow filters customization 
                (error, events) => {
                    events.forEach((event) => {
                        // If export is enabled append the past event to the export file
                        if (data.exportEnabled) {
                            files.appendToFile(data.exportFilename, event);
                        }
                        // Log it to the console
                        console.log(
                            `${chalk.blue(`=== ${event.event} [${event.id}] ===`)}
${chalk.green('Block hash')}: ${event.blockHash}
${chalk.green('Transaction hash')}: ${event.transactionHash}
${chalk.green('Signature')}: ${event.signature}
${chalk.green('Return values')}: ${JSON.stringify(event.returnValues)}`
                        )
                    });
                    // Stop the spinner
                    pastSpinner.stop();
                }
            );
    }
    // Create and start the spinner for the new events
    const status = new Spinner('>> Listening on new events..');
    status.start();
    contract
        .events
        .allEvents(
            {fromBlock: 'latest'} // TODO allow filter customization
        )
        .on('data', (event) => {
            // If export is enabled append the new event to the export file
            if (data.exportEnabled) {
                files.appendToFile(data.exportFilename, event);
            }
            // Log it to the console
            console.log(
                `
${chalk.blue(`=== ${event.event} [${event.id}] ===`)}
${chalk.green('Block hash')}: ${event.blockHash}
${chalk.green('Transaction hash')}: ${event.transactionHash}
${chalk.green('Signature')}: ${event.signature}
${chalk.green('Return values')}: ${JSON.stringify(event.returnValues)}`
            )
        })
        .on('error', (error) => {
            // On error exit
            console.log(
                `${chalk.red(`Error encountered: ${error}`)}`
            );
            status.stop();
            process.exit(1);
        })
}

run();