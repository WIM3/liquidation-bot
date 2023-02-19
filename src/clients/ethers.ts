import { ethers } from 'ethers';

import clearingHouseAbi from '../abi/ClearingHouse.json';

import { CLEARING_HOUSE, PROVIDER_URL, WALLET_PK } from '../common/constants';
import { TransactionResponse } from '../common/types';

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(WALLET_PK, provider);
const contract = new ethers.Contract(CLEARING_HOUSE, clearingHouseAbi, wallet);

/**
 * Executes liquidation
 * @param [amm] Address of the amm
 * @param [trader] Address of the trader
 * @returns {Promise.<TransactionResponse>} Transaction response
 */
export const executeLiquidation = async (
  amm: string,
  trader: string,
): Promise<TransactionResponse> => {
  const tx = await contract.liquidate(amm, trader);
  const rec = await tx.wait();

  return {
    status: rec.status,
    txHash: rec.transactionHash,
    cumulativeGasUsed: rec.cumulativeGasUsed,
  };
};
