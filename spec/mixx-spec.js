'use strict';

var mix = self.mixx.mix;

describe('mix', function() {

	describe('when supplied with undefined', function() {

		it('should complete successfully without throwing an error', function() {
			//arrange
			var target = {};

			//act
			var result = mix(target);

			//assert
			expect(result === target).toBe(true);
		});

	});

	describe('when supplied with undefined as part of an argument list', function() {

		it('should complete successfully without throwing an error', function() {
			//arrange
			var target = {},
				source = {
					foo: 'foo'
				};

			//act
			var result = mix(target, undefined, source);

			//assert
			expect(result === target).toBe(true);
			expect(result.foo).toBe('foo');
		});

		it('should complete successfully without throwing an error when there is more than one undefined value', function() {
			//arrange
			var target = {},
				source1 = {
					foo: 'foo'
				},
				source2 = {
					bar: 'bar'
				};

			//act
			var result = mix(target, undefined, source1, undefined, source2);

			//assert
			expect(result === target).toBe(true);
			expect(result.foo).toBe('foo');
			expect(result.bar).toBe('bar');
		});

	});

	describe('when supplied with null as part of an argument list', function() {

		it('should complete successfully without throwing an error', function() {
			//arrange
			var target = {},
				source = {
					foo: 'foo'
				};

			//act
			var result = mix(target, null, source);

			//assert
			expect(result === target).toBe(true);
			expect(result.foo).toBe('foo');
		});

		it('should complete successfully without throwing an error when there is more than one null value', function() {
			//arrange
			var target = {},
				source1 = {
					foo: 'foo'
				},
				source2 = {
					bar: 'bar'
				};

			//act
			var result = mix(target, null, source1, null, source2);

			//assert
			expect(result === target).toBe(true);
			expect(result.foo).toBe('foo');
			expect(result.bar).toBe('bar');
		});

	});

	describe('when supplied with undefined as the target', function() {

		it('should return undefined', function() {
			//arrange && act
			var result = mix(undefined);

			//assert
			expect(result === undefined).toBe(true);
		});

	});

	describe('when supplied with null as the target', function() {

		it('should return null', function() {
			//arrange && act
			var result = mix(null);

			//assert
			expect(result === null).toBe(true);
		});

	});


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
		source1 = {get foo() {}
		};
		source2 = {set bar(value) {}
		};

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