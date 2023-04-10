let userAccessToken = '';
const clientID = ''; // Client ID here
const redirectURI = 'http://jammming-codecademy-kim.surge.sh/';

const Spotify = {
    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        // Check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            userAccessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // This clears the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public user-library-modify&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
            throw new Error('Playlist name or tracks cannot be empty');
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userID;

        // Retrieve user ID
        return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(response => response.json()
        ).then(jsonResponse => {
            userID = jsonResponse.id;

            // Create new playlist and retrieve playlist ID
            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ name: playlistName })
            }).then(response => response.json()).then(jsonResponse => {
                const playlistID = jsonResponse.id;

                // Add tracks to new playlist
                return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ uris: trackURIs })
                });
            });
        });
    }
}

export default Spotify;