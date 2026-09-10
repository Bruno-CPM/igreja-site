const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const controller = require('../controllers/dizimoController');

const router = Router();

const regrasLembrete = [
  body('nome').notEmpty().withMessage('nome e obrigatorio'),
  body('canal').isIn(['email', 'whatsapp']).withMessage('canal deve ser email ou whatsapp'),
  body('contato').notEmpty().withMessage('contato e obrigatorio'),
  body('diaPreferido').optional().isInt({ min: 1, max: 28 }).withMessage('diaPreferido deve ser entre 1 e 28'),
];

router.post('/lembrete', regrasLembrete, validate, controller.cadastrarLembrete);

module.exports = router;
