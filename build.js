const path = require("path");
const fs = require('fs');
const rollup = require('rollup');
const srcPath = path.join(process.cwd(),"src","index.js");
const distDir = path.join(process.cwd(),"dist") + "/";
const uglifyjs = require("uglify-js");
const buble = require('rollup-plugin-buble');

function build(){
	rollup.rollup({
		entry: srcPath,
		plugins:[
			buble()
		]
	}).then((bundle) => {

		// Universal
		var umd = bundle.generate({
			format:"umd",
			moduleName:"t4mat"
		});
		fs.writeFileSync(distDir+"t4mat.js",umd.code);

		var minified = uglifyjs.minify(umd.code,{fromString:true}).code;
		fs.writeFileSync(distDir+"t4mat.min.js",minified);
	}).catch((err)=>{
		console.log(err);
		process.exit(1);
	});
}

build();