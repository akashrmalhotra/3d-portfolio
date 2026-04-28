"""
Streamlit shell that hosts the Vite + React + three.js Satyukt site.

This site is a React 18 + Vite + react-three-fiber + GSAP SPA. Streamlit
isn't the natural host for that, so this script does the only thing that
works inside a Streamlit process:

  1. Build the static bundle once (`npm run build` -> `dist/`).
  2. Serve `dist/` from a background HTTP server on a localhost port.
  3. Embed the served URL inside a full-bleed iframe.

Run locally with:
    streamlit run app.py

Heads-up: this works on a developer machine, but it will NOT work on
Streamlit Community Cloud. Their reverse proxy only exposes the
Streamlit port, so the sidecar HTTP server is unreachable from outside.
For production, deploy the contents of `dist/` to Vercel, Netlify, or
Cloudflare Pages.
"""

from __future__ import annotations

import shutil
import socket
import subprocess
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components

ROOT = Path(__file__).resolve().parent
DIST = ROOT / "dist"


def _pick_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def _ensure_build() -> None:
    if (DIST / "index.html").exists():
        return
    if shutil.which("npm") is None:
        st.error(
            "`npm` was not found on PATH. Install Node.js 18+ and rerun "
            "`streamlit run app.py`."
        )
        st.stop()
    with st.spinner("Installing dependencies and building the Vite bundle..."):
        subprocess.run(
            ["npm", "ci", "--no-audit", "--no-fund"],
            cwd=ROOT,
            check=True,
        )
        subprocess.run(
            ["npm", "run", "build"],
            cwd=ROOT,
            check=True,
        )


@st.cache_resource(show_spinner=False)
def _start_static_server() -> str:
    port = _pick_port()
    handler = partial(SimpleHTTPRequestHandler, directory=str(DIST))
    server = ThreadingHTTPServer(("127.0.0.1", port), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return f"http://127.0.0.1:{port}"


def main() -> None:
    st.set_page_config(
        page_title="Satyukt — Selling Trust, Not Satellites",
        layout="wide",
        initial_sidebar_state="collapsed",
    )
    st.markdown(
        """
        <style>
            .block-container { padding: 0 !important; max-width: 100% !important; }
            header[data-testid="stHeader"] { display: none; }
            footer { display: none; }
            iframe { border: 0; }
        </style>
        """,
        unsafe_allow_html=True,
    )

    _ensure_build()
    url = _start_static_server()
    components.iframe(url, height=1080, scrolling=True)


if __name__ == "__main__":
    main()
