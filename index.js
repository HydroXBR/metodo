import axios from 'axios'
import { join, basename, dirname } from "path"
let t = "hh"
import * as path from 'path'
import { fileURLToPath } from 'url';
const { token } = process.env
import express from 'express'
import cors from 'cors'
const { PORT } = process.env || 3000
const app = express()
import bodyParser from "body-parser"
const __dirname = dirname(fileURLToPath(import.meta.url))
import user from "./database/user.js"
import useradm from "./database/useradm.js"
import simuladoo from "./database/simulado.js"
import old from "./database/simulado02.js"
import Db from "mongodb"
import im from "./db_connect.js"
const ec = txt => encodeURIComponent(txt)
const dec = txt => decodeURIComponent(txt)
var simulados = [
	{
		name: "14° Simulado - 2025", 
		description: "14° Simulado - 2025",
		model: "SIS",
		date: "31-08-2025",
		id: "052025",
		organization: [{materia: "port", q:12, name: "Português"},{materia: "hist", q:8, name: "História"},{materia: "geo", q:8, name: "Geografia"},{materia: "bio", q:8, name: "Biologia"},{materia: "quim", q:8, name: "Química"},{materia: "mat", q:8, name: "Matemática"},{materia: "fis", q:8, name: "Física"}],
		special: [0,13,22,31,40,49,58],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "História", special: 13 }, // +1
			{ materia: "Geografia", special: 22 }, // +2
			{ materia: "Biologia", special: 31 }, // +3
			{ materia: "Química", special: 40 }, // +4
			{ materia: "Matemática", special: 49 }, // +5
			{ materia: "Física", special: 58 } // +6
		],
		intervals: {
			port: [1, 12],
			hist: [13, 20],
			geo: [21, 28],
			bio: [29, 36],
			quim: [37, 44],
			mat: [45, 52],
			fis: [53, 60]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["B","E","E","B","C","B","A","C","C","C","B","E","D","E","D","B","C","B","C","B","C","B","A","B","B","B","E","E","E","A","D","B","C","D","E","A","D","A","A","A","C","C","C","A","C","E","B","B","A","C","C","C","A","D","D","E","C","D","A","B"]
			},
			{
				turma:2,
				respostas:["B","E","E","B","A","B","B","B","A","E","B","C","B","E","D","C","C","B","D","A","B","A","E","A","E","B","C","D","C","B","A","B","B","B","C","B","C","D","E","D","B","D","D","A","B","B","C","A","E","D","E","A","A","D","E","C","D","C","A","B"]
			},
			{
				turma:3,
				respostas:["E","C","B","B","D","A","A","B","C","E","E","B","B","C","C","D","C","C","C","E","D","C","B","D","A","D","A","D","E","B","B","B","D","B","D","B","D","D","C","B","C","A","D","B","C","D","C","C","E","D","E","D","A","A","D","D","C","C","B","B"]
			}
		],
		questions: 60
	},
	{
		name: "13° Simulado - 2025", 
		description: "13° Simulado - 2025",
		model: "SIS",
		date: "02-08-2025",
		id: "042025",
		organization: [{materia: "port", q:12, name: "Português"},{materia: "hist", q:8, name: "História"},{materia: "geo", q:8, name: "Geografia"},{materia: "bio", q:8, name: "Biologia"},{materia: "quim", q:8, name: "Química"},{materia: "mat", q:8, name: "Matemática"},{materia: "fis", q:8, name: "Física"}],
		special: [0,13,22,31,40,49,58],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "História", special: 13 }, // +1
			{ materia: "Geografia", special: 22 }, // +2
			{ materia: "Biologia", special: 31 }, // +3
			{ materia: "Química", special: 40 }, // +4
			{ materia: "Matemática", special: 49 }, // +5
			{ materia: "Física", special: 58 } // +6
		],
		intervals: {
			port: [1, 12],
			hist: [13, 20],
			geo: [21, 28],
			bio: [29, 36],
			quim: [37, 44],
			mat: [45, 52],
			fis: [53, 60]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["E","E","E","A","E","A","C","B","E","B","C","D","C","A","B","D","C","A","A","D","A","A","D","D","C","C","B","E","A","E","C","A","D","D","E","E","C","B","A","D","C","A","C","B","D","E","A","A","A","E","C","E","A","B","C","D","B","X","X","B"]
			},
			{
				turma:2,
				respostas:["C","C","D","A","C","D","E","D","B","E","A","C","B","B","B","D","D","A","E","E","E","D","D","B","C","D","B","D","D","E","C","C","C","A","A","A","E","C","B","E","D","D","E","B","B","C","E","C","E","C","B","D","C","B","A","E","D","C","E","A"]
			},
			{
				turma:3,
				respostas:["E","E","D","A","C","B","C","A","D","A","D","E","A","E","B","A","E","A","C","D","D","D","A","D","E","B","B","D","C","B","D","X","X","A","B","C","A","B","D","D","B","A","C","X","D","E","A","A","B","B","D","A","A","E","E","D","B","C","D","A"]
			}
		],
		questions: 60
	},
	{
		name: "Simulado PSC - 2025 (NA)", 
		description: "NA",
		model: "PSC",
		date: "30-04-2025",
		id: "NA2025",
		organization: [{materia: "port", q:10, name: "Português"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0,11,18,25,32,39,46,53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 }, // +1
			{ materia: "História", special: 18 }, // +2
			{ materia: "Geografia", special: 25 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Química", special: 39 }, // +5
			{ materia: "Física", special: 46 }, // +6
			{ materia: "Matemática", special: 53 } // +7
		],
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["B","C","B","D","D","C","E","B","C","B","C","B","B","C","C","D","B","C","E","C","B","D","C","C","C","E","D","B","B","E","D","D","B","E","A","A","B","B","E","A","A","D","C","B","A","B","E","B","B","A","B","B","A","E"]
			},
			{
				turma:2,
				respostas:["A","B","D","E","E","B","C","B","B","D","C","D","B","D","E","A","C","C","A","C","C","E","C","E","E","D","E","B","B","B","A","D","B","E","A","A","B","B","E","A","A","D","C","B","A","C","D","C","C","B","C","B","D","C"]
			},
			{
				turma:3,
				respostas:["D","B","B","A","D","E","B","E","C","C","D","E","A","D","D","B","E","A","B","A","C","E","A","B","C","E","A","D","A","E","D","E","D","C","C","C","E","A","B","B","D","B","A","D","B","E","B","B","C","A","D","A","B","D"]
			}
		],
		questions: 54
	},
	{
		name: "12° Simulado - 2025", 
		description: "12° Simulado - 2025",
		model: "PSC",
		date: "19-05-2025",
		id: "032025",
		organization: [{materia: "port", q:10, name: "Português"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0,11,18,25,32,39,46,53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 }, // +1
			{ materia: "História", special: 18 }, // +2
			{ materia: "Geografia", special: 25 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Química", special: 39 }, // +5
			{ materia: "Física", special: 46 }, // +6
			{ materia: "Matemática", special: 53 } // +7
		],
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["B","A","B","B","D","B","E","C","A","C","A","E","A","E","A","D","A","A","C","E","B","D","C","A","C","C","E","B","B","D","E","C","C","B","B","D","B","C","C","E","C","B","E","X","E","A","A","A","E","B","A","A","B","C"]
			},
			{
				turma:2,
				respostas:["B","A","B","B","D","C","C","D","B","B","E","A","C","E","D","A","C","C","D","D","B","E","C","A","C","C","E","B","B","D","E","C","C","B","E","B","B","C","C","A","D","E","D","B","X","D","A","A","E","B","A","A","B","B"]
			},
			{
				turma:3,
				respostas:["C","B","D","B","C","C","C","D","B","B","B","B","C","E","E","D","E","E","A","A","C","A","E","B","D","B","A","B","E","E","E","B","A","A","B","A","C","D","C","X","B","D","B","A","D","C","B","E","D","E","D","A","A","D"]
			}
		],
		questions: 54
	},
	{
		name: "11° Simulado - 2025", 
		description: "11° Simulado - 2025",
		model: "PSC",
		date: "29-04-2025",
		id: "022025",
		organization: [{materia: "port", q:10, name: "Português"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0,11,18,25,32,39,46,53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 }, // +1
			{ materia: "História", special: 18 }, // +2
			{ materia: "Geografia", special: 25 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Química", special: 39 }, // +5
			{ materia: "Física", special: 46 }, // +6
			{ materia: "Matemática", special: 53 } // +7
		],
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [1],
		answers: [
			{
				turma:1,
				respostas:["A","A","E","E","D","D","B","C","E","A","C","B","C","C","D","C","B","C","E","D","C","D","C","E","X","D","B","A","X","E","C","B","C","B","D","C","A","A","E","B","A","B","A","B","D","A","C","C","E","X","B","B","D","D"]
			}
		],
		questions: 54
	},
	{
		name: "10° Simulado - 2025", 
		description: "10° Simulado - 2025",
		model: "PSC",
		date: "27-03-2025",
		id: "012025",
		organization: [{materia: "port", q:10, name: "Português"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0,11,18,25,32,39,46,53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 }, // +1
			{ materia: "História", special: 18 }, // +2
			{ materia: "Geografia", special: 25 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Química", special: 39 }, // +5
			{ materia: "Física", special: 46 }, // +6
			{ materia: "Matemática", special: 53 } // +7
		],
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [1, 2,3],
		answers: [
			{
				turma:1,
				respostas:["C","B","D","C","D","B","E","B","C","B","A","B","A","E","D","E","B","C","E","C","B","E","D","E","C","D","C","E","A","C","C","A","E","B","C","D","A","E","C","D","A","E","D","B","D","E","A","C","B","A","A","D","C","X"]
			},
			{
				turma:2,
				respostas:["D","B","C","C","D","B","E","B","C","B","B","C","D","D","E","C","C","C","E","C","C","E","D","E","C","D","C","E","D","C","E","A","D","C","B","D","B","C","B","A","A","E","D","C","D","D","A","C","B","A","C","D","E","C"]
			},
			{
				turma:3,
				respostas:["D","B","E","B","C","B","C","B","D","C","B","C","B","B","B","A","C","B","B","B","A","B","D","C","D","C","C","E","D","E","D","C","D","E","C","E","B","D","C","C","B","B","E","X","B","B","A","C","B","A","C","D","B","C"]
			}
		],
		questions: 54
	},
	{
		name: "9° Simulado 2024 (1º ano)", 
		description: "9° Simulado de 2024",
		model: "SIS",
		date: "04-10-2024",
		id: "0920241",
		organization: [{materia: "lit", q:4, name: "Literatura"},{materia: "port", q:8, name: "Português"},{materia: "hist", q:8, name: "História"},{materia: "geo", q:8, name: "Geografia"},{materia: "bio", q:8, name: "Biologia"},{materia: "mat", q:8, name: "Matemática"},{materia: "fis", q:8, name: "Física"},{materia: "quim", q:8, name: "Química"}],
		special: [0,5,14,23,32,41,50,59],
		matspecial: [
			{ materia: "Literatura", special: 0 },
			{ materia: "Português", special: 5 }, // +1
			{ materia: "História", special: 14 }, // +2
			{ materia: "Geografia", special: 23 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Matemática", special: 41 }, // +5
			{ materia: "Física", special: 50 }, // +6
			{ materia: "Química", special: 59 } // +7
		],
		intervals: {
			lit: [1, 4],
			port: [5, 12],
			hist: [13, 20],
			geo: [21, 28],
			bio: [29, 36],
			mat: [37, 44],
			fis: [45, 52],
			quim: [53, 60]
		},
		turmas: [1],
		answers: [
			{
				turma:1,
				respostas:["E","A","C","B","E","A","B","E","E","E","B","B","B","C","E","D","E","A","D","D","A","B","A","A","E","D","C","B","B","B","B","A","C","A","C","B","C","A","C","A","B","A","D","C","E","C","E","E","D","E","B","B","C","B","D","E","E","D","A","A"]
			},
			{
				turma:2,
				respostas:["C","A","C","D","E","D","C","A","C","A","C","B","C","A","B","D","A","D","D","A","D","C","A","B","D","E","E","B","D","D","B","E","D","A","A","A","B","A","B","D","C","E","D","E","A","B","B","B","D","E","B","D","A","D","B","B","C","E","C","B"]
			},
			{
				turma:3,
				respostas:["D","D","A","C","C","C","B","A","C","B","D","E","B","A","A","B","D","C","C","B","D","A","C","A","D","D","D","E","B","A","C","C","C","B","A","B","E","C","C","D","C","A","B","D","A","E","B","C","B","B","A","A","C","A","C","D","D","C","D","E"]
			}
		],
		questions: 60
	},
	{
		name: "9° Simulado 2024 (2º e 3º)", 
		description: "9° Simulado de 2024",
		model: "SIS",
		date: "04-10-2024",
		id: "09202423",
		organization: [{materia: "port", q:8, name: "Português"},{materia: "lit", q:4, name: "Literatura"},{materia: "hist", q:8, name: "História"},{materia: "geo", q:8, name: "Geografia"},{materia: "bio", q:8, name: "Biologia"},{materia: "mat", q:8, name: "Matemática"},{materia: "fis", q:8, name: "Física"},{materia: "quim", q:8, name: "Química"}],
		special: [0,9,14,23,32,41,50,59],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 9 }, // +1
			{ materia: "História", special: 14 }, // +2
			{ materia: "Geografia", special: 23 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Matemática", special: 41 }, // +5
			{ materia: "Física", special: 50 }, // +6
			{ materia: "Química", special: 59 } // +7
		],
		intervals: {
			port: [1, 8],
			lit: [9, 12],
			hist: [13, 20],
			geo: [21, 28],
			bio: [29, 36],
			mat: [37, 44],
			fis: [45, 52],
			quim: [53, 60]
		},
		turmas: [2,3],
		answers: [
			{
				turma:1,
				respostas:["E","A","C","B","E","A","B","E","E","E","B","B","B","C","E","D","E","A","D","D","A","B","A","A","E","D","C","B","B","B","B","A","C","A","C","B","C","A","C","A","B","A","D","C","E","C","E","E","D","E","B","B","C","B","D","E","E","D","A","A"]
			},
			{
				turma:2,
				respostas:["C","A","C","D","E","D","C","A","C","A","C","B","C","A","B","D","A","D","D","A","D","C","A","B","D","E","E","B","D","D","B","E","D","A","A","B","B","A","B","D","C","E","D","E","A","B","B","B","D","E","B","D","A","D","D","B","C","E","C","C"]
			},
			{
				turma:3,
				respostas:["D","D","A","C","C","C","B","A","C","B","D","E","B","A","A","B","D","C","C","B","D","A","C","A","D","D","D","E","B","A","C","C","C","B","A","B","E","C","C","D","C","A","B","D","A","E","B","C","B","B","A","A","C","A","C","D","D","C","D","E"]
			}
		],
		questions: 60
	},
	{
		name: "8° Simulado 2024", 
		description: "8° Simulado de 2024",
		model: "SIS",
		date: "23-09-2024",
		id: "082024",
		organization: [{materia: "port", q:8, name: "Português"},{materia: "lit", q:4, name: "Literatura"},{materia: "hist", q:8, name: "História"},{materia: "geo", q:8, name: "Geografia"},{materia: "bio", q:8, name: "Biologia"},{materia: "mat", q:8, name: "Matemática"},{materia: "fis", q:8, name: "Física"},{materia: "quim", q:8, name: "Química"}],
		special: [0,9,14,23,32,41,50,59],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 9 }, // +1
			{ materia: "História", special: 14 }, // +2
			{ materia: "Geografia", special: 23 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Matemática", special: 41 }, // +5
			{ materia: "Física", special: 50 }, // +6
			{ materia: "Química", special: 59 } // +7
		],
		intervals: {
			port: [1, 8],
			lit: [9, 12],
			hist: [13, 20],
			geo: [21, 28],
			bio: [29, 36],
			mat: [37, 44],
			fis: [45, 52],
			quim: [53, 60]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["B","A","C","B","D","E","C","E","A","B","B","A","D","B","C","C","D","B","E","E","A","B","C","B","A","B","E","E","C","C","C","C","A","D","A","D","D","C","C","E","A","C","B","E","C","D","E","E","C","A","B","A","A","B","E","A","C","B","B","B"]
			},
			{
				turma:2,
				respostas:["B","D","B","B","A","D","C","E","C","D","C","C","A","B","E","E","B","B","C","D","B","D","A","B","B","E","A","A","E","E","C","E","D","B","D","A","B","B","B","E","B","E","D","B","A","B","A","B","D","B","E","A","B","A","D","A","C","D","A","C"]
			},
			{
				turma:3,
				respostas:["D","E","C","A","B","C","A","D","D","A","C","B","B","A","A","A","A","E","C","B","A","B","A","B","E","B","B","B","D","E","B","D","C","C","B","A","D","C","B","E","E","C","A","C","B","C","A","D","C","A","A","B","D","A","D","E","D","D","C","A"]
			}
		],
		questions: 60
	},
	{
		name: "7° Simulado 2024", 
		description: "7° Simulado de 2024",
		model: "MACRO",
		date: "23-08-2024",
		id: "072024",
		organization: [{materia: "port", q:8, name: "Português"},{materia: "lit", q:4, name: "Literatura"},{materia: "hist", q:8, name: "História"},{materia: "geo", q:8, name: "Geografia"},{materia: "bio", q:8, name: "Biologia"},{materia: "mat", q:8, name: "Matemática"},{materia: "fis", q:8, name: "Física"},{materia: "quim", q:8, name: "Química"}],
		special: [0,9,14,23,32,41,50,59],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 9 }, // +1
			{ materia: "História", special: 14 }, // +2
			{ materia: "Geografia", special: 23 }, // +3
			{ materia: "Biologia", special: 32 }, // +4
			{ materia: "Matemática", special: 41 }, // +5
			{ materia: "Física", special: 50 }, // +6
			{ materia: "Química", special: 59 } // +7
		],
		intervals: {
			port: [1, 8],
			lit: [9, 12],
			hist: [13, 20],
			geo: [21, 28],
			bio: [29, 36],
			mat: [37, 44],
			fis: [45, 52],
			quim: [53, 60]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["C","D","A","C","D","B","C","E","E","C","D","B","B","D","A","B","C","E","D","C","E","B","D","A","D","D","C","C","A","B","B","A","X","X","D","B","E","C","E","A","E","B","C","C","C","C","A","C","C","E","B","A","D","D","C","B","B","E","B","E"]
			},
			{
				turma:2,
				respostas:["A","B","C","A","A","D","B","E","C","E","C","D","C","D","A","A","B","D","C","B","D","A","D","C","B","D","E","B","A","D","C","D","C","C","E","B","A","D","B","D","C","C","C","B","D","D","E","E","B","B","B","A","B","C","E","B","D","A","E","X"]
			},
			{
				turma:3,
				respostas:["D","D","D","E","D","B","A","C","D","E","A","A","D","D","A","E","C","B","B","A","B","A","C","D","E","C","D","C","A","C","C","B","C","D","E","B","A","C","D","B","C","E","B","D","C","B","A","C","C","E","E","E","B","C","C","A","C","D","B","C"]
			}
		],
		questions: 60
	},
	{
		name: "3° Simulado NA (3°)", 
		description: "Núcleo de Aprovação",
		model: "MACRO",
		date: "20-07-2024",
		id: "NA32",
		organization: [{materia: "port", q:8, name: "Língua Portuguesa"},{materia: "lit", q:4, name: "Literatura"},{materia: "hist", q:12, name: "História"},{materia: "geo", q:12, name: "Geografia"},{materia: "bio", q:12, name: "Biologia"},{materia: "mat", q:12, name: "Matemática"},{materia: "fis", q:12, name: "Física"},{materia: "quim", q:12, name: "Química"}],
		special: [0, 9, 14, 27, 40, 53, 66, 79],
		matspecial: [
			{ materia: "Língua Portuguesa", special: 0 },
			{ materia: "Literatura", special: 9 },
			{ materia: "História", special: 14 },
			{ materia: "Geografia", special: 27 },
			{ materia: "Biologia", special: 40 },
			{ materia: "Matemática", special: 53 },
			{ materia: "Física", special: 66 },
			{ materia: "Química", special: 79 }
		],
		intervals: {
			port: [1, 8], 
			lit: [9, 12],    
			hist: [13, 24],   
			geo: [25, 36],    
			bio: [37, 48],     
			mat: [49, 60],  
			fis: [61, 72],  
			quim: [73, 84]
		},
		turmas: [3],
		answers: [
			{
				turma:1,
				respostas:["B","D","E","B","E","D","D","C","D","C","B","C","A","C","A","A","E","A","A","D","C","C","A","A","E","C","C","C","B","E","D","A","E","B","A","A","E","D","E","E","D","D","E","C","C","D","E","A","C","C","D","B","E","E","C","C","D","E","B","B","A","C","D","E","E","D","D","B","B","A","C","C","B","A","D","C","E","B","E","B","A","D","E","C"]
			},
			{
				turma:2,
				respostas:["B","D","E","B","E","D","D","C","D","C","B","C","A","C","A","A","E","A","A","D","C","C","A","A","E","C","C","C","B","E","D","A","E","B","A","A","E","D","E","E","D","D","E","C","C","D","E","A","C","C","D","B","E","E","C","C","D","E","B","B","A","C","D","E","E","D","D","B","B","A","C","C","B","A","D","C","E","B","E","B","A","D","E","C"]
			},
			{
				turma:3,
				respostas:["B","D","E","B","E","D","D","C","D","C","B","C","A","C","A","A","E","A","A","D","C","C","A","A","E","C","C","C","B","E","D","A","E","B","A","A","E","D","E","E","D","D","E","C","C","D","E","A","C","C","D","B","E","E","C","C","D","E","B","B","A","C","D","E","E","D","D","B","B","A","C","C","B","A","D","C","E","B","E","B","A","D","E","C"]
			}
		],
		questions: 84
	},
	{
		name: "3° Simulado NA (1° e 2°)", 
		description: "Núcleo de Aprovação",
		model: "SIS",
		date: "20-07-2024",
		id: "NA31",
		organization: [{materia: "port", q:8, name: "Língua Portuguesa"},{materia: "lit", q:4, name: "Literatura"},{materia: "hist", q:8, name: "História"},{materia: "geo", q:8, name: "Geografia"},{materia: "bio", q:8, name: "Biologia"},{materia: "quim", q:8, name: "Química"},{materia: "fis", q:8, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0, 9, 14, 23, 32, 41, 50, 59],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 9 },
			{ materia: "História", special: 14 },
			{ materia: "Geografia", special: 23 },
			{ materia: "Biologia", special: 32 },
			{ materia: "Química", special: 41 },
			{ materia: "Física", special: 50 },
			{ materia: "Matemática", special: 59 }
		]
		,
		intervals: {
			port: [1, 8],
			lit: [9, 12],
			hist: [13, 20],
			geo: [21, 28],
			bio: [29, 36],
			quim: [37, 44],
			fis: [45, 52],
			mat: [53, 60]
		},
		turmas: [1,2],
		answers: [
			{
				turma:1,
				respostas:["B","D","E","B","E","D","D","C","A","E","D","E","B","B","E","D","B","E","D","C","D","B","C","D","A","E","C","A","A","B","E","B","C","E","E","B","E","A","D","C","E","A","D","A","E","B","D","B","C","A","E","B","D","B","D","C","C","E","B","C"]
			},
			{
				turma:2,
				respostas:["B","D","E","B","E","D","D","C","C","B","E","C","C","C","A","E","E","D","A","B","A","D","D","D","D","D","B","B","E","E","B","D","A","A","D","D","B","A","A","C","A","D","B","D","B","C","B","B","D","E","C","A","D","A","D","E","A","B","A","C"]
			},
			{
				turma:3,
				respostas:["B","D","E","B","E","D","D","C","C","B","E","C","C","C","A","E","E","D","A","B","A","D","D","D","D","D","B","B","E","E","B","D","A","A","D","D","B","A","A","C","A","D","B","D","B","C","B","B","D","E","C","A","D","A","D","E","A","B","A","C"]
			}
		],
		questions: 60
	},
	{
		name: "6° Simulado 2024 (PROJ. MED)", 
		description: "6° Simulado de 2024 (PROJ. MED.)",
		model: "TEST",
		date: "19-07-2024",
		id: "0620243",
		organization: [{materia: "port", q:12, name: "Português"},{materia: "bio", q:12, name: "Biologia"},{materia: "quim", q:12, name: "Química"}],
		special: [0, 13, 26],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Biologia", special: 13 },
			{ materia: "Química", special: 26 }
		],
		intervals: {
			port: [1, 12],
			bio: [13, 24],
			quim: [25, 36]
		},
		turmas: [3],
		answers: [
			{
				turma:1,
				respostas:["C","E","C","D","E","E","B","D","E","C","B","A","A","E","B","B","A","C","C","D","C","B","B","B","B","A","D","A","E","C","C","A","B","B","A","B"]
			},
			{
				turma:2,
				respostas:["C","E","C","D","E","E","B","D","E","C","B","A","A","E","B","B","A","C","C","D","C","B","B","B","B","A","D","A","E","C","C","A","B","B","A","B"]
			},
			{
				turma:3,
				respostas:["C","E","C","D","E","E","B","D","E","C","B","A","A","E","B","B","A","C","C","D","C","B","B","B","B","A","D","A","E","C","C","A","B","B","A","B"]
			}
		],
		questions: 36
	},
	{
		name: "6° Simulado 2024 (2º ano)", 
		description: "6° Simulado de 2024 (2º ano)",
		model: "TEST",
		date: "19-07-2024",
		id: "0620242",
		organization: [{materia: "mat", q:7, name: "Matemática"},{materia: "fis", q:7, name: "Física"},{materia: "quim", q:7, name: "Química"}],
		special: [0, 8, 16],
		matspecial: [
			{ materia: "Matemática", special: 0 },
			{ materia: "Física", special: 8 },
			{ materia: "Química", special: 16 }
		],
		intervals: {
			mat: [1, 7],
			fis: [8, 14],
			quim: [15, 21]
		},
		turmas: [2],
		answers: [
			{
				turma:1,
				respostas:["B","D","B","E","B","D","B","E","B","A","D","A","C","C","D","E","C","B","E","B","C"]
			},
			{
				turma:2,
				respostas:["B","D","B","E","B","D","B","E","B","A","D","A","C","C","D","E","C","B","E","B","C"]
			},
			{
				turma:3,
				respostas:["B","D","B","E","B","D","B","E","B","A","D","A","C","C","D","E","C","B","E","B","C"]
			}
		],
		questions: 21
	},
	{
		name: "6° Simulado 2024 (1º ano)", 
		description: "6° Simulado de 2024 (1º ano)",
		model: "TEST",
		date: "19-07-2024",
		id: "0620241",
		organization: [{materia: "mat", q:7, name: "Matemática"},{materia: "quim", q:7, name: "Química"},{materia: "fis", q:7, name: "Física"}],
		special: [0, 8, 16],
		matspecial: [
			{ materia: "Matemática", special: 0 },
			{ materia: "Química", special: 8 },
			{ materia: "Física", special: 16 }
		],
		intervals: {
			mat: [1, 7],
			quim: [8, 14],
			fis: [15, 21]
		},
		turmas: [1],
		answers: [
			{
				turma:1,
				respostas:["B","E","C","C","A","E","E","A","C","B","A","C","D","D","C","C","A","B","C","E","B"]
			},
			{
				turma:2,
				respostas:["B","E","C","C","A","E","E","A","C","B","A","C","D","D","C","C","A","B","C","E","B"]
			},
			{
				turma:3,
				respostas:["B","E","C","C","A","E","E","A","C","B","A","C","D","D","C","C","A","B","C","E","B"]
			}
		],
		questions: 21
	},
	{
		name: "5° Simulado 2024", 
		description: "5° Simulado de 2024",
		model: "PSC",
		date: "31-05-2024",
		id: "052024",
		organization: [{materia: "port", q:10, name: "Língua Portuguesa"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0, 11, 18, 25, 32, 39, 46, 53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 },
			{ materia: "História", special: 18 },
			{ materia: "Geografia", special: 25 },
			{ materia: "Biologia", special: 32 },
			{ materia: "Química", special: 39 },
			{ materia: "Física", special: 46 },
			{ materia: "Matemática", special: 53 }
		],
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [3],
		answers: [
			{
				turma:1,
				respostas:["X","E","C","D","C","B","C","D","X","D","B","C","C","E","B","D","B","D","E","E","C","D","B","A","D","C","B","A","E","D","B","B","A","A","A","C","C","E","C","D","C","D","A","D","B","D","C","B","D","C","E","E","E","C"]
			},
			{
				turma:2,
				respostas:["X","E","C","D","C","B","C","D","X","D","B","C","C","E","B","D","B","D","E","E","C","D","B","A","D","C","B","A","E","D","B","B","A","A","A","C","C","E","C","D","C","D","A","D","B","D","C","B","D","C","E","E","E","C"]
			},
			{
				turma:3,
				respostas:["X","E","C","D","C","B","C","D","X","D","B","C","C","E","B","D","B","D","E","E","C","D","B","A","D","C","B","A","E","D","B","B","A","A","A","C","C","E","C","D","C","D","A","D","B","D","C","B","D","C","E","E","E","C"]
			}
		],
		questions: 54
	},
	{
		name: "2° Simulado NA", 
		description: "Núcleo de Aprovação",
		model: "PSC",
		date: "10-05-2024",
		id: "NA2",
		organization: [{materia: "port", q:10, name: "Língua Portuguesa"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0, 11, 18, 25, 32, 39, 46, 53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 },
			{ materia: "História", special: 18 },
			{ materia: "Geografia", special: 25 },
			{ materia: "Biologia", special: 32 },
			{ materia: "Química", special: 39 },
			{ materia: "Física", special: 46 },
			{ materia: "Matemática", special: 53 }
		]
		,
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["C","D","D","D","E","D","B","D","D","B","D","E","A","E","D","B","A","D","E","A","E","A","E","E","A","A","E","A","D","A","C","B","B","D","D","D","C","D","B","E","A","E","B","B","B","D","D","C","B","C","D","D","E","D"]
			},
			{
				turma:2,
				respostas:["C","D","D","D","E","D","B","D","D","B","A","A","B","D","C","A","A","A","B","E","D","D","E","E","A","A","C","A","D","D","D","D","A","B","E","B","C","B","D","B","A","E","B","B","B","D","A","X","D","C","E","A","C","B"]
			},
			{
				turma:3,
				respostas:["C","D","D","D","E","D","B","D","D","B","C","E","D","C","A","C","C","B","D","D","E","E","D","D","D","D","B","B","C","A","A","C","C","B","D","B","A","A","A","A","C","B","D","C","C","C","C","A","C","D","E","B","A","C"]
			}
		],
		questions: 54
	},
	{
		name: "4° Simulado 2024", 
		description: "4° Simulado de 2024",
		model: "PSC",
		date: "20-05-2024",
		id: "042024",
		organization: [{materia: "port", q:10, name: "Língua Portuguesa"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0, 11, 18, 25, 32, 39, 46, 53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 },
			{ materia: "História", special: 18 },
			{ materia: "Geografia", special: 25 },
			{ materia: "Biologia", special: 32 },
			{ materia: "Química", special: 39 },
			{ materia: "Física", special: 46 },
			{ materia: "Matemática", special: 53 }
		]
		,
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [1,2,3],
		answers: [
			{
				turma:1,
				respostas:["B","B","C","B","E","A","A","E","A","D","A","B","B","A","C","A","D","E","E","D","D","A","D","A","D","B","B","B","A","A","D","X","E","D","A","B","C","A","D","C","D","D","C","D","D","B","C","A","B","E","E","A","A","D"]
			},
			{
				turma:2,
				respostas:["D","E","B","E","A","X","A","A","D","E","E","E","E","B","X","C","B","B","E","C","A","C","D","E","E","A","D","E","B","E","B","E","E","D","D","B","B","D","C","B","C","E","E","E","A","E","C","C","D","D","C","E","X","C"]
			},
			{
				turma:3,
				respostas:["A","E","C","D","A","E","D","E","D","D","B","C","D","B","E","E","C","D","C","B","A","B","A","B","A","B","B","B","A","A","A","A","C","D","D","E","C","D","C","C","A","A","E","C","A","A","A","E","D","D","C","A","A","C"]
			}
		],
		questions: 54
	},
	{
		name: "3° Simulado 2024", 
		description: "3° Simulado de 2024",
		model: "PSC",
		date: "09-05-2024",
		id: "032024",
		organization: [{materia: "port", q:10, name: "Língua Portuguesa"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0, 11, 18, 25, 32, 39, 46, 53],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 },
			{ materia: "História", special: 18 },
			{ materia: "Geografia", special: 25 },
			{ materia: "Biologia", special: 32 },
			{ materia: "Química", special: 39 },
			{ materia: "Física", special: 46 },
			{ materia: "Matemática", special: 53 }
		]
		,
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			fis: [41, 46],
			mat: [47, 54]
		},
		turmas: [2,3],
		answers: [
			{
				turma:2,
				respostas:["E","E","C","D","A","B","E","C","A","E","D","C","B","C","B","D","A","D","C","B","D","B","E","E","B","C","B","B","C","A","A","D","D","E","E","D","C","A","D","A","C","E","C","A","C","B","A","D","B","B","C","B","D","E"]
			},
			{
				turma:3,
				respostas:["A","B","C","D","C","B","C","C","D","E","D","B","B","B","A","C","B","E","C","C","C","A","C","B","B","B","A","A","C","C","A","C","B","A","C","A","E","E","A","A","D","D","E","C","B","B","D","D","C","E","C","E","E","D"]
			}
		],
		questions: 54
	},
	{
		name: "2° Simulado 2024", 
		description: "2° Simulado de 2024",
		model: "PSC",
		date: "24-02-2024",
		id: "022024",
		organization: [{materia: "port", q:10, name: "Língua Portuguesa"},{materia: "lit", q:6, name: "Literatura"},{materia: "hist", q:6, name: "História"},{materia: "geo", q:6, name: "Geografia"},{materia: "bio", q:6, name: "Biologia"},{materia: "quim", q:6, name: "Química"},{materia: "fis", q:6, name: "Física"},{materia: "mat", q:8, name: "Matemática"}],
		special: [0, 11, 18, 25, 32, 39, 46, 55],
		intervals: {
			port: [1, 10],
			lit: [11, 16],
			hist: [17, 22],
			geo: [23, 28],
			bio: [29, 34],
			quim: [35, 40],
			mat: [41, 48],
			fis: [49, 54]
		},
		turmas: [1,2,3],
		matspecial: [
			{ materia: "Português", special: 0 },
			{ materia: "Literatura", special: 11 },
			{ materia: "História", special: 18 },
			{ materia: "Geografia", special: 25 },
			{ materia: "Biologia", special: 32 },
			{ materia: "Química", special: 39 },
			{ materia: "Matemática", special: 46 },
			{ materia: "Física", special: 55 }
		],
		answers: [
			{
				turma:1,
				respostas: ["B","A","A","A","A","D","D","D","B","E","A","A","B","E","B","C","D","D","A","B","B","B","A","C","E","E","C","C","A","C","B","E","C","A","C","E","A","B","D","C","C","E","D","A","C","B","C","B","C","C","D","D","E","C"]
			},
			{
				turma:2,
				respostas:["D","B","A","A","B","E","A","B","A","B","A","E","C","B","D","E","E","B","A","C","C","C","E","E","E","E","E","C","B","C","D","A","E","C","D","C","B","E","A","A","D","E","E","D","C","C","C","B","C","B","C","D","E","E"]
			},
			{
				turma:3,
				respostas:["B","A","A","X","A","B","B","C","C","E","C","E","B","E","B","A","B","C","E","E","C","D","D","B","B","C","E","A","C","C","B","E","D","D","E","C","B","E","A","C","B","D","A","D","A","C","E","A","C","A","C","B","B","C"]
			}
		],
		questions: 54
	}
]

