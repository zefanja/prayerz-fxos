var AppDispatcher = require('../dispatcher/AppDispatcher');
var PrayerConstants = require('../constants/PrayerConstants');

var PrayerActions = {
	/** * @param {string} text */
	create: function(title, text, tags) {
		AppDispatcher.handleViewAction({
			actionType: PrayerConstants.PRAYER_CREATE,
			title: title,
			text: text,
			tags: tags
		});
	},

	destroy: function(ids) {
		AppDispatcher.handleViewAction({
			actionType: PrayerConstants.PRAYER_DESTROY,
			ids: ids
		});
	},
};

module.exports = PrayerActions;