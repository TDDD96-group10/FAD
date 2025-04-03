#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import subprocess


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


class Flake8LintError(Exception):
    pass


def lint():
    result = subprocess.run(['flake8', '.'], capture_output=True, text=True)

    if result.returncode != 0:
        raise Flake8LintError(f"Flake8 found issues:\n{result.stdout}")


if __name__ == '__main__':
    #lint()
    main()
