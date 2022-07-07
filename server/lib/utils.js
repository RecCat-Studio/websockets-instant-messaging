export const stringToJson = (string) => {
    try {
        return JSON.parse(string);
    } catch (err) {
        return err.message;
    }
}

export const jsonToString = (json) => {
    try {
        return JSON.stringify(json);
    } catch (err) {
        return err.message;
    }
}