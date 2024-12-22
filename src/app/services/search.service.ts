import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface SearchConfig {
  defaultPageSize?: number;
}

export interface CurrentSearch {
  searchText: string;
  pageSize: number;
  page: number;
}

// BONUS: Use DI to update the config of SearchService to update page size
export const SEARCH_CONFIG = undefined;

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

@Injectable()
export class SearchService {
  searchText$ = undefined;
  pageSize$ = undefined;
  pageIndex$ = undefined;
  currentSearch$ = undefined;

  constructor(private router: Router) {
    this._initFromUrl();
  }

  // BONUS: Keep the current search params in the URL that allow users to refresh the page and search again
  private _initFromUrl() {}

  set searchText(text: string) {}

  set page(page: number) {}

  submit() {}
}
