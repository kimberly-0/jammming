import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: "My playlist",
            playlistTracks: []
        }

        this.searchSpotify = this.searchSpotify.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
    }

    searchSpotify(term) {
        Spotify.search(term).then(results => {
            this.setState({searchResults: results});
        });
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        const newPlaylistTracksArray = this.state.playlistTracks;
        newPlaylistTracksArray.push(track);
        this.setState({playlistTracks: newPlaylistTracksArray});
    }

    removeTrack(track) {
        const newPlaylistTracksArray = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
        this.setState({playlistTracks: newPlaylistTracksArray});
    }

    updatePlaylistName(newName) {
        this.setState({playlistName: newName});
    }

    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(track => track.uri);
        try {
            Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
                this.setState({
                    playlistName: 'New Playlist',
                    playlistTracks: []
                });
            });
        } catch(error) {
            console.log(error.message);
        }
    }
    
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar
                        onSearch={this.searchSpotify} 
                    />
                    <div className="App-playlist">
                        <SearchResults 
                            searchResults={this.state.searchResults} 
                            onAdd={this.addTrack} 
                        />
                        <Playlist 
                            playlistName={this.state.playlistName} 
                            playlistTracks={this.state.playlistTracks} 
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName} 
                            onSave={this.savePlaylist} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;