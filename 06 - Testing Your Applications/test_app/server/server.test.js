const request = require('supertest');
const expect = require('expect');

const app = require('./server.js').app;

describe('server', () => {
    describe('GET /', () => {
        it('should return "hello world" response', (done) => {
            request(app)
                .get('/')
                //.expect(200)
                //.expect('hello world')
                .expect(404)
                /*.expect({
                    error: 'Page not found.'
                })*/
                .expect((res) => {
                    expect(res.body).toInclude({
                        error: 'Page not found.'
                    });
                })
                .end(done);
        });
    });

    describe('GET /users', () => {
        it('should return users array', (done) => {
            request(app)
                .get('/users')
                .expect(200)
                .expect((res) => {
                    expect(res.body).toInclude({
                        name: 'a',
                        age: 22
                    });
                })
                .end(done);
        });
    });
});