/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('base', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:app', ['../../app']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'package.json',
      '.verbrc.md',
      '.jshintrc',
      '.gitignore',
      '.gitattributes',
      'LICENSE-MIT',
    ];

    helpers.mockPrompt(this.app, {
      projectname: 'base-project',
      projectdesc: 'The most interesting project in the world > Base',
      username:    'jonschlinkert',
      authorname:  'Jon Schlinkert',
      authorurl:   'https://github.com/jonschlinkert',
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('base', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:app', ['../../app']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'docs/README.tmpl.md',
      'package.json',
      '.jshintrc',
      '.gitignore',
      '.gitattributes',
      'LICENSE-MIT',
    ];


    helpers.mockPrompt(this.app, {
      projectname: 'base-project',
      projectdesc: 'The most interesting project in the world > Base',
      username:    'jonschlinkert',
      authorname:  'Jon Schlinkert',
      authorurl:   'https://github.com/jonschlinkert',
    });

    this.app.options['readme'] = true;
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

/**
 * Config
 */

describe('base:config', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:config', ['../../config']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['.verbrc.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('base:config basefile', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:config', ['../../config'], ['basefile']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['basefile.js'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('base:config verbrc', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:config', ['../../config'], ['verbrc']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['.verbrc.yml'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('base:config verbrc', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:config', ['../../config'], ['md']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['.verbrc.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

/**
 * Data
 */

describe('base:data', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:data', ['../../data'], ['changelog']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['CHANGELOG'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

/**
 * doc
 */

describe('base:doc', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:doc', ['../../doc'], ['footer']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['docs/footer.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


describe('base:doc', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:doc', ['../../doc'], ['install']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['docs/install.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


describe('base:doc', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:doc', ['../../doc'], ['install-global']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['docs/install-global.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});


describe('base:readme', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:readme', ['../../readme']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['docs/README.tmpl.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('base:readme', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('base:readme', ['../../readme'], ['readme']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = ['docs/README.tmpl.md'];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
