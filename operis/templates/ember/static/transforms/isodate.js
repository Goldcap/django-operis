import DS from "ember-data";

var IsodateTransform = DS.Transform.extend({  
  deserialize: function (serialized) {
    if (serialized) {
      return moment(serialized).toDate();
    }
    return serialized;
  },

  serialize: function (deserialized) {
    if (deserialized) {
      return moment(deserialized).format();
    }
    return deserialized;
  }
});

export default IsodateTransform;
