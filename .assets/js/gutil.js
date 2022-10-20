

const gutil = {}
const debounceGates = {}
let debugMode = false;

gutil.enableDebugMode = function() {
    debugMode = true;
}

gutil.disableDebugMode = function() {
    debugMode = false;
}

gutil.debugPrint = function(...args) {
    if (debugMode) {
        console.log("[debug]", ...args);
    }
}
gutil.giveDebounce = function(f, delay) {
    const prevRef = debounceGates[f];
    if (prevRef && !prevRef.debounceGate) {
        this.debugPrint("function is debounced");
        return () => {};
    }

    const debRef = {debounceGate: true};
    debounceGates[f] = debRef;

    return function(...args) {
        if (debRef.debounceGate) {
            debRef.debounceGate = false;
            debRef.func = f;
            debRef.func(...args);
            if (delay) {
                debRef.timeout = setTimeout(() => {
                    debRef.debounceGate = true;
                }, delay*1000);
            }
        }
    }
}

gutil.cancelDebounce = function(f) {
    const ref = debounceGates[f];
    if (ref.timeout) clearTimeout(ref.timeout);
    ref.debounceGate = true;
}

gutil.getDebounce = function(f) {
    return debounceGates[f];
}

gutil.randomInt = function(min, max) {
    if (!max) { max = min; min = 0; }
    let rand = Math.random();
    return min + Math.floor((max - min)*rand + 0.5);
}

gutil.randomizeArray = function(array) {
    for (let i = 0; i < array.length; i++) {
        let randIndex = this.randomInt(i, array.length - 1);
        [array[i], array[randIndex]] = [array[randIndex], array[i]];
    }
    return array;
}

gutil.weakCloneArray = function(array) {
    let newArray = [];
    for (let i = 0; i < array.length; ii++) {
        newArray[i] = array[i];
    }
    return newArray;
}

gutil.getRandomIndex = function(array) {
    return array[this.randomInt(array.length - 1)];
}

export default gutil;