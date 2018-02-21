import React, { Component } from "react";
import Personal from "./components/personal";
import Work from "./components/work";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: [],
      descriptionErr: "",
      minutesErr: "",
      descriptionValid: false,
      minutesValid: false,
      type: "personal",
      description: "",
      minutes: ""
    };
  }
  handleValidations = e => {
    const target = e.target.name;
    const number = parseInt(e.target.value, 10);
    this.setState(
      {
        [target]: e.target.value
      },
      () => {
        if (this.state.description.length < 5) {
          this.setState({
            descriptionErr: "Description too short",
            descriptionValid: false
          });
        } else {
          this.setState({
            descriptionErr: "",
            descriptionValid: true
          });
        }
      }
    );
    if (!isNaN(number)) {
      if (number > 350 || number < 1) {
        this.setState({
          minutesErr: "minutes too short",
          minutesValid: false
        });
      } else {
        this.setState({
          minutesErr: "",
          minutesValid: true
        });
      }
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    let newWork = this.state.work.slice();
    newWork.push({
      type: this.state.type,
      description: this.state.description,
      minutes: this.state.minutes
    });
    this.setState({
      ...this.state,
      work: newWork
    });
  };
  tick() {
    let newTime = this.state.work.slice();
    newTime.map(value => {
      return value.minutes > 0 ? (value.minutes = value.minutes - 1) : null;
    });

    this.setState({
      ...this.state,
      work: newTime
    });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <div>
          <form onChange={this.handleValidations} onSubmit={this.handleSubmit}>
            <select name="type" value={this.state.personal}>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
            </select>
            <input
              name="description"
              type="text"
              required
              minLength="3"
              placeholder="description"
              value={this.state.description}
            />
            <input
              name="minutes"
              type="number"
              required
              value={this.state.minutes}
            />
            <br />
            <button
              type="submit"
              disabled={
                !this.state.minutesValid || !this.state.descriptionValid
              }
            >
              Submit
            </button>
          </form>

          <p>{this.state.descriptionErr}</p>
          <p>{this.state.minutesErr}</p>
        </div>
        <div>
          <Personal jobs={this.state.work} />
          <Work jobs={this.state.work} />
        </div>
      </div>
    );
  }
}

export default App;