const fetch = s => import('node-fetch').then(({default: fetch}) => fetch(s))
im()

/*old.find().then(users => {
	users.forEach(userr =>{
		const novoSimulado = new simuladoo({
			completename: userr.name,
			turma: userr.turma,
			simulado: "022024",
			answers: userr.answers,
			registered: new Date().getTime()
		});

		novoSimulado.save().then(() => {
			console.log("success: " + userr.name)
			}).catch(error => {
				console.error(`Erro ao cadastrar ${userr.name}:`, error)
			})
	})
})*/

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

app.listen(PORT, () => {console.log(`Listening at ${PORT}`)})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/interface'));

// Website pages
app.get('/',function(req,res) {
	console.log("Access PRINCIPAL: "+ new Date())
	res.sendFile(__dirname + '/interface/index.html')
})

app.get('/#',function(req,res) {
	console.log("Access PRINCIPAL: "+ new Date())
	res.sendFile(__dirname + '/interface/index.html')
});

app.get('/login',function(req,res) {
	console.log("Access LOGIN: "+ new Date())
	res.sendFile(__dirname + '/interface/login.html')
});

app.get('/cadastro',function(req,res) {
	console.log("Access CADASTRO: "+ new Date())
	res.sendFile(__dirname + '/interface/cadastro.html')
});


