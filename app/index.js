/*!
 * generator-base <https://github.com/jonschlinkert/generator-base>
 * Copyright (c) 2014 Jon Schlinkert, contributors.
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
  console.log(log.gray('  Base saves time by offering to re-use answers from the'));
  console.log(log.gray('  previous run. If something is incorrect, no worries!'));
  console.log(log.gray('  Just provide a new value!'));
  console.log();
}

log.runner = 'generator-base';

var baseConfig = new Configstore('generator-base');
var userPkg = {};

var BaseGenerator = module.exports = function BaseGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  var self = this;

  // Mix methods from change-case into yeoman's Lo-Dash
  this._.mixin(changeCase);
  this.appname = changeCase.paramCase(this.appname);
  this.generatorName = 'Base';

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
util.inherits(BaseGenerator, yeoman.generators.Base);


BaseGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [];

  // have Yeoman greet the user, unless skipped
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    introductionMessage();
  }

  var author = baseConfig.get('author') || {};
  var username = baseConfig.get('username') || this.username;

  prompts.push({
    name: 'projectname',
    message: 'What do you want to name your generator?',
    default: userPkg.name ? userPkg.name : this.appname
  });

  prompts.push({
    name: 'projectdesc',
    message: 'Want to add a description?',
    default: userPkg.description || 'The most interesting project in the world > Base'
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

    baseConfig.set('username', answers.username);
    baseConfig.set('author', {
      name: answers.authorname,
      url: answers.authorurl
    });

    this.authorname = baseConfig.get('author').name;
    this.authorurl = baseConfig.get('author').url;
    this.username = baseConfig.get('username');

    this.projectname = answers.projectname;
    this.projectdesc = answers.projectdesc;
    if (/^generator/.test(this.appname)) {
      this.generatorName = this.appname.replace(/^generator-/, '');
    }
    cb();
  }.bind(this));
};

BaseGenerator.prototype.app = function app() {
  var pkgTemplate = this.readFileAsString(path.join(this.sourceRoot(), './_package.json'));
  var baseDefaultPkg = this.engine(pkgTemplate, this);

  // If a package.json already exists, let's try to just update the
  // values we asked about, and leave other data alone.
  if (fs.existsSync('package.json')) {
    var pkg = this.readJSON('package.json');
    pkg.devDependencies = pkg.devDependencies || {};

    // Add any missing properties to the existing package.json
    this._.defaults(pkg, JSON.parse(baseDefaultPkg));

    // Update some values we asked the user to provide.
    this._.extend(pkg.name, this.projectname);
    this._.extend(pkg.description, this.projectdesc);
    this._.extend(pkg.author.name, this.authorname);
    this._.extend(pkg.author.url, this.authorurl);

    // Add `base` to devDependencies. That's why we're here, right?
    this._.extend(pkg.devDependencies, JSON.parse(baseDefaultPkg).devDependencies);

    fs.unlink('package.json');
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  } else {
    this.template('_package.json', 'package.json');
  }
};


BaseGenerator.prototype.readme = function readme() {
  if (!fs.existsSync('docs/README.tmpl.md') && !fs.existsSync('.verbrc.md')) {
    this.copy('README', '.verbrc.md');
  }
};

BaseGenerator.prototype.jshintrc = function jshintrc() {
  if (!fs.existsSync('.jshintrc')) {
    this.copy('jshintrc', '.jshintrc');
  }
};

BaseGenerator.prototype.git = function git() {
  if (!fs.existsSync('.gitignore')) {
    this.copy('gitignore', '.gitignore');
  }

  if (!fs.existsSync('.gitattributes')) {
    this.copy('gitattributes', '.gitattributes');
  }
};

BaseGenerator.prototype.license = function license() {
  if (!fs.existsSync('LICENSE-MIT')) {
    this.template('LICENSE-MIT');
  }
};

BaseGenerator.prototype.utilsDirectory = function utilsDirectory() {
  this.directory('_utils', '_utils', true);
};

BaseGenerator.prototype.appDirectory = function appDirectory() {
  this.directory('app', 'app', true);
};

BaseGenerator.prototype.docsDirectory = function docsDirectory() {
  this.directory('docs', 'docs', true);
};

BaseGenerator.prototype.testDirectory = function testDirectory() {
  this.directory('test', 'test', true);
};