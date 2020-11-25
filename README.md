## Beetrack Front-end Test

### Description & Installation
The project is composed of a React frontend and a RESTful backend. To run them both:

```shell
docker-compose up
```

...and then reach the application running at http://localhost:3000

or they can be run individually:
```shell
npm start
```

### Libraries & motivations
* `@emotion/styled` for css - This has the same interface as `styled-components`, but doesn't seem to negatively affect the TS compile time.

### Notes & bugs

* create-react-app@4.0.0 does not support TypeScript 4.0 and above, so ts is pinned @ 3.9