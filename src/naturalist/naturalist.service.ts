import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import internal from 'stream';
import { AxiosResponse } from 'axios';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import e, { response } from 'express';
import { nauralistDefault } from './util';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class NaturalistService {
  constructor(private httpService: HttpService) {}

  async requestResponse(url: string) {
    let result = this.httpService.get(url).pipe(
      map((axiosResponse: AxiosResponse) => {
        return axiosResponse.data;
      }),
    );
    return lastValueFrom(result);
  }

  getDescendentsByRank(rank: number, parentId: number) {
    return `this method should get all descendats of ${parentId} with rank${rank}`;
  }

  getByRank(rank: number) {
    return `this method should get all taxa with rank${rank}`;
  }

  getObservationsByRank(rank: number) {
    return `this method should return all observations with taxa with rank${rank}`;
  }

  getIdsFromObservations(data: any) {
    let ids: any[] = [];
    try {
      const records = data;

      for (let i = 0; i < records.length; ++i) {
        const url = records[i].photo.url.replace('square', 'large');
        ids.push(url);
      }
    } catch (e) {
      return new HttpException(e, 200);
    }
    return ids;
  }

  async getPhotosByObservation(id: number) {
    const URL = `https://api.inaturalist.org/v1/observations/${id}`;
    const result = await this.requestResponse(URL);

    return this.getIdsFromObservations(result.results[0].observation_photos);
  }

  async getPhotosByTaxa(id: number) {
    let allIds = [];
    for (let page = 1; page <= nauralistDefault.maxPAges; ++page) {
      const URL = `https://api.inaturalist.org/v1/observations?identified=true&photos=true&taxon_is_active=true&verifiable=true&taxon_id=${id}&order=desc&order_by=created_at&${nauralistDefault.endDate}&per_page=${nauralistDefault.perPage}&page=${page}`;
      let result: any;
      try {
        result = await this.requestResponse(URL);
      } catch (e) {
        throw new HttpException(
          `3rd party service is down or ${id} is not a valid taxa id`,
          400,
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

  async getTaxaAtRankDescendantsTaxa(id: number, rank: string) {
    let records = [];

    for (let page = 1; page <= nauralistDefault.maxPAges; ++page) {
      const URL = `https://api.inaturalist.org/v1/taxa?is_active=true&taxon_id=${id}&rank=${rank}&${nauralistDefault.endDate}&per_page=${nauralistDefault.perPage}&page=${page}`;
      const result = await this.requestResponse(URL);

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
