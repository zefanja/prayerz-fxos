'use strict';
var PageStore = require('../stores/PageStore');
var PrayerStore = require('../stores/PrayerStore');
var TagStore = require('../stores/TagStore');
var TagActions = require('../actions/TagActions');
var PrayerActions = require('../actions/PrayerActions');
var PageActions = require('../actions/PageActions');
var uiEvents = require('../components/uiEvents');

var React = require('react'),

    AddPrayer = React.createClass({
      getInitialState: function () {
        return {
          title: "",
          tags: "",
          text: ""
        };
      },

      componentDidMount: function() {
        uiEvents.addDoneListener(this._onDone);
        this.handleProps(this.props);
      },

      componentWillUnmount: function() {
        uiEvents.removeDoneListener(this._onDone);
      },

      componentWillReceiveProps: function(nextProps) {
        this.handleProps(nextProps);
      },

      handleProps: function (inProps) {
        console.log(inProps.data);
        if(inProps.data) {
          this.setState({
            title: inProps.data.title,
            text: inProps.data.text,
            tags: TagStore.getTagText(inProps.data.tags)
          });
        } else {
          this.setState({
            title: "",
            tags: "",
            text: ""
          });
        }
      },

      handleTitle: function (e) {
        this.setState({title: e.target.value});
      },

      handleTags: function (e) {
        this.setState({tags: e.target.value});
      },

      handleText: function (e) {
        this.setState({text: e.target.value});
      },

      handleClearTitle: function () {
        this.setState({title: ""});
      },

      handleClearTags: function () {
        this.setState({tags: ""});
      },

      _onDone: function (e) {
        PageActions.setPage("main");
        if(!this.props.data) {
          PrayerActions.create(this.state.title, this.state.text, this.state.tags);
        } else {
          PrayerActions.update(this.props.data.id, {title: this.state.title, text: this.state.text, tags: TagStore.getTagIds(this.state.tags)});
        }
      },

      render: function() {
        return (
          <section role="region" className="fit scroll nice-padding">
            <form>
              <p>
                <input type="text" placeholder="Title" required="" value={this.state.title} onChange={this.handleTitle}/>
                <button type="reset" onClick={this.handleClearTitle}>Clear</button>
              </p>
              <p>
                <input type="text" placeholder="Tags" required="" value={this.state.tags} onChange={this.handleTags}/>
                <button type="reset" onClick={this.handleClearTags}>Clear</button>
              </p>
              <p>
                <textarea placeholder="Notes..." required="" value={this.state.text} onChange={this.handleText}></textarea>
              </p>
            </form>
          </section>
        );
      }
    });

module.exports = AddPrayer;
