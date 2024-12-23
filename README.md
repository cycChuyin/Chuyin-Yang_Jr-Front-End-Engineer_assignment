# Angular Search and Display Challenge

## Description

This challenge tests your ability to implement a search interface using [Angular](https://angular.dev/) and [RxJS](https://rxjs.dev/).

## Submission

Please submit your solution in one of the following ways:

1. Create a public GitHub repository and share the link with us
2. Send us a zip file containing your complete solution

## Core Features

This application provides a basic search interface that connects to the [Open Library API](https://openlibrary.org/dev/docs/api/search) with the following structure:

- **Search Input** - Allows users to enter search terms
- **Search Results** - Displays book results with:
  - Cover image
  - Title
  - Author name
- **Pagination** - Handles multiple pages of results

## Technical Requirements

### Search Service Implementation

In [src/app/services/search.service.ts](src/app/services/search.service.ts) needs to handle:

- State management for:
  - Search text
  - Current page size
  - Current page index
  - Current search parameters
- (Optional) URL parameter management for page refresh persistence
- (Optional) Injection for default page size
- (Optional) Support changing page size

### Search Results Implementation

In [src/app/app.component.ts](src/app/app.component.ts) needs to handle:

- Inject Search Service
- Handle the search results observable
  - Initial null state to prevent unnecessary API calls
  - Search submission with:
    - Cancellation of pending requests
    - Latest results display
    - Race condition prevention
- (Optional) Inject default page size

## Checklist

- [V] Search input field accepts user's text input
- [V] Search button triggers API request when clicked
  - [V] Prevent API calls when search text is empty
- [V] Display search results on the page
- [ ] Pagination controls
  - [V] Display total number of results
  - [X] (Optional) Allow changing page size
  - [V] Make API calls to fetch paginated data when page changes
  - [/] Cancel pending requests when switching pages rapidly
  - [V] Should be reset to first page if new search text is submitted
- [ ] (Optional) URL parameter management
  - [ ] Preserve search parameters in URL
  - [ ] Load search from URL parameters on page load/refresh