app.get('/admin',function(req,res) {
	console.log("Access ADMIN, Cadastro: "+ new Date())
	res.sendFile(__dirname + '/interface/admin.html')
})

app.get('/cadastroadmin',function(req,res) {
	console.log("Access ADMIN, Cadastro: "+ new Date())
	res.sendFile(__dirname + '/interface/cadastroadmin.html')
})


app.get('/sobre',function(req,res) {
	console.log("Access SOBRE: "+ new Date())
	res.sendFile(__dirname + '/interface/sobre.html')
});

app.get('/gerar',function(req,res) {
	console.log("Access ADMIN GERAR: "+ new Date())
	res.sendFile(__dirname + '/interface/gerar.html')
});

app.get('/pagamentos',function(req,res) {
	console.log("Access PAGAMENTOS: "+ new Date())
	res.sendFile(__dirname + '/interface/pagamentos.html')
});

app.get('/simuladoadm',function(req,res) {
	console.log("Access ADMIN SIMULADOS: "+ new Date())
	res.sendFile(__dirname + '/interface/simuladoadm.html')
});

app.get('/simuladosbank.js',function(req,res) {
	console.log("Access ADMIN SIMULADOS/: "+ new Date())
	res.sendFile(__dirname + '/interface/simuladosbank.js')
});

