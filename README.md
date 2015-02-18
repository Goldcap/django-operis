# Django Operis
Autogeneration of Ember Models from Django Models

# Ember Install

So just a brief rundown of how to get started with ember-cli. A lot of it will involve installing Ember CLI on your local machine.

Here's the basic ember setup, taken from [Ember CLI](http://www.ember-cli.com/) 

```bash
npm install -g ember-cli
npm install -g bower
npm install -g phantomjs
```

Following that, let's install the Node Modules and Bower Components. Remember, bower won't let you run as root, but NPM requires it.

```bash
npm install

su someuser
bower install
exit
```

This has yet to be added to PIP, so to install, clone from the git repository, if you haven't already.

You'll need to add a few things to your Django Settings:

```python
ENVIRONMENT = "development"
EMBER_MODELS = ["assets.models","products.models","paomusers.models",]
EMBER_APP_NAME = "paom-app"
EMBER_ENV = '{"environment":"development","baseURL":"/ember","locationType":"auto","EmberENV":{"FEATURES":{}},"APP":{"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true}}'
```
Once this is done, you should be able to generate the Ember models from Django models. You should likewise make sure you've collected the static components from Operis.

```python
python manage.py collect-static-ember
python manage.py generate-ember
```

You can now see ember running on static "html" using ember-cli.

```bash
cd some-ember-app
ember server
```

Locally we'll proxy everything via nginx, you'll see a custom config in the "doc" directory. Then you can view the homepage here:

http://localhost:4200


Feel free to reach out to me with any questions or issues you might have, as the instructions above may or may not cover everything. Most of all, have fun!
