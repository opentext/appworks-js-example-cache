# AppWorks Example - AWCache

## Contents
1. [About appworks.js](#about-appworksjs)
2. [About this example app](#about-this-example)
3. [Usage](#usage)
4. [Installation](#installation)

## About appworks.js

appworks.js is a javascript (TypeScript) library for building feature rich, hybrid enterprise apps. The OpenText AppWorks platform provides mobile and desktop clients that support apps that utilize appworks.js.

In a mobile environment the library provides access to on-device technology, and in the desktop environment some features of the underlying host OS (operating system) are exposed.

For more information, see the appworks.js repository: https://github.com/opentext/appworks-js

## About this example

The purpose of the AWCache plugin is to store data, such as JSON, against a key in an on device database and then retrieve this data.

## Usage

#### preloadCache

```javascript
preloadCache()
```

Obtain the data from the persistent cache and store it in memory. Returns a promise.

After you instantiate a new AWCache with the persistent option set to true, you must call the preloadCache method.

It is recommended to only have one instance of AWCache used throughout your app.

Examples
```javascript
// Set the persistent storage to true to store the content until we specifically delete it
var options = {
    usePersistentStorage: true
};

// Ideally a single global instance of AWCache is instantiated.
var cache = new AWCache(options);

// Immediately load the persistent cache into memory
cache.preloadCache().then(
  // Success function
  function() {
      alert("Cache is ready to use");
      alert(getDataFromCache('myKey'));
  },
  // Error function
  function(err) {
      alert("Cache failed to load");
  });

function getDataFromCache(key) {
  return cache.getItem(key);
}
```

#### setExcludedKeys

```javascript
setExcludedKeys(keys: string[])
```

Prevent certain keys from being persisted.

+ __keys__: A string array of keys which will not be persisted along with other keys

Examples
```javascript
// The keys to exclude from persistent storage
var excludedKeys = ['key1', 'key3'];

cache.setExcludedKeys(excludedKeys);

// Some content to store
var content1 = "My Content 1";
var content2 = "My Content 2";
var content3 = "My Content 3";

// Not persisted
cache.setItem('key1', content1).then(function() {}, function(err) {});

// Persisted
cache.setItem('key2', content1).then(function() {}, function(err) {});

// Not persisted
cache.setItem('key3', content1).then(function() {}, function(err) {});
```

#### setItem

```javascript
setItem(key: string, value: any)
```

Write content to the cache with a key. Returns a promise.

+ __key__: The key to store the content against
+ __value__: The content to store

Examples
```javascript
// The key to store the content against
var key = "myKey";
// The content to store
var content = "My Content";

// Store the data with .then called afterwards
cache.setItem(key, content).then(
  // Success function
  function() {
      alert("Content stored against: " + key);
  },
  // Error function
  function(err) {
      alert("Content failed to store against " + key + ": " + err);
  });
```

#### getItem

```javascript
getItem(key: string)
```

Read content from the cache with a key. Returns a string value of the content set against the key, or a blank string if the key is empty or non existent.

+ __key__: The key to read the content from

Examples
```javascript
// The key to read the content from
var key = "myKey";

// Read the content stored against the key.
// If the key does not exists, this will return a blank string.
var content = cache.getItem(key);

alert(content);
```

#### removeItem

```javascript
removeItem(key: string)
```

Delete content from the cache with a key. Returns a promise.

+ __key__: The key (and value) to be delete

Examples
```javascript
// The key to delete the content from
var key = "myKey";

// Call the remove function
cache.removeItem(key).then(
  // Success function
  function(content) {
      alert("Deleted content stored against " + key);
  },
  // Error function
  function(err) {
      alert("Unable to delete content stored against " + key + ": " + err);
  });
```

#### clear

```javascript
clear()
```

Clear all content from the cache. Returns a promise.

Examples
```javascript
// Call the clear function to remove all content
cache.clear().then(
  // Success function
  function(content) {
      alert("Cache cleared");
  },
  // Error function
  function(err) {
      alert("Unable to clear cache: " + err);
  });
}
```

## Installation

This example app contains 3 important objects:
1. app.properties
2. icon.png
3. mobile.zip

#### app.properties
This files defines the app, with the following properties:
+ __displayName__: The display name of the app
+ __description__: A description of the app
+ __version__: The version of the app, e.g. 0.0.1 or 3.4.5 etc
+ __type__: This can be either app or desktop, or both (app,desktop)
+ __awgPlatformVersion__: The target appworks platform, this should be 16
+ __isAvailableOffline__: Allow this app to be used offline, can be true or false

#### icon.png
An icon that represents the app. This will appear in the gateway and on the device. 48x48px is ideal.

#### mobile.zip

This is your web content, such as html, js, css, images and any other assets.
The only essential file in your mobile.zip is index.html, which will be loaded by the appworks webview. Any other files or structure is up to the developer.

##### index.html

When your app is downloaded and installed in an appworks client, the client will place appworks.js, cordova.js and the cordova plugins in the root of your app.

In your html file, please include the following tags before any other javascript tags:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="appworks.js"></script>
```

#### Zipping and Deploying
1. Zip up the web content into a file named mobile.zip
2. Zip up the following files:
  + app.properties
  + icon.png
  + mobile.zip
3. Name this file in the format:
  + AppName_Version.zip
  + e.g. MyGreatApp_0.0.1.zip
  + __The version number in the filename must match the version number in app.properties__
4. Install the app on the gateway
  + Go to your gateway in a browser
  + sign in
  + go to app installation tab
  + drag and drop MyGreatApp_0.0.1.zip into the box.
  + Once fully deployed, enable the app.