app.get('/ranking',function(req,res) {
	console.log("Access RANKING: "+ new Date())
	res.sendFile(__dirname + '/interface/ranking.html')
});

app.get('/desempenho',function(req,res) {
	console.log(`Access DESEMPENHO: ${new Date()} - ${req.query.id} - ${req.query.simulado}`)
	res.sendFile(__dirname + '/interface/desempenho.html')
});

app.get('/desempenhols',function(req,res) {
	console.log("Access DESEMPENHO LS: "+ new Date())
	res.sendFile(__dirname + '/interface/desempenhols.html')
});

app.get('/aluno',function(req,res) {
	console.log("Access ADMIN ALUNO: "+ new Date())
	res.sendFile(__dirname + '/interface/aluno.html')
});

app.get('/varsimulados',function(req,res) {
	console.log("Access SYSTEM SIMULADOS: "+ new Date())
	res.json(simulados)
});

app.get('/simulados',function(req,res) {
	res.sendFile(__dirname + '/interface/simulados.html')
});

app.get('/profile',function(req,res) {
	res.sendFile(__dirname + '/interface/profile.html')
});

app.get('/src',function(req,res) {
	let urlparsed = "https://metodosimulados.yeshayahudesigndeveloper.repl.co" + req._parsedOriginalUrl.href
	let required = new URL(urlparsed).searchParams.get('id') || res.sendStatus(404)
	let format = new URL(urlparsed).searchParams.get('format') || "png"


	res.sendFile(__dirname + `/src/${required}.${format}`)
})

