import React from 'react';
import ContentResults from './ContentResults';
import ContentPlayer from './ContentPlayer';

const ContentContainer = () => {
    return (
        <div className="container-content">
            {/* Nav Bar */}
            <nav>
                <div class="logo-wrapper">
                    <img
                        className="logo-image"
                        src="https://www.createmusic.com/wp-content/themes/Avada-Child-Theme/images/CM-logo-final-white_wide.svg"
                        alt="CREATE MUSIC APP"
                    />
                </div>
                <ul className="menu-profile">
                    <li id="login">Login</li>
                    <li id="menu">Menu</li>
                    <li id="icon">
                        <i className="fas fa-user-circle fa-2x"></i>
                    </li>
                </ul>
            </nav>
            {/* Main Container */}
            <section className="content-main">
                <header className="content-filter">
                    <h3>
                        Search Results <span id="num-results"></span>
                    </h3>
                    <ul id="content-filters" className="content-filter-list">
                        <li className="filter-active" id="filter-tracks">
                            Tracks
                        </li>
                        <li id="filter-albums">Albums</li>
                        <li id="filter-favorites">Favorites</li>
                        <li id="filter-playlists">Playlists</li>
                    </ul>
                </header>
                <hr className="content-separator" />
                {/* Main Container */}
                <ContentResults />
                <hr className="content-separator" />
                {/* Actual Player */}
                <ContentPlayer />
            </section>
        </div>
    );
};

export default ContentContainer;
