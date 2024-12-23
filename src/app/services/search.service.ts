import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

interface SearchConfig {
  defaultPageSize?: number;
}

export interface CurrentSearch {
  searchText: string;
  pageSize: number;
  page: number;
}

// BONUS: Use DI to update the config of SearchService to update page size
export const SEARCH_CONFIG = new InjectionToken<SearchConfig>('SEARCH_CONFIG', {
  providedIn:'root',
  factory: () => ({
    defaultPageSize: 10,
  }),
})

/**
 * Service for managing search state and operations
 * @public
 */

/**
 * @property {Observable<string>} searchText$ - Observable of the current search text in the input field
 * @property {Observable<number>} pageSize$ - Observable of the current page size
 * @property {Observable<number>} pageIndex$ - Observable of the current page index (0-based)
 * @property {Observable<CurrentSearch | null>} currentSearch$ - Observable of the current search parameters
 */

/**
 * @method searchText - Updates the current search text observable
 * @param {string} text - The new search text
 */

/**
 * @method page - Updates the current page number
 * @param {number} page - The new page number (1-based)
 */

/**
 * @method submit - Submits the current search text that updates the current search parameters
 */

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTextSubject = new BehaviorSubject<string>('');
  private pageSizeSubject = new BehaviorSubject<number>(10);
  private pageIndexSubject = new BehaviorSubject<number>(0); // index based on 0
  private currentSearchSubject = new BehaviorSubject<CurrentSearch | null>(null);

  searchText$ = this.searchTextSubject.asObservable();
  pageSize$ = this.pageSizeSubject.asObservable();
  pageIndex$ = this.pageIndexSubject.asObservable();
  currentSearch$ = this.currentSearchSubject.asObservable();

  constructor(
    private router: Router, 
    @Inject(SEARCH_CONFIG) private config:SearchConfig
  ) {
    if (this.config.defaultPageSize) {
      this.pageSizeSubject.next(this.config.defaultPageSize)
    };
    this._initFromUrl();
  }

  // BONUS: Keep the current search params in the URL that allow users to refresh the page and search again
  private _initFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const searchText = params.get('q') || '';
    const pageSize = parseInt(params.get('limit') || `${this.config.defaultPageSize}`, 10);
    const page = parseInt(params.get('page') || '1', 10) - 1;

    this.searchTextSubject.next(searchText);
    this.pageSizeSubject.next(pageSize);
    this.pageIndexSubject.next(page);
    this._updateCurrentSearch();
    }

  private _updateUrl() {
    const searchText = this.searchTextSubject.value;
    const pageSize = this.pageSizeSubject.value;
    const page = this.pageIndexSubject.value + 1;

    this.router.navigate([], {
      queryParams: {
        q: searchText, 
        limit: pageSize, 
        page
      },
      queryParamsHandling: 'merge',
    })
  }

  set searchText(text: string) {
    if(this.searchTextSubject.value !== text) {
      this.searchTextSubject.next(text); // next -> 發送 or 更新新值到所有訂閱該 subject 的觀察者
      this.pageIndexSubject.next(0); // reset page
    }
    // this._updateCurrentSearch();
  }

  set page(page: number) {
    this.pageIndexSubject.next(page - 1);
    this._updateCurrentSearch();
  }

  set pageSize(pageSize: number) {
    this.pageSizeSubject.next(pageSize);
    this._updateCurrentSearch();
  }

  private _updateCurrentSearch() {
    const searchText = this.searchTextSubject.value;
    const pageSize = this.pageSizeSubject.value;
    const page = this.pageIndexSubject.value + 1; // page start from 1

    if (searchText.trim()) {
      this.currentSearchSubject.next({ searchText, pageSize, page });
    }

    this._updateUrl();
  }

  submit() {
    this._updateCurrentSearch();
  }
}
