# SWAPI Character Explorer

SWAPI Character Explorer is a React application that allows users to explore characters from the Star Wars universe and view information about their homeworld.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Specifications](#specifications)
- [Tech Decisions](#tech-decisions)
- [Tech Debts](#tech-debts)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [License](#license)

## Demo

Live demo available [here](https://starwars-character-list.web.app/).

## Features

- Browse characters from the Star Wars universe.
- View detailed information about each character, including their name, height, mass, gender and homeworld.
- Filter characters from a specific planet.

## Specifications

Essa aplicação foi desenvolvida seguindo o [mock-up](https://www.figma.com/file/5CMAkR0A4OHSS83xjIiShv/CloudWalk-FrontEnd-test?type=design&node-id=0-1&mode=design&t=U1b5U1gejjQ1ClWr-0) e os pré-requisitos estabelecidos [nesse documento](https://gist.github.com/cloudwalk-tests/2d2302ba59c988d09d7f9fe1b9474c8e#24-tech-stack).

Primeiramente foram identificados os componentes que compõem a página e quais as entidades/dados estão presentes na tela.
Sendo assim, temos o seguinte protótipo:

<img src="https://github.com/valtermartins1301/frontend-challenge/assets/10012903/e08e47b4-99d2-4670-a3b1-c0e46240faf4" width="700" />

Definidos os principais componentes, temos o seguinte modelo de dados para as informações apresentadas:

```js
export interface People {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
  url: string;
}

export interface Planet {
  name: string;
  url: string;
}
```

## Tech Decisions

- ([SWR](https://swr.vercel.app/))
Considering that we need to display information about Character and HomeWorld asynchronously, I decided to use the SWR library, which facilitates the management of information requests and has an intelligent cache system (stale-while-revalidate), improving the performance of the application and offering a smoother experience.

- CSS Modules
Considering the simplicity of the page styles, i decided to use only CSS modules for styling the page elements because it has a ready-to-use setup with `Create React App` and has the advantages of having style isolation avoiding conflicting class names, readability and maintenance (as associated styles are kept close to the component itself).

- Relative Sizes (Responsiveness)
Using relative sizes (rem) so that the elements of the page adapt to the screen size, thus achieving greater visual consistency and a more cohesive user experience.

- Firebase Hosting
Firebase Hosting offers a quick and easy deployment experience for hosting frontend applications, making it simple to display development results in a production environment.

## Tech Debts

- Improve the component isolation, creating more basic components like Button, List and Select.
- Create a infinity loading feature that loads more characters every time the user scrolls to the bottom of the page.
- Add a search by name feature that finds a character by their name.
- Add `babel module resolver` to simplify file imports.
- Improve the image sizes for mobile devices.

## Technologies Used

- React
- SWAPI (Star Wars API) for fetching character and homeworld data
- React Router for navigation
- SWR for fetch content and cache data
- Firebase (for deployment)

## Setup

How to set up and run the project locally.

1. Clone the repository:

```bash
  git clone https://github.com/valtermartins1301/frontend-challenge.git
```

2. Install dependencies:

```bash
  cd frontend-challenge
  yarn install
```

3. Start the development server:

```bash
  yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## License

MIT


