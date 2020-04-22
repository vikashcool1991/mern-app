import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { faSearch, faBell, faUser, faBook, faFileVideo, faVolleyballBall, faBlog, faLeaf, faPowerOff, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css';

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
                            <li><a href="#"><FontAwesomeIcon icon={faSearch}/></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faBell}/></a></li>
                            <li><a href="#"><FontAwesomeIcon icon={faUser}/></a></li>
                            <li><a href="#" onClick={this.handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/></a></li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar">
                    <ul>
                        <li>
                            <a href="#">
                                <span className="icon"><FontAwesomeIcon icon={faBook} aria-hidden='true' /></span>
                                <span className="title">Books</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="active">
                                <span className="icon"><FontAwesomeIcon icon={faFileVideo} aria-hidden='true' /></span>
                                <span className="title">Movies</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><FontAwesomeIcon icon={faVolleyballBall} aria-hidden='true' /></span>
                                <span className="title">Sports</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><FontAwesomeIcon icon={faBlog} aria-hidden='true' /></span>
                                <span className="title">Blogs</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><FontAwesomeIcon icon={faLeaf} aria-hidden='true' /></span>
                                <span className="title">Nature</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="main_container">
                    <div className="item">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut sapiente adipisci nemo atque eligendi reprehenderit minima blanditiis eum quae aspernatur!
                    </div>
                    <div className="item">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut sapiente adipisci nemo atque eligendi reprehenderit minima blanditiis eum quae aspernatur!
                    </div>
                    <div className="item">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut sapiente adipisci nemo atque eligendi reprehenderit minima blanditiis eum quae aspernatur!
                    </div>
                    <div className="item">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut sapiente adipisci nemo atque eligendi reprehenderit minima blanditiis eum quae aspernatur!
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;