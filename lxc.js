
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


        var x = {
            command: runCommand.slice(0,1)[0],
            args: runCommand.slice(1),
            cbStdout: function(data){ onData(''+data) },
            cbStderr: function(data){ errors+=data; onData(''+data) },
            cbClose: function(exitCode){
                onClose(exitCode == 0 ? null:exitCode,  errors)
            },
        }

        var tmp = child(x).start()
    }

    obj.execute = function(command, onData, onClose){
        sysExec(command, onData, onClose);
    }







    obj.create = function(name, template, config, cbComplete, cbData){

        var cmd = 'lxc-create -n '+name+' -t '+template

        sysExec(cmd, cbComplete, cbData);
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






    // params = {}
    obj.list = function(cbComplete, cbData){
        var output = '';
        //console.log(arguments);
            
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