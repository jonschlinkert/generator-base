Once installed globally, simply run:

* `yo base` to to start a new project

### yo base

Running the generator with `yo base` will add the following files to your project:

* `app`: this is the controller for your generator, inside this directory you will also find the main templates used by your generator.
* `docs`: basic _starter_ documentation for your generator.
* `.verbrc.md`: a "docs-config" file for [Verb](https://github.com/assemble/verb). YAML front-matter can be used in this file, and the markdown content is used to generate your project's README.md.
* `test`: the test directory for your generator
* `package.json`: with minimal properties defined.
* `LICENSE-MIT`
* `.gitattributes`
* `.gitignore`
* `.jshintrc`
