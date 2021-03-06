'use strict';
var PageActions = require('../actions/PageActions');
var uiEvents = require('../components/uiEvents');
var React = require('react'),

    Header = React.createClass({
      getInitialState: function () {
        return {
          title: "",
          back: false,
          cancel: false,
          add: false,
          done: false,
          right: false //fake placeholder
        };
      },

      componentDidMount: function () {
        this.handleProps(this.props);
      },

      componentWillReceiveProps: function(nextProps) {
        this.handleProps(nextProps);
      },

      handleProps: function (inProps) {
        switch(inProps.page.id) {
          case "main":
            this.setState({title: "PrayerZ", back: false, add: true, cancel: false, done: false, right: false});
            break;
          case "add":
            this.setState({title: (inProps.page.prayer) ? "Edit Prayer" : "Add Prayer", back: false, add: false, cancel: true, done: true, right: false});
            break;
          case "edit":
            this.setState({title: "Edit", back: false, add: false, cancel: true, done: false, right: true});
            break;
          case "settings":
            this.setState({title: "Settings", back: true, add: false, cancel: false, done: false, right: true});
            break;
          case "about":
            this.setState({title: "About", back: true, add: false, cancel: false, done: false, right: true});
            break;
        }
      },

      _handleAdd: function () {
        PageActions.setPage("add");
      },

      _handleAbout: function () {
        PageActions.setPage("about");
      },

      _handleCancel: function () {
        if(this.props.page.id === "settings") {
          uiEvents.updateSettings();
        }
        PageActions.setPage("main");
      },

      _handleDone: function () {
        uiEvents.done();
      },

      _handleSettings: function () {
        PageActions.setPage("settings");
      },

      render: function() {
        //console.log(this.state, this.props);
        return (
            <section role="region">
              <header>
                <a className={(this.state.add) ? "" : "hide"} onClick={this._handleAbout}><span data-icon="info"></span></a>
                <a className={(this.state.add) ? "" : "hide"}></a>
                <a href="#" className={(this.state.back) ? "" : "hide"} onClick={this._handleCancel}><span className="icon icon-back">back</span></a>
                <a href="#" className={(this.state.cancel) ? "" : "hide"} onClick={this._handleCancel}><span className="icon icon-close">close</span></a>
                <menu type="toolbar">
                  <button data-icon="settings" className={(this.state.add) ? "white" : "hide white"} onClick={this._handleSettings}></button>
                  <button className={(this.state.add) ? "" : "hide"} onClick={this._handleAdd}><span className="icon icon-add">add</span></button>
                  <button className={(this.state.done) ? "" : "hide"} onClick={this._handleDone}>done</button>
                  <a className={(this.state.right) ? "" : "hide"}></a>
                </menu>
                <h1>{this.state.title}</h1>
              </header>
            </section>
        );
      }
    });

module.exports = Header;
