import * as React from 'react';
import logo from '../logo.png';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar main-nav">
                <div className="container">
                    <div className="navbar-brand">
                        <a className="navbar-item" href="/">
                            <img src={ logo } alt="logo" height="28" />
                            <span className="is-size-4">trebleclef</span>
                        </a>
                        <span className="navbar-burger burger" data-target="navbarMenuHeroA">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </div>
                    <div id="navbarMenuHeroA" className="navbar-menu">
                        <div className="navbar-end">
                            {/* <a className="navbar-item is-active">Home</a> */}
                            <span className="navbar-item">
                                <a className="button" href="https://github.com/josejeevan/trebleclef" target="_blank">
                                    <span className="icon">
                                        <i className="fab fa-github"></i>
                                    </span>
                                    <span>Github</span>
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
