/**
 * Write content to the cache with a key
 */
function writeToCache() {
  // Set the persistent storage to true to store the content until we specifically delete it
  var options = {
      usePersistentStorage: true
  };

  // Create an instance of AWCache with our options
  var cache = new Appworks.AWCache(options);

  // The key to store the content against
  var key = document.getElementById("write-cache-key").value;
  // The content to store
  var content = document.getElementById("write-cache-content").value;

  // Store the data with .then called afterwards
  cache.setItem(key, content).then(
    // Success function
    function() {
        out("Content stored against: " + key);
    },
    // Error function
    function(err) {
        out("Content failed to store against " + key + ": " + err);
    });
}

/**
 * Read content from the cache with a key
 */
function readFromCache() {
  // Set the persistent storage to true to store the content until we specifically delete it
  var options = {
      usePersistentStorage: true
  };

  // Create an instance of AWCache with our options
  var cache = new Appworks.AWCache(options);

  // The key to read the content from
  var key = document.getElementById("read-cache-key").value;

  // Read the content stored against the key.
  // If the key does not exists, this will return a blank string.
  var content = cache.getItem(key);

  out(content);
}

/**
 * Delete content from the cache with a key
 */
function deleteFromCache() {
  // Set the persistent storage to true to store the content until we specifically delete it
  var options = {
      usePersistentStorage: true
  };

  // Create an instance of AWCache with our options
  var cache = new Appworks.AWCache(options);

  // The key to delete the content from
  var key = document.getElementById("delete-cache-key").value;

  // Call the remove function
  cache.removeItem(key).then(
    // Success function
    function(content) {
        out("Deleted content stored against " + key);
    },
    // Error function
    function(err) {
        out("Unable to delete content stored against " + key + ": " + err);
    });
}

/**
 * Clear all content from the cache
 */
function clearCache() {
  // Set the persistent storage to true to store the content until we specifically delete it
  var options = {
      usePersistentStorage: true
  };

  // Create an instance of AWCache with our options
  var cache = new Appworks.AWCache(options);

  // Call the clear function to remove all content
  cache.clear().then(
    // Success function
    function(content) {
        out("Cache cleared");
    },
    // Error function
    function(err) {
        out("Unable to clear cache: " + err);
    });
}

/********************
** Utility methods **
********************/
function out(message) {
  var el = document.getElementById("result");
  el.innerHTML = message;

  // Scroll down to the result block
  el.scrollIntoView();
}