app.get('/recibo', async (req, res) => {
	console.log("Access ADMIN RECIBO: "+ new Date())
	res.sendFile(__dirname + '/interface/recibo.html')
})

app.get('/relatorio', async (req, res) => {
	console.log("Access ADMIN RELATÓRIO: "+ new Date())
	res.sendFile(__dirname + '/interface/relatorio.html')
})

app.get('/alunos', async (req, res) => {
	try {
		const alunos = await useradm.find().sort({ completename: 1 }); 
		res.json(alunos);
	}catch (err){
		console.error('Erro ao buscar lembretes:', err);
		res.status(500).send('Erro ao buscar lembretes');
	}
});

app.get('/getalunobyid', async (req, res) => {
	const id = req.query.id;

	if(!id){
		res.status(400).send('Missing parameters.');
		return;
	}

	useradm.findOne({ _id: id }, (err, user) => {
		if(err){
			res.status(404).send({success:false, message:"err"})
		}else{
			if(!user) return res.status(404).send({success:false, message:"not found"})
			res.status(200).send(user)
		}
	})
});

app.get('/getsimuladosbyname', async (req, res) => {
	const name = req.query.name;

	if (!name) {
		res.status(400).send('Missing parameters.');
		return;
	}

	try {
		const users = await simuladoo.find({ completename: name }).exec();
		if (users.length === 0) {
				res.status(404).send({ success: false, message: "No users found." });
		} else {
				res.status(200).send({ success: true, users });
		}
	} catch (err) {
		res.status(500).send({ success: false, message: "Server error.", error: err.message });
	}
});

