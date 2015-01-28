'use strict';
var TagStore = require('../stores/TagStore');
var React = require('react'),

    PrayerItem = React.createClass({
      getInitialState: function () {
        return {
          checked: ""
        };
      },

      componentWillReceiveProps: function(nextProps) {
        this.setState({checked: ""});
      },

      handleSelect: function (e) {
        this.setState({checked: e.target.checked});
        this.props.onSelect({checked: e.target.checked, id: this.props.prayer.id, complete: this.props.prayer.complete});
      },

      handleTap: function (e) {
        this.props.onTap({id: this.props.prayer.id});
      },

      render: function() {
        var prayer = this.props.prayer;
        return (
          <li onClick={this.handleTap}>
            <label className="pack-checkbox">
              <input type="checkbox" checked={this.state.checked} onChange={this.handleSelect}/>
              <span></span>
            </label>
            <div>
              {prayer.title}
              <span className={(prayer.complete) ? "tick": "hide"} data-icon="tick"></span>
            </div>
            <div className="small">{prayer.text}</div>
            <div className="small light-font italic">{TagStore.getTagText(prayer.tags)}</div>
          </li>
        );
      }
    });

module.exports = PrayerItem;
