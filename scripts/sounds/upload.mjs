/**
 * Загрузить новые и измененные звуки.
 *
 * DRY_RUN=1 node scripts/sounds/upload.mjs
 */
import AssetManager from 'alice-asset-manager';
import config from './sounds.config.mjs';

const { token, skillId, pattern, dbFile, getLocalId, dryRun } = config;

const soundManager = new AssetManager.SoundManager({ token, skillId });

main()
  .catch(e => console.error(e));

async function main() {
  const items = await soundManager.uploadChanged({
    pattern,
    dbFile,
    getLocalId,
    dryRun,
  });

  items
    .sort((a, b) => (a.upload || '').localeCompare(b.upload || ''))
    .forEach(item => {
      const action = item.upload ? `UPLOAD ${item.upload.toUpperCase()}` : `SKIP`;
      console.log(`${action} (${item.localId}): ${item.file}`)
    });
  console.log(`UPLOAD: ${items.filter(item => item.upload).length}`);
  console.log(`SKIP: ${items.filter(item => !item.upload).length}`);
  console.log(`DRY RUN: ${Boolean(dryRun)}`);
}
