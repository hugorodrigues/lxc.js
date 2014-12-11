module.exports = function(config){

    var obj = {}
    var child = require('child')
        sshBind = config.sshBind || false

    //http://stackoverflow.com/questions/10530532/
    function textToArgs(s){
        var words = [];
        s.replace(/"([^"]*)"|'([^']*)'|(\S+)/g,function(g0,g1,g2,g3){ words.push(g1 || g2 || g3 || '')});
        return words
    }

    var sysExec = function(command, onData, onClose){

        onData = onData || function(){}
        onClose = onClose || function(){}

        if (sshBind != false)
        {
            var runCommand = sshBind.slice();
            runCommand.push(command)
        } else {
            var runCommand = textToArgs(command);
        }

        var errors = '';

        child({
            command: runCommand.slice(0,1)[0],
            args: runCommand.slice(1),
            cbStdout: function(data){ onData(''+data) },
            cbStderr: function(data){ errors+=data; onData(''+data) },
            cbClose: function(exitCode){ onClose(exitCode == 0 ? null:exitCode,  errors) }
        }).start()
    }


    obj.create = function(name, template, config, cbComplete, cbData){
        sysExec('lxc-create -n '+name+' -t '+template, cbComplete, cbData);
    }

    obj.destroy = function(name, cbComplete, cbData){
        sysExec('lxc-destroy -n '+ name, cbComplete, cbData);
    }


    obj.start = function(name, cb){
        var output = '';
        sysExec('lxc-start -n ' + name + ' -d',
            function(data) {
                output += data;
            }, function(error) {
              cb(error, output);
            }
        );
    };

    obj.stop = function(name, cb){
        var output = '';
        sysExec('lxc-stop -n ' + name,
            function(data) {
              output += data;
            }, function(error) {
              cb(error, output);
            }
        );
    };

    obj.freeze = function(name, cbComplete, cbData){
        sysExec('lxc-freeze -n '+name, cbComplete, cbData);
    }
    obj.unfreeze = function(name, cbComplete, cbData){
        sysExec('lxc-unfreeze -n '+name, cbComplete, cbData);
    }


    obj.list = function(cb){
        var output = '';
        sysExec('lxc-ls -f',
            function(data) {
                output += data;
            }, function(error){
                var containers = {};
                output = output.split("\n");
                for (i in output) {
                    var content = output[i].trim();

                    if (content.indexOf('RUNNING') >= 0 ||
                            content.indexOf('FROZEN') >= 0 ||
                            content.indexOf('STOPPED') >= 0) {
                        vals = content.split(/\s+/gi);
                        if (vals.length >= 2) {
                            containers[vals[0]] = vals[1];
                        }
                    }
                }
                cb(containers);
            }
        );
    }

    return obj;
}