app.get('/getalunobynameadm', async (req, res) => {
	const name = req.query.name;

	if(!name){
		res.status(400).send('Missing parameters.');
		return;
	}

	useradm.findOne({ completename: name }, (err, use) => {
		if(err){
			res.status(404).send({success:false, message:"err"})
		}else{
			if(!use) return res.status(404).send({success:false, message:"not found"})
			res.status(200).send(use)
		}
	})
});


app.get('/setpago', async (req, res) => {
	const id = req.query.id;
	const mes = req.query.mes;
	const set = req.query.set;

	if (!id || !mes || !set) {
		return res.status(400).send('Missing parameters.');
	}

	try {
		const user = await useradm.findOne({ _id: id });
		
		if (!user) {
			return res.status(404).send('User not found.');
		}
		
		let pgtos = user.pgto
		
		if(pgtos.length > 0){
			let mespgto = user.pgto.find(u => u.mes == mes)
			if(mespgto){
				mespgto.pago = set
				await user.save()
			}else{
				let ar = {mes: mes, pago: set}
				user.pgto.push(ar)
				await user.save()
			}
		}else{
			let ar = {mes: mes, pago: set}
			user.pgto.push(ar)
			await user.save()
		}

		return res.status(200).send({ success: true, reason: "Pagamento setado com sucesso!" });
	}catch(err){
		console.log(err)
		console.error(err);
		return res.status(500).send(err);
	}
})



