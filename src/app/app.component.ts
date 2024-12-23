import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { distinctUntilChanged, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { CurrentSearch, SearchService } from './services/search.service';

interface SearchResult {
  num_found: number;
  docs: {
    title: string;
    author_name: string[];
    cover_edition_key: string;
  }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatOptionModule
  ],
  // BONUS: Use DI to update the config of SearchService to update page size
})
export class AppComponent {
  private $http = inject(HttpClient);

  // TODO: Create a SearchService and use DI to inject it
  // Check app/services/search.service.ts for the implementation
  public searchService = inject(SearchService)

  // TODO: Implement this observable to call the searchBooks() function
  // Hint: Use RxJS operators to solve these issues
  searchResults$ = this.searchService.currentSearch$.pipe(
    distinctUntilChanged((prev, curr) => {
      return JSON.stringify(prev) === JSON.stringify(curr)
    }),
    switchMap((currentSearch) => {
      return currentSearch
        ? this.searchBooks(currentSearch)
        : of(({ num_found: 0, docs: [] }));
    }),
    shareReplay(1)
  );

  onSearchInputChange(event: Event) {
    this.searchService.searchText = (event.target as HTMLInputElement).value;
  }

  onPageChange(pageIndex: number, pageSize: number) {
    // console.log("~~~onPageChange~~~", { pageIndex, pageSize })
    this.searchService.page = pageIndex + 1;

    // bug: this.searchService.pageSize always undefined
    // if (this.searchService.pageSize !== pageSize) {
    //   this.searchService.pageSize = pageSize;
    //   this.searchService.page = 1
    // } else {
    //   this.searchService.page = pageIndex + 1;
    // }
  }

  trackByTitle(index: number, item: any) {
    return item.title;
  }


  searchBooks(currentSearch: CurrentSearch): Observable<SearchResult> {
    const { searchText, pageSize, page } = currentSearch;

    const searchQuery = searchText.split(' ').join('+').toLowerCase();

    return this.$http.get<SearchResult>(
      `https://openlibrary.org/search.json?q=${searchQuery}&page=${page}&limit=${pageSize}`
    );
  }
}
