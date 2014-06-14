Once installed globally, simply run:

* `yo base` to start a new project

### yo base

Running the generator with `yo base` will add the following files to your project:

* `.verbrc.md`: a markdown-runtime config file for Base. YAML front-matter can be used for config, and the markdown content is used to generate your project's README.md.
* `package.json`: with minimal properties defined. However, if this alredy exists `base` will be added to `devDependencies`.