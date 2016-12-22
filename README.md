# t4mat

Tiny & easy to use library for date formatting

## Installation

#### Download
Download the `t4mat.min.js` file from the `dist` directory.

#### NPM
`npm install --save t4mat`


## Usage

> Note:
> This library can be either used in node or in the browser.
> The following examples are using the node environment.
>


```javascript
const t4mat = require("t4mat");
var myDate = "2016-01-01T16:40:01.083Z"; // ISO string
var formatted = t4mat({
	t:myDate,
	format:"{yyyy} - {m} - {d}"
});

// > "2016 - 1 - 1"
```

As the above example demonstrates, the library is a mere function that takes an object as an argument, this object would have the following properties:

* __`time` (aliases: `t1`,`t`):__ The date in question, which can be a milliseconds since the epoch time (e.g. `1451666401083`), an ISO String like the example above, or a date object. In fact it can be any value that the `new Date()` constructor in javascript can take.
* __format:__ This is just a string having short codes that are delimited by the curly braces. So for the above example, this format: `{d} / {m}` would return: `1 / 1`, while this format: `{yyyy} ({d})` would return: `2016 (1)`. The following shortcodes are available in the format:
	* __`{d}`__ The day of the month (Example: `1`).
	* __`{dd}`__ The day of the month with a `0` prefix when it's less than 10 (Example: `01`).
	* __`{D}`__ The day of the week, short version (Example: `Wed.`).
	* __`{DD}`__ The day of the week, full version (Example: `Wednesday`).
	* __`{m}`__ The numerical representation of the month (Example: `1`).
	* __`{mm}`__ The numerical representation of the month, with a `0` prefix when it's less than 10 (Example: `01`).
	* __`{M}`__ The literal representation of the month, short version (Example: `Jan.`).
	* __`{MM}`__ The literal representation of the month, full version (Example: `January`).
	* __`{Y}`__ Two digits representation of the year (Example: `16`).
	* __`{y}`__ same as above.
	* __`{YY}`__ same as above.
	* __`{yy}`__ same as above.
	* __`{YYYY}`__ Full year (Example `2016`).
	* __`{yyyy}`__ same as above.
	* __`{yyy}`__ same as above.
	* __`{YYY}`__ same as above.
	* __`{R}`__ Relative representation of the date/time, short version (Example `4 yrs ago`).
	* __`{RR}`__ Relative representation of the date/time, full version (Example `4 years ago`).


### About the relative time
By default the time you pass in the object will be represented relatively to the current time. However, if you want it to be calculated relative to another time, pass the base time as `t2` in the object.


* Example:

Let's suppose that the current time in the browser is `2016-01-02T00:00:00.000Z`

Running this code:

```javascript
var formatted = t4mat({
	t:"2016-01-01T00:00:00.000Z",
	format:"{RR}"
});
console.log(formatted);
// > "1 day ago"

var formatted2 = t4mat({
	t:"2016-01-03T00:00:00.000Z",
	format:"{RR}"
});
console.log(formatted2);
// > "in 1 day"
```

So by default the relative time calculation takes the current browser/machine time as the base. However if you wanted to pass your own base time then pass it as `t2`:


```javascript
var formatted = t4mat({
	t1:"2016-01-01T00:00:00.000Z",
	t2:"2016-01-02T00:00:00.000Z"
	format:"{RR}"
});
console.log(formatted);
// > "1 day ago"

var formatted2 = t4mat({
	t1:"2016-01-01T00:00:00.000Z", // same as above
	t2:"2016-01-03T00:00:00.000Z" // different base time
	format:"{RR}"
});
console.log(formatted2);
// > "2 day ago"
```
