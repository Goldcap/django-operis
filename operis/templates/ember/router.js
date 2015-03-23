{% raw %}
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.baseURL
});

Router.map(function() {{% endraw %}
    {% for name,model in models.iteritems() -%}
    this.resource('{{model.plural_converted}}', {% raw %}{{% endraw %}path: '{{model.plural_converted}}'{% raw %}}{% endraw %}, function() {% raw %}{{% endraw %}
        this.route('add', {% raw %}{{% endraw %}path: "/:id/add"{% raw %}}{% endraw %});
        this.route('edit', {% raw %}{{% endraw %}path: "/:id/edit"{% raw %}}{% endraw %});
    {% raw %}}{% endraw %});
    {% endfor -%}
{%- raw %}});

export default Router;
{% endraw %}