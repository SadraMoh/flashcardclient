![Applicatin Logo](https://github.com/CedricMoore/flashcardclient/blob/master/src/assets/icon/favicon.png?raw=true)

# flashcardclient
A simple mobile flashcard application written in typescript using Angular and Ionic.
Gets its data from a deployed webapi and stores them in a database so the application can work offline.
Requires a premium account for full access to all the available content.

### Platforms
As with any other application made with Ionic, this software can run as a native app on Android and IoS mobile devices, or as a website on the wrold-wide-web.

### Auth
Basic JWT authentication.

### Payments
Nextpay gateway api is used to handle payments.

### Technologies
- Angular 12 & RxJs
- Ionic 4 & Capacitor

### Lanugages
- Scss
- Typescript
- HTML

### Tools
- VSCode
- Android Studio
- Git

**Serve**  
` ionic serve `

**Deploy on device**  
` ionic build `  
` ionic capacitor sync `  
and then open the built folder in AndroidStudio and deploy the project either on an emulator or a mobile device using gradle.  


- this project was a client order
