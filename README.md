# Image editor

An image editor application based on React, TypeScript, and functional programming.

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
- `Material UI` is used for UI components, with a fluid layout and lazy loaded images.
- For testing `jest` and `React Testing Library` were installed to enable writting tests that resemble the way the app is being used. Utility functions were written mainly in TDD style.
- `React Router` is used for routes and handling query strings.

## Architect overview

The container components are responsible for effects, including, data fetching, reading and updating query strings, and error handling, the rest of the components are pure and they have no side effects. By using these techniques we can more easily separate concerns and allow quickly testing the majority of our components.

The state of the application is kept in query strings so it can be easily tracked with browser history. Users can also bookmark it and open the editor in any state.

## Screenshots

Images List:

![Screenshot 2023-03-13 at 11 36 37 PM](https://user-images.githubusercontent.com/17195702/224848085-4510d4ef-b467-4d6d-bc9a-dd052016fe2d.png)

Image Editor:

![Screenshot 2023-03-13 at 11 36 46 PM](https://user-images.githubusercontent.com/17195702/224848106-a4fa3172-0857-4eed-97e7-cff617aff9c5.png)

Downloaded files in the OS:

![Screenshot 2023-03-13 at 11 37 42 PM](https://user-images.githubusercontent.com/17195702/224848113-65c09758-3288-4bf3-9c62-79b605f6a929.png)

## Videos

https://user-images.githubusercontent.com/17195702/224916864-6c1e79f2-9889-46c6-9a3d-4c673689e5db.mov
