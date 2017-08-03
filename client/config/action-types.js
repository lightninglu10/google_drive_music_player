/**
* Module where we declare all action types (Redux stuff)
* author: @
*/

module.exports = {
    // Song
    //SELECT_PREV_SONG_SUCCESSFUL: 'Successfully chose song',
    SELECT_SONG_SUCCESSFUL: 'Successfully chose song',
    
    // Playlist
    GET_LOCAL_SONGS_SUCCESSFUL: 'Successfully uploaded songs',
    ADD_LOCAL_SONG_SUCCESSFUL: 'Successfully added song to local playlist',
    DELETE_LOCAL_SONG_SUCCESSFUL: 'Successfully deleted song',
    ORDER_LOCAL_BY_NAME_SUCCESSFUL: 'Successfully ordered local playlist by name',
    ORDER_LOCAL_BY_TIME_SUCCESSFUL: 'Successfuly ordered local playlist by time',

    ADD_TO_QUEUE_SUCCESSFUL: 'Successfully added song to queue',
    REARRANGE_QUEUE_SUCCESSFUL: 'Successfully rearranged queue',

    GET_PLAYLISTS_SUCCESSFUL: 'Successfully get the list of playlists',
    CREATE_NEW_PLAYLIST_SUCCESSFUL: 'Successfully created new playlist',
    GET_PLAYLIST_SONGS_SUCCESSFUL: 'Successfully get playlist music',
    ADD_TO_PLAYLIST_SUCCESSFUL: 'Successfully added song to playlist',
    DELETE_FROM_PLAYLIST_SUCCESSFUL: 'Successfully deleted playlist song',
    ORDER_CUSTOM_BY_NAME_SUCCESSFUL: 'Successfully ordered custom playlist by name',
    CLEARPLAYLISTSONGS: 'Clear for new playlist',

    // Register User
    REGISTER_USER_SUCCESSFUL: "Register successful",

    // Request Login Action
    LOGIN_USER_SUCCESSFUL: "Logging in user",
    LOGOUT_USER_SUCCESSFUL: "Logging out user",

    // Error handling
    CAUGHT_ERROR_SUCCESSFUL: "Caught an error, check network error message",
}