app.get('/checkname', function(req, res) {
	const { name } = req.query;

	if (!name) {
		return res.send({ success: false, reason: "Missing parameters" });
	}

	user.findOne({ completename: name }, (err, usuario) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ success: false, reason: "Internal server error" });
		}

		if (usuario) {
			res.send({
				success: true, 
				reason: "User already exists.", 
				user: {
					email: usuario.email, 
					completename: usuario.completename
				} 
			});
		} else {
			res.send({ success: true, reason: "User not found"});
		}
	})
})

app.get('/checkcpf', function(req, res) {
	const { cpf } = req.query;

	if (!cpf) {
		return res.send({ success: false, reason: "Missing parameters" });
	}

	user.findOne({ cpf: cpf }, (err, usuario) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ success: false, reason: "Internal server error" });
		}
	
		if (usuario) {
			res.send({
				success: true, 
				reason: "User already exists.", 
				user: {
					email: usuario.email, 
					profilePicture: usuario.profilePicture, 
					permissions: usuario.permissions, 
					completename: usuario.completename
				} 
			});
		} else {
			res.send({ success: true, reason: "success"});
		}
	})
})

app.get('/checkname', function(req, res) {
	const { name } = req.query;

	if (!name) {
		return res.send({ success: false, reason: "Missing parameters" });
	}

	useradm.findOne({ completename: name }, (err, usuario) => {
		if (err) {
			console.log(err);
			return res.status(500).send({ success: false, reason: "Internal server error"});
		}

		if (usuario) {
			res.send({
				success: true, 
				reason: "User already exists.", 
				user: {
					completename: usuario.completename
				} 
			});
		} else {
			res.send({ success: true, reason: "Aluno not found"});
		}
	})
})

app.get('/logar', function(req, res) {
	const { email, senha } = req.query;

	if (!email || !senha) {
		return res.send({ success: false, reason: "Missing parameters" });
	}

	user.findOne({ email: email }, (err, usuario) => {
		if (usuario) {
			if(usuario.senha === senha){
				res.send({
					success: true, 
					reason: "Success at login", 
					user: {
						email: usuario.email, 
						profilePicture: usuario.profilePicture, 
						permissions: usuario.permissions, 
						completename: usuario.completename
					} 
				});
			}else{
				res.send({ success: false, reason: "Wrong password" })
			}
		} else {
				res.send({ success: false, reason: "User not found." });
			}
	});
})

app.get('/setsimulado', function(req, res) {
	const { completename, turma, simulado, answers } = req.query

	if (!completename || !turma || !answers || !simulado) {
		return res.send({ success: false, reason: "Missing parameters" })
	}

	const novoSimulado = new simuladoo({
		completename: completename,
		turma: turma,
		simulado: simulado,
		answers: answers,
		registered: new Date().getTime()
	});

	novoSimulado.save().then(() => {
		res.send({ success: true, reason: "success" })
		}).catch(error => {
			console.error("Erro ao cadastrar:", error)
			res.send({ success: false, reason: error })
		})
})

app.get('/deleteadmin', async function(req, res) {
	console.log("Access ADMIN DELETE: " + new Date())
	const { id } = req.query 

	if (req.query.token == process.env.token2) {
		try {
			const userremove = await useradm.findOneAndDelete({ _id: id });

			if (!userremove) {
				return res.status(404).send({success: false, message: "User not found."});
			}

			res.status(200).send({success: true, message: "User has been deleted."});
		}catch(e){
			console.error('Erro ao apagar usuário:', e);
			res.status(500).send({success:false, message:"Error."});
		}
	} else {
		res.status(401).send({success:false, message:"Unauthorized"});
	}
});

/*for(var i = 0; i < dados.length; i++){
	const novoUser = new useradm({
		completename: dados[i].name,
		nascimento: dados[i].nascimento,
		email: dados[i].email,
		responsavel: dados[i].responsavel,
		rgresp: dados[i].rgResp.toString(),
		cpfresp: dados[i].cpfResp.toString(),
		telresp: dados[i].telResp.toString(),
		endereco: dados[i].endereco,
		bairro: dados[i].bairro,
		cep: dados[i].cep,
		dia: dados[i].diaPgto,
		camisa: dados[i].camisa == "Não" ? "" : dados[i].camisa,
		turma: 3,
		pagamentos: [{jan: false, fev: false, mar: false, abr: false, mai: false, jun: false, jul: false, ago: false, set: false, out: false, nov: false, dez: false}],
		registered: new Date().getTime()
	});

	novoUser.save()
		.then(() => {
			console.log({ success: true, reason: "Success"})
		})
		.catch(error => {
			console.error("Erro ao cadastrar:", error);
			console.log({ success: false, reason: "Error"});
		});
}*/

app.get('/cadastrar', function(req, res) {
	const { completename, cpf, email, senha, turma} = req.query

	const novoUser = new user({
		completename: completename,
		cpf: cpf,
		email: email,
		senha: senha,
		permissions: 0,
		turma: Number(turma),
		registered: new Date().getTime()
	});

	novoUser.save()
		.then(() => {
			res.send({ success: true, reason: "Success", user: { completename: completename}
			});
		})
		.catch(error => {
			console.error("Erro ao cadastrar:", error);
			res.send({ success: false, reason: "Error" });
		});
});

