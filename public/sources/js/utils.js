define([], function() {
    return {
        clamp: function (val, min, max) {
            return Math.max(min, Math.min(max, val))
        }
    }
});