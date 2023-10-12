import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartShopping, faUser, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import logo from "../img/logoo.jpg"

export default function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand mx-3" href="#">
                    <img src={logo} width="60" height="60" alt="" />
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="col-8" style={{ minWidth: '1000px' }}>
                        <div className='d-flex justify-content-end'>
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" style={{ fontSize: 20 }} href="#"><FontAwesomeIcon icon={faUser} /></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" style={{ fontSize: 20 }} href="#"><FontAwesomeIcon icon={faCartShopping} /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
