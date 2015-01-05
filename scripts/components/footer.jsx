'use strict';
var uiEvents = require('../components/uiEvents');
var Confirm = require('../components/confirm.jsx');
var React = require('react'),

    Footer = React.createClass({
      getInitialState: function () {
        return {
          confirm: false
        };
      },

      _handleConfirm: function () {
        this.setState({confirm: true});
      },

      _handleCancel: function () {
        this.setState({confirm: false});
      },

      _handleDelete: function () {
        uiEvents.destroy();
        this.setState({confirm: false});
      },

      _handleComplete: function () {
        uiEvents.tick();
      },

      render: function() {
        var node;
        if(this.props.editMode) {
          node =  <footer role="toolbar">
                    <button data-icon="delete" onClick={this._handleConfirm}></button>
                    <button data-icon="tick" onClick={this._handleComplete}></button>
                    <Confirm onDelete={this._handleDelete} onCancel={this._handleCancel} show={this.state.confirm} />
                  </footer>;
        } else {
          node =  <footer role="toolbar" className={(this.props.hide) ? "hide" : ""}>
                    <div className="fit"></div>
                    <button data-icon="edit" onClick={this.props.onEditMode}></button>
                  </footer>;
        }
        return (
          node
        );
      }
    });

module.exports = Footer;
