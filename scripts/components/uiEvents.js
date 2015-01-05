var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var DONE_EVENT = 'done';
var DESTROY_EVENT = 'destroy';
var TICK_EVENT = 'tick';
var UPDATE_EVENT = 'update';

var uiEvents = assign({}, EventEmitter.prototype, {
  emitEvent: function(event) {
    this.emit(event);
  },

  addDoneListener: function(callback) {
    this.on(DONE_EVENT, callback);
  },

  removeDoneListener: function(callback) {
    this.removeListener(DONE_EVENT, callback);
  },

  addDestroyListener: function(callback) {
    this.on(DESTROY_EVENT, callback);
  },

  removeDestroyListener: function(callback) {
    this.removeListener(DESTROY_EVENT, callback);
  },

  addTickListener: function(callback) {
    this.on(TICK_EVENT, callback);
  },

  removeTickListener: function(callback) {
    this.removeListener(TICK_EVENT, callback);
  },

  addUpdateListener: function(callback) {
    this.on(UPDATE_EVENT, callback);
  },

  removeUpdateListener: function(callback) {
    this.removeListener(UPDATE_EVENT, callback);
  },

  done: function () {
    this.emitEvent(DONE_EVENT);
  },

  destroy: function () {
    this.emitEvent(DESTROY_EVENT);
  },

  tick: function () {
    this.emitEvent(TICK_EVENT);
  },

  updateSettings: function () {
    this.emitEvent(UPDATE_EVENT);
  }
});

module.exports = uiEvents;