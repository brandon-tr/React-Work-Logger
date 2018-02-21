import React, { Component } from "react";

class Work extends Component {
  sortMinutes = (a, b) => {
    return b.minutes - a.minutes;
  };
  render() {
    let totalTime = 0;
    let greaterTime = this.props.jobs.sort(this.sortMinutes);
    const work = Object.keys(this.props.jobs).map((value, idx) => {
       this.props.jobs[value].type === "work"
        ? totalTime === 0
          ? (totalTime = this.props.jobs[value].minutes)
          : (totalTime =
              parseInt(totalTime, 10) +
              parseInt(this.props.jobs[value].minutes, 10))
        : null;
      return this.props.jobs[value].type === "work" ? (
        <div key={idx}>
          {greaterTime[value].minutes}
          {this.props.jobs[value].description}
        </div>
      ) : null;
    });
    return (
      <div>
        <p>Personal {totalTime}</p> <br />
        {work}
      </div>
    );
  }
}

export default Work;
