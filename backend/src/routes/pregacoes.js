const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const controller = require('../controllers/pregacaoController');

const router = Router();

const regrasPregacao = [
  body('titulo').notEmpty().withMessage('titulo e obrigatorio'),
  body('data').notEmpty().withMessage('data e obrigatoria').isISO8601().withMessage('data invalida'),
];

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', regrasPregacao, validate, controller.criar);
router.delete('/:id', controller.excluir);

module.exports = router;
