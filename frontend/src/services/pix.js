// Gera o payload "Pix Copia e Cola" (BR Code / EMV) no formato padronizado
// pelo Banco Central. Referência: manual "BR Code" do Bacen.

function crc16(payload) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i += 1) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j += 1) {
      crc = (crc & 0x8000) !== 0 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

function emvField(id, value) {
  const length = String(value.length).padStart(2, '0');
  return `${id}${length}${value}`;
}

function sanitize(str, maxLen) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .toUpperCase()
    .trim()
    .slice(0, maxLen);
}

/**
 * Monta o código "Pix Copia e Cola".
 * @param {{ chave: string, nome: string, cidade: string, valor?: number|string, txid?: string }} params
 */
export function buildPixPayload({ chave, nome, cidade, valor, txid = '***' }) {
  if (!chave) return null;

  const merchantAccount = emvField('00', 'br.gov.bcb.pix') + emvField('01', chave.trim());

  let payload =
    emvField('00', '01') +
    emvField('26', merchantAccount) +
    emvField('52', '0000') +
    emvField('53', '986');

  const valorNumerico = Number(valor);
  if (valorNumerico && valorNumerico > 0) {
    payload += emvField('54', valorNumerico.toFixed(2));
  }

  payload +=
    emvField('58', 'BR') +
    emvField('59', sanitize(nome, 25) || 'RECEBEDOR') +
    emvField('60', sanitize(cidade, 15) || 'BRASIL') +
    emvField('62', emvField('05', txid));

  payload += '6304';
  return payload + crc16(payload);
}
