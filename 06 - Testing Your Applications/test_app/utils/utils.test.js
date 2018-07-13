const expect = require('expect');
const utils = require('./utils');

describe('utils', () => {

    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33, 11);
            expect(res).toBeA('number').toBe(44, `Expected 44, but got ${res}`);
        });

        //async function
        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 3, (sum) => {
                expect(sum).toBe(7).toBeA('number');
                done();
            });
        });
    });

    it('should square a number', () => {
        var res = utils.square(3);
        expect(res).toBeA('number').toBe(9, `Expected 9, but got ${res}`);
        // if (res !== 9) {
        //     throw new Error(`Expected 9, but got ${res}`)
        // }
    });

    it('should async square a number', (done) => {
        var res = utils.asyncSquare(5, (res) => {
            expect(res).toBe(25).toBeA('number');
            done();
        });
    });

    // testing
    /*it('should expect some values', () => {
        // expect(12).toNotBe(11);
    
        // expect({
        //     name: 'Andrew'
        // }).toEqual({
        //     name: 'Andrew'
        // });
        // expect({
        //     name: 'Andrew'
        // }).toNotEqual({
        //     name: 'andrew'
        // });
    
        // expect([2, 3, 4]).toInclude(2);
        // expect([2, 3, 4]).toExclude(5);
    
        // expect({
        //     name: 'Andrew',
        //     age: 25,
        //     location: 'Philadelphia'
        // }).toInclude({
        //     age: 25
        // });
    
        // expect({
        //     name: 'Andrew',
        //     age: 25,
        //     location: 'Philadelphia'
        // }).toExclude({
        //     age: 23
        // });
    });*/
});

it('should set first and last names', () => {
    var user = {
        age: 25,
        location: 'Philadelphia'
    }
    var res = utils.setName(user, 'Andrew Mead');

    // expect(user).toEqual(res); //as objects are passed as refference

    expect(user).toInclude({
        firstName: 'Andrew',
        lastName: 'Mead'
    })
});