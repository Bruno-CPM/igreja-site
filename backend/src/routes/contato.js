const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const controller = require('../controllers/contatoController');

const router = Router();

const regrasContato = [
  body('nome').notEmpty().withMessage('nome e obrigatorio'),
  body('email').notEmpty().withMessage('email e obrigatorio').isEmail().withMessage('email invalido'),
  body('texto').notEmpty().withMessage('texto e obrigatorio'),
];

router.post('/', regrasContato, validate, controller.enviar);

module.exports = router;
