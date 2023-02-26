import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { getPositions } from '../clients/subgraph';
import { sendLiquidationMessage } from '../clients/telegram';

module.exports.main = async (): Promise<Response> => {
  let error: Error;

  await getPositions()
    .then(async (positions) => {
      for (const position of positions) {
        // TODO: add proper position processing
        console.log(JSON.stringify(position));

        // TODO: replace condition with position being liquidatable
        if (true) {
          await sendLiquidationMessage(position)
            .then((msg) => {
              console.log(
                `liquidation message ${msg.id} has been sent at ${msg.ts} for position ${position.id}`,
              );
            })
            .catch((e) => {
              error = generateError(
                `failed to send liquidation message for position ${position.id}`,
                JSON.stringify(e),
              );
            });
        }
      }
    })
    .catch((e) => {
      error = generateError('failed to load data from subgraph', JSON.stringify(e));
    });

  return error ? failure(JSON.stringify(error)) : success('OK');
};
