# Image editor

An image editor application based on React, TypeScript, and functional programming.

Running the application hosted on Vercel. You can visit it here:

<https://image-editor-gibbok.vercel.app/>

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

![Screenshot 2023-03-17 at 4 58 50 PM](https://user-images.githubusercontent.com/17195702/225958050-eb05ba50-0f7e-42fb-bb8b-28b19d22d726.png)

Image Editor:

![Screenshot 2023-03-17 at 5 00 31 PM](https://user-images.githubusercontent.com/17195702/225958094-33cf856b-3782-4af6-9f59-9b878a890c79.png)

## Video

https://user-images.githubusercontent.com/17195702/225958331-3def9c2b-3fb8-46a9-b30f-2ac025347806.mov
