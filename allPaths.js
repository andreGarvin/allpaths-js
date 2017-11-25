const { readdirSync, lstatSync } = require('fs')
const path = require('path')


function recursiveDirDive(_path, _opts = {}) {
    const {
        excludes = [],
        hidden = true,
        ext = '',
        ONLY_dir = false
    } = _opts

    function add_to_tree(file_name) {
        let add_to_tree_boolean = false;

        if (ext === '' && hidden) {
            add_to_tree_boolean = true
        }
        if (ext !== '' && path.extname(file_name) === ext) {
            add_to_tree_boolean = true
        }
        if (hidden && file_name[0] === '.' && ext === '') {
            add_to_tree_boolean = true
        } else if (hidden === false && file_name[0] !== '.' && ext === '') {
            add_to_tree_boolean = true
        }

        return add_to_tree_boolean
    }

    function dive(root, paths, tree) {
        try {
            // resolves the root path given
            root = path.resolve(root)

            // filters all the excludes file paths and resolves the path
            paths = paths.filter(i => {
                return !excludes.includes(i)
            }).map(u => path.resolve(root, u))

            for (let i in paths) {
                // joining the root path with the child from the directory
                const abs_path_basename = path.basename(paths[i])
                const is_path_dir = lstatSync(paths[i]).isDirectory()

                if (Object.values(_opts).length === 0) {
                    tree.push(paths[i])
                } else {
                    // if it is a DIRECTORY
                    if (is_path_dir) {

                        if (add_to_tree(abs_path_basename)) {
                            tree.push(paths[i])
                        }
                        dive(paths[i], readdirSync(paths[i]), tree)
                    } else if (ONLY_dir === false) {
                        
                        if (add_to_tree(abs_path_basename)) {
                            tree.push(paths[i])
                        }
                    }
                }
            }
            return tree
        } catch (err) {
            return err.message
        }
    }

    return dive(_path, readdirSync(_path), [])
}

module.exports = (_path, _opts) => {
    // if _path is object then assign _path to _opts 
    if (typeof _path === 'object') {
        _opts = _path
        // if _opts.path is given assign to _path elese __dirname
        _path = _opts.path ? _opts.path : __dirname
    }

    return new Promise((resolve, reject) => {
        const result = recursiveDirDive(_path, _opts)

        if (Array.isArray(result)) {
            return resolve(result)
        }
        return reject(result)
    })
}
