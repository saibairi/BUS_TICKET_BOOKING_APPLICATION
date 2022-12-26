## Node JS Bus ticket booking Backend Project

This is a NodeJS powered Web Application, Backend and API Resource hub for it's client interface.

## project info:
.customer can book the bus tickets.
.customer can check avaliability of seats.
.customer can check their ticket status.
.admin can update the ticket status.
.only 40 seats can avalabile at atime, if all 40 seats are occupied, then no seat can be allotted.

## Tech stack
.Node.js
.Express
.MongoDB
.GIT(to publish project in GitHub)

## Installation

```bash
git init
git pull https://github.com/saibairi/BUS_TICKET_BOOKING_APPLICATION.git
```

OR

```bash
git clone https://github.com/saibairi/BUS_TICKET_BOOKING_APPLICATION.git .
```
**Install dependencies.** This may take a while.

```bash
npm install
```

**Create a `.env` file** at the project root and copy contents from here into it.

```
HOST = localhost
PORT = 3000
DB = "your DB name"
NODE_ENV = development

JWT_SECRET=<YOUR JWT SECRET HERE>
JWT_LIFESPAN=600
```
**Generating a secure JWT Secret**

In the console run the following commands:
```bash
node
require('crypto').randomBytes(64).toString('hex')
```
OR simply call the package.json script that has been set up to quickly generate a cryptographically secure string

```bash
npm run crypto
```
Copy the cryptographically secure string and use it as your `JWT_SECRET`

When you have set up your database configuration, the following scripts can be used to quickly setup the server.

**Run server using nodemon**

```bash
npm run server
```

### Todo

* Create Login and Registration system
* Create Authentication and Authorization system
* Create Crud Operations with validations
* Unit tests