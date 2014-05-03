/*!
 * <%= appname %> https://github.com/<%= username %>/<%= _.slugify(projectname) %>
 * Copyright (c) <%= (new Date).getFullYear() %> <%= authorname %>, contributors.
 * Licensed under the MIT License
 */

'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var exec = require('child_process').exec;
var changeCase = require('change-case');
var Configstore = require('configstore');
var normalize = require('normalize-pkg');
var yeoman = require('yeoman-generator');
var log = require('verbalize');

function introductionMessage() {
  console.log(log.bold('  Head\'s up!'));
  console.log();
  console.log(log.gray('  <%= _.pascalCase(generatorName) %> saves time by offering to re-use answers from the'));
  console.log(log.gray('  previous run. If something is incorrect, no worries!'));
  console.log(log.gray('  Just provide a new value!'));
  console.log();
}

log.runner = '<%= appname %>';

var <%= _.camelCase(generatorName) %>Config = new Configstore('<%= appname %>');
var userPkg = {};

var <%= _.pascalCase(generatorName) %>Generator = module.exports = function <%= _.pascalCase(generatorName) %>Generator(args, options, config) {
  yeoman.generators.<%= _.pascalCase(generatorName) %>.apply(this, arguments);
  var self = this;

  // Mix methods from change-case into yeoman's Lo-Dash
  this._.mixin(changeCase);
  this.appname = changeCase.paramCase(this.appname);

  this.readJSON = function() {
    var filepath = path.join.apply(path, arguments);
    return JSON.parse(self.readFileAsString(filepath));
  };

  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'] || this.options['s'],
      skipMessage: this.options['skip-welcome-message'] || this.options['w']
    });
  });

  this.pkg = this.readJSON(__dirname, '../package.json');
  this.username = this.user.git.username || process.env.user || process.env.username || null;

  if (fs.existsSync('package.json') && (this.options['p'] || this.options['pkg'])) {
    userPkg = normalize.all(this.readJSON('package.json'));
  }
};
util.inherits(<%= _.pascalCase(generatorName) %>Generator, yeoman.generators.<%= _.pascalCase(generatorName) %>);


<%= _.pascalCase(generatorName) %>Generator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [];

  // have Yeoman greet the user, unless skipped
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    introductionMessage();
  }

  var author = <%= _.camelCase(generatorName) %>Config.get('author') || {};
  var username = <%= _.camelCase(generatorName) %>Config.get('username') || this.username;

  prompts.push({
    name: 'projectname',
    message: 'What is the name of the project?',
    default: userPkg.name ? userPkg.name : this.appname
  });

  prompts.push({
    name: 'projectdesc',
    message: 'Want to add a description?',
    default: userPkg.description || 'The most interesting project in the world > <%= _.pascalCase(generatorName) %>'
  });

  prompts.push({
    name: 'authorname',
    message: 'What is the author\'s name?',
    default: author.name || ((userPkg.author && userPkg.author.name) ? userPkg.author.name : this.username)
  });

  prompts.push({
    name: 'authorurl',
    message: 'What is the author\'s URL?',
    default: 'https://github.com/' + username
  });

  prompts.push({
    name: 'username',
    message: 'If pushed to GitHub, what username/org will it live under?',
    default: username
  });

  this.prompt(prompts, function (answers) {

    <%= _.camelCase(generatorName) %>Config.set('username', answers.username);
    <%= _.camelCase(generatorName) %>Config.set('author', {
      name: answers.authorname,
      url: answers.authorurl
    });

    this.authorname = <%= _.camelCase(generatorName) %>Config.get('author').name;
    this.authorurl = <%= _.camelCase(generatorName) %>Config.get('author').url;
    this.username = <%= _.camelCase(generatorName) %>Config.get('username');

    this.projectname = answers.projectname;
    this.projectdesc = answers.projectdesc;

    cb();
  }.bind(this));
};

<%= _.pascalCase(generatorName) %>Generator.prototype.app = function app() {
  var pkgTemplate = this.readFileAsString(path.join(this.sourceRoot(), './_package.json'));
  var <%= _.camelCase(generatorName) %>DefaultPkg = this.engine(pkgTemplate, this);

  // If a package.json already exists, let's try to just update the
  // values we asked about, and leave other data alone.
  if (fs.existsSync('package.json')) {
    var pkg = this.readJSON('package.json');
    pkg.devDependencies = pkg.devDependencies || {};

    // Add any missing properties to the existing package.json
    this._.defaults(pkg, JSON.parse(<%= _.camelCase(generatorName) %>DefaultPkg));

    // Update some values we asked the user to provide.
    this._.extend(pkg.name, this.projectname);
    this._.extend(pkg.description, this.projectdesc);
    this._.extend(pkg.author.name, this.authorname);
    this._.extend(pkg.author.url, this.authorurl);

    // Add `<%= _.camelCase(generatorName) %>` to devDependencies.
    this._.extend(pkg.devDependencies, JSON.parse(<%= _.camelCase(generatorName) %>DefaultPkg).devDependencies);

    fs.unlink('package.json');
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  } else {
    this.template('_package.json', 'package.json');
  }
};


<%= _.pascalCase(generatorName) %>Generator.prototype.readme = function readme() {
  if (!fs.existsSync('docs/README.tmpl.md') && !fs.existsSync('.verbrc.md')) {
    this.copy('README', '.verbrc.md');
  }
};

<%= _.pascalCase(generatorName) %>Generator.prototype.jshintrc = function jshintrc() {
  if (!fs.existsSync('.jshintrc')) {
    this.copy('jshintrc', '.jshintrc');
  }
};

<%= _.pascalCase(generatorName) %>Generator.prototype.git = function git() {
  if (!fs.existsSync('.gitignore')) {
    this.copy('gitignore', '.gitignore');
  }

  if (!fs.existsSync('.gitattributes')) {
    this.copy('gitattributes', '.gitattributes');
  }
};

<%= _.pascalCase(generatorName) %>Generator.prototype.license = function license() {
  if (!fs.existsSync('LICENSE-MIT')) {
    this.template('LICENSE-MIT');
  }
};
