var AppDispatcher = require('../dispatcher/AppDispatcher');
var PageConstants = require('../constants/PageConstants');

var PageActions = {
  /** * @param {string} text */
  setPage: function(id, prayer) {
    AppDispatcher.handleViewAction({
      actionType: PageConstants.PAGE_SWITCH,
      id: id,
      prayer: prayer
    });
  },

  getActive: function() {
    AppDispatcher.handleViewAction({
      actionType: PageConstants.PAGE_ACTIVE
    });
  },

  updateSettings: function(id, updates) {
    AppDispatcher.handleViewAction({
      actionType: PageConstants.PAGE_UPDATE_SETTINGS,
      id: id,
      updates: updates
    });
  }
};

module.exports = PageActions;