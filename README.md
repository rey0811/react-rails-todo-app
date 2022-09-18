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

### Backend

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

## 3. Test

### Backend

```
$ docker-compose exec backend bundle exec rspec
..

Finished in 0.05045 seconds (files took 1.88 seconds to load)
2 examples, 0 failures
```
