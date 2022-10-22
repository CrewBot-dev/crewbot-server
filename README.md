# CrewBot Server

Backend server that powers CrewBot experiences across platforms.

## Configuration

Create a copy of `config.example.json5` named `config.json5` and populate the values as needed.. **Do not commit this file to version control.**

### Values

- `environment`: either `"production"` or `"development"`. Should be self-explanatory.
- `listenPort`: a number that the server should listen for incoming requests on.
