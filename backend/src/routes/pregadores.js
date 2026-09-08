const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const controller = require('../controllers/pregadorController');

const router = Router();

const regrasPregador = [body('nome').notEmpty().withMessage('nome e obrigatorio')];

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', regrasPregador, validate, controller.criar);
router.put('/:id', regrasPregador, validate, controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;
