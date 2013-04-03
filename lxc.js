
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
            cbClose: function(data){
                onClose(data == 0 ? null:data,  errors)
            },
        }

        var tmp = child(x).start()
    }

    obj.execute = function(command, onData, onClose){
        sysExec(command, onData, onClose);
    }







    // params = {name: 'foobar', template, 'ubuntu', configFile:'/teste', config: {hello:'world', fuck:'yeah'}}
    obj.create = function(params, cbData, cbComplete){

        var cmd = 'lxc-create -n '+ params.name

        if (params.template)
            cmd += ' -t '+params.template

        sysExec(cmd, cbData, cbComplete);

    }

    // params = {name: 'foobar'}
    obj.destroy = function(params, cbData, cbComplete){
        sysExec('lxc-destroy -n '+ params.name, cbData, cbComplete);
    }






    // params = {name: 'foobar'}
    obj.start = function(params, cbData, cbComplete){
        sysExec('lxc-start -n '+ params.name+' --daemon ', cbData, cbComplete);
    }

    // params = {name: 'foobar'}
    obj.stop = function(params, cbData, cbComplete){
        sysExec('lxc-stop -n '+ params.name, cbData, cbComplete);
    }





    // params = {name: 'foobar'}
    obj.freeze = function(params, cbData, cbComplete){
        sysExec('lxc-freeze -n '+ params.name, cbData, cbComplete);
    }
    // params = {name: 'foobar'}
    obj.unfreeze = function(params, cbData, cbComplete){
        sysExec('lxc-unfreeze -n '+ params.name, cbData, cbComplete);
    }






    // params = {}
    obj.list = function(params, cbData, cbComplete){
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

            cbComplete(null, result);
        });
    }




    return obj;
}