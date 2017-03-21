LUCAS WERNER's APPLICATION

Instructions:
1) npm install  -- to install all the npm dependencies
2) npm start    -- to compile and execute a localserver that runs on port 3000 with our app (dist folder)

Structure:

1) src folder:
  Contains the source code of the application.
  1.1) data folder:
    Contains the files that we use to simulate the API call.
  1.2) js folder:
    Contains the JS files of the project
      1.2.1) libs folder:
        JS files for the libs used in the application.
  1.3) scss folder:
      Contains the scss and css files used in the application.
  1.4) index.html file:
    Entry point of the application.

2) dist folder:
  Contains the compiled source of the application.

3) .babelrc:
  Contains the presets of the babel tool.

4) gulp_config.js:
  Contains the main configuration of the gulpfile.

5) gulpfile.js:
  Contains the tasks needed to create the compiled code.

6) package.json:
  File generated throught the npm command tool and contains the dependencies needed to execute the application.



Considerations:

- I try to use ES6 features. It implies that I had to use babelify and browserify to make the code readable for actual browsers.

- All the code is thought to be maintenable and scalable although it has a lot of pending improvements, but because of the time I decided to make only the main things.

- It's pending to create the user's test (which could be implemented for example in Mocha)
