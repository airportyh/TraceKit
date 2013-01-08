/*global describe:false it:false TraceKit:false expect:false waitsFor:false runs:false jasmine:false */

function absPath(path){
    return location.protocol + '//' + location.host + path;
}

function a(ctr){
    return jasmine.any(ctr);
}

// Find a stack frame based on whether its context contains the given line of code
// in `matchCode`
function findFrameThrown(stack, matchCode){
    for (var i = 0, len = stack.length; i < len; i++){
        var frame = stack[i];
        var context = frame.context;
        for (var j = 0; j < context.length; j++){
            var line = context[j];
            if (line.indexOf(matchCode) !== -1){
                // matched the code!
                return frame;
            }
        }
    }
    return null;
}

describe('TraceKit', function(){
    
    it('can subscribe/report', function(){
        try{
            throw new Error("Boom!");
        }catch(e){
            // report asynchronously so that the exception doesn't get
            // caught by the test runner
            setTimeout(function(){
                TraceKit.report(e);
            }, 0);

            // wait for TraceKit to report the exception
            var stackInfo; waitsFor(function(){ return stackInfo; });
            TraceKit.report.subscribe(function(si){
                stackInfo = si;
                //console.log(JSON.stringify(stackInfo, null, '  '));
            });

            runs(function(){
                // verify properties on the stackInfo object
                expect(stackInfo.url).toBe(location.href);
                expect(stackInfo.message).toBe('Boom!');
                expect(stackInfo.name).toBe('Error');
                expect(stackInfo.stack).toEqual(a(Array));
                expect(stackInfo.useragent).toBe(navigator.userAgent);

                // find the frame where the error was thrown by
                // matching against the code that threw the error
                var frameThrown = findFrameThrown(stackInfo.stack, 'throw new Error("Boom!");');
                expect(frameThrown).not.toBe(null);

                // verify properties on the stack object
                //expect(frameThrown.url).toBe(absPath('/tests/tests.js'));
                expect(frameThrown.func).toEqual(a(String));
                expect(frameThrown.line).toEqual(a(Number));
                //Safari, Firefox, IE doesn't give column number
                //expect(frameThrown.column).toEqual(a(Number));
            });
        }
    });
    
});