import axios from 'axios';

import { TELEGRAM_API, TELEGRAM_GROUP } from '../common/constants';
import { Position, TelegramResponse } from '../common/types';

const TELEGRAM_URL = `https://api.telegram.org/bot${TELEGRAM_API}/sendMessage?chat_id=${TELEGRAM_GROUP}&text=`;

// TODO: add more necessary details
const generateLiquidationMsg = (amm: string, trader: string): string =>
  `🚨 LIQUIDATEABLE POSITION FOUND 🚨\n
        amm: ${amm}
        trader: ${trader}
        Please liquidate!\n
        Next check in X minutes.`;

/**
 * Sends message to telegram bot
 * @param [position] Position that should be liquidated
 * @returns {Promise.<TelegramResponse>} Data of the sent message
 */
export const sendLiquidationMessage = async (position: Position): Promise<TelegramResponse> => {
  const res = (
    await axios.get(
      `${TELEGRAM_URL}${encodeURI(generateLiquidationMsg(position.amm, position.trader))}`,
    )
  ).data;

  if (res.ok) {
    const data = res.result;
    return {
      id: data.message_id,
      from: data.from.id,
      chat: data.chat.id,
      ts: data.date,
      text: data.text,
    };
  } else throw res.error;
};
