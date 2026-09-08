const { validationResult } = require('express-validator');

// Roda depois das regras do express-validator; se houver erro, retorna 400
// (equivalente ao comportamento automático do @Valid no Spring)
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = validate;
