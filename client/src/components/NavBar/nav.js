import React, { Component } from 'react';
import { Route, Link, Switch} from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { 
    faSearch,
    faBell, 
    faUser, 
    faVolleyballBall, faBlog, faLeaf, faSignOutAlt,
    faChartBar,
    faCommentDots
 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css';
import routes from '../../routes';

@inject('authStore') 
@inject('registerStore') 
@observer
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        document.querySelector('.hamburger').addEventListener('click', function() {
            document.querySelector('.wrapper').classList.toggle('collapse');
        });
    }

    async handleLogout(e){
        e.preventDefault();
        await this.props.authStore.logout();
    }

    render(){
        return (
            <div className="wrapper">
                <div className="top_navbar">
                    <div className="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className="top_menu">
                        <div className="logo">Coding Market</div>
                        <ul>
                            <li><a href=""><FontAwesomeIcon icon={faSearch}/></a></li>
                            <li><a href=""><FontAwesomeIcon icon={faBell}/></a></li>
                            <li><a href=""><FontAwesomeIcon icon={faUser}/></a></li>
                            <li><a href="" onClick={this.handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/></a></li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/dashboard" className="active">
                                <span className="icon"><FontAwesomeIcon icon={faChartBar} aria-hidden='true' /></span>
                                <span className="title">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/chat">
                                <span className="icon"><FontAwesomeIcon icon={faCommentDots} aria-hidden='true' /></span>
                                <span className="title">Chat</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <span className="icon"><FontAwesomeIcon icon={faVolleyballBall} aria-hidden='true' /></span>
                                <span className="title">Sports</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <span className="icon"><FontAwesomeIcon icon={faBlog} aria-hidden='true' /></span>
                                <span className="title">Blogs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="">
                                <span className="icon"><FontAwesomeIcon icon={faLeaf} aria-hidden='true' /></span>
                                <span className="title">Nature</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="main_container">
                    <Switch>
                        {
                            routes.map((route,index)=> (
                                <Route key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.main />}
                                />
                            ))
                        }
                    </Switch>                    
                </div>
            </div>
        );
    }
}

export default Navbar;