const express = require('express');
const multer = require('multer');
const path = require('path');
const fiscalizacaoController = require('../controllers/fiscalizacaoController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/fiscalizacoes/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Criar uma nova fiscalização
router.post('/api/fiscalizacoes', upload.single('foto'), fiscalizacaoController.createFiscalizacao);

// Listar todas as fiscalizações
router.get('/api/fiscalizacoes', fiscalizacaoController.getFiscalizacoes);

// Buscar fiscalização por ID
router.get('/api/fiscalizacoes/:id', fiscalizacaoController.getFiscalizacaoById);

// Atualizar fiscalização
router.put('/api/fiscalizacoes/:id', upload.single('foto'), fiscalizacaoController.updateFiscalizacao);

// Deletar fiscalização
router.delete('/api/fiscalizacoes/:id', fiscalizacaoController.deleteFiscalizacao);

// Listar fiscalizações de uma obra específica
router.get('/api/fiscalizacoes/obra/:obraId', fiscalizacaoController.getFiscalizacoesByObra);

module.exports = router;
