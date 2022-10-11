import { config } from 'dotenv';
config();

import Client from '@guildedts/framework';

const dev = process.argv.includes('--dev');

export const client = new Client({ dev });