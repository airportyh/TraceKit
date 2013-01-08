console.log(location.href)
console.log(document.documentElement.innerHTML)


var scripts = ["tests/testling-presetup.js",
  "tests/jasmine.js",
  "tests/jasmine-tap.js",
  "tests/tests.js",
  "tracekit.js"]

for (var i = 0, len = scripts.length; i < len; i++){
    var script = scripts[i]
    document.write('<script src="http://raw.github.com/airportyh/TraceKit/master/' + 
        script + '"></' + 'script>')
}

setTimeout(function(){
    var jasmineEnv = jasmine.getEnv()
    jasmineEnv.addReporter(new TAPReporter(function(msg){
      console.log(msg)
    }))
    jasmineEnv.execute()
}, 0)