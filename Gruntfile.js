module.exports = function(grunt) {

	"use strict";

	var
		path = require("path"),
		appContentFolder = path.join(process.cwd(), "app", "www"),
		server = require("./app/server");

	grunt.initConfig({
		webServer: {
			port: 8080,
			wwwFolder: appContentFolder,
			defaultFile: path.join(appContentFolder, "index.html"),
			staticFolders: [
				{ url: "/libs", folder: "libs" },
				{ url: "/tpl", folder: "tpl" },
				{ url: "/js", folder: "js" },
				{ url: "/css", folder: "css" }
			]
		},
    mongoServer: {
      host: "localhost",
      port: 27017,
      dbName: "CDC"
    },
    logger: {
      transports: {
        console: {
          level: "debug",
          colorize: true,
          timeStamp: true
        },
        file: {
          level: "debug",
          fileName: path.join(process.cwd(), "logs", "app.log"),
          timeStamp : true
        }
      }
    }
	});

	grunt.registerTask("default", "start web server", function() {

		var
			app = server(grunt.config());

		this.async();

		app.start();

	});

};
