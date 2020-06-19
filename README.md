# ns-test-app

> TEst con Natvescript



# Setup Project

## Common

``` bash

npm install -g @vue/cli @vue/cli-init
vue init nativescript-vue/vue-cli-template <project-name>
cd <project-name>

# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```

## nativescript-plugin-firebase

ref - https://market.nativescript.org/plugins/nativescript-plugin-firebase

- Setup Firebase project
- Add IOS/Android
- Downalod plist o json and put it in 
    - app\App_Resources\iOS
    - app\App_Resources\Android 
- Add that file to .gitignore
- tns plugin add nativescript-plugin-firebase
- add code in main.ts


# ci

sudo npm install -g nativescript
npm install
tns doctor
# TODO how to get firebase-copy-google-services.js into project?
tns build android
