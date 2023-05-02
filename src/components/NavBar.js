/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { channels } from './core/helpers';

const NavBar = () => {
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            ApiDocPro Editor
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse col-md-12 justify-content-center"
            id="navbarSupportedContent">
            <ul className="navbar-nav  mb-2 mb-lg-0 ">
              <li className="nav-item m-1">
                <a className="nav-link" href="https://apidocpro.com">
                  Homepage
                </a>
              </li>
              {channels.map((x) => {
                return (
                  <li key={x.key} className="nav-item m-1">
                    <Link className="nav-link" to={`/${x.key}`}>
                      {x.title}
                    </Link>
                  </li>
                );
              })}
              {/* extra
               */}
              <li className="nav-item m-1">
                <a className="nav-link" href="https://ui.apidocpro.com">
                  Documentation
                </a>
              </li>
              <li className="nav-item m-1">
                <a className="nav-link" href="https://reallexi.com">
                  RealLexi
                </a>
              </li>
              <li className="nav-item m-1">
                <a className="nav-link" href="https://getfreeapi.com">
                  GetFreeApi
                </a>
              </li>
              <li className="nav-item m-1">
                <a className="nav-link" href="https://ddkits.com">
                  DDKits
                </a>
              </li>
              <li className="nav-item  m-1">
                <a className="nav-link" href="https://apidocpro.com/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
