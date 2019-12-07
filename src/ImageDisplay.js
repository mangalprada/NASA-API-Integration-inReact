import React from 'react';

const ImageDisplay = props => {
  return (
    <div className="card" style={{ width: '60rem' }}>
      <img src={props.data.url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h2 className="card-title">{props.data.title}</h2>
        <h5 className="card-title">{props.data.date}</h5>
        <p className="card-text">{props.data.explanation}</p>
        <div className="card-body">
          <a href="#" className="card-link" onClick={() => props.func(1)}>
            Next Day
          </a>
          <a href="#" className="card-link" onClick={() => props.func(-1)}>
            Previous Day
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
