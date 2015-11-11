# JS TLC - Front End Optimization

## Getting Started

### Prerequisites
- [Node.js and npm](https://nodejs.org/) 
  + Tested with v0.12.x or v4.x.x (use [nvm-windows](https://github.com/coreybutler/nvm-windows) to easily switch)
- [Bower](http://bower.io/)

### Dependencies

To install dependencies, simply run the following commands in the root
directory of the project.

```shell
$ npm install
$ bower install
```

You'll also need to install Grunt globally:

```shell
$ npm install -g grunt-cli
```

### Running the website/server

From the root directory of the project, run:

```shell
$ grunt server
```

You should be able to see the website by navigating to <http://localhost:8080> 
in your browser.

#### Developer tasks

To compile the SCSS files to CSS, run:

```shell
$ grunt css
```

If you want to launch the server and automatically compile SCSS files when 
changed, run:

```shell
$ grunt dev
```
