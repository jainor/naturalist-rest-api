import internal from 'stream';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import e, { response } from 'express';
import { nauralistDefault } from './util';
import { resourceLimits } from 'worker_threads';

export class NaturalistService {
  static async requestResponse(url: string) {
    // tslint:disable-next-line:no-console
    let result = await axios.get(url);
    return result.data;
  }

  static getDescendentsByRank(rank: number, parentId: number) {
    return `this method should get all descendats of ${parentId} with rank${rank}`;
  }

  static getByRank(rank: number) {
    return `this method should get all taxa with rank${rank}`;
  }

  static getObservationsByRank(rank: number) {
    return `this method should return all observations with taxa with rank${rank}`;
  }

  static getIdsFromObservations(data: any) {
    let ids: any[] = [];
    try {
      const records = data;

      for (let i = 0; i < records.length; ++i) {
        const url = records[i].photo.url.replace('square', 'large');

        // tslint:disable-next-line:no-console
        ids.push({
          id: records[i].photo.id,
          url: url,
        });
      }
    } catch (e) {
      return e;
    }
    return ids;
  }

  static async getPhotosByObservation(id: number) {
    const URL = `https://api.inaturalist.org/v1/observations/${id}`;
    let result: any;
    result = await this.requestResponse(URL);

    return this.getIdsFromObservations(result.results[0].observation_photos);
  }

  static async getPhotosByTaxa(id: number) {
    let allIds = [];
    for (let page = 1; page <= nauralistDefault.maxPAges; ++page) {
      const URL = `https://api.inaturalist.org/v1/observations?identified=true&photos=true&taxon_is_active=true&verifiable=true&taxon_id=${id}&order=desc&order_by=created_at&${nauralistDefault.endDate}&per_page=${nauralistDefault.perPage}&page=${page}`;
      let result: any;
      try {
        result = await this.requestResponse(URL);
      } catch (e) {
        throw new Error(
          `3rd party service is down or ${id} is not a valid taxa id`,
        );
      }
      if (result.total_results < (page - 1) * nauralistDefault.perPage + 1)
        break;
      for (let i = 0; i < result.results.length; ++i) {
        allIds = allIds.concat(
          this.getIdsFromObservations(result.results[i].observation_photos),
        );
      }
    }
    return allIds;
  }

  static async getTaxaAtRankDescendantsTaxa(id: number, rank: string) {
    let records = [];

    for (let page = 1; page <= nauralistDefault.maxPAges; ++page) {
      const URL = `https://api.inaturalist.org/v1/taxa?is_active=true&taxon_id=${id}&rank=${rank}&${nauralistDefault.endDate}&per_page=${nauralistDefault.perPage}&page=${page}`;
      let result: any;

      result = await this.requestResponse(URL);

      if (result.total_results < (page - 1) * nauralistDefault.perPage + 1)
        break;

      const data = result.results;

      for (let i = 0; i < data.length; ++i)
        if (data[i].observations_count > nauralistDefault.minObservations) {
          records.push({
            name: data[i].name,
            id: data[i].id,
            observations_count: data[i].observations_count,
          });
        }
    }
    return records;
  }
}
