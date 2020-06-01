import React from 'react';
import {Link} from 'react-router-dom';

// styles
import './styles/BadgesList.css';

class BadgesListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">
        <img
          className="BadgesListItem__avatar"
          src={this.props.badge.avatarUrl}
          alt={`${this.props.badge.firstName} ${this.props.badge.lastName}`}
        />

        <div>
          <strong>
            {this.props.badge.firstName} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.twitter}
          <br />
          {this.props.badge.jobTitle}
        </div>
      </div>
    );
  }
}

class BadgesList extends React.Component {
  render() {

    if(!this.props.badges.length) {
      return (
        <div>
          <h3>No se encontraron badges</h3>
          <Link to='/badges/new' className="btn btn-success">
            Agregar badge
          </Link>
        </div>
      )
    }

    return (
      <div className="BadgesList"> 
        <ul className="list-unstyled">
          {this.props.badges.map(badge => {
            return (
              <li key={badge.id}>
                <Link to={`badges/${badge.id}`} className="text-reset text-decotacion-none">
                  <BadgesListItem badge={badge} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default BadgesList;
