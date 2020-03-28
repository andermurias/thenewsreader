# The News Reader

[https://thenewsreader.om.nom.es](https://thenewsreader.om.nom.es)

## `.env` Vars

### `REACT_APP_BACKEND_URL`

This contains the URL that the front will use for all the API requests

### `PORT`

This will be the port that will use express and the development back server

---

## Available Scripts

In the project directory, you can run:

### `yarn start:front:dev`

Starts the front side of the project (React) with the live reload as development mode

### `yarn start:back:dev`

Starts the back side of the project (Express) with the live reload as development mode

### `docker:build`

Launches the `./etc/docker/build.sh` script, that creates the image for the code

### `docker:push`

Launches the `./etc/docker/push.sh` script, that pushes the image to the registry

---

### `yarn start`

Runs the server in production mode, this is the task executed in the docker image

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
