## My Game Engine for JS13K


### Initial setup : 

```js
const Scene = require('class/Scene')
const scene = new Scene()
scene.canvas.width=800
scene.addToBody()

const loop = () => {
    scene.clear()
    scene.draw()
    requestAnimationFrame(loop)
}
loop()
```

### Build with 

```
yarn build
```

### Develop with 

```
yarn dev
```

### Build the documents with 

```
yarn build:docs
```