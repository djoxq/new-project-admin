import en from '../strings/en';

class StringsService {

    // Component where strings service instance has been initialised
    componentName;

    // Default language
    language  = 'en';
    languages = {};

    // Strings map
    strings = new Map();

    constructor() {
        this.languages = {en};
        this.loadStrings(this.languages[this.language]);
    }

    get(string, params = {}) {
        let value = this.strings.get(string);
        return this.replaceParams(value, params);
    }

    getLanguage() {
        return this.language;
    }

    setLanguage(language) {
        this.language = language;
    }

    setComponentName(name) {
        this.componentName = name;
    }

    setComponent(component) {
        this.setComponentName(component.constructor.name);
    }

    loadStrings(strings, prefix = '') {
        for (let key in strings) {
            let nextPrefix = (prefix === '') ? key : prefix + '.' + key;

            if (typeof strings[key] === 'object') {
                this.loadStrings(strings[key], nextPrefix);
            } else {
                this.strings.set(nextPrefix, strings[key]);
            }
        }
    }

    static replaceParams(string, params) {
        let result = string;
        for (let key in params) {
            result = result.replace('{' + key + '}', params[key]);
        }
        return result;
    }

}

export default new StringsService();