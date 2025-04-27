#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import subprocess
import logging


logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'fad_backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


def lint():
    result = subprocess.run(
        ['flake8', '--config=./fad_backend/.flake8', './fad_backend'],
        capture_output=True,
        text=True
    )

    if result.returncode != 0:
        logger.error("Flake8 found issues and the current code will not pass the pipeline.Look at the log file")
        with open("flake8_output.log", "w") as f:
            f.write(result.stdout)
    else:
        with open("flake8_output.log", "w") as f:
            f.write("")


if __name__ == '__main__':
    if sys.argv[1] == "runserver":
        lint()
    main()
