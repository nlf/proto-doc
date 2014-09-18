var Util = require('util');

var knownTypes = [
    'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'bool',
    'fixed64', 'sfixed64', 'double',
    'string', 'bytes',
    'fixed32', 'sfixed32', 'float'
];

exports.parse = function (input, output) {
    var messages = Object.keys(input.messages);

    for (var messageIndex = 0, messagesLength = messages.length; messageIndex < messagesLength; ++messageIndex) {
        var message = messages[messageIndex];
        var fields = Object.keys(input.messages[message].fields);

        output.write('## ' + message + '\n\n');
        for (var fieldIndex = 0, fieldsLength = fields.length; fieldIndex < fieldsLength; ++fieldIndex) {
            var fieldName = fields[fieldIndex];
            var field = input.messages[message].fields[fieldName];

            output.write(Util.format('- %s\n', fieldName));
            if (knownTypes.indexOf(field.type) !== -1) {
                output.write(Util.format('  - type: %s\n', field.type));
            }
            else {
                output.write(Util.format('  - type: [%s](#%s)\n', field.type, field.type.toLowerCase()));
            }
            output.write(Util.format('  - rule: %s\n', field.rule));
        }

        output.write('\n');
    }
};
