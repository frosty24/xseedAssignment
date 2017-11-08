"use strict";

//Imports
import mongoose from 'mongoose';
import chai, { expect } from 'chai';
import converter from '../models/user.model';

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
		//Drop previous test database before test run
		for (var collection in db.collections) {
			db.collections[collection].remove(function() {});
		}
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
		//Given type String A
		/*
			Put given type string A here
		 */
		let a = `type Address {
		city: String,
		state: String
		}`;
		//Given type String B
		/*
			Put given type string B here
		 */
		let b = `type User @model {
		id: String! @unique,
		email: String! @unique,
		name: String!,
		age: Int,
		addresses: [Address],
		dateOfBirth: Date
		}`;
		converter.setStrings(a,b);
		// Verify a model based on given strings
		/*
			Put model values to verify
		 */
		let u = new converter.userModel({
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
		
		it('should create a new model', (done) => {
			try{
				converter.userModel.addUser(u)
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
				.catch(e => {
					throw ('model already exist');
					done();
				});
			}
			catch(e){
				done();
			}
		});
	});
});