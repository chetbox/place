# Reddit Place clone

A simple clone of [r/place](https://reddit.com/r/place) but with no login or time-limiting. Just a big ol' shared canvas for you to play with.

Built with Firebase Realtime Database, Firebase Hosting, and Vue.js.

## Contributing

Make a pull request.

## Local development

Build the source.

```shell
yarn
yarn build
```

Install `firebase-tools`:

```shell
yarn global add firebase-tools
```

Run `firebase serve -p 8000` then navigate to [http://localhost:8000](https://localhost:8000).

## Deployment

All merges to `main` are deployed automatically to [place.chetbox.com](https://place.chetbox.com) from Github Actions using Firebase CLI tools.
