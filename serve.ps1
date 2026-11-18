$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:8080/"
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Servidor web básico iniciado en $prefix"
Write-Host "Presiona Ctrl+C para detenerlo."

$baseDir = $PSScriptRoot

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        [System.Threading.ThreadPool]::QueueUserWorkItem({
            param($ctx)
            try {
                $req = $ctx.Request
                $res = $ctx.Response

                $urlPath = $req.Url.LocalPath.TrimStart('/')
                if ([string]::IsNullOrEmpty($urlPath) -or $urlPath -eq '/') {
                    $urlPath = "index.html"
                }

                $filePath = [System.IO.Path]::Combine($using:baseDir, $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))

                if ([System.IO.File]::Exists($filePath)) {
                    $bytes = [System.IO.File]::ReadAllBytes($filePath)
                    $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                    $contentType = switch ($ext) {
                        ".html" { "text/html; charset=utf-8" }
                        ".css"  { "text/css; charset=utf-8" }
                        ".js"   { "application/javascript; charset=utf-8" }
                        ".svg"  { "image/svg+xml; charset=utf-8" }
                        ".json" { "application/json; charset=utf-8" }
                        ".png"  { "image/png" }
                        ".jpg"  { "image/jpeg" }
                        default { "application/octet-stream" }
                    }
                    $res.ContentType = $contentType
                    $res.ContentLength64 = $bytes.LongLength
                    $res.OutputStream.Write($bytes, 0, $bytes.Length)
                } else {
                    $res.StatusCode = 404
                    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado")
                    $res.ContentLength64 = $msg.LongLength
                    $res.OutputStream.Write($msg, 0, $msg.Length)
                }
            } catch {
                # Ignorar desconexiones prematuras de clientes
            } finally {
                try { $ctx.Response.Close() } catch {}
            }
        }, $context) | Out-Null
    }
} finally {
    $listener.Stop()
}
