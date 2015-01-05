'use strict';
var React = require('react'),

    Confirm = React.createClass({
      render: function() {
        return (
          <form role="dialog" data-type="confirm" className={(this.props.show) ? "" : "hide"}>
            <section>
              <p>Are you sure you want to delete this prayer?</p>
            </section>
            <menu>
              <button onClick={this.props.onCancel}>Cancel</button>
              <button onClick={this.props.onDelete} className="danger">Delete</button>
            </menu>
          </form>
        );
      }
    });

module.exports = Confirm;
