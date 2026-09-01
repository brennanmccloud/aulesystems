from pathlib import Path

from flask import Flask, Response, abort, send_from_directory

ROOT = Path(__file__).resolve().parent
PUBLIC_FILES = {
    "index.html",
    "styles-base.css",
    "styles-components.css",
    "app-core.js",
    "app-views.js",
    "app-actions.js",
}

app = Flask(__name__, static_folder=None)


@app.get("/")
def index() -> Response:
    return Response(
        (ROOT / "index.html").read_text(encoding="utf-8"),
        mimetype="text/html",
        headers={
            "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
            "X-Content-Type-Options": "nosniff",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        },
    )


@app.get("/healthz")
def healthz() -> dict[str, object]:
    return {"ok": True, "app": "aule-cre-intelligence-v2", "version": "2.0.0"}


@app.get("/<path:filename>")
def public_file(filename: str):
    if filename not in PUBLIC_FILES:
        abort(404)
    return send_from_directory(ROOT, filename)
