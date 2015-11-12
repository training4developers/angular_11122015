var
	mongoose = require("mongoose"),

widgetSchema = mongoose.Schema({
	name: String,
	description: String,
	color: String,
	size: String,
	quantity: Number
}),

WidgetModel = mongoose.model("widget", widgetSchema);

module.exports = WidgetModel;
