
export enum SongVibes {
    relaxing = "Relaxing / Study / Chill",
    rave = "Rave / Party / Club",
    sad = "Sad / Melancholy / Nihilistic"
}

export const SongVibesChoices: { key : string, hint:string, valueOnChecked: SongVibes }[] = [
  { key : SongVibes.relaxing, 
    hint: SongVibes.relaxing, 
    valueOnChecked: SongVibes.relaxing
  },

  { key : SongVibes.rave, 
    hint: SongVibes.rave, 
    valueOnChecked: SongVibes.rave
  },

  { key : SongVibes.sad, 
    hint: SongVibes.sad, 
    valueOnChecked: SongVibes.sad
  },


];
