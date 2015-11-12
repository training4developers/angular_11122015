"use strict";

var
	path = require("path"),
	appContentFolder = path.join(process.cwd(), "app", "www"),
	app = require("./app/server")({
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
      dbName: "t4dclass"
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
	}),
	cleanUpCalled = false;

app.start();

function cleanUp() {
	if (!cleanUpCalled) {
		cleanUpCalled = true;
		app.stop(function() {
		  console.log("app server exiting...");
			process.exit();
		});
	}
}

process.on('exit', cleanUp);
process.on('SIGINT', cleanUp);
process.on('uncaughtException', cleanUp);
