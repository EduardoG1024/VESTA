# VESTA
- What is **VESTA**?
    - VESTA is a web application where you and others can upload images and videos to create a gallery.
    - VESTA will have a simple UI(User Interface) for a better UX(User Experience).
- PAGES OF VESTAS
    - VESTA includes some pages like: home/index, saved images, upload images, registrate user, options
    - Those are some pages that VESTA is including for now
    - VESTA **HOME**
    - VESTA home or index is the first page where the user will see if he goes to the website.
    - VESTA **SAVED**
    - VESTA saved is a section where the user can see all the images or video that he saved before.
    - VESTA **UPLOADS**
    - VESTA uploads is a form where the user can select a photo or video from its device and then upload it.
    - VESTA **LOG-IN**
    - VESTA log-in is the page where the user can create an account to have more options in the **VESTA** app.
    - VESTA **OPTIONS**
    - VESTA options are the tools to modify the **VESTA** app like: theme color, font, profile picture, etc. 

## TECHNICAL DOCUMENTATION
- VESTA is a web application developed with:
    - **FronEnd**
    - HTML / CSS / JavaScript
    - **BackEnd**
    - NodeJs / Express / Multer / Express-Session / Express-Rate-Limit
    - **Hosting**
    - Ubuntu Server / PM2

## CAN I HAVE MY OWN PRIVATE VESTA SERVER?
- YES!!! you can have your own private VESTA by following the next steps.
- NOTE: this will be an app installed with Ubuntu Server, if you are using Windows or MAC the installation can be a little different.
- You can follow the next steps to install your own **Private Home Cloud (VESTA)**

## INSTALLATION VESTA ON UBUNTU SERVER (LOCAL / HOME)
- Install dependences:
    
``` bash
    npm i express
    npm i multer
    npm i express-rate-limit
    npm i express-session
    npm i dotenv
    npm i @supabase/supabase-js (OPTIONAL, SUPABASE IS USED FOR REGISTER USERS)
    npm i pm2 -g
```

- 