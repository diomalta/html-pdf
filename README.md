# HTML to PDF

This project provides an easy way to convert HTML to PDF using Google Chrome. It is designed to be used in a Docker environment. It is fast because it reuses the same instance of Chrome.

## Prerequisites

[Google Chrome installed on the Docker image](#notes)

## Installation

```bash
pnpm add @diomalta/html-pdf
```

## Usage

First, import the `init` functions when initializing your application:

```javascript
import { init, convertHtmlToPdf } from '@diomalta/html-pdf';
import Application from '@diomalta/http-server';

// Initialize the HTML to PDF service
init({ port: 39489 });

// Create a new Application instance
const app = new Application({ port: 3000 });

// Define a GET route to convert HTML to PDF
app.get('/html-to-pdf', (req, res) => {
  const html = '<h1>Hello, world!</h1>';

  const outputOptions = {
    type: 'base64',
  };

  const base64Pdf = await convertHtmlToPdf({ html, outputOptions });

  res.status(200).send(base64Pdf);
});

// Start the server on port 3000
app.listen({ port: 3000 });
```

## Notes

Make sure that Google Chrome is installed on your Docker image. If it is not, you can install it by adding the following lines to your Dockerfile:

```dockerfile
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable
```

This will add the Google Chrome repository to the APT sources list, update the package list, and install Google Chrome.

## License

This project is licensed under the MIT License - see the [LICENSE](MIT-LICENSE.txt) file for details.
