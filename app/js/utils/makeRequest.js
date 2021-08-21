/**
 * Выполняет асинхронный запрос с указанной конфигурацией
 * @param cfg{Object} - конфигурация
 * @return Promise
 */

export async function makeRequest (cfg) {
  const resp = await fetch(cfg.url, {
    method: cfg.method || 'GET',
    body: (cfg.method === 'POST') ? cfg.data : null,
    mode: (cfg.mode) ? cfg.mode : 'cors',
  })
  return (resp.ok) ? await (cfg.type === 'json') ? resp.json() : resp.text() : Promise.reject(resp.statusText)
}
