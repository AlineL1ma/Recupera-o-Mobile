const express = require('express');
const multer = require('multer');
const path = require('path');
const obraController = require('../controllers/obraController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/obras/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Criar uma nova obra
router.post('/api/obras', upload.single('foto'), obraController.createObra);

// Listar todas as obras
router.get('/api/obras', obraController.getObras);

// Buscar obra por ID
router.get('/api/obras/:id', obraController.getObraById);

// Atualizar obra
router.put('/api/obras/:id', upload.single('foto'), obraController.updateObra);

// Deletar obra
router.delete('/api/obras/:id', obraController.deleteObra);

// Detalhes da obra com lista de fiscalizações
router.get('/api/obras/:id/detalhes', obraController.getObraDetalhes);

// Enviar dados da obra e fiscalizações por e-mail
router.post('/api/obras/:id/enviar-email', obraController.enviarObraPorEmail);

module.exports = router;
