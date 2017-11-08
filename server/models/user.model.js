//Imports
import mongoose from 'mongoose';

// Given type String - Can be anything
const converter = {
	userModel: null,
	str1: '',
	str2: '',
	setStrings: function(str1, str2){
		this.str1 = str1;
		this.str2 = str2;
		this.covertStringsToModel();
	},
	//Converts given 2 strings to schemas and return Model
	covertStringsToModel : function(){
		var schemas = {};
		var str1 = this.str1;
		var str2 = this.str2;
		if (str1) {
			var isModel = (str1.indexOf('@model') > -1);
			var name = str1.split(' ')[1];
			schemas[name] = new mongoose.Schema();
			var subStr = str1.substring(str1.indexOf('{') + 1, str1.indexOf('}'));
			var props = subStr.split(',');
			for(var i=0,len=props.length;i<len;++i){
				var splitIndex = props[i].indexOf(':');
				var key = (props[i].substring(0,splitIndex)).trim();
				var value = (props[i].substring(splitIndex+1,props[i].length)).trim();
				var isUnique = (value.indexOf('@unique') > -1);
				var isRequired = (value.indexOf('!') > -1);
				var isArray = (value.indexOf('[') > -1) && (value.indexOf(']') > -1);
				var type = value.split(' ')[0];
				type = type.replace('!', '').replace('[', '').replace(']', '');
				switch(type){
					case 'String':
						var obj = {};
						obj[key] = {type : String, required: isRequired, unique: isUnique};
						if (isArray) {
							obj[key] = [{type : String, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : String, required: isRequired, unique: isUnique}
						}
					break;
					case 'Int':
						var obj = {};
						obj[key] = {type : Number, required: isRequired, unique: isUnique};
						if (isArray) {
							obj[key] = [{type : Number, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : Number, required: isRequired, unique: isUnique}
						}
					break;
					case 'Boolean':
						var obj = {};
						if (isArray) {
							obj[key] = [{type : Boolean, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : Boolean, required: isRequired, unique: isUnique}
						}
					break;
					case 'Date':
						var obj = {};
						if (isArray) {
							obj[key] = [{type : Date, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : Date, required: isRequired, unique: isUnique}
						}
					break;
					default:
					break;
				};
				schemas[name].add(obj);
			}
			if (isModel) {
				var model = mongoose.model(name, schemas[name]);
			}
		}
		if (str2) {
			var isModel = (str2.indexOf('@model') > -1);
			var name = str2.split(' ')[1];
			schemas[name] = new mongoose.Schema();
			var subStr = str2.substring(str2.indexOf('{') + 1, str2.indexOf('}'));
			var props = subStr.split(',');
			for(var i=0,len=props.length;i<len;++i){
				var splitIndex = props[i].indexOf(':');
				var key = (props[i].substring(0,splitIndex)).trim();
				var value = (props[i].substring(splitIndex+1,props[i].length)).trim();
				var isUnique = (value.indexOf('@unique') > -1);
				var isRequired = (value.indexOf('!') > -1);
				var isArray = (value.indexOf('[') > -1) && (value.indexOf(']') > -1);
				var type = value.split(' ')[0];
				type = type.replace('!', '').replace('[', '').replace(']', '');
				switch(type){
					case 'String':
						var obj = {};
						if (isArray) {
							obj[key] = [{type : String, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : String, required: isRequired, unique: isUnique}
						}
					break;
					case 'Int':
						var obj = {};
						if (isArray) {
							obj[key] = [{type : Number, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : Number, required: isRequired, unique: isUnique}
						}
					break;
					case 'Boolean':
						var obj = {};
						if (isArray) {
							obj[key] = [{type : Boolean, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : Boolean, required: isRequired, unique: isUnique}
						}
					break;
					case 'Date':
						var obj = {};
						if (isArray) {
							obj[key] = [{type : Date, required: isRequired, unique: isUnique}];
						}else{
							obj[key] = {type : Date, required: isRequired, unique: isUnique}
						}
					break;
					default:
						if(schemas[type]){
							var obj = {};
							if (isArray) {
								obj[key] = [{type : schemas[type], required: isRequired, unique: isUnique}];
							}else{
								obj[key] = {type : schemas[type], required: isRequired, unique: isUnique}
							}
						}
					break;
				};
				schemas[name].add(obj);
			}
			if (isModel) {
				var model = mongoose.model(name, schemas[name]);
			}
		};
		this.userModel = model;
		// Add user to database
		this.userModel.addUser = (user) => {
		    return user.save();
		};
	}
}

//Export User Model
export default converter;