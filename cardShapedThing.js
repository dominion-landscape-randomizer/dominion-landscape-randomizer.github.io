const cardType = Object.freeze({
    EVENT: Symbol('event'),
    LANDMARK: Symbol('landmark'),
    PROJECT: Symbol('project'),
    WAY: Symbol('way'),
    TRAIT: Symbol('trait'),
    PROPHESY: Symbol('prophesy')
})

class cardShapedThing{
    constructor(url, type){
        this.URL = url
        this.type = type
    }
    getURL(){
        return URL
    }
    getType(){
        return type
    }
}