app.get('/cadastraradmin', function(req, res) {
	const { completename, nascimento, email, responsavel, rgresp, cpfresp, telresp, telal, endereco, bairro, cep, dia, camisa, bolsista, turma } = req.query;
	console.log(req.query);

	/*if(!completename || !nascimento || !email || !responsavel || !rgresp || !cpfresp || !telresp || !endereco || !bairro || !cep || !dia || !camisa || !bolsista || !turma) return res.send({ success: false, reason: "Missing parameters" })*/

	const novoUser = new useradm({
		completename: completename,
		nascimento: nascimento,
		email: email,
		responsavel: responsavel,
		rgresp: rgresp,
		cpfresp: cpfresp,
		telresp: telresp,
		telal: telal,
		endereco: endereco,
		bairro: bairro,
		cep: cep,
		dia: dia,
		camisa: camisa,
		bolsista: bolsista,
		turma: Number(turma),
		pagamentos: [{jan: false, fev: false, mar: false, abr: false, mai: false, jun: false, jul: false, ago: false, set: false, out: false, nov: false, dez: false}],
		registered: new Date().getTime()
	});

	novoUser.save()
		.then(() => {
			res.send({ success: true, reason: "Success", user: { completename: completename}
			});
		})
		.catch(error => {
			console.error("Erro ao cadastrar:", error);
			res.send({ success: false, reason: "Error" });
		});
});

app.get('/saveadmin', async function(req, res) {
	const { id, completename, nascimento, email, responsavel, rgresp, cpfresp, telresp, telal, endereco, bairro, cep, dia, camisa, bolsista, turma } = req.query;
	console.log(req.query);

	console.log(id, completename, nascimento, email, responsavel, rgresp, cpfresp, telresp, endereco, bairro, cep, dia, camisa, bolsista, turma)

	try {
		const u = await useradm.findOne({ _id: id });
		if (!u) {
			return res.status(404).send("User not found");
		}

		let different = []
		if(u.completename != completename) different.push("completename")
		if(u.nascimento != nascimento) different.push("nascimento")
		if(u.email != email) different.push("email")
		if(u.responsavel != responsavel) different.push("responsavel")
		if(u.rgresp != rgresp) different.push("rgresp")
		if(u.cpfresp != cpfresp) different.push("cpfresp")
		if(u.telresp != telresp) different.push("telresp")
		if(u.telal != telal) different.push("telal")
		if(u.endereco != endereco) different.push("endereco")
		if(u.bairro != bairro) different.push("bairro")
		if(u.cep != cep) different.push("cep")
		if(u.dia != dia) different.push("dia")
		if(u.camisa != camisa) different.push("camisa")
		if(u.bolsista != bolsista) different.push("bolsista")
		if(u.turma != turma) different.push("turma")

		if(different.length == 0) return res.send({success: true, message: "Nothing changed"})
		if(different.length > 0){
			different.forEach(field => {
    				u[field] = req.query[field];
			});
			await u.save()
			res.send({success:true, message:"Successfully changed"})
		}
		
	} catch (err) {
		console.log(err)
	}
});

app.get('/apiranking', function(req,res) {
	let { id } = req.query
	let sell = req.query.sel 
	function sortfunction(a, b){
		return (a - b)
	}

	const sel = !isNaN(Number(sell)) ? Number(sell) : "general"

	let simuatual = simulados.find(e => e.id == id)

	simuladoo.find().then(e => {
		const rrr = e.filter(j => j.simulado == id)
		let r;
		if(sel > 3){
			r = rrr.filter(us => us.turma == 4 || us.turma == 5 || us.turma == 6)
		}else if(sel == 1 || sel == 2 || sel == 3){
			r = rrr.filter(us => us.turma == sel)
		}else{
			r = rrr.filter(us => us.turma == 1 || us.turma == 2 || us.turma == 3 || us.turma == 4 || us.turma == 5 || us.turma == 6)
		}

		const array = new Array;
		const usersArray = new Array;

		for(var t = 0; t < r.length; t++){
			let answers1 = simuatual.answers.find(e => e.turma == 1) ?  simuatual.answers.find(e => e.turma == 1).respostas : simuatual.answers.find(e => e.turma == 1) 
			let answers2 = simuatual.answers.find(e => e.turma == 2) ?  simuatual.answers.find(e => e.turma == 2).respostas : simuatual.answers.find(e => e.turma == 2) 
			let answers3 = simuatual.answers.find(e => e.turma == 3) ?  simuatual.answers.find(e => e.turma == 3).respostas : simuatual.answers.find(e => e.turma == 3) 

			let answersel;
			if(Number(r[t].turma) == 1) answersel = answers1
			if(Number(r[t].turma) == 2) answersel = answers2
			if(Number(r[t].turma) == 3) answersel = answers3
			if(Number(r[t].turma) == 4) answersel = answers1
			if(Number(r[t].turma) == 5) answersel = answers2
			if(Number(r[t].turma) == 6) answersel = answers3

			let arranswers = r[t].answers.split("")

			let pontosPorMateria = {}
			let materiasParaAdicionar = []

			for (let i = 0; i < simuatual.organization.length; i++) {
				let materia = simuatual.organization[i].materia
				materiasParaAdicionar.push(materia)
			}
			for (let i = 0; i < materiasParaAdicionar.length; i++) {
				let materia = materiasParaAdicionar[i];
				pontosPorMateria[materia] = 0;
			}

			let pontos = 0;

			let intervals = simuatual.intervals;

			for (var i = 0; i < simuatual.questions; i++) {
				if (arranswers[i] == answersel[i] || answersel[i] == "X") {
					pontos++;
					for (const [key, value] of Object.entries(intervals)) {
						if (i + 1 >= value[0] && i + 1 <= value[1]) {
							pontosPorMateria[key]++;
							break;
						}
					}
				}
			}

			function g(fullName) {
				const words = fullName.trim().split(/\s+/);
				const firstName = words[0];
				const secondName = words[1] || "";
			
				// se não tiver segundo nome, retorna só o primeiro
				if (!secondName) return firstName;
			
				const thirdName = words[2] || "";
				const fourthName = words[3] || "";
			
				if (["de", "da", "dos", "das", "do", "henrique", "pedro", "eduarda", "luiza"].includes(secondName.toLowerCase())) {
					if (["de", "da", "dos", "das", "do"].includes(thirdName.toLowerCase())) {
						return `${firstName} ${secondName} ${thirdName} ${fourthName}`.trim();
					} else {
						return `${firstName} ${secondName} ${thirdName}`.trim();
					}
				}
			
				return `${firstName} ${secondName}`.trim();
			}

			const u = {
				user: {
					name: g(r[t].completename),
					completename: r[t].completename,
					turma: Number(r[t].turma) >= 4 ? Number(r[t].turma) - 3 : r[t].turma,
					pont: pontos,
					letras: r[t].answers.split(""),
					percent: round(pontos/simuatual.questions*100,1),
					id: r[t]._id,
					simulado: simuatual
				}
			}

			for (let i = 0; i < simuatual.organization.length; i++) {
				let materia = materiasParaAdicionar[i];
				u.user[materia] = pontosPorMateria[materia]
			}

			for (var key in u) {
				array.push(u[key]);
			}

			if(sel < 4){
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
