import axios from 'axios';

import { SUBGRAPH_URL } from '../common/constants';
import { Position } from '../common/types';

const QUERY_LIMIT = 1000;

/**
 * Queries relevant data from subgraph
 * @returns {Promise.<Position[]>} List of positions
 */
export const getPositions = async (): Promise<Position[]> => {
  let positions: Position[] = [];
  let last = '';

  while (true) {
    const res = (
      await axios.post(
        SUBGRAPH_URL,
        {
          query: `query GetPositions {
              positions (first: ${QUERY_LIMIT}, where: { id_gt: "${last}" }) {
                id
                timestamp
                trader
                amm
                margin
                openNotional
                size
                tradingVolume
                leverage
                entryPrice
                underlyingPrice
                fee
                realizedPnl
                unrealizedPnl
                badDebt
                liquidationPenalty
                fundingPayment
                totalPnlAmount
              }
            }`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
    ).data;
    if (res.errors) throw res.errors[0].message;

    const tmp: Position[] = res.data.positions;
    positions = positions.concat(tmp);

    if (tmp.length < QUERY_LIMIT) break;
    last = tmp[tmp.length - 1].id;
  }

  return positions;
};
