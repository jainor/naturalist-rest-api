import * as fs from 'fs';
import axios from 'axios';
import * as path from 'path';
import { NaturalistService } from '../shared/naturalist';
import { mainModule } from 'process';

var Stream = require('stream').Transform;

const downloadImageFromURL = async (url: string, filename: string) => {
  const filePath = path.resolve(filename);
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return await new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

async function DownloadDataSet(
  taxaId: number,
  rank: string,
  dataSetName?: string,
) {
  const result = await NaturalistService.getTaxaAtRankDescendantsTaxa(
    taxaId,
    rank,
  );
  const rootDir = dataSetName || 'DataSet';
  const extension = '.jpg';

  fs.mkdirSync(path.resolve(rootDir));
  for (let i = 0; i < result.length; ++i) {
    const curDir = path.resolve(rootDir, result[i].name + '-' + result[i].id);
    fs.mkdirSync(path.resolve(curDir));
    let results = (await NaturalistService.getPhotosByTaxa(
      result[i].id,
    )) as any[];
    for (let i = 0; i < results.length; ++i) {
      downloadImageFromURL(
        results[i].url,
        path.resolve(curDir, String(results[i].id) + extension),
      );
    }
  }
}

const main = () => {
  if (process.argv.length < 4) {
    throw 'Invalid number of arguments';
  }
  DownloadDataSet(
    Number.parseInt(process.argv[2]),
    process.argv[3],
    process.argv[4],
  );
};

main();
