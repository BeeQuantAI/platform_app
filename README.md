# Platform Web App

## Environment setup

0. setup your backend services
1. clone this repo.
2. run `yarn` in the project root.
3. add a `.env` file, and include the following

    ```
    VITE_DEV_SERVER_URL=http://localhost:3000/graphql
    ```

## Start developing work

1. run `yarn dev` and have fun

## To run the frontend within the docker container:

Follow these steps to get the frontend up and running inside a Docker container.

1. pre-request :
   ensure the PostgreSQL and backend docker containers are running properly.

2. build docker image:
   Run the following command to build the Docker image for the platform API:
   ```
   docker build -t platform_app .
   ```

3. run docker
   Execute this command to run the Docker container in the background:
   ```
   docker run --name platform_app -p 5173:5173 -d platform_app
   ```

4. Navigate to web app: http://localhost:5173/, and have a fun.
