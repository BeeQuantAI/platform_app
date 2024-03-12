# Platform Web App

## Environment setup
0. setup your local postgres database
1. clone this repo.
2. run `yarn` in the project root.
3. add a `.env` file, and include the following
```
VITE_DEV_SERVER_URL=http://localhost:3000/graphql
```

## Start developing work
1. run `yarn dev` and have fun

## Changing theme
Go to `src/containers/App/App.tsx`, updating line 31 from `mode: 'dark'` to `mode: 'light'`, then enjoy the bright from early summer