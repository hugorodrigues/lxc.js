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


    obj.start = function(name, cbComplete, cbData){
        sysExec('lxc-start -n '+name+' --daemon ', cbComplete, cbData);
    }

    obj.stop = function(name, cbComplete, cbData){
        sysExec('lxc-stop -n '+ name, cbComplete, cbData);
    }


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

    obj.list = function(cbComplete, cbData){

        var output = '';
        sysExec('lxc-list', function(data){output+=data}, function(error){

            output = output.split("\n");

            var actual = false;            
            var result = {
                running: [],
                frozen: [],
                stopped: []
            }

            for (i in output)
            {
                var content = output[i].trim();

                if (content == 'RUNNING' || content == 'FROZEN' || content == 'STOPPED')
                    actual = content.toLowerCase()
                else 
                    if (actual != false && content != '')
                        result[actual].push(content); 
            }

            cbData(null, result);
        });
    }


    return obj;
}