export const clipToLength = (str, lastIndex) => {
    let clipped = str.substring(0, lastIndex);
    if (str.length > lastIndex) return clipped + "...";
    else return clipped;
};