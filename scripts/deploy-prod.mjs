/**
 * Interactively set 'prod' tag to selected function version.
 */
import 'dotenv/config';
import fs from 'fs';
import yaml from 'yaml';
import inquirer from 'inquirer';
import { Session } from 'yandex-cloud';
import functionsApi from 'yandex-cloud/api/serverless/functions/v1/index.js';

const { YC_FUNCTION_ID, HOME } = process.env;
const { FunctionService } = functionsApi;
const ycConfig = yaml.parse(fs.readFileSync(`${HOME}/.config/yandex-cloud/config.yaml`, 'utf8'));

const PROD_TAG = 'prod';
const LATEST_TAG = '$latest';

main();

async function main() {
  const session = new Session({ oauthToken: ycConfig.profiles.default.token });
  const functions = new FunctionService(session);

  const possibleVersions = await getPossibleVersions(functions);
  const newProdVersionId = await promptNewProdVersion(possibleVersions);
  await setProdTag(functions, newProdVersionId);
  printVersions(await getPossibleVersions(functions));

  console.log(`Tag "${PROD_TAG}" moved to: ${newProdVersionId}`);
}

async function getAllVersions(functions) {
  const { versions } = await functions.listVersions({
    functionId: YC_FUNCTION_ID,
  });
  return versions.map(version => {
    return {
      id: version.id,
      tags: version.tags,
    };
  });
}

async function setProdTag(functions, functionVersionId) {
  return functions.setTag({
    functionVersionId,
    tag: PROD_TAG
  });
}

async function getProdVersionsMap(functions) {
  const { functionTagHistoryRecord } = await functions.listTagHistory({
    functionId: YC_FUNCTION_ID,
    tag: PROD_TAG
  });
  return functionTagHistoryRecord.reduce((acc, version) => {
    acc[version.functionVersionId] = true;
    return acc;
  }, {});
}

async function getPossibleVersions(functions) {
  const allVersions = await getAllVersions(functions);
  const prodVersionsMap = await getProdVersionsMap(functions);
  return allVersions.filter(version => {
    return prodVersionsMap[version.id] || version.tags.includes(LATEST_TAG);
  });
}

async function promptNewProdVersion(possibleVersions) {
  const choices = possibleVersions.map(version => {
    return {
      name: formatVersionName(version, { isPrompt: true }),
      value: version.id,
      disabled: version.tags.includes(PROD_TAG) ? PROD_TAG : ''
    };
  });
  const { versionId } = await inquirer.prompt([{
    type: 'list',
    name: 'versionId',
    message: `Select version for tag "${PROD_TAG}":`,
    choices
  }]);
  return versionId;
}

/**
 * Format version as *****pj8
 */
function formatVersionName(version, {isPrompt} = {}) {
  const isCurrent = version.tags.includes(PROD_TAG);
  const isLatest = version.tags.includes(LATEST_TAG);
  return [
    `${isPrompt && isCurrent ? '' : '- '}${'*'.repeat(5)}${version.id.substr(-3)}`,
    isLatest && `(${LATEST_TAG})`,
    isPrompt ? '' : (isCurrent && `(${PROD_TAG})`),
  ].filter(Boolean).join(' ');
}

function printVersions(versions) {
  versions.forEach(version => {
    console.log(formatVersionName(version, { isPrompt: false }));
  });
}
