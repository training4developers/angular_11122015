# Welcome to Advanced Angular.js!

## Class Information

Instructor: Eric Greene

Schedule:

	Thursday - Friday: 8:30am to 4:30pm

	Breaks:
		Lunch: Noon to 1pm
		Snack: 2pm to 2:15pm

Class Introductions...

## Importing Sample Data

Sample data is located in the **assets** folder.  To import, ensure your MongoDB is running, then type the following command:

```bash
$ mongoimport -d <name of your database> -c <name of your collection> --jsonArray ./assets/widgets-data.js
```

Note: the database and collection do **NOT** need to exist on the MongoDB server.  The import process will create them, if they do not exist.

## Starting the Web Application

The project uses Grunt. To run Grunt from the command line, ensure that the Node Package **grunt-cli** is installed globally.

From the root folder of the project, type the following command to run the web application.

```bash
$ grunt
```

## Angular.js Application

The **angular.js** library and related files were downloaded and installed with Bower in the **app/www/libs** folder.  The web application files you will be editing will be in the following folders:

**app/www** - HTML files
**app/js** - External JavaScript files
**app/tpl** - External Template files
