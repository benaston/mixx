'use strict';

var mix = self.mixx.mix;

describe('mix', function() {

	it('should mix into an object', function() {
		//arrange
		var source1, source2;
		source1 = {
			foo: 'foo'
		};
		source2 = {
			bar: 'bar'
		};

		//act
		var result = mix({}, source1, source2);

		//assert
		expect(result.foo).toBeDefined();
		expect(result.bar).toBeDefined();
	});

	it('should mix into a function prototype', function() {
		//arrange
		var target, source1, source2;
		target = function() {};
		source1 = {
			foo: 'foo'
		};
		source2 = {
			bar: 'bar'
		};

		//act
		var result = mix(target, source1, source2);

		//assert
		expect(result.prototype.foo).toBeDefined();
		expect(result.prototype.bar).toBeDefined();
	});

	it('should mix getter and setter properties successfully', function() {
		//arrange
		var target, source1, source2;

		target = function() {};
		source1 = { get foo() {} };
		source2 = { set bar(value) {} };

		//act
		var result = mix(target, source1, source2);

		//assert
		var descriptorGetter = Object.getOwnPropertyDescriptor(result.prototype, 'foo');
		var descriptorSetter = Object.getOwnPropertyDescriptor(result.prototype, 'bar');

		expect(descriptorGetter).toBeDefined();
		expect(descriptorSetter).toBeDefined();

		expect(Object.hasOwnProperty(descriptorGetter, 'value')).toBeFalsy(); // not a data property
		expect(Object.hasOwnProperty(descriptorSetter, 'value')).toBeFalsy(); // not a data property

		expect(typeof descriptorGetter.get).toBe('function');
		expect(typeof descriptorSetter.set).toBe('function');
	});

});