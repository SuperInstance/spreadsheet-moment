// Spreadsheet Moment - Cloudflare Worker
// Main entry point for server-side logic

export default {
  async fetch(request, env, ctx) => {
    const url = new URL(request.url);
    
    // Handle different routes
    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env, ctx);
    }
    
    // Serve static assets from website
    return env.ASSETS.fetch(request);
  }
};

async function handleAPI(request, env, ctx) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');
  
  try {
    switch (path) {
      case 'cells':
        if (request.method === 'GET') {
          return getCells(request, env);
        } else if (request.method === 'POST') {
          return createCell(request, env);
        }
        break;
      
      case 'agent':
        if (request.method === 'POST') {
          return executeAgent(request, env);
        }
        break;
      
      default:
        return new Response('Not Found', { status: 404 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function getCells(request, env) {
  const spreadsheetId = new URL(request.url).searchParams.get('spreadsheet');
  
  // Get cells from KV
  const cells = await env.CELL_STATE.get(`cells:${spreadsheetId}`, 'json');
  
  return new Response(JSON.stringify(cells || []), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function createCell(request, env) {
  const data = await request.json();
  
  // Create new cell agent
  const cell = {
    id: crypto.randomUUID(),
    position: data.position,
    formula: data.formula,
    state: 'active',
    createdAt: Date.now()
  };
  
  // Store in KV
  const spreadsheetId = data.spreadsheetId;
  const cells = await env.CELL_STATE.get(`cells:${spreadsheetId}`, 'json') || [];
  cells.push(cell);
  await env.CELL_STATE.put(`cells:${spreadsheetId}`, JSON.stringify(cells));
  
  return new Response(JSON.stringify(cell), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function executeAgent(request, env) {
  const data = await request.json();
  
  // Execute agent logic
  const result = {
    cellId: data.cellId,
    output: data.input,
    confidence: 0.95,
    reasoning: 'Agent processed input successfully'
  };
  
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' }
  });
}
