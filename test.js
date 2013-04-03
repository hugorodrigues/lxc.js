var lxc = require('./lxc.js')({
	sshBind: ['/usr/bin/ssh', '-t', 'lxc']
});


var async = require('async');
var colors = require('colors');


console.out = function(d) {
  process.stdout.write(d);
};

function demo(command,params, cb)
{
	lxc[command](params, console.out, function(error, messages){ 
		if (error) 
			console.log('Ended with error!'.underline.red, messages)
		else
			console.log('-> OK!'.green, messages)

		if (cb)
			cb()
	});
}


//demo('list', {})



var testCreate = [
    function(cb){ demo('create', {name: 'vm_test_1', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_2', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_3', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_4', template:'ubuntu'}, cb); },
/*    function(cb){ demo('create', {name: 'vm_test_5', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_6', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_7', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_8', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_9', template:'ubuntu'}, cb); },
    function(cb){ demo('create', {name: 'vm_test_10', template:'ubuntu'}, cb); }*/
];

var testStart = [
    function(cb){ demo('start', {name: 'vm_test_1'}, cb); },
//    function(cb){ demo('start', {name: 'vm_test_2'}, cb); },
//    function(cb){ demo('start', {name: 'vm_test_3'}, cb); },
    function(cb){ demo('start', {name: 'vm_test_4'}, cb); },
/*    function(cb){ demo('start', {name: 'vm_test_5'}, cb); },
    function(cb){ demo('start', {name: 'vm_test_6'}, cb); },
    function(cb){ demo('start', {name: 'vm_test_7'}, cb); },
    function(cb){ demo('start', {name: 'vm_test_8'}, cb); },
    function(cb){ demo('start', {name: 'vm_test_9'}, cb); },
    function(cb){ demo('start', {name: 'vm_test_10'}, cb); },*/
];

var testFreeze = [
    function(cb){ demo('freeze', {name: 'vm_test_1'}, cb); },
/*    function(cb){ demo('freeze', {name: 'vm_test_2'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_3'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_4'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_5'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_6'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_7'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_8'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_9'}, cb); },
    function(cb){ demo('freeze', {name: 'vm_test_10'}, cb); },*/
];

var testUnFreeze = [
    function(cb){ demo('unfreeze', {name: 'vm_test_1'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_2'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_3'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_4'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_5'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_6'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_7'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_8'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_9'}, cb); },
    function(cb){ demo('unfreeze', {name: 'vm_test_10'}, cb); },
];

var testStop = [
    function(cb){ demo('stop', {name: 'vm_test_1'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_2'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_3'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_4'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_5'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_6'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_7'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_8'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_9'}, cb); },
    function(cb){ demo('stop', {name: 'vm_test_10'}, cb); },
];

var testDestroy = [
    function(cb){ demo('destroy', {name: 'vm_test_1'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_2'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_3'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_4'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_5'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_6'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_7'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_8'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_9'}, cb); },
    function(cb){ demo('destroy', {name: 'vm_test_10'}, cb); },
];





var testAll = [
    function(cb){ async.parallel(testCreate, function(err, results){ cb(null, "Created 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    function(cb){ async.parallel(testStart, function(err, results){ cb(null, "Started 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    function(cb){ async.parallel(testFreeze, function(err, results){ cb(null, "Freeze 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    //function(cb){ async.parallel(testUnFreeze, function(err, results){ cb(null, "Unfreeze 10 vm's") }) },
    //function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    //function(cb){ async.parallel(testStop, function(err, results){ cb(null, "Stop 10 vm's") }) },
    //function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    //function(cb){ async.parallel(testDestroy, function(err, results){ cb(null, "Destroyed 10 vm's") }) },
    //function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },
];



async.series(testAll, function(err, results){
    console.log(err, results);
});






