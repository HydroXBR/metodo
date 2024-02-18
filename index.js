import axios from 'axios'
import { join, basename, dirname } from "path"
import * as path from 'path'
import { fileURLToPath } from 'url';
const { token } = process.env
import db from 'quick.db'
import express from 'express'
import cors from 'cors'
const app = express()
import bodyParser from "body-parser"
const __dirname = dirname(fileURLToPath(import.meta.url))
import user from "./database/user.js"
import Db from "mongodb"
import im from "./db_connect.js"
const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)
const fetch = s => import('node-fetch').then(({default: fetch}) => fetch(s))
im()


function round(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

const headers = /** @type {import("http").OutgoingHttpHeaders} */ ({
		"Access-Control-Allow-Origin": "https://brainly.com.br",
	"Access-Control-Allow-Methods":"GET",
	"Access-Control-Allow-Headers":"X-Api-Token"
})

async function newuser(id, name, turma, port, lit, mat, fis, quim, bio, geo, hist, total){
	try {
		const neu = await new user({
			id: id,
			turma: turma,
			name: name.trim(),
			port:Number(port),
			lit:Number(lit),
			hist:Number(hist),
			mat:Number(mat),
			fis:Number(fis),
			bio:Number(bio),
			quim:Number(quim),
			geo:Number(geo),
			total:Number(total),
			registered: new Date().getTime()
		}).save()

		return true

	}catch(error){
		console.log(error)
		return false
	}
}

function ifURL(url){
	try{
		return new URL(url)
	}catch(e){
		return undefined
	}
}

app.use(
	cors({ 
		exposedHeaders: [
			'Authorization'
		]
	}),
	bodyParser.json(),
	bodyParser.urlencoded({
		extended: true
	}),
	express.static(path.join(__dirname, '/interface'))
);
				
app.listen(3000, () => {})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/interface'));

// Website pages
app.get('/',function(req,res) {
	console.log("Access: "+ new Date())
  res.sendFile(__dirname + '/interface/ranking.html')
})

app.get('/#',function(req,res) {
	console.log("Access: "+ new Date())
  res.sendFile(__dirname + '/interface/ranking.html')
});


app.get('/ranking',function(req,res) {
	console.log("Access: "+ new Date())
  res.sendFile(__dirname + '/interface/ranking.html')
})

app.get('/check',function(req,res) {
	console.log("Access: "+ new Date())
  res.sendFile(__dirname + '/interface/check.html')
})

app.get('/ranking.html',function(req,res) {
	console.log("Access: "+ new Date())
  res.sendFile(__dirname + '/interface/ranking.html')
})

app.get('/cadastro',function(req,res) {
  res.sendFile(__dirname + '/interface/cadastro.html')
})

app.get('/freq',function(req,res) {
  res.sendFile(__dirname + '/interface/freq.html')
})

app.get('/src',function(req,res) {
	let urlparsed = "https://metodosimulados.yeshayahudesigndeveloper.repl.co" + req._parsedOriginalUrl.href
	let required = new URL(urlparsed).searchParams.get('id') || res.sendStatus(404)
	let format = new URL(urlparsed).searchParams.get('format') || "png"

	
  res.sendFile(__dirname + `/src/${required}.${format}`)
})


app.get('/apianswers',function(req,res) {
	let n = new URL("https://metodosimulados.yeshayahudesigndeveloper.repl.co" + req._parsedOriginalUrl.href).searchParams.get("serie") || "1"
  res.sendFile(__dirname + `/answers${n}.json`)
})

app.get(/useridsearch/gmi,function(req,res) {
  res.sendFile(__dirname + '/interface/user.html')
})

app.get('/metodocomp.png',function(req,res) {
  res.sendFile(__dirname + '/archives/metodocomp.png')
})

app.get('/metodocompleto.png',function(req,res) {
  res.sendFile(__dirname + '/archives/metodocompleto.png')
})

app.get('/metodobox.png',function(req,res) {
  res.sendFile(__dirname + '/archives/metodobox.png')
})

// Express API 

app.get('/zgetuser', function(req, res){
	let urlparsed = req._parsedOriginalUrl
	const url = new URL('https://gr8acess1.yeshayahudesigndeveloper.repl.co'+ urlparsed.href)
	const id = url.searchParams.get('id')
	const tk = url.searchParams.get('token')

	if(!id) return res.send({success: false, message:'User not found! User wasnt provided.'})
	
	if(!tk || tk !== token) return res.send({success:false, message:'Unauthorized'})

	/*function getUser(username, password){	
		return db.get('users').find(user => user.username == username && user.password == password) || false*/

	user.findOne({id: id}, (err, user) => {
		if(user) res.send(user)
		else res.send({success: false, message:'User not found!'})

	})

	/*console.log(getUser(username, password))
	
  res.sendFile(__dirname + '/zgetuser.js')
	res.send(getUser(username, password))*/
})

app.get('/zsetuser', function(req, res){
	let urlparsed = req._parsedOriginalUrl
	const url = new URL('https://gr8acess1.yeshayahudesigndeveloper.repl.co'+ urlparsed.href)

	function randomid() {
    return Math.random().toString(36).slice(-10);
	}
	
	const id = randomid()
	const name = url.searchParams.get('name')
	const port = Number(url.searchParams.get('port'))
	const lit = Number(url.searchParams.get('lit'))
	const mat = Number(url.searchParams.get('mat'))
	const fis = Number(url.searchParams.get('fis'))
	const quim = Number(url.searchParams.get('quim'))
	const bio = Number(url.searchParams.get('bio'))
	const geo = Number(url.searchParams.get('geo')) 
	const hist = Number(url.searchParams.get('hist'))
	const turma = Number(url.searchParams.get('turma'))
	const total = Number(url.searchParams.get('total'))

	
	user.findOne({ name: name }, (err, user) => {
		if(err)console.log(err)
		if(user){
			console.log(user)
			res.send({success: false, message:'Name already exists!'})
		}else{
			newuser(id, name, turma, port, lit, mat, fis, quim, bio, geo, hist, total).then(e=>{
				if(e == true){
					res.send({success:true})
					console.log("ok")
				}else{
					res.send({success:false})
					console.log("not ok")
				}
			})
		}
	})
})

const ff = [
  {
    id: 'ucm2aytl1h',
    name: 'yrhdhdghgf hgf hgf',
    turma: 1,
    port: 8,
    lit: 4,
    mat: 7,
    fis: 3,
    quim: 6,
    bio: 4,
    geo: 8,
    hist: 8,
    total: 48,
    registered: 1693623406614,
    __v: 0
  },
  {
    id: 'nxqcyho9z3',
    name: 'yrhdhdghgf hggf hgf',
    turma: 1,
    port: 8,
    lit: 4,
    mat: 8,
    fis: 8,
    quim: 8,
    bio: 8,
    geo: 8,
    hist: 8,
    total: 60,
    registered: 1693623988779,
    __v: 0
  },
  {
    id: 'etossiuy1b',
    name: 'gfvgfbfgf hgf',
    turma: 1,
    port: 8,
    lit: 4,
    mat: 8,
    fis: 8,
    quim: 8,
    bio: 8,
    geo: 8,
    hist: 8,
    total: 60,
    registered: 1693624057025,
    __v: 0
  },
  {
    id: '1d61mqirw4',
    name: 'vdfbvdfbdfbdfb fbv',
    turma: 1,
    port: 0,
    lit: 0,
    mat: 1,
    fis: 0,
    quim: 0,
    bio: 0,
    geo: 0,
    hist: 0,
    total: 1,
    registered: 1693624080811,
    __v: 0
  },
  {
    id: 'dchv9atnbb',
    name: 'fgf g gg g',
    turma: 1,
    port: 8,
    lit: 4,
    mat: 8,
    fis: 8,
    quim: 7,
    bio: 8,
    geo: 8,
    hist: 8,
    total: 59,
    registered: 1693625068152,
    __v: 0
  },
  {
    id: 'ucy61z56v9',
    name: 'ftyreyeryerhtrh gfr g',
    turma: 2,
    port: 8,
    lit: 4,
    mat: 8,
    fis: 8,
    quim: 7,
    bio: 8,
    geo: 8,
    hist: 8,
    total: 59,
    registered: 1693625121769,
    __v: 0
  }
]


app.get('/apiranking', function(req,res) {
	function sortfunction(a, b){
  	return (a - b)
	}

	let urlparsed = req._parsedOriginalUrl
	const url = new URL('https://gr8acess1.yeshayahudesigndeveloper.repl.co'+ urlparsed.href)
	const sel = Number(url.searchParams.get('sel')) || 1
  
	user.find().then(e => {
		const rrr = e
		const r = rrr.filter(us => us.turma == sel)

		const array = new Array;
		const usersArray = new Array;
		
		for(var t = 0; t < r.length; t++){
			const pontos = r[t].total

      const u = {
        user: {
        	name: r[t].name,
        	pont: pontos,
					percent: round(pontos/60*100,1),
					id: r[t].id
	      }
      }

      for (var key in u) {
	    	array.push(u[key]);
      }

			if(sel == 1){
      	array.sort(function(a, b){
        	return (b.pont) - (a.pont) || a.name.localeCompare(b.name)
     	 })
			}else{
				array.sort(function(a, b){
        	return a.name.localeCompare(b.name)
     	 })
			}

      for (var i = 0; i < array.length; i++) {
	      array[i].rank = i + 1;
      }
    }
		res.send(array)
	})
})
