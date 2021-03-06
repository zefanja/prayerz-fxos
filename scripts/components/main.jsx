'use strict';

var Header = require("./header.jsx");
var PrayerList = require("./prayerList.jsx");
var AddPrayer = require("./add.jsx");
var Footer = require("./footer.jsx");
var About = require("./about.jsx");
var Settings = require("./settings.jsx");
var PageStore = require('../stores/PageStore');
var PrayerStore = require('../stores/PrayerStore');
var PageActions = require('../actions/PageActions');

var weekDays=["sunday","monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

var React = require('react'),
    Main = React.createClass({
      getInitialState: function () {
        return {
          prayers: PrayerStore.getAll(),
          activePage: PageStore.getActive(),
          editMode: false,
          settings: PageStore.getSettings()
        };
      },

      componentDidMount: function() {
        PageStore.addChangeListener(this._onChange);
        PrayerStore.addChangeListener(this._onPrayerChange);
        this.getPrayers();
      },

      componentWillUnmount: function() {
        PageStore.removeChangeListener(this._onChange);
        PrayerStore.removeChangeListener(this._onPrayerChange);
      },

      getPrayers: function () {
        //console.log(this.state.settings);
        var showCompleted = (this.state.settings.showCompleted && this.state.settings.showCompleted.value) ? this.state.settings.showCompleted.value : false;
        var today = weekDays[new Date().getDay()];
        if(this.state.settings.daysOfWeek && this.state.settings.daysOfWeek[today].length !== 0) {
          var prayers = PrayerStore.getByTagId(this.state.settings.daysOfWeek[today], showCompleted);
          this.setState({prayers: prayers});
        } else {
          this.setState({prayers: PrayerStore.getAll(showCompleted)});
        }
      },

      render: function() {
        var page;
        switch(this.state.activePage.id) {
          case "main":
          case "edit":
            page = <PrayerList editMode={this.state.editMode} data={this.state.prayers}/>;
            break;
          case "add":
            page = <AddPrayer data={this.state.activePage.prayer}/>;
            break;
          case "settings":
            page = <Settings />;
            break;
          case "about":
            page = <About />;
            break;
        }

        return (
          <section className="vbox fit scroll">
            <Header page={this.state.activePage}/>
            {page}
            <Footer
              onEditMode={this._onEditMode}
              editMode={this.state.editMode}
              hide={
                (Object.keys(this.state.prayers).length === 0 ||
                  this.state.activePage.id === "add" ||
                  this.state.activePage.id === "about" ||
                  this.state.activePage.id === "settings") ?
                true : false
              }
            />
          </section>

        );
      },

      _onChange: function() {
        var active = PageStore.getActive();
        if(active.id === "main") {
          this.setState({editMode: false, activePage: active});
          this.getPrayers();
        } else {
          this.setState({activePage: active});
        }
      },

      _onEditMode: function () {
        this.setState({editMode: true});
        PageActions.setPage("edit");
      },

      _onPrayerChange: function () {
        this.getPrayers();
      }
    });

module.exports = Main;
