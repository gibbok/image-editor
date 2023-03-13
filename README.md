# Image editor

Hello there! My name is Simone Poggiali, please check out this project code. I am looking forward to having a conversation with you.

I love open source for more code, please look at my GitHub projects: <https://github.com/gibbok>

## Install instruction

- Clone this repo `git clone https://github.com/gibbok/image-editor.git`
- Visit the app folder `cd app`
- Install dependencies, use `nvm use` and after run `npm i`
- Run the project `npm start` visit
- Visit <http://localhost:3000/>

## Tool overview

- Code is written in `TypeScript` and `ReactJS` to provide type safety.
- The project is built on top of `Create React App` to speed up the setup of the project.
- `React Query` has been used for server-state data management together with `Axios`.
- `fp-ts` is used as a library for typed functional programming, I use function composition and Option type.
- `React Hook Form` is used for form validation together with `yup` for schema validation, this combination allows a very declarative and very maintainable way to manage forms and their validation avoiding a lot of boilerplate.
- `Material UI` is used for UI components.
- For testing `jest` and `React Testing Library` are being installed to write tests that resemble the way the app is being used. Utility functions were written mainly in TDD style.
- `React Router` is used for routes and handling query strings.

## Architect overview

The container files are responsible for effects, including, data fetching, reading and updating query string, and error handling, the rest of the components are `dumb` they have no side effects and so they are pure. By using these techniques we can more easily separate concerns and allow quickly test all our components. I would be more than happy to discuss this with you in a meeting more about this approach.

The state of the application is kept in a query string so it can be easily tracked with browser history. Users can also bookmark it and open the editor in any state.

## Area of improvements

- Server return pagination via a dedicated header and does not provide the total number of pages, would be beneficial to change that and have all information returned in the payload for simplicity.
- It is possible to avoid calling the server on every press of the `Apply` button by performing some image modification directly in the browser, for instance, some image processing can be executed in a Web Worker, which has the advantage to keep free the main thread and avoid server load.
- The `containers` are currently not tested in this solution, as it requires additional effort to stab network requests and were outside the scope of this assignment, but if I would have more time I would use `Mock Service Worker: MSW` for what.
- E2E could be an area of improvement, `Cypress` could be a good candidate.
- Tooling like `Story Book` could be used to enhance developer productivity and documentation of the UI components.