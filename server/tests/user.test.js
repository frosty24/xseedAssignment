"use strict";

//Imports
import mongoose from 'mongoose';
import chai, { expect } from 'chai';
import User from '../models/user.model';

chai.config.includeStack = true;

/**
 * root level hooks
 */
before((done) => {
	//Connect mongoDb
	mongoose.connect('mongodb://localhost:27017/xseed', { useMongoClient: true });
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error'));
	db.once('open', function() {
		console.log('We are connected to test database!');
		done();
	});
});

after((done) => {
	mongoose.models = {};
	mongoose.modelSchemas = {};
	mongoose.connection.close();
	done();
});

// Describe tests
describe('## New user', () => {
	describe('#Create()', () => {
		it('should create a new User', (done) => {
			// Create a User object to pass to User.addUser()
			let u = User({
				id: Math.random(),
				email: Math.random() + 'test@mymail.com',
				name: 'alpha',
				age: 10,
				addresses: [
					{
						city: 'gurugram',
						state: 'haryana'
					},
					{
						city: 'noida',
						state: 'U.P'
					}
				],
				dateOfBirth: new Date(Date.now())
			});

			try{
				User.addUser(u)
				.then(savedUser => {
					expect(savedUser.id).to.equal(u.id);
					expect(savedUser.email).to.equal(u.email);
					expect(savedUser.name).to.equal(u.name);
					expect(savedUser.age).to.equal(u.age);
					expect(savedUser.addresses[0].city).to.equal(u.addresses[0].city);
					expect(savedUser.addresses[0].state).to.equal(u.addresses[0].state);
					expect(savedUser.addresses[1].city).to.equal(u.addresses[1].city);
					expect(savedUser.addresses[1].state).to.equal(u.addresses[1].state);
					expect(savedUser.dateOfBirth).to.equal(u.dateOfBirth);
					done();
				})
				.catch(done);
			}
			catch(e){
				done();
			}
		});

		it('should not create a new User without email', (done) => {
			// Create a User object to pass to User.addUser()
			let u = User({
				id: Math.random(),
				name: 'alpha',
				age: 10,
				addresses: [
					{
						city: 'gurugram',
						state: 'haryana'
					},
					{
						city: 'noida',
						state: 'U.P'
					}
				],
				dateOfBirth: new Date(Date.now())
			});
			try{
				User.addUser(u).then().catch(err => {
					expect(err.errors.email).to.exist;
					done();
				});
			} catch(e){
				done();
			}
		});

		it('should not create a new User without id', (done) => {
			// Create a User object to pass to User.addUser()
			let u = User({
				email: Math.random() + 'test@mymail.com',
				name: 'alpha',
				age: 10,
				addresses: [
					{
						city: 'gurugram',
						state: 'haryana'
					},
					{
						city: 'noida',
						state: 'U.P'
					}
				],
				dateOfBirth: new Date(Date.now())
			});
			try{
				User.addUser(u).then().catch(err => {
					expect(err.errors.id).to.exist;
					done();
				});
			} catch(e){
				done();
			}
		});

		it('should not create a new User without name', (done) => {
			// Create a User object to pass to User.addUser()
			let u = User({
				id: Math.random(),
				email: Math.random() + 'test@mymail.com',
				age: 10,
				addresses: [
					{
						city: 'gurugram',
						state: 'haryana'
					},
					{
						city: 'noida',
						state: 'U.P'
					}
				],
				dateOfBirth: new Date(Date.now())
			});
			try{
				User.addUser(u).then().catch(err => {
					expect(err.errors.name).to.exist;
					done();
				});
			} catch(e){
				done();
			}
		});

		it('should not create a new User with same id', (done) => {
			let id = Math.random();
			// Create a User object to pass to User.addUser()
			let u = User({
				id: id,
				email: Math.random() + 'test@mymail.com',
				age: 10,
				addresses: [
					{
						city: 'gurugram',
						state: 'haryana'
					},
					{
						city: 'noida',
						state: 'U.P'
					}
				],
				dateOfBirth: new Date(Date.now())
			});
			try{
				User.addUser(u).then(User.addUser(u)).then().catch(err => {
					expect(err.errors).to.exist;
					done();
				});
			} catch(e){
				done();
			}
		});

		it('should not create a new User with same email', (done) => {
			let email = Math.random() + 'test@mymail.com';
			// Create a User object to pass to User.addUser()
			let u = User({
				id: Math.random(),
				email: email,
				age: 10,
				addresses: [
					{
						city: 'gurugram',
						state: 'haryana'
					},
					{
						city: 'noida',
						state: 'U.P'
					}
				],
				dateOfBirth: new Date(Date.now())
			});
			try{
				User.addUser(u).then(User.addUser(u)).then().catch(err => {
					expect(err.errors).to.exist;
					done();
				});
			} catch(e){
				done();
			}
		});
	});
});