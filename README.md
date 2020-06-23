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
  Inside github action, store file into secret and ech oit to file before compiling (see: Extract google-services.json into ci.yml)
- tns plugin add nativescript-plugin-firebase
- add code in main.ts


# ci

``` bash
sudo npm install -g nativescript
npm install
tns doctor
tns build android
```

# tests

``` bash

# Pacakges

npm install -g appium
npm install -D nativescript-dev-appium
npm install

# Create Emulator-Api27-Google
$ANDROID_HOME/tools/bin/avdmanager.bat list avd

$ANDROID_HOME/tools/bin/sdkmanager.bat --install "system-images;android-27;google_apis;x86"
echo "no" | $ANDROID_HOME/tools/bin/avdmanager.bat --verbose create avd --force --name "Emulator-Api27-Google" --package "system-images;android-27;google_apis;x86" --tag "google_apis" --abi "x86"

# Run tests
npm run e2e -- --runType=android27
```