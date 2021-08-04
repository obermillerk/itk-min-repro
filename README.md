# itk-min-repro
Currently uses the web version of itk's readImageDICOMFileSeries, as opposed to the local version.

## Quick start
```bash
yarn # install dependencies
yarn start # launch app
```

```bash
npm i # install dependencies
npm run start # launch app
```

Once running, use the `Select Directory` button to choose a directory in the pop up window, which will trigger an attempt to read the image files via itk.

*NOTE* - If you edit the index.ts file (ie disabling the `nodeIntegrationInWorker` flag to see it working) you have to restart the electron instance, either by typing `rs` and hitting enter in the console you launched it while it's running, or quiting entirely and restarting with `yarn start`.
