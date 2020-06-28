## How to run

To launch the project, please run:

```bash
npm run dev
# or
yarn dev
```

from the root directory, and open `http://localhost:3000`

The project is build with Next.js framework, with which the initial movies list server-side rendered. The server persists movies lists in LocalStorage.

### Folder/File structure for Web package

- **api**\
  The basic fetch API service.

- **pages**\
  The index page page with all movies list and a search functionality, and a [name] page, which could be either `watch-later` or `favorites` lists depending on the navigation item.

- **components**\
  Reusable presentation components.

- **hooks**\
  The API is requested with custom `use-api` hook, which tracks data, and load/error states. The movies listing also supports infinite scroll pagination functionality.

- **lib**\
  `Watch later` and `Favorites` lists LocalStorage module.

- **utils**\
  Helper functions.

### Testing

- Unit test for `Movie` component and utility functions.
- Simple Cypress e2e test for movies listing functionality. To run Cypress test, please run `yarn` first from root directory first and than `yarn cypress:open`.

### Technologies used

- Next.js
- Typescript
- Jest, React Testing Library, Cypress (with Testing Library module)
