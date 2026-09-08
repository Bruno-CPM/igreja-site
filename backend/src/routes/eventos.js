const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const controller = require('../controllers/eventoController');

const router = Router();

const regrasEvento = [
  body('titulo').notEmpty().withMessage('titulo e obrigatorio'),
  body('data').notEmpty().withMessage('data e obrigatoria').isISO8601().withMessage('data invalida'),
];

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', regrasEvento, validate, controller.criar);
router.put('/:id', regrasEvento, validate, controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
