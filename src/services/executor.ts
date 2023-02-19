import { APIGatewayEvent } from 'aws-lambda';

import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { executeLiquidation } from '../clients/ethers';

module.exports.main = async (event: APIGatewayEvent): Promise<Response> => {
  let error: Error;
  const params = event.body ? JSON.parse(event.body) : null;

  if (!params || !params[0]) {
    error = generateError(
      'you need to specify token price oracle and new price in request body',
      JSON.stringify(event.body),
    );
  } else {
    for (const param of params) {
      const { amm, trader } = param;
      await executeLiquidation(amm, trader)
        .then(async (res) => {
          if (res.status === 1) {
            console.log(`${amm}: liquidation of ${trader} successful - ${res.txHash}`);
          } else {
            error = generateError(`${amm}: liquidation of ${trader} unsuccessful - ${res.txHash}`);
          }
        })
        .catch((e) => {
          error = generateError(
            `${amm}: failed to execute liquidation of ${trader}`,
            JSON.stringify(e),
          );
        });
    }
  }

  return error
    ? failure('Error: at least one liquidation failed to execute, see the logs for further details')
    : success('OK');
};
