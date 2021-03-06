import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ResponseService } from '../util/response.service';
import { Observable } from 'rxjs';
import { Article } from '../domain/article';
import { BackEndApi } from '../config/back-end-api';
import { catchError } from 'rxjs/operators';
import { ArticleFilterConditions } from '../domain/response/article-filter-conditions';
import { LocalStorageKey } from '../config/local-storage-key';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor(
    private http: HttpClient,
    private responseService: ResponseService
  ) {
  }

  getArticles(): Observable<Article[]> {
    const headers = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    return this.http.get<Article[]>(BackEndApi.articles, headers)
      .pipe(catchError(this.responseService.handleError<Article[]>('articleService.getArticles()', null)));
  }

  newArticle(article: Article): Observable<Article> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    return this.http.post<Article>(BackEndApi.articles, article, headers)
      .pipe(catchError(this.responseService.handleError<Article>('articleService.newArticle()', null)));
  }

  updateArticle(article: Article): Observable<Article> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    return this.http.put<Article>(BackEndApi.articles, article, headers)
      .pipe(catchError(this.responseService.handleError<Article>('articleService.updateArticle', null)));
  }

  deleteArticle(articleId: number): Observable<void> {
    const headers = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    const params = new HttpParams()
      .append('articleId', articleId.toString());
    return this.http.delete<void>(BackEndApi.articles + '?' + params, headers)
      .pipe(catchError(this.responseService.handleError<void>('articleService.deleteArticle', null)));
  }

  getFilterConditions(): Observable<ArticleFilterConditions> {
    const headers = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    return this.http.get<ArticleFilterConditions>(BackEndApi.articlesFilterConditions, headers)
      .pipe(catchError(this.responseService.handleError<ArticleFilterConditions>('articleService.getFilterConditions()', null)));
  }

  getArticlesByStatus(status: string): Observable<Article[]> {
    const headers = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    const params = new HttpParams()
      .append('status', status);
    return this.http.get<Article[]>(BackEndApi.articlesByStatus + '?' + params, headers)
      .pipe(catchError(this.responseService.handleError<Article[]>('articleService.getArticlesByStatus()', null)));
  }

  getArticlesByConditions(status: string,
                          selectedDate: string,
                          selectedCategory: string,
                          selectedTag: string): Observable<Article[]> {
    const headers = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    const params = new HttpParams()
      .append('status', status)
      .append('selectedDate', selectedDate)
      .append('selectedCategory', selectedCategory)
      .append('selectedTag', selectedTag);
    return this.http.get<Article[]>(BackEndApi.articlesByConditions + '?' + params, headers)
      .pipe(catchError(this.responseService.handleError<Article[]>('articleService.getArticlesByConditions()', null)));
  }

  moveToRecycleBin(beDelete: boolean, article: Article): Observable<Article> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem(LocalStorageKey.currentLoginUserToken),
        From: localStorage.getItem(LocalStorageKey.currentLoginUsername)
      })
    };
    const params = new HttpParams()
      .append('beDelete', beDelete ? 'true' : 'false');
    return this.http.put<Article>(BackEndApi.articlesMoveToRecycleBin + '?' + params, article, headers)
      .pipe(catchError(this.responseService.handleError<Article>('articleService.movoToRecycleBin()', null)));
  }
}
