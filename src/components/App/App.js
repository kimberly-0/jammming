import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [
                {
                    id: 1,
                    name: 'Hello',
                    artist: 'Adele',
                    album: 'Idk'
                },
                {
                    id: 2,
                    name: 'Coffee',
                    artist: 'In need',
                    album: 'Mornings'
                },
                {
                    id: 3,
                    name: 'Test',
                    artist: 'Yess',
                    album: 'Okay'
                },
            ],
            playlistName: "My playlist",
            playlistTracks: [
                {
                    id: 3,
                    name: 'Test',
                    artist: 'Yess',
                    album: 'Okay'
                }
            ]
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
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
    
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
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
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;