import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent / "dashboard-api"))

from main import app
