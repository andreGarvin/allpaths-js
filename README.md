# allpaths-js (allpaths)
#### There is one in GO lang as well
This is am module for getting all the absolute paths of a given path to a working directory

I create this module because node needs a package for recursively getting a file or folders absolute path.

```js
allPaths('../', {
	ext: '.js'
})
.then(paths => console.log(paths))
.catch(err => console.error(err))
```

This function takes in `_opts` Object whihc comes with these properties
* `ONLY_dir`: Only get paths that are directories.
* `ext`: Gathers paths with a certain extension.
* `hidden`: Gather only paths to files that are hidden.
* `ignores`: A array of files or folders to ignore and not gather its absolute path to.


