# Welcome to Advanced Angular.js!

## Class Information

Instructor: Eric Greene

Schedule:

	Thursday - Friday: 8:30am to 4:30pm

	Breaks:
		Lunch: Noon to 1pm
		Snack: 2pm to 2:15pm

Class Introductions...

## Fork It!

To get started, fork this repo, then clone it to your local computer.

## Importing Sample Data

Sample data is located in the **assets** folder.  To import, ensure your MongoDB is running, then type the following command:

```bash
$ mongoimport -d t4dclass -c widgets --jsonArray ./assets/widgets-data.js
```

Note: the database and collection do **NOT** need to exist on the MongoDB server.  The import process will create them, if they do not exist.

## Starting the Web Application

The project uses Grunt. To run Grunt from the command line, ensure that the Node Packages **grunt-cli** and **bower** are installed globally. To install them globally, run the following command:

```bash
$ sudo npm install -g grunt-cli bower
```
Note: On Windows, **sudo** should be omitted.

Next, the project's NPM and Bower packages need to be installed. From the project folder, run the following commands in your terminal:

```bash
$ npm install
$ bower install
```

From the root folder of the project, type the following command to run the web application.

```bash
$ grunt
```

The output of the **grunt** command should look like this (timestamps will be different):

```bash
Running "default" task
2015-11-12T13:49:13.708Z - info: starting web server listening on port 8080
2015-11-12T13:49:13.713Z - info: started web server listening on port 8080
```

## Angular.js Application

The **angular.js** library and related files were downloaded and installed with Bower in the **app/www/libs** folder.  The web application files you will be editing will be in the following folders:

- **app/www** - HTML files
- **app/js** - External JavaScript files
- **app/tpl** - External Template files
