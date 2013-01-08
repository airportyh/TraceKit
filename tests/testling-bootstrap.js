var scripts = ["tests/testling-presetup.js",
  "tests/jasmine.js",
  "tests/jasmine-tap.js",
  "tests/tests.js",
  "tracekit.js",
  "tests/testling-bootstrap.js"]

for (var i = 0; i < scripts.length; i++){
    var script = scripts[i]
    document.write('<script src="https://raw.github.com/airportyh/TraceKit/master/' + 
        script + '"></' + 'script>')
}

setTimeout(function(){
    var jasmineEnv = jasmine.getEnv()
    jasmineEnv.addReporter(new TAPReporter(function(msg){
      console.log(msg)
    }))
    jasmineEnv.execute()
}, 0)