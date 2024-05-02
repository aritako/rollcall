# RollCall

This is a course requirement for CS 191/192 Software Engineering Courses of the Department of Computer Science, College of Engineering, University of the Philippines, Diliman under the guidance of Ma. Rowena C. Solamo for A.Y. 2023-2024.
- Atienza, Carmelo Ellezandro R.
- Legara, Sean Ken Cedric G.
- Macaraig, Manuel D.
- Torres, Antonio Jose S.

## Setup
This project uses the React library and the Ionic + Capacitor framework. Ionic is a UI framework that provides a wide range of components and features for building mobile apps, while Capacitor is a runtime that allows Ionic apps to be deployed to both iOS and Android devices.

To get started, we install Ionic through `npm`, and other packages:
```
npm i -g @ionic/cli
npm i qrcode
npm i @capacitor-mlkit/barcode-scanning
```
To run the project in your local development server for app development and testing, i.e. through `localhost`:
```
ionic serve
```

For automated testing, Playwright provides an easy-to-use framework. To install:
```
npm install playwright
npx playwright install
```
Once installed, unit tests specified in `./test/example.spec.ts` is executable via:
```
npx playwright test
```

## Simulation on Android Device
Before proceeding, please ensure that **Java 17** and **Android Studio** are installed in your machine.

Make sure you have performed the steps above.

In the terminal, navigate to the **rollcall** folder.
Execute
```
ionic cap sync
ionic cap open
```

The latter will open Android Studio with this project. 
Wait for the loading bars on the lower right to finish, then you can press the 
```
Run 'app'
``` 
button in the upper middle part of the Android Studio window.

This should instantialize (or create) your android emulator.
Additionally, you can plug your own physical android device (make sure **Developer Options** and **USB Debugging** are ON)

IMPORTANT:
Every change in code, rerun
```
ionic cap sync
```
And then wait for the Android Studio loading bars again.
No need to close or reopen Android Studio.

