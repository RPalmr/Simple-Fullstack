
export type UserProfileType = {
    uid: string,
    name : string,
    profilePicUrl : string,
    age: string,
    location:string,
    bio:string,
    contact:string,
    is_banned :  boolean
}

export const profileConverter = {
    toFirestore: (profile : UserProfileType) => {
        return {
            uid: profile.uid,
            name : profile.name ?? "",
            profilePicUrl : profile.profilePicUrl ?? "",
            age: profile.age ?? "",
            location: profile.location  ?? "",
            bio: profile.bio ?? "",
            contact: profile.contact ?? "",
            is_banned  : profile.is_banned ?? false
            };
    },
    fromFirestore: (snapshot : any, options : any) => {
        const profile = snapshot.data(options);
        return {
            uid: profile.uid,
            name : profile.name,
            profilePicUrl : profile.profilePicUrl,
            age: profile.age,
            location: profile.location,
            bio: profile.bio,
            contact: profile.contact,
            is_banned  : profile.is_banned
            };
    }
};

export const getEmptyProfile = ( uid : string) => {
    return {
        uid:uid, 
        name : "",
        profilePicUrl : "",
        age: "",
        location:"",
        bio:"",
        contact:"",
        is_banned : false
      };
}