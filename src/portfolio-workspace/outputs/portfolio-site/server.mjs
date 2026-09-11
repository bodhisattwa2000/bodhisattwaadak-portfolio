import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
const root = resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || 5173);
const types = {".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml",".jpeg":"image/jpeg",".jpg":"image/jpeg",".pdf":"application/pdf"};
createServer((req,res)=>{const url=new URL(req.url||"/",`http://localhost:${port}`);const safePath=normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/,"");let filePath=join(root,safePath==="/"?"index.html":safePath);if(!filePath.startsWith(root)){res.writeHead(403);res.end("Forbidden");return;}if(!existsSync(filePath)||statSync(filePath).isDirectory())filePath=join(root,"index.html");res.writeHead(200,{"Content-Type":types[extname(filePath)]||"application/octet-stream","Cache-Control":"no-store"});createReadStream(filePath).pipe(res);}).listen(port,"127.0.0.1",()=>console.log(`Portfolio running at http://localhost:${port}`));
