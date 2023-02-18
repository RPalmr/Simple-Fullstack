export const setSelectedChoice = (currentChoices, newChoiceKey) => {
    let modifiedChoices = { ...currentChoices }
    for (const [key, item] of Object.entries(modifiedChoices)) {
        item.isSelected = (key == newChoiceKey)
    }
    return modifiedChoices
}

export const getSelectedChoice = (defaultChoice, choices, getKeyNotValue) => {
    let selected = defaultChoice;
    for (const [key, item] of Object.entries(choices)) {
        if (item.isSelected){
            selected = getKeyNotValue? key : item.value;
            break;
        }
    }
    return selected;
}

export const saveToLocalStorage = (key, data) => {
    if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(data));
        return true;
    }else{
        return false;
    }
}

export const getFromLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        return JSON.parse(window.sessionStorage.getItem(key));
    }else{
        return null;
    }
    
}