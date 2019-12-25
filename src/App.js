import React from 'react';
import axios from 'axios';
import './App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: '',
      date: new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-'),
      type: '',
      loader: true
    };
  }

  checkDate = date => {
    var d = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, '-');

    return date === d;
  };

  handleChange = d => {
    this.setState(
      {
        date: d
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, '-'),
        loader: true
      },
      () => {
        this.loadImage();
      }
    );
  };

  changeDate = num => {
    let d = new Date(this.state.date);
    d.setDate(d.getDate() + num);
    this.setState(
      {
        date: d
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, '-'),
        loader: true
      },
      () => {
        this.loadImage();
      }
    );
  };

  loadImage = async () => {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        date: this.state.date,
        hd: 'False',
        api_key: 'dYaN5pHy9g41RteCu4RGy8x6dTkOrpIjb9DtpZXm'
      }
    });

    this.setState({
      imageData: response.data,
      type: response.data.media_type,
      loader: false
    });
  };

  componentDidMount() {
    this.loadImage();
  }

  render() {
    return (
      <div>
        <nav class="navbar navbar-dark bg-primary">
          <span class="navbar-brand mb-0 h1">Astronomy Picture of the Day</span>
        </nav>
        <div className="container " style={{ width: '60rem' }}>
          <h6 className="text-center">
            Go To Any Past Date{'   '}
            <DatePicker
              id="dp"
              selected={new Date(this.state.date)}
              onChange={this.handleChange}
            />
          </h6>

          {this.state.loader ? (
            <div class="loader"></div>
          ) : (
            <div className="row">
              <h4>{this.state.imageData.title}</h4>
              {this.state.type === 'image' ? (
                <img
                  id="img"
                  src={this.state.imageData.url}
                  className="img-fluid"
                  alt="..."
                />
              ) : (
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="embed-responsive-item"
                    src={this.state.imageData.url}
                    allowfullscreen
                  />
                </div>
              )}

              <h5>Picture Descrpiption</h5>
              <p>{this.state.imageData.explanation}</p>
            </div>
          )}
        </div>

        <div className="buttn">
          <div id="prev" onClick={() => this.changeDate(-1)}>
            Previous Day
          </div>
          <div
            id="next"
            disabled={this.checkDate(this.state.date)}
            onClick={() => this.changeDate(1)}
          >
            Next Day
          </div>
        </div>
        <div class="footer text-center">
          <p>
            Made by{' '}
            <a href="https://www.linkedin.com/in/mangalprada-malaya-72930812a/">
              Mangalprada Malaya
            </a>
            . Get the source code from{' '}
            <a href="https://www.linkedin.com/in/mangalprada-malaya-72930812a/">
              here
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
}

export default App;
