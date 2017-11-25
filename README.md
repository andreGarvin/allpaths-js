# allpaths-js (allpaths)
#### There is one in GO lang as well
This is am module for getting all the absolute resolved file paths of a given path to a working directory

I created this module because node needs a package for recursively getting all absolute paths for files and folders, also filtering these files/folders as well.

```bash
npm i allPaths -S
```

```js
// This will gather all files/folders that match this file extension
allPaths('..', {
	// You can also inlcude a property call 'path' to pass the root path
	// path: '..'
	ext: '.js',
	// excludes all files matching these names
	excludes: [ '.git', 'node_modules' ]
})
.then(paths => console.log(paths))
.catch(err => console.error(err))
```

This function takes in `_opts` Object which comes with these properties
* `ONLY_dir`: Only get paths that are directories.
* `ext`: Gathers paths with a certain extension.
* `hidden`: Gather only paths to files that are hidden.
* `excludes`: A array of files or folders to ignore and not gather its absolute path to.