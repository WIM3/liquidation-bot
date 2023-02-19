import { Error, Response } from '../common/types';
import { success, failure } from '../utils/response';
import { generateError } from '../utils/error';
import { getPositions } from '../clients/subgraph';

module.exports.main = async (): Promise<Response> => {
  let error: Error;

  await getPositions()
    .then(async (positions) => {
      for (const position of positions) {
        // TODO: add proper position processing and sending a message about liquidations
        console.log(JSON.stringify(position));
      }
    })
    .catch((e) => {
      error = generateError('failed to load data from subgraph', JSON.stringify(e));
    });

  return error ? failure(JSON.stringify(error)) : success('OK');
};
