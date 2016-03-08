'use strict';

const pushover = require('pushover-notifications');
const _ = require('lodash');


function main(step, context, config, input, done) {
	const p = new pushover({
		user: config.user_key,
		token: config.api_key
	});

	function send(p, msg) {
		p.send(msg, (err, result) => {
			if (err) { return done(err); }
		});
	}

	const title = _.template(config.title)(context);
	const message = _.template(config.message)(context);
	send(p, { title, message });

	// pass through
	const output = input;
	done(null, output, null);
}


module.exports = {
	main: main,
	defaults: {
		config: {
			title: '’cause: <%=task.name%>',
			message: '<%=prevStep.block>: <%=input%>'
		},
		data: {},
		description: 'pushover notification'
	}
};
