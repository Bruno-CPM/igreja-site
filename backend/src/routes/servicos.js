const { Router } = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const controller = require('../controllers/servicoController');

const router = Router();

const regrasServico = [body('nome').notEmpty().withMessage('nome e obrigatorio')];

router.get('/', controller.listar);
router.post('/', regrasServico, validate, controller.criar);
router.delete('/:id', controller.excluir);

module.exports = router;
