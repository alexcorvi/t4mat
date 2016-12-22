const t4mat = require('../dist/t4mat.js');
const assert = require('assert');

describe('t4mat', function () {
	it('all replacements are done', function () {
		var result = t4mat({
			time:new Date(),
			format:`{d}{dd}{D}{DD}{m}{mm}{M}{MM}{y}{Y}{yy}{YY}{yyy}{YYY}{yyyy}{YYYY}{R}{RR}{r}{rr}`
		});
		if(~result.indexOf("{")) throw new Error("Not all replacements are done: "+result);
	});

	describe('correct absolute times', function () {
		describe('correct days', function () {
			it('get d', function () {
				assert.equal(t4mat({time:"2016-12-01T16:40:01.083Z",format:"{d}"}),"1");
			});	

			it('get dd', function () {
				assert.equal(t4mat({time:"2016-12-01T16:40:01.083Z",format:"{dd}"}),"01");
			});

			it('get D', function () {
				assert.equal(t4mat({time:"2016-12-01T23:40:01.083Z",format:"{D}"}),"Thu.");
			});	

			it('get DD', function () {
				assert.equal(t4mat({time:"2016-12-01T23:40:01.083Z",format:"{DD}"}),"Thursday");
			});
		});

		describe('correct months', function () {
			it('get m', function () {
				assert.equal(t4mat({time:"2016-01-01T23:40:01.083Z",format:"{m}"}),"1");
			});	

			it('get mm', function () {
				assert.equal(t4mat({time:"2016-01-01T23:40:01.083Z",format:"{mm}"}),"01");
			});

			it('get M', function () {
				assert.equal(t4mat({time:"2016-01-01T23:40:01.083Z",format:"{M}"}),"Jan.");
			});	

			it('get MM', function () {
				assert.equal(t4mat({time:"2016-01-01T23:40:01.083Z",format:"{MM}"}),"January");
			});
		})

		describe('correct years', function () {
			it('get y & yy & Y & YY', function () {
				assert.equal(t4mat({time:"2016-01-01T23:40:01.083Z",format:"{YY}"}),"16");
			});

			it('get yyy & YYY & YYYY & YYYYY', function () {
				assert.equal(t4mat({time:"2016-01-01T23:40:01.083Z",format:"{YYYY}"}),"2016");				
			});
		});
	});

	describe('correct relative times', function () {
		it('get R & r', function () {
			assert.equal(t4mat({time1:"2002-01-01T00:00:00.083Z",time2:"2001-01-01T00:00:00.083Z",format:"{R}"}),"in 1 yr");
		});

		it('get RR & rr', function () {
			assert.equal(t4mat({time2:"2002-01-01T00:00:00.083Z",time1:"2001-01-01T00:00:00.083Z",format:"{RR}"}),"1 year ago");
		});
	});

	describe('accepts different values', function () {
		it('it accept ISO strings', function () {
			assert.equal(t4mat({time:"2001-01-01T00:00:00.083Z",format:"{YYYY}{mm}{dd}"}),"20010101");
		});

		it('it accept Date objects', function () {
			assert.equal(t4mat({time:new Date("2001-01-01T00:00:00.083Z"),format:"{YYYY}{mm}{dd}"}),"20010101");
		});	

		it('it accept milliseconds', function () {
			assert.equal(t4mat({time:978307200083,format:"{YYYY}{mm}{dd}"}),"20010101");
		});	
	});
});