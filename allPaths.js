const { readdirSync, lstatSync } = require('fs')
const path = require('path')


function recursiveDirDive(_path, _opts = {}) {
    
    function dive(root, paths, tree) {
        try {
            // resolves the root path given
            root = path.resolve(root)
            paths = paths.length !== 0 ? paths : readdirSync(root)
            
            for (let i in paths) {
                // joining the root path with the child from the directory
                const absPath = path.resolve(root, paths[i])
                const is_path_dir = lstatSync(absPath).isDirectory()
                
                const { ignores = [], hidden = true, ext = '', ONLY_dir = false } = _opts
                if (Object.values(_opts).length == 0) {
                    tree.push(absPath)
                } else {
                    if (!ignores.includes(path.basename(absPath))) {
                        const absPathBaseName = path.basename(absPath)
                        if (path.extname(absPathBaseName) === ext) {
                            tree.push(absPath)
                        } else if (hidden && !is_path_dir && absPathBaseName[0] == '.') {
                            tree.push(absPath)
                        } 
                        if (is_path_dir) {
                            
                            if (hidden && ONLY_dir === false) {
                                tree.push(absPath)
                            }
                            if (ONLY_dir) {
                                tree.push(absPath)
                            }
                            dive(absPath, readdirSync(absPath), tree)
                        }
                    }
                }
            }
            return tree
        } catch (err) {
            return err
        }
    }
    return dive(_path, readdirSync(_path), [])
}

module.exports = (_path, _opts) => {
    _path = _path ? _path : __dirname

    return new Promise((resolve, reject) => {
        const result = recursiveDirDive(_path, _opts)

        if (Array.isArray(result)) {
            return resolve(result)
        }
        return reject(result)
    })
}