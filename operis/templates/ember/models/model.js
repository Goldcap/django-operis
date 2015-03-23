import Ember from 'ember';  
import DS from "ember-data";

var Operis{{ model.singular }} = DS.Model.extend({
  {%- for field in model.model -%}
  {%- if field.class == "BooleanField" %}
  {{field.name_underscore}}: DS.attr('boolean'){% if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "CharField" %}
  {{field.name_underscore}}: DS.attr('string'){% if not loop.last %},{% endif %}
  {%- endif %} 
  {%- if field.class == "EncryptedTextField" %}
  {{field.name_underscore}}: DS.attr('string'){% if not loop.last %},{% endif %}
  {%- endif %}  
  {%- if field.class == "TextField" %}
  {{field.name_underscore}}: DS.attr('string'){% if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "ChoiceField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "TypedChoiceField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "DateField" %}
  {{field.name_underscore}}: DS.attr('date'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "DateTimeField" %}
  {{field.name_underscore}}: DS.attr('isodate'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "DecimalField" %}
  {{field.name_underscore}}: DS.attr('number'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "EmailField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "FileField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.tyclasspe == "FilePathField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "FloatField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "ImageField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "IntegerField" %}
  {{field.name_underscore}}: DS.attr('number'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "IPAddressField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "GenericIPAddressField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "MultipleChoiceField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %} 
  {%- if field.class == "TypedMultipleChoiceField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %} 
  {%- if field.class == "NullBooleanField" %}
  {{field.name_underscore}}: DS.attr('boolean'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "RegexField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "SlugField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "TimeField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "URLField" %}
  {{field.name_underscore}}: DS.attr('string'){%- if not loop.last %},{% endif %}
  {%- endif %}
  {%- if field.class == "ForeignKey" %}
  {{field.name_underscore}}: DS.belongsTo('{{field.parent}}',{async:true}){%- if not loop.last %},{% endif %}
  {%- endif %} 
  {%- if field.class == "ManyToManyField" %}
  {{field.name_underscore}}: DS.hasMany('{{field.parent}}',{% raw %}{{% endraw %}async:true{% raw %}}{% endraw %}){%- if not loop.last %},{% endif %}
  {%- endif %} 
  {%- if field.class == "OneToMany" %}
  {{field.plural_name_underscore}}: DS.hasMany('{{field.plural_name_underscore}}',{% raw %}{{% endraw %}async:true{% raw %}}{% endraw %}){%- if not loop.last %},{% endif %}
  {%- endif %} 
  {%- endfor %}
});
export default Operis{{ model.singular }};
