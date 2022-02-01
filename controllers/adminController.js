const nodemon = require('nodemon');
const servicosModel = require('../models/servicos.json')
const uuidv4 = require('uuidv4');
const fs = require('fs')

const adminController = {
    index: function(req,res){
        res.render('admin')
    },
    buscarServicos: function(req,res){
        res.render('adminServicos', {servicos: servicosModel})
    },
    cadastrarServicos: function(req,res){
        console.log(uuidv4.uuid())
        res.render('servicosCadastro')
    },
    store: function(req,res){
        const {nome, preco, descricao } = req.body;
        const servico = {
            id: uuidv4.uuid(),
            nome,
            preco,
            descricao,
            fotoURL : req.file.filename
        }
        servicosModel.push(servico)

        fs.writeFileSync(__dirname + '/../models/servicos.json', JSON.stringify(servicosModel));

        res.redirect('/admin/servicos')
    },
    editarServicos: function(req,res){
        const {id} = req.params;
        
        const servico = servicosModel.find(servico => servico.id === id)
        
        res.render('servicoseEditar', { servico })
    },
    update: function (req,res){
        const {id} = req.params;
        
        const {nome, preco, descricao } = req.body;
        
        const servico = servicosModel.find(servico => servico.id === id);

        servico.nome = nome;
        servico.preco = preco;
        servico.descricao = descricao;

        fs.writeFileSync(__dirname + '/../models/servicos.json', JSON.stringify(servicosModel));

        res.redirect('/admin/servicos')

    }
};

module.exports = adminController;