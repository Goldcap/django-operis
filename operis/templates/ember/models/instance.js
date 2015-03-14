import Operis{{ model.singular }} from '{{ember_app_name}}/models/operis/operis-{{ model.singular_converted }}';

var {{ model.singular }} = Operis{{ model.singular }}.extend({});

export default {{ model.singular }};