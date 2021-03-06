'use strict';

var PrayerItem = require('./prayerItem.jsx');
var PageActions = require('../actions/PageActions');
var uiEvents = require('../components/uiEvents');
var PrayerActions = require('../actions/PrayerActions');

var React = require('react'),

    PrayerList = React.createClass({
      _selectedItems: [],

      componentDidMount: function() {
        uiEvents.addDestroyListener(this._onDestroy);
        uiEvents.addTickListener(this._onTick);
      },

      componentWillUnmount: function() {
        uiEvents.removeDestroyListener(this._onDestroy);
        uiEvents.removeTickListener(this._onTick);
      },

      handleSelect: function (data) {
        this._selectedItems.forEach(function (item, idx) {
          if(item.id === data.id)
            this._selectedItems.splice(idx, 1);
        }.bind(this));

        if(data.checked) {
          this._selectedItems.push({id: data.id, complete: data.complete});
        }
      },

      handleTap: function (data) {
        if(!this.props.editMode) {
          PageActions.setPage("add", this.props.data[data.id]);
        }

      },

      _onDestroy: function () {
        PrayerActions.destroy(this._selectedItems);
        this._selectedItems = [];
        return true;
      },

      _onTick: function () {
        this._selectedItems.forEach(function (item) {
          PrayerActions.update(item.id, {complete: !item.complete});
        });
      },

      _handleAdd: function () {
        PageActions.setPage("add");
      },

      render: function() {
        var node;
        var prayerItems = [];
        var allPrayers = this.props.data;
        //console.log(allPrayers);
        for (var id in allPrayers) {
          prayerItems.push(<PrayerItem prayer={allPrayers[id]} onSelect={this.handleSelect} onTap={this.handleTap} />);
        }

        if (prayerItems.length > 0) {
          node =  <ul data-type={(this.props.editMode) ? "edit" : ""}>
                    {prayerItems}
                  </ul>
        } else {
          node =  <div className="center">
                    <div className="nice-padding">There are no prayer requests. Please add some!</div>
                    <button className="prayerz-button" onClick={this._handleAdd}>Add Prayer Request</button>
                  </div>
        }

        return (
          <section data-type="list" className="fit scroll">
            <header className="hide">{this.props.header}</header>
            {node}
          </section>
        );
      }
    });

module.exports = PrayerList;

