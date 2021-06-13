import 'dotenv/config';
import path from 'path';

export default {
  token: process.env.ALICE_TOKEN,
  skillId: process.env.SKILL_ID,
  dryRun: process.env.DRY_RUN,
  pattern: [
    'assets/sounds/*.mp3',
  ],
  dbFile: 'src/generated/sounds.json',
  // 'assets/sounds/foo.mp3' --> 'foo'
  getLocalId: filePath => path.parse(filePath).name,
};
