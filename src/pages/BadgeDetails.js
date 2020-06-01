import React from 'react';
import confLogo from '../images/platziconf-logo.svg';
import './styles/BadgeDetails.css';
import {Link} from 'react-router-dom';

import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import Badge from '../components/Badge';
import api from '../api';

class BadgeDetails extends React.Component {
    state = {
        loading: true,
        error: null,
        data: undefined
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({loading: true, error: null})
        try {
            const data = await api.badges.read(this.props.match.params.badgeId)
            this.setState({loading: false, data: data})
        } catch (error) {
            this.setState({loading: false, error: error})
        }
    }

    const 

    render () {

        if(this.state.loading) {
            return(
                <PageLoading />
            )
        }

        if(this.state.error) {
            return(
                <PageError />
            )
        }

        return(
            <div>
                <div className="BadgeDetails__hero">
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <img src={confLogo} alt='Logo de la Conferencia' />
                            
                            </div>
                            <div className="col-6 BadgeDetails__hero-attendant-name">
                                <h1>{`${this.state.data.firstName} ${this.state.data.lastName} `}</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mb-5">
                    <div className="row">
                        <div className="col">
                            <Badge 
                                firstName={this.state.data.firstName}
                                lastName={this.state.data.lastName}
                                email={this.state.data.email}
                                twitter={this.state.data.twitter}
                                jobTitle={this.state.data.jobTitle}
                            />
                        </div>
                        <div className="col">
                            <h2>Aciones</h2>
                            <div>
                                <Link className="btn btn-primary" to={`/badges/${this.state.data.badgeId}/edit`}>Editar</Link>
                            </div>

                            <div>
                                <button className="btn btn-danger">Delete</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default BadgeDetails;