;(function(root) {

	'use strict';

	var namespace = {};

	;(function(namespace) {

	'use strict';

	var mixFn = (function() {
		return isES5() ? mixIntoObjectES5 : mixIntoObjectES3;
	}());

	/**
	 * Accepts an object and zero or more objects.
	 * Returns the function, modified so that the
	 * methods on the supplied objects are present
	 * on the function's prototype.
	 */
	function mix(target) {
		var objs = Array.prototype.slice.call(arguments, 1);

		switch (typeof target) {
			case 'function':
				mixFn(target.prototype, objs);
				return target;
			case 'object':
				return mixFn(target, objs);
		}

		return target;
	}

	function mixIntoObjectES3(target, objs) {
		var i, key, o;

		for (i = 0; i < objs.length; i++) {
			o = objs[i];

			if(o == null) { // null or undefined
				continue;
			}

			for (key in o) {
				if (!o.hasOwnProperty(key)) {
					continue;
				}

				target[key] = o[key];
			}
		}

		return target;
	}

	function mixIntoObjectES5(target, objs) {
		objs.forEach(function(o) {
			if(o == null) { // null or undefined
				return;
			}
			Object.keys(o).forEach(function(k) {
				var descriptor = Object.getOwnPropertyDescriptor(o, k);
				Object.defineProperty(target, k, descriptor);
			});
		});

		return target;
	}

	function isES5() {
		return Object.getOwnPropertyDescriptor && Array.prototype.forEach;
	}

	namespace.mix = mix;

}(namespace));

	if ((typeof exports === 'object') && module) {
		module.exports = namespace; // CommonJS
	} else if ((typeof define === 'function') && define.amd) {
		define(function() {
			return namespace;
		}); // AMD
	} else {
		root.mixx = namespace; // Browser
	}

}(this));