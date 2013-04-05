# Linux containers (LXC) NodeJS wrapper

## Features
- Designed to work locally and remotely (ssh)
- Doesn't use any kind of storage/database


## API


### lxc.create(name, template, [config], [cbComplete], [cbOutputData])
```js
lxc.create('example', 'ubuntu', function(error, messages){ 
	if (error)
		console.log('Error! '+messages)
	else
		console.log('Created!')
})
```

### lxc.start(name, [cbComplete], [cbOutputData])
```js
lxc.start('example', console.log)
```

### lxc.freeze(name, [cbComplete], [cbOutputData])
```js
lxc.freeze('example', console.log)
```

### lxc.unfreeze(name, [cbComplete], [cbOutputData])
```js
lxc.unfreeze('example', console.log)
```

### lxc.stop(name, [cbComplete], [cbOutputData])
```js
lxc.stop('example', console.log)
```

### lxc.destroy(name, [cbComplete], [cbOutputData])
```js
lxc.destroy('example', console.log)
```

### lxc.list([cbComplete])
```js
lxc.list('example', console.log)
```

---
## License 

(The MIT License)

Copyright (c) 2010-2013 Hugo Rodrigues, StartEffect
http://starteffect.com
http://hugorodrigues.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
