import React from 'react';
import axios from 'axios';
import ImageDisplay from './ImageDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageData: '', date: new Date() };
  }

  changeDate = num => {
    let d = this.state.date;
    d.setDate(d.getDate() + num);
    console.log(this.state);
    this.setState({ ...this.state, date: d });
    console.log(this.state);
  };

  formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  loadImage = async () => {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        date: this.formatDate(this.state.date),
        hd: 'False',
        api_key: 'fKFSbZqvMybGPwvwcna8wjVKM3GxMO4YLg5F0L5c'
      }
    });
    this.setState({ ...this.state, imageData: response.data });
  };

  componentDidMount() {
    this.loadImage();
  }
  componentWillUpdate() {
    this.loadImage();
  }

  render() {
    return (
      <div>
        <ImageDisplay data={this.state.imageData} func={this.changeDate} />
      </div>
    );
  }
}

export default App;
