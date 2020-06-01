import React from 'react';

import './styles/Home.css';
import notFoundImage from '../images/404.svg';

function NotFound() {
  return (
    <div className="Home">
    <div className="container">
      <div className="row">
        <div className="Home__col col-12 col-md-6">
          <img
            src={notFoundImage}
            alt="Platzi Conf Logo"
            className="img-fluid mb-2"
          />
        </div>
      </div>
    </div>
    </div>

  )
}

export default NotFound;
