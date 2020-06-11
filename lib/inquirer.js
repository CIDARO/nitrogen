const inquirer = require('inquirer');
const utils = require('./utils');

module.exports = {
    askDefaults: () => {
        const questions = [
            {
                name: 'infura',
                type: 'confirm',
                default: true,
                message: 'Do you want to connect to an Infura node?',
            },
            {
                name: 'pastEvents',
                type: 'confirm',
                default: false,
                message: 'Do you want to print past events?',
            },
            {
                name: 'exportEnabled',
                type: 'confirm',
                default: false,
                message: 'Do you want to save events to a JSON file? (export.json)'
            },
        ];
        return inquirer.prompt(questions);
    },
    askInfuraConnectData: () => {
        const questions = [
            {
                name: 'infuraNetwork',
                type: 'list',
                message: 'Which network do you want to connect to?',
                default: 2,
                choices: ['mainnet', 'ropsten', 'rinkeby', 'kovan', 'goerli'],
                validate: function (value) {
                    if (value.length && utils.isValidNetwork(value)) {
                        return true;
                    } else {
                        return 'Please choose a valid Infura network.';
                    }
                }
            },
            {
                name: 'infuraProjectKey',
                type: 'input',
                message: 'Please provide your Infura Project Key:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please provide a valid Infura Project Key.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    askEthereumHostData: () => {
        const questions = [
            {
                name: 'ethereumHost',
                type: 'input',
                message: 'Please provide an ws/wss URL for the Ethereum node:',
                default: 'ws://localhost:8545',
                validate: function (value) {
                    if (value.length && utils.isValidURL(value)) {
                        return true;
                    } else {
                        return 'Please provide a valid ws/wss URL for the Ethereum node.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
    askSmartContractData: () => {
        const questions = [
            {
                name: 'smartContractAddress',
                type: 'input',
                message: 'Please provide the Smart Contract address to listen to:',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please provide a valid Smart Contract address.';
                    }
                }
            },
            {
                name: 'smartContractABI',
                type: 'input',
                message: 'Please provide a path to the .json file containing the Smart Contract ABI:',
                default: './abi.json',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please provide a valid file system path for the Smart Contract ABI.'
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    }
}