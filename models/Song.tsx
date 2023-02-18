
export type SongType = {
    id:string,
    uid: string,
    name : string,
    songUrl : string,
    features: string,
    about:string,
    vibe:string,
}

export const songConverter = {
    toFirestore: (song : SongType) => {
        return {
            id: song.id ?? "",
            uid: song.uid,
            name : song.name ?? "",
            songUrl : song.songUrl ?? "",
            features: song.features ?? "",
            about: song.about  ?? "",
            vibe: song.vibe ?? "",
            };
    },
    fromFirestore: (snapshot : any, options : any) => {
        const song = snapshot.data(options);
        return {
            id: song.id,
            uid: song.uid,
            name : song.name,
            songUrl : song.songUrl,
            features: song.features,
            about: song.about,
            vibe: song.vibe,
            };
    }
};

export const getEmptySong = ( uid : string) => {
    return {
        id:"",
        uid:uid, 
        name : "",
        songUrl : "",
        features: "",
        about:"",
        vibe:"",
      };
}