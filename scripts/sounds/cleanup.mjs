/**
 * Удалить неиспользуемые звуки с сервера.
 * Использовать аккуратно, чтобы не удалить на продакшене звуки, которые удалены в дев-версии навыка.
 * Лучше запускать после релиза (но немного подождать на случай отката).
 *
 * DRY_RUN=1 node scripts/sounds/cleanup.js
 */
import AssetManager from 'alice-asset-manager';
import config from './sounds.config.mjs';

const { token, skillId, dbFile, dryRun } = config;

const soundManager = new AssetManager.SoundManager({ token, skillId });

main()
  .catch(e => console.error(e));

async function main() {
  const {deleted, used} = await soundManager.deleteUnused({
    dbFile,
    dryRun,
  });

  console.log(deleted.map(id => soundManager.getUrl(id)).join('\n'));
  console.log(`DELETED: ${deleted.length}`);
  console.log(`USED: ${used.length}`);
  console.log(`DRY RUN: ${Boolean(dryRun)}`);
}
