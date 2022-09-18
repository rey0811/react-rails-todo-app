# README

## 1. Local environment setup

### A. Create local environment
- Go to a directory which has `Makefile`
- Run below command to build and start Docker container
```
make up
```
- Run below commands to prepare Database

```
docker-compose exec backend bin/rails db:prepare
```

### B. Delete all resources

Run either of the below command.

```
make down
```

or 

```
make down-all
```

## 2. Verification

### A. Backend

Run the below command. In case you confirm API behavior on AWS environment, please include `x-api-key` and change proper domain name.

**GET**

```
$ curl -X GET http://localhost:5000/api/v1/tasks
[{"id":1,"title":"Test","state":"Open","created_at":"2022-09-18T02:13:25.954Z","updated_at":"2022-09-18T02:13:25.954Z"}]
```

**POST**

```
$ curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d @backend/devfile/body.json \
     -X POST http://localhost:5000/api/v1/tasks
{"id":2,"title":"Test title","state":"Open","created_at":"2022-09-18T02:19:30.811Z","updated_at":"2022-09-18T02:19:30.811Z"}
```

**PUT**

```
$ curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d @backend/devfile/body.json \
     -X PUT http://localhost:5000/api/v1/tasks/1
{"id":1,"title":"Test title","state":"Open","created_at":"2022-09-18T02:13:25.954Z","updated_at":"2022-09-18T02:20:11.595Z"}
```

**DELETE**

```
$ curl -H "Accept: application/json" \
     -H "Content-Type: application/json" \
     -d @backend/devfile/body.json \
     -X DELETE http://localhost:5000/api/v1/tasks/1
{"id":1,"title":"Test title","state":"Open","created_at":"2022-09-18T02:13:25.954Z","updated_at":"2022-09-18T02:20:11.595Z"}
```

### B. Frontend

Access to `http://localhost:3000/` and confirm you can see sample todo application.

## 3. Test

### A. Backend

```
$ docker-compose exec backend bundle exec rspec
..

Finished in 0.05045 seconds (files took 1.88 seconds to load)
2 examples, 0 failures
```

### B. Frontend

```
$ docker-compose exec frontend npm run test

> src@0.1.0 test
> jest --no-cache

 PASS  __tests__/index.test.jsx (5.077 s)
  Home
    ✓ renders a heading (181 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        7.918 s
Ran all test suites.
```
