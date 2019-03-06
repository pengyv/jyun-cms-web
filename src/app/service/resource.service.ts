import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseService } from '../common/response.service';
import { Observable } from 'rxjs';
import { Resource } from '../domain/resource';
import { BackEndApi } from '../back-end-api';
import { catchError } from 'rxjs/operators';
import { FilterConditions } from '../domain/response/filter-conditions';

@Injectable({
  providedIn: 'root'
})

export class ResourceService {

  constructor(
    private http: HttpClient,
    private responseService: ResponseService
  ) {
  }

  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(BackEndApi.resources)
      .pipe(catchError(this.responseService.handleError<Resource[]>('resourceService.getResources()', null)));
  }

  deleteResource(filePath: string): Observable<Resource[]> {
    const params = new HttpParams()
      .append('filePath', filePath);
    return this.http.delete<Resource[]>(BackEndApi.resources + '?' + params)
      .pipe(catchError(this.responseService.handleError<Resource[]>('resourceService.deleteResource()', null)));
  }

  getFilterConditions(): Observable<FilterConditions> {
    return this.http.get<FilterConditions>(BackEndApi.resourcesFilterConditions)
      .pipe(catchError(this.responseService.handleError<FilterConditions>('resourceService.getTypes()', null)));
  }

  getByConditions(date: string, type: string): Observable<Resource[]> {
    const params = new HttpParams()
      .append('date', date)
      .append('type', type);
    return this.http.get<Resource[]>(BackEndApi.resourcesByConditions + '?' + params)
      .pipe(catchError(this.responseService.handleError<Resource[]>('resourceService.getByConditions()', null)));
  }
}