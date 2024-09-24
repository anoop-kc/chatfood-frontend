# ChatFood | Powerful Mobile Ordering and Payments

This is a mock project trying to simulate the menu page of Chatfood that list dishes by category.

## Features

- Allows the user to filter the menu itms by typing in a search box
- Clicking on a specific dish will add it to the cart
- The cart can be reset by clicking on the back button

## Getting Started

To get a local copy up and running, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later).
- It is recommended to create a node virtual environment if possible. However creating a virtual environment is not mandatory.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anoop-kc/chatfood-frontend.git
   ```

2. Navigate to the project directory:

```bash
cd chatfood-frontend
```

3. Install dependencies:

```bash
npm install
```

### Scripts

- Development: Start the development server (running the project)

```bash
npm run dev
```

- Test: Run tests using Vitest

```bash
npm run test
```

- Test UI: Open Vitest UI for interactive testing

```bash
npm run test:ui
```

- Test Coverage: Run tests with coverage reporting and UI

```bash
npm run test:c
```

### Design Considerations

- The framework used for the project is React with Typescript
- The latest version of raact is used with vite as a build tool
- Vitest + React Testing Library is used for writing and running unit tests
- No third party javascript libraries were used
- Component Hierarchy :

```
      - App
        - Menu
        - Header
            - BackButton
        - DishList
            - SearchBox
            - CategoryCard(s)
              - DishCard(s)
                  - StripText
                  - DishPrice
                    - Price
```

- The main design principles followed are component reusability, and decoupling of components.
- useState was largely used for state management for some instances useContext was also used to share data and functions among components
- CSS modules were used to style components. Individual components have their own styling files.
- Units tests were used heavily to ensure the correct implementation of logic for each of the components
