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
            // searchTerm: '',
            searchResults: [
                {
                    id: 1,
                    name: 'Hello',
                    artist: 'Adele',
                    album: 'Idk',
                    uri: 'uri 1'
                },
                {
                    id: 2,
                    name: 'Coffee',
                    artist: 'In need',
                    album: 'Mornings',
                    uri: 'uri 2'
                },
                {
                    id: 3,
                    name: 'Test',
                    artist: 'Yess',
                    album: 'Okay',
                    uri: 'uri 3'
                },
            ],
            playlistName: "My playlist",
            playlistTracks: [
                {
                    id: 3,
                    name: 'Test',
                    artist: 'Yess',
                    album: 'Okay',
                    uri: 'uri 3'
                }
            ]
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.searchSpotify = this.searchSpotify.bind(this);
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
            return;
        }
        const newPlaylistTracksArray = this.state.playlistTracks;
        newPlaylistTracksArray.push(track);
        this.setState({
            playlistTracks: newPlaylistTracksArray
        })
    }

    removeTrack(track) {
        const newPlaylistTracksArray = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
        this.setState({
            playlistTracks: newPlaylistTracksArray
        })
    }

    updatePlaylistName(newName) {
        this.setState({
            playlistName: newName
        })
    }

    savePlaylist() {
        const trackURIs = [];
        this.state.playlistTracks.forEach(track => {
            trackURIs.push("URIs: " + track.uri);
        })
        console.log(trackURIs); // TO DELETE !!!
    }

    searchSpotify(term) {
        const results = Spotify.search(term).then(results => {
            // console.log("results: " + JSON.stringify(results)); // TO DELETE !!!
            this.setState({
                searchResults: results
            })
        });
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