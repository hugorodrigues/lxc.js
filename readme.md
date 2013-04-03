# Linux containers (LXC) NodeJS wrapper

## Features
- Designed to work locally and remotely (ssh)
- Doesn't use any kind of storage/database


## API

```js
lxc.method(<params>, <cbOutput>, <cbComplete>)
```

### Create Container
```js
lxc.create({name:'example', template:'ubuntu'})
```

### Start Container
```js
lxc.start({name:'example'})
```

### Freeze Container
```js
lxc.freeze({name:'example'})
```

### Un-Freeze Container
```js
lxc.unfreeze({name:'example'})
```

### Stop Container
```js
lxc.stop({name:'example'})
```

### Destroy Container
```js
lxc.destroy({name:'example'})
```


---
## License 

(The MIT License)

Copyright (c) 2010-2013 Hugo Rodrigues, StartEffect U. Lda
http://starteffect.com

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