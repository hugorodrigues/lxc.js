module.exports = function(config){

    var obj = {};
    var child = require('child'),
        config = config || {},
        sshBind = config.sshBind || false;

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
            }, function() {
              var error;
              if (output.indexOf('no configuration file') >= 0) {
                  error = new Error("Container does not exist");
              }
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

    /**
     * creates a new snapshot
     * @param name
     * @param cbComplete
     * @param cbData
     */
    obj.createSnapshot = function(name, cbComplete, cbData){
        sysExec('lxc-snapshot -n '+name, cbComplete, cbData);
    }

    /**
     * deletes a snapshot
     * @param name
     * @param snapshotName
     * @param cbComplete
     * @param cbData
     */
    obj.deleteSnapshot = function(name, snapshotName, cbComplete, cbData){
        sysExec('lxc-snapshot -n '+name+' -d '+snapshotName, cbComplete, cbData);
    }

    /**
     * restores a snapshot
     * @param name
     * @param snapshotName
     * @param newName [optional] name of restored lxc.
     * @param cbComplete
     * @param cbData
     */
    obj.restoreSnapshot  = function(name, snapshotName, newName, cbComplete, cbData){
        if(typeof newName === 'function'){
            cbData = cbComplete;
            cbComplete = newName;
            newName = name;
        }
        sysExec('lxc-snapshot -n '+name+' -r '+snapshotName+" -N "+newName, cbComplete, cbData);
    }

    /**
     * Lists all snapshots
     * @param name
     * @param cbComplete
     * @param cbData
     */
    obj.listSnapshots  = function(name, cbComplete, cbData){
        var output = '';
        sysExec('lxc-snapshot -L -n '+name, function(data){output+=data}, function(error){
            output = output.split("\n");

            var ret = [];
            output.forEach(function(line){
                line = line.split(" ");
                ret.push({
                   name: line[0],
                   dir: line[1],
                   date: line[2]+" "+line[3]
                });
            });

            return ret;
        });
    }

    /**
     * Wrapper for lxc-attach command
     * @param name
     * @param command
     * @param cbComplete
     */
    obj.attach = function(name, command, cbComplete) {
        var output = '';
        sysExec('lxc-attach -n '+name+' -- '+command, function(data){output+=data}, function(error){
            cbComplete(error, output);
        });
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
                            containers[vals[0]] = {
                                "name": vals[0],
                                "state": vals[1],
                                "autostart": vals[2],
                                "groups": vals[3],
                                "ipv4": vals[4],
                                "ipv6": vals[5]
                            };
                        }
                    }
                }
                cb(error, containers);
            }
        );
    }

    return obj;
}
