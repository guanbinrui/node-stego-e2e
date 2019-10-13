# node-stego-e2e

## Setup

```bash
npm install
npm install [packages in peer deps] --no-save # required in submodules
git submodule foreach npm install

npm build
npm link

e2e -a GENERATE # generate test suites
e2e -a VALIDATE # validate test suites
e2e -h
```

## Repos

- [node-stego](https://github.com/guanbinrui/node-stego)
- [img-poster](https://github.com/guanbinrui/img-poster)
- [img-cralwer](https://github.com/guanbinrui/img-crawler)
