/**
 * @class AssetManager
 */
module.exports = class AssetManager {
    constructor() {
      this.assets = {
        image: [],
        audio: [],
        data: [],
      };
    }
    /**
     * @memberof AssetManager
     * @param {string} url
     */
    static getExtension(url) {
      return url.split('.').pop();
    }
    /**
     * @memberof AssetManager
     * @param {array} assetUrls - Array of strings
     * @returns {Promise} Array of asset files
     */
    loadMultiple(assetUrls) {
      const promises = assetUrls.map(url => this.load(url));
      return Promise.all(promises);
    }
    /**
     * @memberof AssetManager
     * @param {string} assetName - Optional
     * @param {string} url - If one parameter, first parameter becomes url
     * @returns {Promise} Asset file
     */
    load() {
      const url = arguments.length === 2 ? arguments[1] : arguments[0];
      const assetName = arguments[0];
  
      const imageRegex = /(jpeg|jpg|gif|png)$/;
      const audioRegex = /(wav|mp3|ogg|aac)$/;
      const levelRegex = /(level)$/;
      const jsonRegex = /(json)$/;
      const ext = AssetManager.getExtension(url);
  
      const returnWithPromise = item =>
        new Promise(resolve => {
          resolve(item);
        });
  
      /**
       * If the item is already loaded
       * do not attempt to load again
       * and return it from the storage
       */
  
      if (ext.match(imageRegex)) {
        return this.assets.image[assetName]
          ? returnWithPromise(this.assets.image[assetName])
          : this.loadImage.apply(this, arguments);
      } else if (ext.match(audioRegex)) {
        return this.assets.audio[assetName]
          ? returnWithPromise(this.assets.audio[assetName])
          : this.loadAudio.apply(this, arguments);
      } else if (ext.match(jsonRegex)) {
        return this.assets.data[assetName]
          ? returnWithPromise(this.assets.data[assetName])
          : this.loadData.apply(this, arguments);
      } else if (ext.match(levelRegex)) {
        return this.assets.data[assetName]
          ? returnWithPromise(this.assets.data[assetName])
          : this.loadLevel.apply(this, arguments);
      } else {
        return this.assets.data[assetName]
          ? returnWithPromise(this.assets.data[assetName])
          : this.loadData.apply(this, arguments);
      }
    }
    /**
     * @memberof AssetManager
     * @param {string} assetName - Optional
     * @param {string} url - If one parameter, first parameter becomes url
     * @returns {Promise} Image 
     */
    loadImage() {
      const url = arguments.length === 2 ? arguments[1] : arguments[0];
      const assetName = arguments[0];
  
      const image = new Image();
      image.src = url;
      return new Promise((resolve, reject) => {
        image.onload = () => {
          // Add to asset storage
          this.assets.image[assetName] = image;
          resolve(image);
        };
        image.onerror = () => {
          reject(`Could not load image ${image.src}`);
        };
      });
    }
    /**
     * @memberof AssetManager
     */
    loadAudio() {
      const url = arguments.length === 2 ? arguments[1] : arguments[0];
      const assetName = arguments[0];
  
      console.warn(`Audio loader is not supported yet!`);
      return new Promise((resolve, reject) => {
        this.assets.audio[assetname] = null;
        // TODO
      });
    }
    /**
     * @memberof AssetManager
     * @param {string} assetName - Optional
     * @param {string} dataUrl - If one parameter, then first parameter becomes the url
     * @returns {Promise} JSON object of data
     */
    loadData() {
      const url = arguments.length === 2 ? arguments[1] : arguments[0];
      const assetName = arguments[0];
  
      return fetch(url)
        .then(r => r.json())
        .then(json => {
          // Add to asset storage
          this.assets.data[assetName] = json;
          return json;
        });
    }
    /**
     * @memberof AssetManager
     */
    loadLevel(){
      const url = arguments.length === 2 ? arguments[1] : arguments[0];
      const assetName = arguments[0];
      return fetch(url)
      .then(r => r.text())
      .then(text => {
        this.assets.data[assetName] = text
        return text
      })
    }
  }
  