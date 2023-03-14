# Image editor

Hello there! My name is Simone Poggiali, please check out this project code. I am looking forward to having a conversation with you.

I love open source, for more code, please look at my GitHub projects: <https://github.com/gibbok>

## Install instruction

- Clone this repo `git clone https://github.com/gibbok/image-editor.git`
- Visit the app folder `cd app`
- Install dependencies, use `nvm use` and after run `npm i`
- Run the project `npm start`
- Visit <http://localhost:3000/>
- To run the tests in app folder run `npm t` then press `a`

## Tool overview

- Code is written in `TypeScript` and `ReactJS` to provide type safety.
- The project is built on top of `Create React App` to speed up the setup.
- `React Query` has been used for declarative server-state data management together with `Axios` for data fetching.
- `fp-ts` is used as a library for typed functional programming, I use function composition and Option type.
- `React Hook Form` is used for forms validation together with `yup` for schema validation, this combination allows a very declarative and very maintainable way to manage forms and their validation avoiding a lot of boilerplates.
- `Material UI` is used for UI components, with a fluid layout.
- For testing `jest` and `React Testing Library` were installed to enable writting tests that resemble the way the app is being used. Utility functions were written mainly in TDD style.
- `React Router` is used for routes and handling query strings.

## Architect overview

The container files are responsible for effects, including, data fetching, reading and updating query string, and error handling, the rest of the components are pure and they have no side effects. By using these techniques we can more easily separate concerns and allow quickly testing the majority of our components. I would be more than happy to discuss this with you in a meeting more about this approach.

The state of the application is kept in query strings so it can be easily tracked with browser history. Users can also bookmark it and open the editor in any state.

## Area of improvements

- Server returns pagination info via a dedicated header and does not provide the total number of pages, would be beneficial to change that and have all information returned in the payload for simplicity.
- It is possible to avoid calling the server on every press of the `Apply` button by performing some image modification directly in the browser, for instance, some image processing can be executed in a Web Worker, which has the advantage to keep free the main thread and avoid server load.
- The `containers` are currently not tested in this solution, as it requires additional effort to stab network requests and were outside the scope of this assignment, but if I would have more time I would use `Mock Service Worker: MSW` for what, although I tested some pages to give you a sense of my testings skills.
- UX and design in general, we could also improve the way we shows errors to the users, for instance using a Snackbar.

The following are some tools I would consider for a production project:

- E2E testing using `Cypress`.
- Visual regression testing using `Chromatic` or `Loki`.
- Tooling like `Story Book` could be used to enhance developers' productivity and documentation of the UI components.
- Integration of error tracking like `Sentry`, performance monitoring, and collective analytics like `Hotjar` and `Google Analytics`.

## Screenshots

Image List:

![Screenshot 2023-03-13 at 11 36 37 PM](https://user-images.githubusercontent.com/17195702/224848085-4510d4ef-b467-4d6d-bc9a-dd052016fe2d.png)

Image Editor:

![Screenshot 2023-03-13 at 11 36 46 PM](https://user-images.githubusercontent.com/17195702/224848106-a4fa3172-0857-4eed-97e7-cff617aff9c5.png)

Downloaded files in the OS:

![Screenshot 2023-03-13 at 11 37 42 PM](https://user-images.githubusercontent.com/17195702/224848113-65c09758-3288-4bf3-9c62-79b605f6a929.png)

## Videos

https://user-images.githubusercontent.com/17195702/224916864-6c1e79f2-9889-46c6-9a3d-4c673689e5db.mov
