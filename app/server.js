module.exports = function(config) {

	"use strict";

	const
		HTTP_STOPPED = 1,
		HTTP_STARTED = 2;

	var
		mongoose = require("mongoose"),
		path = require("path"),
		http = require("http"),
		express = require("express"),
		app = express(),
		httpServer = http.createServer(app),
		io = require("socket.io")(httpServer),
		bodyParser = require("body-parser"),
		widgetAPIRouter = express.Router(),
		logger = require("./logger")(config.logger),
		WidgetModel = require("./models/widget"),
		httpServerStatus = HTTP_STOPPED;

	app.use("/api", bodyParser.json());

	io.on("connection", function(socket) {

		socket.on("log", function(data) {

			if (data.messageType === "error") {
        logger.error(data.message);
      } else {
        logger.info(data.message);
			}

		});

		socket.on("error", function() {
			console.log(arguments);
		});

	});

	widgetAPIRouter.get("/widgets", function(req, res) {

		WidgetModel.find({}, function(err, results) {
			if (err) {
				console.log(err);
				res.status(500).json(err);
				return;
			}
			res.json(results);
		});

	});

	widgetAPIRouter.get("/widgets/:widgetId", function(req, res) {

		res.status(500).end();
		return;

		WidgetModel.findById(req.params.widgetId,
			function(err, result) {
				if (err) {
					res.status(500).json(err);
					return;
				}
				res.json(result);
			});

	});

	widgetAPIRouter.post("/widgets", function(req, res) {

		var t = new WidgetModel(req.body);
		t.save(function(err, result) {
			if (err) {
				res.status(500).json(err);
				return;
			}
			res.json(result);
		});

	});

	widgetAPIRouter.put("/widgets/:widgetId", function(req, res) {

		WidgetModel.findByIdAndUpdate(req.params.widgetId,
			req.body,
			function(err, result) {
				if (err) {
					res.status(500).json(err);
					return;
				}
				res.json(req.body);
			});

	});

	widgetAPIRouter.delete("/widgets/:widgetId", function(req, res) {

		WidgetModel.findByIdAndRemove(req.params.widgetId,
			function(err, result) {
				if (err) {
					res.status(500).json(err);
					return;
				}
				res.json(result);
			});

	});

	app.use("/api", widgetAPIRouter);

	config.webServer.staticFolders.forEach(function(staticFolder) {
		app.use(staticFolder.url, express.static(
			path.join(config.webServer.wwwFolder, staticFolder.folder)));
	});

	app.use("/", function(req, res) {

		res.sendFile(config.webServer.defaultFile, function(err) {
			if (err) res.status(err.status).end();
		});

	});

	mongoose.connect("mongodb://" +
		config.mongoServer.host + ":" +
		config.mongoServer.port + "/" +
		config.mongoServer.dbName);

	return {
		start: function(callbackFn) {

			var error = null;

			try {

				if (httpServerStatus === HTTP_STARTED) {

					logger.info("web server listening on port " + config.webServer.port + " is already running");

				} else {

					logger.info("starting web server listening on port " + config.webServer.port);

					httpServer.listen(config.webServer.port, function() {
						httpServerStatus = HTTP_STARTED
						logger.info("started web server listening on port " + config.webServer.port);
					});

				}

		} catch(err) {

			error = err;

		} finally {

			if (callbackFn) {
				setImmediate(function() {
					callbackFn(error);
				});
			}

		}


		},
		stop: function(callbackFn) {

			var error = null;

			try {

				if (httpServerStatus === HTTP_STOPPED) {

					logger.info("web server listening on port " + config.webServer.port + " is already stopped");

				} else {

					logger.info("stopping web server listening on port " + config.webServer.port);

					httpServer.close(function() {
						httpServerStatus = HTTP_STOPPED;
						logger.info("stopped web server listening on port " + config.webServer.port);
					});

				}

			} catch(err) {

				error = err;

			} finally {

				if (callbackFn) {
					setImmediate(function() {
						callbackFn(error);
					});
				}

			}

		}
	}
}
