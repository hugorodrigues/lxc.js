var async = require('async');
var colors = require('colors');

var lxc = require('./lxc.js')({
	sshBind: ['/usr/bin/ssh', '-t', 'lxc']
});


function lxcTest (){

    var fn = Array.prototype.slice.call(arguments, 0,1)
    var args = Array.prototype.slice.call(arguments, 1,-1)
    var cb = Array.prototype.slice.call(arguments, -1)[0]

    args.push(function(data){ process.stdout.write(data) })
    args.push(function(error, messages){ cb(); console.log((error) ? 'Ended with error!'.underline.red : '-> OK!'.green, messages) })

    lxc[fn].apply(this, args);
}



var testCreate = [

    function(cb){ lxcTest('create', 'vm_test_1', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_2', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_3', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_4', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_5', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_6', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_7', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_8', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_9', 'ubuntu', {}, cb) },
    function(cb){ lxcTest('create', 'vm_test_10', 'ubuntu', {}, cb) }
];

var testStart = [
    function(cb){ lxcTest('start', 'vm_test_1', cb); },
    function(cb){ lxcTest('start', 'vm_test_2', cb); },
    function(cb){ lxcTest('start', 'vm_test_3', cb); },
    function(cb){ lxcTest('start', 'vm_test_4', cb); },
    function(cb){ lxcTest('start', 'vm_test_5', cb); },
    function(cb){ lxcTest('start', 'vm_test_6', cb); },
    function(cb){ lxcTest('start', 'vm_test_7', cb); },
    function(cb){ lxcTest('start', 'vm_test_8', cb); },
    function(cb){ lxcTest('start', 'vm_test_9', cb); },
    function(cb){ lxcTest('start', 'vm_test_10', cb); },
];

var testFreeze = [
    function(cb){ lxcTest('freeze', 'vm_test_1', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_2', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_3', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_4', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_5', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_6', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_7', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_8', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_9', cb); },
    function(cb){ lxcTest('freeze', 'vm_test_10', cb); },
];

var testUnFreeze = [
    function(cb){ lxcTest('unfreeze', 'vm_test_1', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_2', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_3', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_4', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_5', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_6', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_7', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_8', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_9', cb); },
    function(cb){ lxcTest('unfreeze', 'vm_test_10', cb); },
];

var testStop = [
    function(cb){ lxcTest('stop', 'vm_test_1', cb); },
    function(cb){ lxcTest('stop', 'vm_test_2', cb); },
    function(cb){ lxcTest('stop', 'vm_test_3', cb); },
    function(cb){ lxcTest('stop', 'vm_test_4', cb); },
    function(cb){ lxcTest('stop', 'vm_test_5', cb); },
    function(cb){ lxcTest('stop', 'vm_test_6', cb); },
    function(cb){ lxcTest('stop', 'vm_test_7', cb); },
    function(cb){ lxcTest('stop', 'vm_test_8', cb); },
    function(cb){ lxcTest('stop', 'vm_test_9', cb); },
    function(cb){ lxcTest('stop', 'vm_test_10', cb); },
];

var testDestroy = [
    function(cb){ lxcTest('destroy', 'vm_test_1', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_2', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_3', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_4', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_5', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_6', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_7', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_8', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_9', cb); },
    function(cb){ lxcTest('destroy', 'vm_test_10', cb); },
];





var testAll = [
    function(cb){ async.parallel(testCreate, function(err, results){ cb(null, "Created 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    function(cb){ async.parallel(testStart, function(err, results){ cb(null, "Started 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    function(cb){ async.parallel(testFreeze, function(err, results){ cb(null, "Freeze 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    function(cb){ async.parallel(testUnFreeze, function(err, results){ cb(null, "Unfreeze 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    function(cb){ async.parallel(testStop, function(err, results){ cb(null, "Stop 10 vm's") }) },
    function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },

    //function(cb){ async.parallel(testDestroy, function(err, results){ cb(null, "Destroyed 10 vm's") }) },
    //function(cb){ setTimeout(function(){ console.log('Pausing...'.yellow); cb(null, "Paused 5seconds...")},5000) },
];



async.series(testAll, function(err, results){
    console.log(err, results);
});






