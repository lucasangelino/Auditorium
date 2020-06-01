import React from 'react';

import './styles/BadgeEdit.css';
import header from '../images/badge-header.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';

import api from '../api';

class BadgeEdit extends React.Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    },
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }, 
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({loading: true, error: null})
    try {
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({loading: false})

      this.props.history.push('/badges');
    } catch (error) {
      this.setState({loading: false, error: error })
    }
  }

  componentDidMount () {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({loading: true, error: null})
    try {
      const data = await api.badges.read(this.props.match.params.badgeId)
      this.setState({loading: false, form: data})
    } catch (error) {
      this.setState({loading: false, error: error})      
    }
    
  }

  render() {

    if(this.state.loading){
      return(
        <PageLoading />
      )
    }

    return (
      <React.Fragment>
        <div className="BadgeEdit__hero">
          <img className="img-fluid" src={header} alt="Logo" />
        </div>

        <div className="container">
          <div className="row"> 
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || 'Nombre'}
                lastName={this.state.form.lastName || 'Apellido'}
                twitter={this.state.form.twitter || 'Twitter'}
                jobTitle={this.state.form.jobTitle || 'Hero'}
                email={this.state.form.email || 'superhero@gmail.com'}
                avatarUrl="https://www.gravatar.com/avatar/21594ed15d68ace3965642162f8d2e84?d=identicon"
              />
            </div>

            <div className="col-6">
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}               
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
